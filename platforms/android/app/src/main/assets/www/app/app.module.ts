import { OnsenModule } from 'angular2-onsenui';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent, DynamicComponent }	 from './app.component';
import { CloseApp, ExitApp, QuestionnaireIntro, QuestionnaireSelectGender, QuestionnairePage, CoachComponent } from './questionnaire.component';
import { LocalDataService } from './localDataService';
import { ParticipantService } from './participantService';
import { ConsentScreen, SplashScreen, WelcomeScreen, NBackInformation, NBackConfiguration, NBackGame, NBackResults, SurveyCode } from './nback.component';
import { CordovaService} from './cordovaService';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@NgModule({
  imports: [ 
	BrowserModule, 
  FormsModule,
	OnsenModule,
  HttpModule
  ],
  declarations: [
  	AppComponent,
    DynamicComponent,
    QuestionnaireIntro,
    ExitApp,
    CloseApp,
    QuestionnaireSelectGender,
    QuestionnairePage,
    CoachComponent,
    //ParticipantService,
    WelcomeScreen,
    SplashScreen,
    ConsentScreen,
    SurveyCode,
    NBackInformation,
    NBackConfiguration,
    NBackGame,
    NBackResults
  ],
  entryComponents: [
    DynamicComponent,
    ExitApp,
    CloseApp,
    QuestionnaireIntro,
    QuestionnaireSelectGender,
    QuestionnairePage,
    CoachComponent,
    WelcomeScreen,
    SplashScreen,
    ConsentScreen,
    SurveyCode,
    NBackInformation,
    NBackConfiguration,
    NBackGame,
    NBackResults
  ],
  providers: [
    CordovaService,
    LocalDataService,
    ParticipantService
  ],
  bootstrap: [ 
  	AppComponent
  ],
  schemas: [ 
  	CUSTOM_ELEMENTS_SCHEMA 
  ]
})

export class AppModule { }

//platformBrowserDynamic().bootstrapModule(AppModule);