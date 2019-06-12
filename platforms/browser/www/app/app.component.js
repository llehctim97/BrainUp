"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nback_component_1 = require("./nback.component");
var dataService_1 = require("./dataService");
var AppComponent = /** @class */ (function () {
    function AppComponent(dataService) {
        this.page = null;
        this.instance = null;
        this.dataService = null;
        this.instance = this;
        this.dataService = dataService;
        // Enable the line below to clear all settings, this will trigger the questionnaire again.
        //dataService.clearSettings();
        dataService.saveEvent('app_opened');
        this.gotoPage(nback_component_1.SplashScreen, null);
        /*dataService.getSetting("isIntroCompleted").then((result) => {
          if (result && result.settingValue == 1) {
            console.log('nback config')
            this.gotoPage(WelcomeScreen, null);
          }
          else {
            console.log('questionnaire intro')
            this.gotoPage(QuestionnaireIntro, null)
          }
    
        });*/
    }
    AppComponent.prototype.gotoPage = function (subpage, data) {
        this.page = {
            component: subpage,
            inputs: {
                parent: this,
                data: data
            }
        };
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            providers: [dataService_1.DataService],
            template: "<div id=\"overlay\"></div>\n             <dynamic-component [componentData]=\"page\" [parent]=\"instance\"></dynamic-component>"
        }),
        __metadata("design:paramtypes", [dataService_1.DataService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
var DynamicComponent = /** @class */ (function () {
    function DynamicComponent(resolver) {
        this.resolver = resolver;
        this.currentComponent = null;
    }
    Object.defineProperty(DynamicComponent.prototype, "componentData", {
        // component: Class for the component you want to create
        // inputs: An object with key/value pairs mapped to input name/input value
        set: function (data) {
            if (!data) {
                return;
            }
            // Inputs need to be in the following format to be resolved properly
            var inputProviders = Object.keys(data.inputs).map(function (inputName) { return { provide: inputName, useValue: data.inputs[inputName] }; });
            var resolvedInputs = core_1.ReflectiveInjector.resolve(inputProviders);
            // We create an injector out of the data we want to pass down and this components injector
            var injector = core_1.ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);
            // We create a factory out of the component we want to create
            var factory = this.resolver.resolveComponentFactory(data.component);
            // We create the component using the factory and the injector
            var component = factory.create(injector);
            // We insert the component into the dom container
            this.dynamicComponentContainer.insert(component.hostView);
            // Destroy the previously created component
            if (this.currentComponent) {
                this.currentComponent.destroy();
            }
            this.currentComponent = component;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ViewChild('dynamicComponentContainer', { read: core_1.ViewContainerRef }),
        __metadata("design:type", core_1.ViewContainerRef)
    ], DynamicComponent.prototype, "dynamicComponentContainer", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DynamicComponent.prototype, "componentData", null);
    DynamicComponent = __decorate([
        core_1.Component({
            selector: 'dynamic-component',
            template: "<div #dynamicComponentContainer></div>\n  ",
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], DynamicComponent);
    return DynamicComponent;
}());
exports.DynamicComponent = DynamicComponent;
//# sourceMappingURL=app.component.js.map