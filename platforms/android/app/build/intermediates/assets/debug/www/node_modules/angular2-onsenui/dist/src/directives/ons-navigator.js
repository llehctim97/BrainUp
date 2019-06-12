"use strict";
var core_1 = require('@angular/core');
var params_1 = require('../ons/params');
var NavigatorPage = (function () {
    function NavigatorPage(elementRef, destroy, animator, params) {
        if (elementRef === void 0) { elementRef = null; }
        if (destroy === void 0) { destroy = function () { }; }
        if (animator === void 0) { animator = null; }
        if (params === void 0) { params = new params_1.Params(); }
        this.elementRef = elementRef;
        this.destroy = destroy;
        this.animator = animator;
        this.params = params;
    }
    return NavigatorPage;
}());
exports.NavigatorPage = NavigatorPage;
/**
 * @element ons-navigator
 * @directive OnsNavigator
 * @selector ons-navigator
 * @codpen KgvAvx
 * @description
 *   [en]Angular 2 directive for `<ons-navigator>` component.[/en]
 *   [ja]`<ons-navigator>`要素のAngular 2ディレクティブです。[/ja]
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
 *   class DefaultPageComponent { }
 *
 *   @Component({
 *     selector: 'navigator-app',
 *     template: `
 *     <ons-navigator [page]="page"></ons-navigator>
 *     `
 *   })
 *   export class AppComponent {
 *     page = DefaultPageComponent
 *   }
 */
var OnsNavigator = (function () {
    function OnsNavigator(_elementRef, _resolver, _viewContainer, _injector, _zone) {
        this._elementRef = _elementRef;
        this._resolver = _resolver;
        this._viewContainer = _viewContainer;
        this._injector = _injector;
        this._zone = _zone;
        this._lastPageLoader = this.element.pageLoader;
        this.element.pageLoader = this._createPageLoader();
    }
    Object.defineProperty(OnsNavigator.prototype, "pageComponentType", {
        /**
         * @input page
         * @type {Type<any>}
         * @desc
         *   [en]Type of the page component.[/en]
         *   [ja]ページコンポーネントのクラスを指定します。[/ja]
         */
        set: function (page) {
            this.element.page = page;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OnsNavigator.prototype, "element", {
        get: function () {
            return this._elementRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    OnsNavigator.prototype._createPageLoader = function () {
        var _this = this;
        var componentRefMap = new WeakMap();
        return new ons.PageLoader(function (_a, done) {
            var page = _a.page, parent = _a.parent, params = _a.params;
            _this._zone.run(function () {
                var pageParams = new params_1.Params(params || {});
                var injector = core_1.ReflectiveInjector.resolveAndCreate([
                    { provide: params_1.Params, useValue: pageParams },
                    { provide: OnsNavigator, useValue: _this }
                ], _this._injector);
                var factory = _this._resolver.resolveComponentFactory(page);
                var selector = 'ons-navigator';
                var pageComponentRef = factory.create(injector, null);
                _this._viewContainer.insert(pageComponentRef.hostView);
                var pageElement = pageComponentRef.location.nativeElement;
                componentRefMap.set(pageElement, pageComponentRef);
                _this.element.appendChild(pageElement); // dirty fix to insert in correct position
                done(pageElement);
            });
        }, function (element) {
            if (componentRefMap.has(element)) {
                componentRefMap.get(element).destroy();
                componentRefMap.delete(element);
            }
        });
    };
    OnsNavigator.prototype.ngOnDestroy = function () {
        this.element.pageLoader = this._lastPageLoader;
    };
    OnsNavigator.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'ons-navigator'
                },] },
    ];
    /** @nocollapse */
    OnsNavigator.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.ComponentFactoryResolver, },
        { type: core_1.ViewContainerRef, },
        { type: core_1.Injector, },
        { type: core_1.NgZone, },
    ]; };
    OnsNavigator.propDecorators = {
        'pageComponentType': [{ type: core_1.Input, args: ['page',] },],
    };
    return OnsNavigator;
}());
exports.OnsNavigator = OnsNavigator;
//# sourceMappingURL=ons-navigator.js.map