"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
window['ons'] = require('node_modules/onsenui/js/onsenui.js');
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./app.module");
var core_1 = require("@angular/core");
core_1.enableProdMode();
var platform = platform_browser_dynamic_1.platformBrowserDynamic();
if (window.cordova !== undefined)
    document.addEventListener('deviceready', init.bind(this));
else
    init();
//platform.bootstrapModule(AppModule);
ons.forcePlatformStyling("android"); // For online questionnaire
function init() {
    platform.bootstrapModule(app_module_1.AppModule);
}
/*
let onDeviceReady = () => {
  platformBrowserDynamic().bootstrapModule(AppModule);
};

document.addEventListener('deviceready', onDeviceReady, false);
*/
//# sourceMappingURL=main.js.map