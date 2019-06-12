"use strict";
var core_1 = require('@angular/core');
/**
 * @element ons-range
 * @directive OnsRange
 * @selector ons-range
 * @description
 *   [en]Angular 2 directive for `<ons-range>` component.[/en]
 *   [ja]`<ons-range>`要素のAngular 2ディレクティブです。[/en]
 * @example
 *   <ons-range [(value)]="foo"></ons-range><br>
 *
 *   <!-- Add (input) to change immediately on dragging range component -->
 *   <ons-range [(value)]="bar" (input)="bar = $event.target.value"></ons-range>
 */
var OnsRange = (function () {
    function OnsRange(_elementRef) {
        this._elementRef = _elementRef;
        /**
         * @output valueChange
         * @type {string}
         * @desc
         *   [en]Triggers when the value is changed.[/en]
         *   [ja]値が変更された時に発火します。[/ja]
         */
        this._valueChange = new core_1.EventEmitter();
        this._boundOnChange = this._onChange.bind(this);
        this._element = _elementRef.nativeElement;
        this._element.addEventListener('change', this._boundOnChange);
    }
    OnsRange.prototype._onChange = function (event) {
        this._valueChange.emit(this._element.value);
    };
    OnsRange.prototype.ngOnChanges = function (changeRecord) {
        var value = changeRecord['_value'].currentValue;
        this._element.value = value;
    };
    Object.defineProperty(OnsRange.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: true,
        configurable: true
    });
    OnsRange.prototype.ngOnDestroy = function () {
        this._element.removeEventListener('change', this._boundOnChange);
        this._element = null;
    };
    OnsRange.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'ons-range'
                },] },
    ];
    /** @nocollapse */
    OnsRange.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    OnsRange.propDecorators = {
        '_value': [{ type: core_1.Input, args: ['value',] },],
        '_valueChange': [{ type: core_1.Output, args: ['valueChange',] },],
    };
    return OnsRange;
}());
exports.OnsRange = OnsRange;
//# sourceMappingURL=ons-range.js.map