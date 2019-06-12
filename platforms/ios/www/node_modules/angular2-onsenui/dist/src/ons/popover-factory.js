"use strict";
var core_1 = require('@angular/core');
var params_1 = require('./params');
var component_loader_1 = require('./component-loader');
/**
 * @object PopoverFactory
 */
var PopoverFactory = (function () {
    function PopoverFactory(_injector, _resolver, _appRef, _componentLoader, _zone) {
        this._injector = _injector;
        this._resolver = _resolver;
        this._appRef = _appRef;
        this._componentLoader = _componentLoader;
        this._zone = _zone;
    }
    PopoverFactory.prototype.createPopover = function (componentType, params) {
        var _this = this;
        if (params === void 0) { params = {}; }
        return new Promise(function (resolve) {
            setImmediate(function () {
                _this._zone.run(function () {
                    var factory = _this._resolver.resolveComponentFactory(componentType);
                    var injector = core_1.ReflectiveInjector.resolveAndCreate([
                        { provide: params_1.Params, useValue: new params_1.Params(params) }
                    ], _this._injector);
                    var componentRef = factory.create(injector);
                    var rootElement = componentRef.location.nativeElement;
                    _this._componentLoader.load(componentRef);
                    var element = rootElement.children[0];
                    var popoverElement = element.tagName === 'ONS-POPOVER' ? element : element.querySelector('ons-popover');
                    if (!popoverElement) {
                        throw Error('<ons-popover> element is not found in component\'s template.');
                    }
                    resolve({ popover: popoverElement, destroy: function () { return componentRef.destroy(); } });
                });
            });
        });
    };
    PopoverFactory.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    PopoverFactory.ctorParameters = function () { return [
        { type: core_1.Injector, },
        { type: core_1.ComponentFactoryResolver, },
        { type: core_1.ApplicationRef, },
        { type: component_loader_1.ComponentLoader, },
        { type: core_1.NgZone, },
    ]; };
    return PopoverFactory;
}());
exports.PopoverFactory = PopoverFactory;
//# sourceMappingURL=popover-factory.js.map