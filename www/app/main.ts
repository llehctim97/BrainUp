window['ons'] = require('node_modules/onsenui/js/onsenui.js');

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import { enableProdMode } from '@angular/core';

enableProdMode();
const platform = platformBrowserDynamic();

declare var window : any;

if (window.cordova !== undefined)
  document.addEventListener('deviceready', init.bind(this));
else
	init();

//platform.bootstrapModule(AppModule);

ons.forcePlatformStyling("android"); // For online questionnaire

function init() {
	platform.bootstrapModule(AppModule);	
}
/*
let onDeviceReady = () => {
  platformBrowserDynamic().bootstrapModule(AppModule);
};

document.addEventListener('deviceready', onDeviceReady, false);
*/
