"use strict";
var core_1 = require('@angular/core');
var ItemContext = (function () {
    function ItemContext($implicit, index, count) {
        this.$implicit = $implicit;
        this.index = index;
        this.count = count;
    }
    return ItemContext;
}());
exports.ItemContext = ItemContext;
/**
 * @element ons-lazy-repeat
 * @directive OnsLazyRepeat
 * @selector [ons-lazy-repeat]
 * @description
 *   [en]Angular 2 directive for `<ons-lazy-repeat>` component.[/en]
 *   [en]`<ons-lazy-repeat>`要素と同じ機能を提供するAngular 2ディレクティブです。[/en]
 * @example
 *   <ons-list>
 *     <ons-list-item *onsLazyRepeat="let item of items; let i = index">
 *       #{{i}} {{item.msg}}
 *     </ons-list-item>
 *   </ons-list>
 */
var OnsLazyRepeat = (function () {
    function OnsLazyRepeat(_elementRef, _templateRef, _viewContainer) {
        this._elementRef = _elementRef;
        this._templateRef = _templateRef;
        this._viewContainer = _viewContainer;
    }
    Object.defineProperty(OnsLazyRepeat.prototype, "onsLazyRepeatOf", {
        /**
         * @input onsLazyRepeat
         * @desc
         *   [en]Render infinite lists with "let of" syntax in Angular 2.[/en]
         *   [ja]let of式を指定します。[/ja]
         * @example
         *  <ons-list>
         *    <ons-list-item *onsLazyRepeat="let message of messages">
         *      {{message}}
         *    </ons-list-item>
         *  </ons-list>
         */
        set: function (value) {
            var _this = this;
            this._onsLazyRepeatOf = value;
            this._provider = new ons._internal.LazyRepeatProvider(this._elementRef.nativeElement.parentElement, new ons._internal.LazyRepeatDelegate({
                loadItemElement: function (index, parent, done) {
                    _this._loadItemTemplate(index, parent, done);
                },
                countItems: function () {
                    return _this._onsLazyRepeatOf.length;
                }
            }));
        },
        enumerable: true,
        configurable: true
    });
    OnsLazyRepeat.prototype._loadItemTemplate = function (index, parent, done) {
        var context = new ItemContext(this._onsLazyRepeatOf[index], index, this._onsLazyRepeatOf.length);
        var view = this._viewContainer.createEmbeddedView(this._templateRef, context);
        // dirty fix on createEmbeddedView() does not insert DOM element randomly.
        parent.appendChild(view.rootNodes[0]);
        done(view.rootNodes[0]);
    };
    OnsLazyRepeat.prototype.refresh = function () {
        if (this._provider) {
            this._viewContainer.clear();
            this._provider.refresh();
        }
    };
    OnsLazyRepeat.prototype.ngOnDestroy = function () {
        if (this._provider) {
            this._provider.destroy();
        }
        this._viewContainer.clear();
        this._provider = null;
    };
    OnsLazyRepeat.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[onsLazyRepeat]'
                },] },
    ];
    /** @nocollapse */
    OnsLazyRepeat.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.TemplateRef, },
        { type: core_1.ViewContainerRef, },
    ]; };
    OnsLazyRepeat.propDecorators = {
        'onsLazyRepeatOf': [{ type: core_1.Input },],
    };
    return OnsLazyRepeat;
}());
exports.OnsLazyRepeat = OnsLazyRepeat;
//# sourceMappingURL=ons-lazy-repeat.js.map