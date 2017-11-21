"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var common_1 = require("../common");
var widgets_1 = require("./widgets");
var DialogProps = /** @class */ (function () {
    function DialogProps() {
    }
    DialogProps = __decorate([
        inversify_1.injectable()
    ], DialogProps);
    return DialogProps;
}());
exports.DialogProps = DialogProps;
var AbstractDialog = /** @class */ (function (_super) {
    __extends(AbstractDialog, _super);
    function AbstractDialog(props) {
        var _this = _super.call(this) || this;
        _this.props = props;
        _this.addClass('dialogBlock');
        _this.toDispose.push(common_1.Disposable.create(function () {
            if (_this.reject) {
                widgets_1.Widget.detach(_this);
            }
        }));
        _this.contentNode = document.createElement("div");
        _this.contentNode.classList.add('dialogContent');
        _this.node.appendChild(_this.contentNode);
        _this.titleNode = document.createElement("div");
        _this.titleNode.classList.add('dialogTitle');
        _this.titleNode.textContent = props.title;
        _this.contentNode.appendChild(_this.titleNode);
        _this.closeCrossNode = document.createElement("i");
        _this.closeCrossNode.classList.add('dialogClose');
        _this.closeCrossNode.classList.add('fa');
        _this.closeCrossNode.classList.add('fa-times');
        _this.closeCrossNode.setAttribute('aria-hidden', 'true');
        _this.contentNode.appendChild(_this.closeCrossNode);
        _this.update();
        return _this;
    }
    AbstractDialog.prototype.appendCloseButton = function (text) {
        this.contentNode.appendChild(this.createCloseButton(text));
    };
    AbstractDialog.prototype.appendAcceptButton = function (text) {
        this.contentNode.appendChild(this.createAcceptButton(text));
    };
    AbstractDialog.prototype.createCloseButton = function (text) {
        if (text === void 0) { text = 'Cancel'; }
        return this.closeButton = this.createButton(text);
    };
    AbstractDialog.prototype.createAcceptButton = function (text) {
        if (text === void 0) { text = 'OK'; }
        return this.acceptButton = this.createButton(text);
    };
    AbstractDialog.prototype.createButton = function (text) {
        var button = document.createElement("button");
        button.classList.add('dialogButton');
        button.textContent = text;
        return button;
    };
    AbstractDialog.prototype.onAfterAttach = function (msg) {
        var _this = this;
        _super.prototype.onAfterAttach.call(this, msg);
        if (this.closeButton) {
            this.addCloseAction(this.closeButton, 'click');
        }
        if (this.acceptButton) {
            this.addAcceptAction(this.acceptButton, 'click');
        }
        this.addCloseAction(this.closeCrossNode, 'click');
        this.addKeyListener(document.body, common_1.Key.ESCAPE, function () { return _this.close(); });
        this.addKeyListener(document.body, common_1.Key.ENTER, function () { return _this.accept(); });
    };
    AbstractDialog.prototype.onActivateRequest = function (msg) {
        _super.prototype.onActivateRequest.call(this, msg);
        if (this.acceptButton) {
            this.acceptButton.focus();
        }
    };
    AbstractDialog.prototype.open = function () {
        var _this = this;
        if (this.resolve) {
            return Promise.reject('The dialog is already opened.');
        }
        return new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
            _this.toDisposeOnDetach.push(common_1.Disposable.create(function () {
                _this.resolve = undefined;
                _this.reject = undefined;
            }));
            widgets_1.Widget.attach(_this, document.body);
            _this.activate();
        });
    };
    AbstractDialog.prototype.onUpdateRequest = function (msg) {
        _super.prototype.onUpdateRequest.call(this, msg);
        if (this.resolve) {
            var value = this.value;
            var error = this.isValid(value);
            this.setErrorMessage(error);
        }
    };
    AbstractDialog.prototype.accept = function () {
        if (this.resolve) {
            var value = this.value;
            var error = this.isValid(value);
            if (error) {
                this.setErrorMessage(error);
            }
            else {
                this.resolve(value);
                widgets_1.Widget.detach(this);
            }
        }
    };
    AbstractDialog.prototype.isValid = function (value) {
        return '';
    };
    AbstractDialog.prototype.setErrorMessage = function (error) {
        if (this.acceptButton) {
            this.acceptButton.disabled = !!error;
        }
    };
    AbstractDialog.prototype.addCloseAction = function (element) {
        var _this = this;
        var additionalEventTypes = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            additionalEventTypes[_i - 1] = arguments[_i];
        }
        this.addKeyListener.apply(this, __spread([element, common_1.Key.ENTER, function () { return _this.close(); }], additionalEventTypes));
    };
    AbstractDialog.prototype.addAcceptAction = function (element) {
        var _this = this;
        var additionalEventTypes = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            additionalEventTypes[_i - 1] = arguments[_i];
        }
        this.addKeyListener.apply(this, __spread([element, common_1.Key.ENTER, function () { return _this.accept(); }], additionalEventTypes));
    };
    AbstractDialog = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(DialogProps)),
        __metadata("design:paramtypes", [DialogProps])
    ], AbstractDialog);
    return AbstractDialog;
}(widgets_1.BaseWidget));
exports.AbstractDialog = AbstractDialog;
var ConfirmDialogProps = /** @class */ (function (_super) {
    __extends(ConfirmDialogProps, _super);
    function ConfirmDialogProps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConfirmDialogProps = __decorate([
        inversify_1.injectable()
    ], ConfirmDialogProps);
    return ConfirmDialogProps;
}(DialogProps));
exports.ConfirmDialogProps = ConfirmDialogProps;
var ConfirmDialog = /** @class */ (function (_super) {
    __extends(ConfirmDialog, _super);
    function ConfirmDialog(props) {
        var _this = _super.call(this, props) || this;
        _this.props = props;
        _this.confirmed = true;
        var messageNode = document.createElement("div");
        messageNode.textContent = props.msg;
        messageNode.setAttribute('style', 'flex: 1 100%; padding-bottom: calc(var(--theia-ui-padding)*3);');
        _this.contentNode.appendChild(messageNode);
        _this.appendCloseButton(props.cancel);
        _this.appendAcceptButton(props.ok);
        return _this;
    }
    ConfirmDialog.prototype.onCloseRequest = function (msg) {
        _super.prototype.onCloseRequest.call(this, msg);
        this.confirmed = false;
        this.accept();
    };
    Object.defineProperty(ConfirmDialog.prototype, "value", {
        get: function () {
            return this.confirmed;
        },
        enumerable: true,
        configurable: true
    });
    ConfirmDialog = __decorate([
        __param(0, inversify_1.inject(ConfirmDialogProps)),
        __metadata("design:paramtypes", [ConfirmDialogProps])
    ], ConfirmDialog);
    return ConfirmDialog;
}(AbstractDialog));
exports.ConfirmDialog = ConfirmDialog;
var SingleTextInputDialogProps = /** @class */ (function (_super) {
    __extends(SingleTextInputDialogProps, _super);
    function SingleTextInputDialogProps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SingleTextInputDialogProps = __decorate([
        inversify_1.injectable()
    ], SingleTextInputDialogProps);
    return SingleTextInputDialogProps;
}(DialogProps));
exports.SingleTextInputDialogProps = SingleTextInputDialogProps;
var SingleTextInputDialog = /** @class */ (function (_super) {
    __extends(SingleTextInputDialog, _super);
    function SingleTextInputDialog(props) {
        var _this = _super.call(this, props) || this;
        _this.props = props;
        _this.inputField = document.createElement("input");
        _this.inputField.classList.add('dialogButton');
        _this.inputField.type = 'text';
        _this.inputField.setAttribute('style', 'flex: 1 auto;');
        _this.inputField.value = props.initialValue || '';
        _this.contentNode.appendChild(_this.inputField);
        _this.appendAcceptButton(props.confirmButtonLabel);
        _this.errorMessageNode = document.createElement("div");
        _this.errorMessageNode.setAttribute('style', 'flex: 1 100%;');
        _this.contentNode.appendChild(_this.errorMessageNode);
        return _this;
    }
    Object.defineProperty(SingleTextInputDialog.prototype, "value", {
        get: function () {
            return this.inputField.value;
        },
        enumerable: true,
        configurable: true
    });
    SingleTextInputDialog.prototype.isValid = function (value) {
        if (this.props.validate) {
            return this.props.validate(value);
        }
        return _super.prototype.isValid.call(this, value);
    };
    SingleTextInputDialog.prototype.onAfterAttach = function (msg) {
        _super.prototype.onAfterAttach.call(this, msg);
        this.addUpdateListener(this.inputField, 'input');
    };
    SingleTextInputDialog.prototype.onActivateRequest = function (msg) {
        this.inputField.focus();
        this.inputField.select();
    };
    SingleTextInputDialog.prototype.setErrorMessage = function (error) {
        _super.prototype.setErrorMessage.call(this, error);
        if (error) {
            this.addClass('error');
        }
        else {
            this.removeClass('error');
        }
        this.errorMessageNode.innerHTML = error;
    };
    SingleTextInputDialog = __decorate([
        __param(0, inversify_1.inject(SingleTextInputDialogProps)),
        __metadata("design:paramtypes", [SingleTextInputDialogProps])
    ], SingleTextInputDialog);
    return SingleTextInputDialog;
}(AbstractDialog));
exports.SingleTextInputDialog = SingleTextInputDialog;
//# sourceMappingURL=dialogs.js.map