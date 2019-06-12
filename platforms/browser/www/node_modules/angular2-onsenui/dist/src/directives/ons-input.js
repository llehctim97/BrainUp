"use strict";
var core_1 = require('@angular/core');
/**
 * @element ons-input
 * @directive OnsInput
 * @selector ons-input
 * @description
 *   [en]Angular 2 directive for `<ons-input>` component.[/en]
 *   [ja]`<ons-input>`要素のAngular 2ディレクティブです。[/ja]
 * @example
 *   <ons-input [(value)]="value"></ons-input>
 */
var OnsInput = (function () {
    function OnsInput(_elementRef) {
        this._elementRef = _elementRef;
        /**
         * @output valueChange
         * @type {string}
         * @desc
         *   [en]Triggers when the value is changed.[/en]
         *   [ja]内部の`input`要素の値が変更された時に発火します。[/ja]
         */
        this._valueChange = new core_1.EventEmitter();
        this._boundOnChange = this._onChange.bind(this);
        this._element = _elementRef.nativeElement;
        this._element.addEventListener('input', this._boundOnChange);
    }
    OnsInput.prototype._onChange = function (event) {
        this._valueChange.emit(this._element.value);
    };
    OnsInput.prototype.ngOnChanges = function (changeRecord) {
        var value = changeRecord['_value'].currentValue;
        this._element.value = value;
    };
    Object.defineProperty(OnsInput.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: true,
        configurable: true
    });
    OnsInput.prototype.ngOnDestroy = function () {
        this._element.removeEventListener('change', this._boundOnChange);
        this._element = null;
    };
    OnsInput.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'ons-input'
                },] },
    ];
    /** @nocollapse */
    OnsInput.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    OnsInput.propDecorators = {
        '_value': [{ type: core_1.Input, args: ['value',] },],
        '_valueChange': [{ type: core_1.Output, args: ['valueChange',] },],
    };
    return OnsInput;
}());
exports.OnsInput = OnsInput;
//# sourceMappingURL=ons-input.js.map