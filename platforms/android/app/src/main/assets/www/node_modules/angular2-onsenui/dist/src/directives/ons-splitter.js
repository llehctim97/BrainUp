"use strict";
var core_1 = require('@angular/core');
var params_1 = require('../ons/params');
/**
 * @element ons-splitter-side
 * @directive OnsSplitterSide
 * @selector ons-splitter-side
 * @description
 *   [ja]`<ons-splitter-side>`要素のAngular 2ディレクティブです。[/ja]
 *   [en]Angular 2 directive for `<ons-splitter-side>` component.[/en]
 * @example
 *   @Component({
 *     selector: 'ons-page',
 *     template: `
 *       <ons-toolbar>
 *         <div class="center">Left Page</div>
 *       </ons-toolbar>
 *       <div class="background"></div>
 *       <div class="content">
 *         Left
 *       </div>
 *     `
 *   })
 *   class SidePageComponent { }
 *
 *   @Component({
 *     selector: 'app',
 *     template: `
 *     <ons-splitter>
 *       <ons-splitter-side [page]="sidePage" side="left" width="200px">
 *       </ons-splitter-side>
 *       <ons-splitter-content>...</ons-splitter-content>
 *     </ons-splitter>
 *     `
 *   })
 *   export class AppComponent {
 *     sidePage = SidePageComponent;
 *   }
 */
var OnsSplitterSide = (function () {
    function OnsSplitterSide(_elementRef, _viewContainer, _resolver, _injector, _zone) {
        this._elementRef = _elementRef;
        this._viewContainer = _viewContainer;
        this._resolver = _resolver;
        this._injector = _injector;
        this._zone = _zone;
        this.element.pageLoader = this._createPageLoader();
    }
    Object.defineProperty(OnsSplitterSide.prototype, "page", {
        /**
         * @input page
         * @type {Type<any>}
         * @desc
         *   [en]Page content.[/en]
         *   [ja]表示するページコンポーネントのクラスを指定します。[/en]
         */
        set: function (page) {
            this.element.page = page;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OnsSplitterSide.prototype, "element", {
        get: function () {
            return this._elementRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    OnsSplitterSide.prototype._createPageLoader = function () {
        var _this = this;
        var componentRefMap = new WeakMap();
        return new ons.PageLoader(function (_a, done) {
            var page = _a.page, parent = _a.parent, params = _a.params;
            _this._zone.run(function () {
                var injector = core_1.ReflectiveInjector.resolveAndCreate([
                    { provide: params_1.Params, useValue: new params_1.Params(params || {}) },
                    { provide: OnsSplitterSide, useValue: _this }
                ], _this._injector);
                var factory = _this._resolver.resolveComponentFactory(page);
                var pageComponentRef = _this._viewContainer.createComponent(factory, 0, injector);
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
    OnsSplitterSide.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'ons-splitter-side'
                },] },
    ];
    /** @nocollapse */
    OnsSplitterSide.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.ViewContainerRef, },
        { type: core_1.ComponentFactoryResolver, },
        { type: core_1.Injector, },
        { type: core_1.NgZone, },
    ]; };
    OnsSplitterSide.propDecorators = {
        'page': [{ type: core_1.Input, args: ['page',] },],
    };
    return OnsSplitterSide;
}());
exports.OnsSplitterSide = OnsSplitterSide;
/**
 * @element ons-splitter-content
 * @directive OnsSplitterContent
 * @selector ons-splitter-content
 * @description
 *    [ja]`<ons-splitter-content>`要素のためのAngular2 ディレクティブです。[/ja]
 *    [en]Angular 2 directive for `<ons-splitter-content>` component.[/en]
 */
var OnsSplitterContent = (function () {
    function OnsSplitterContent(_elementRef, _viewContainer, _resolver, _injector) {
        this._elementRef = _elementRef;
        this._viewContainer = _viewContainer;
        this._resolver = _resolver;
        this._injector = _injector;
        this.element.pageLoader = this._createPageLoader();
    }
    Object.defineProperty(OnsSplitterContent.prototype, "page", {
        /**
         * @input page
         * @type {Type<any>}
         * @desc
         *   [en]Specify the page component.[/en]
         *   [ja]表示するページコンポーネントのクラスを指定します。[/en]
         */
        set: function (page) {
            this.element.page = page;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OnsSplitterContent.prototype, "element", {
        get: function () {
            return this._elementRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    OnsSplitterContent.prototype._createPageLoader = function () {
        var _this = this;
        var componentRefMap = new WeakMap();
        return new ons.PageLoader(function (_a, done) {
            var page = _a.page, parent = _a.parent, params = _a.params;
            var injector = core_1.ReflectiveInjector.resolveAndCreate([
                { provide: params_1.Params, useValue: new params_1.Params(params || {}) },
                { provide: OnsSplitterContent, useValue: _this }
            ], _this._injector);
            var factory = _this._resolver.resolveComponentFactory(page);
            var pageComponentRef = _this._viewContainer.createComponent(factory, 0, injector);
            var pageElement = pageComponentRef.location.nativeElement;
            componentRefMap.set(pageElement, pageComponentRef);
            _this.element.appendChild(pageElement); // dirty fix to insert in correct position
            done(pageElement);
        }, function (element) {
            if (componentRefMap.has(element)) {
                componentRefMap.get(element).destroy();
                componentRefMap.delete(element);
            }
        });
    };
    OnsSplitterContent.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'ons-splitter-content'
                },] },
    ];
    /** @nocollapse */
    OnsSplitterContent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.ViewContainerRef, },
        { type: core_1.ComponentFactoryResolver, },
        { type: core_1.Injector, },
    ]; };
    OnsSplitterContent.propDecorators = {
        'page': [{ type: core_1.Input, args: ['page',] },],
    };
    return OnsSplitterContent;
}());
exports.OnsSplitterContent = OnsSplitterContent;
//# sourceMappingURL=ons-splitter.js.map