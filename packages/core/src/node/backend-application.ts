/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as http from "http";
import * as express from "express";
import * as yargs from "yargs";
import { inject, named, injectable } from "inversify";
import { ILogger, ContributionProvider } from "../common";
import { CliContribution } from "./cli";
import { Deferred } from "../common/promise-util";
import { BackendProcess } from "./backend-process";

export const BackendApplicationContribution = Symbol(
  "BackendApplicationContribution"
);
export interface BackendApplicationContribution {
  initialize?(): void;
  configure?(app: express.Application): void;
  onStart?(server: http.Server): void;
}

const defaultPort = BackendProcess.electron ? 0 : 5000;
const defaultHost = "localhost";

@injectable()
export class BackendApplicationCliContribution implements CliContribution {
  port: number;
  hostname: string | undefined;

  configure(conf: yargs.Argv): void {
    yargs.option("port", {
      alias: "p",
      description: "The port the backend server listens on.",
      type: "number",
      default: defaultPort
    });
    yargs.option("hostname", {
      description: "The allowed hostname for connections.",
      type: "string",
      default: defaultHost
    });
  }

  setArguments(args: yargs.Arguments): void {
    this.port = args.port;
    this.hostname = args.hostname;
  }
}

/**
 * The main entry point for Theia applications.
 */
@injectable()
export class BackendApplication {
  protected readonly app: express.Application = express();

  constructor(
    @inject(ContributionProvider)
    @named(BackendApplicationContribution)
    protected readonly contributionsProvider: ContributionProvider<
      BackendApplicationContribution
    >,
    @inject(BackendApplicationCliContribution)
    protected readonly cliParams: BackendApplicationCliContribution,
    @inject(ILogger) protected readonly logger: ILogger
  ) {
    process.on("uncaughtException", error => {
      if (error) {
        logger.error("Uncaught Exception: ", error.toString());
        if (error.stack) {
          logger.error(error.stack);
        }
      }
    });

    for (const contribution of this.contributionsProvider.getContributions()) {
      if (contribution.initialize) {
        try {
          contribution.initialize();
        } catch (err) {
          this.logger.error(err.toString());
        }
      }
    }

    for (const contribution of this.contributionsProvider.getContributions()) {
      if (contribution.configure) {
        try {
          contribution.configure(this.app);
        } catch (err) {
          this.logger.error(err.toString());
        }
      }
    }
  }

  use(...handlers: express.Handler[]): void {
    this.app.use(...handlers);
  }

  async start(aPort?: number, aHostname?: string): Promise<http.Server> {
    const deferred = new Deferred<http.Server>();
    let server: http.Server;
    let herokuPort: number;
    if (process.env.PORT === undefined) {
      herokuPort = this.cliParams.port;
    } else {
      herokuPort = <number>(<any>process.env.PORT);
    }
    console.log("Listening on port " + herokuPort);
    // const port = aPort !== undefined ? aPort : herokuPort;
    const hostname =
      aHostname !== undefined ? aHostname : this.cliParams.hostname;
    this.logger.info("Listening on host: " + hostname);
    server = this.app.listen(herokuPort, "0.0.0.0"!, () => {
      this.logger.info(
        `Theia app listening on http://${hostname ||
          "localhost"}:${server.address().port}.`
      );
      this.logger.info("The env port is: ${process.env.PORT}");
      deferred.resolve(server);
    });

    /* Allow any number of websocket servers.  */
    server.setMaxListeners(0);

    for (const contrib of this.contributionsProvider.getContributions()) {
      if (contrib.onStart) {
        try {
          contrib.onStart(server);
        } catch (err) {
          this.logger.error(err.toString());
        }
      }
    }
    return deferred.promise;
  }
}
