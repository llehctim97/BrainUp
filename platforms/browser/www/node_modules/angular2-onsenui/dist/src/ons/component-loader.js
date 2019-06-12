"use strict";
var core_1 = require('@angular/core');
var ComponentLoader = (function () {
    function ComponentLoader(appRef) {
        this.appRef = appRef;
    }
    // Load an instance of ComponentRef in app view.
    ComponentLoader.prototype.load = function (componentRef) {
        var _this = this;
        var rootElement = componentRef.location.nativeElement;
        if (this.appRef['attachView']) {
            // angular2.3.x has `attachView` and `detachView` methods.
            this.appRef['attachView'](componentRef.hostView);
            componentRef.onDestroy(function () {
                _this.appRef['detachView'](componentRef.hostView);
                if (rootElement.parentNode) {
                    rootElement.parentNode.removeChild(rootElement);
                }
            });
        }
        else {
            if (this.appRef['registerChangeDetector']) {
                this.appRef['registerChangeDetector'](componentRef.changeDetectorRef);
            }
            componentRef.onDestroy(function () {
                if (_this.appRef['unregisterChangeDetector']) {
                    _this.appRef['unregisterChangeDetector'](componentRef.changeDetectorRef);
                }
                if (rootElement.parentNode) {
                    rootElement.parentNode.removeChild(rootElement);
                }
            });
        }
        var rootContainer = this.appRef['_rootComponents'][0].location.nativeElement;
        rootContainer.appendChild(rootElement);
    };
    ComponentLoader.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ComponentLoader.ctorParameters = function () { return [
        { type: core_1.ApplicationRef, },
    ]; };
    return ComponentLoader;
}());
exports.ComponentLoader = ComponentLoader;
//# sourceMappingURL=component-loader.js.map