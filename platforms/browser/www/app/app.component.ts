import {Component, Input, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver} from '@angular/core';  
import { QuestionnaireIntro } from './questionnaire.component';
import { SplashScreen } from './nback.component';
import { WelcomeScreen } from './nback.component';
import { DataService } from './dataService';
import { Params } from 'angular2-onsenui';

@Component({
  selector: 'my-app',
  providers: [DataService],
  template: `<div id="overlay"></div>
             <dynamic-component [componentData]="page" [parent]="instance"></dynamic-component>`
})

export class AppComponent { 
  page = null;
  instance = null;
  dataService = null;
 
  constructor(dataService: DataService) {
    this.instance = this;
    this.dataService = dataService;

    // Enable the line below to clear all settings, this will trigger the questionnaire again.
    //dataService.clearSettings();

    dataService.saveEvent('app_opened');
    this.gotoPage(SplashScreen, null)
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

  gotoPage(subpage, data) {
    this.page = {
      component: subpage,
      inputs: {
        parent: this,
        data: data
      }
    };      
  }
}

@Component({
  selector: 'dynamic-component',
  template: `<div #dynamicComponentContainer></div>
  `,
})

export class DynamicComponent {  
  currentComponent = null;

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {

  }

  // component: Class for the component you want to create
  // inputs: An object with key/value pairs mapped to input name/input value
  @Input() set componentData(data: {component: any, inputs: any }) {
    if (!data) {
      return;
    }

    // Inputs need to be in the following format to be resolved properly
    let inputProviders = Object.keys(data.inputs).map((inputName) => {return {provide: inputName, useValue: data.inputs[inputName]};});
    let resolvedInputs = ReflectiveInjector.resolve(inputProviders);

    // We create an injector out of the data we want to pass down and this components injector
    let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);

    // We create a factory out of the component we want to create
    let factory = this.resolver.resolveComponentFactory(data.component);

    // We create the component using the factory and the injector
    let component = factory.create(injector);

    // We insert the component into the dom container
    this.dynamicComponentContainer.insert(component.hostView);

    // Destroy the previously created component
    if (this.currentComponent) {
      this.currentComponent.destroy();
    }

    this.currentComponent = component;
  }
}