"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var angular2_onsenui_1 = require("angular2-onsenui");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var questionnaire_component_1 = require("./questionnaire.component");
var localDataService_1 = require("./localDataService");
var participantService_1 = require("./participantService");
var nback_component_1 = require("./nback.component");
var cordovaService_1 = require("./cordovaService");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                angular2_onsenui_1.OnsenModule,
                http_1.HttpModule
            ],
            declarations: [
                app_component_1.AppComponent,
                app_component_1.DynamicComponent,
                questionnaire_component_1.QuestionnaireIntro,
                questionnaire_component_1.ExitApp,
                questionnaire_component_1.CloseApp,
                questionnaire_component_1.QuestionnaireSelectGender,
                questionnaire_component_1.QuestionnairePage,
                questionnaire_component_1.CoachComponent,
                //ParticipantService,
                nback_component_1.WelcomeScreen,
                nback_component_1.SplashScreen,
                nback_component_1.ConsentScreen,
                nback_component_1.SurveyCode,
                nback_component_1.NBackInformation,
                nback_component_1.NBackConfiguration,
                nback_component_1.NBackGame,
                nback_component_1.NBackResults
            ],
            entryComponents: [
                app_component_1.DynamicComponent,
                questionnaire_component_1.ExitApp,
                questionnaire_component_1.CloseApp,
                questionnaire_component_1.QuestionnaireIntro,
                questionnaire_component_1.QuestionnaireSelectGender,
                questionnaire_component_1.QuestionnairePage,
                questionnaire_component_1.CoachComponent,
                nback_component_1.WelcomeScreen,
                nback_component_1.SplashScreen,
                nback_component_1.ConsentScreen,
                nback_component_1.SurveyCode,
                nback_component_1.NBackInformation,
                nback_component_1.NBackConfiguration,
                nback_component_1.NBackGame,
                nback_component_1.NBackResults
            ],
            providers: [
                cordovaService_1.CordovaService,
                localDataService_1.LocalDataService,
                participantService_1.ParticipantService
            ],
            bootstrap: [
                app_component_1.AppComponent
            ],
            schemas: [
                core_1.CUSTOM_ELEMENTS_SCHEMA
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//platformBrowserDynamic().bootstrapModule(AppModule);
//# sourceMappingURL=app.module.js.map