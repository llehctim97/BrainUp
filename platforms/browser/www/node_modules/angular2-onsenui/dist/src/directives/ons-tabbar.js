"use strict";
var core_1 = require('@angular/core');
/**
 * @element ons-tab
 * @directive OnsTab
 * @selector ons-tab
 * @description
 *   [en]Angular 2 directive for `<ons-tab>` component.[/en]
 *   [ja]`<ons-tab>`要素のためのディレクティブです。[/ja]
 * @example
 *   @Component({
 *     selector: 'ons-page',
 *     template: `
 *       <ons-toolbar>
 *         <div class="center">Page</div>
 *       </ons-toolbar>
 *       <div class="content">...</div>
 *     `
 *   })
 *   class PageComponent {
 *   }
 *
 *   @Component({
 *     selector: 'app',
 *     template: `
 *     <ons-tabbar>
 *       <div class="tab-bar__content"></div>
 *       <div class="tab-bar">
 *         <ons-tab label="Page1" icon="ion-home" [page]="page" active></ons-tab>
 *         <ons-tab label="Page2" icon="ion-help" [page]="page"></ons-tab>
 *         <ons-tab label="Page3" icon="ion-stop" [page]="page"></ons-tab>
 *       </div>
 *     </ons-tabbar>
 *     `
 *   })
 *   export class AppComponent {
 *     page = PageComponent
 *   }
 */
var OnsTab = (function () {
    function OnsTab(_elementRef, _viewContainer, _resolver, _zone) {
        this._elementRef = _elementRef;
        this._viewContainer = _viewContainer;
        this._resolver = _resolver;
        this._zone = _zone;
        this._pageComponent = null;
        // set up ons-tab's page loader
        this._elementRef.nativeElement.pageLoader = this._createPageLoader();
    }
    Object.defineProperty(OnsTab.prototype, "page", {
        /**
         * @input page
         * @type {Type<any>}
         * @desc
         *   [en]Specify the page component that is displayed when the tab is active.[/en]
         *   [ja]読み込むページコンポーネントを指定します。[/ja]
         */
        set: function (pageComponentType) {
            this._elementRef.nativeElement.page = pageComponentType;
        },
        enumerable: true,
        configurable: true
    });
    OnsTab.prototype._createPageLoader = function () {
        var _this = this;
        var PageLoader = ons.PageLoader;
        return new PageLoader(function (_a, done) {
            var page = _a.page, parent = _a.parent;
            _this._zone.run(function () {
                var factory = _this._resolver.resolveComponentFactory(page);
                var pageComponentRef = _this._viewContainer.createComponent(factory, 0);
                if (_this._pageComponent) {
                    _this._pageComponent.destroy();
                }
                _this._pageComponent = pageComponentRef;
                var pageElement = pageComponentRef.location.nativeElement;
                parent.appendChild(pageElement); // dirty fix to insert in correct position
                done(pageElement);
            });
        }, function () {
            if (_this.hasOwnProperty('_pageComponent')) {
                _this._pageComponent.destroy();
                _this._pageComponent = null;
            }
        });
    };
    OnsTab.prototype.ngOnDestroy = function () {
        if (this._pageComponent) {
            this._pageComponent.destroy();
            this._pageComponent = null;
        }
    };
    OnsTab.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'ons-tab'
                },] },
    ];
    /** @nocollapse */
    OnsTab.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.ViewContainerRef, },
        { type: core_1.ComponentFactoryResolver, },
        { type: core_1.NgZone, },
    ]; };
    OnsTab.propDecorators = {
        'page': [{ type: core_1.Input, args: ['page',] },],
    };
    return OnsTab;
}());
exports.OnsTab = OnsTab;
//# sourceMappingURL=ons-tabbar.js.map