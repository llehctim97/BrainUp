"use strict";
var core_1 = require('@angular/core');
/**
 * @element ons-switch
 * @directive OnsSwitch
 * @selector ons-switch
 * @description
 *   [en]Angular 2 directive for `<ons-switch>` component.[/en]
 *   [ja]`<ons-switch>`要素のAngular 2ディレクティブです。[/ja]
 * @example
 *   <ons-switch [(value)]="target"></ons-switch>
 */
var OnsSwitch = (function () {
    function OnsSwitch(_elementRef) {
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
    Object.defineProperty(OnsSwitch.prototype, "value", {
        /**
         * @input value
         * @type {boolean}
         * @desc
         *   [en]Specify the value of the `<ons-switch>` component.[/en]
         *   [ja]`ons-switch`コンポーネントに設定する値を指定します。[/ja]
         */
        set: function (target) {
            this._element.checked = !!target;
        },
        enumerable: true,
        configurable: true
    });
    OnsSwitch.prototype._onChange = function (event) {
        this._valueChange.emit(this._element.checked);
    };
    OnsSwitch.prototype.ngOnChanges = function (changeRecord) {
        var value = !!changeRecord.value.currentValue;
        this._element.checked = value;
    };
    Object.defineProperty(OnsSwitch.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: true,
        configurable: true
    });
    OnsSwitch.prototype.ngOnDestroy = function () {
        this._element.removeEventListener('change', this._boundOnChange);
        this._element = null;
    };
    OnsSwitch.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'ons-switch'
                },] },
    ];
    /** @nocollapse */
    OnsSwitch.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    OnsSwitch.propDecorators = {
        'value': [{ type: core_1.Input, args: ['value',] },],
        '_valueChange': [{ type: core_1.Output, args: ['valueChange',] },],
    };
    return OnsSwitch;
}());
exports.OnsSwitch = OnsSwitch;
//# sourceMappingURL=ons-switch.js.map