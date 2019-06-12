
import { Component, Input, Injector } from '@angular/core';
import { DataService } from './dataService';
import { CordovaService } from './cordovaService';
import { HairstyleService, GlassesService, BodyService, FaceService, ShirtService, PantsService, ShoesService, WatchService, OutfitService } from './questionnaireItemServices';
import { NBackInformation, NBackConfiguration, WelcomeScreen, SurveyCode } from './nback.component';


declare var cordova : any;

@Component({
  selector: 'ons-page',
  providers: [DataService, HairstyleService, GlassesService, ShirtService, PantsService, ShoesService, WatchService, OutfitService],
  template: `
    <ons-toolbar>
      <div class="center" style="display: flex">
        <div class="toolbar_percentage">0%</div>
        <!-- Onsen comes with a toolbar but we use our own for now.. @TODO: style this for iOS -->
        <div class="toolbar_progress">
          <div class="toolbar_progress_fill" [style.width.%]="progress"></div>
        </div>
        <div class="toolbar_percentage">100%</div> 
      </div>    
    </ons-toolbar>  
    <div class="content"  style="font-size:24px">
      <div class="intro_text" [innerHTML]="data.pages[data.current_page_id].text_top"></div><br /><br />

      <div class="demographics">        
        <!--<div class="input_label">Geslacht</div>-->
        <ons-input float type="radio" name="gender_select" (change)="setGender(0)" [checked]="data.participant.gender_id == 0"></ons-input> Man
        <ons-input float type="radio" name="gender_select" (change)="setGender(1)" [checked]="data.participant.gender_id == 1" style="margin-left: 32px"></ons-input> Vrouw

        <br /><br />
        <!--<div class="input_label">Leeftijd</div>-->
        <ons-input placeholder="Voer u leeftijd in" type="number" (keyup)="ageChange()" [(value)]="data.participant.age"></ons-input><br /><br /><br />
        <!--
         <label> We will remind you about playing the game through push notifications (short messages sent to you on your device). Please set up a convenient for you time for these messages.<br /><br /></label> 
         <ons-select id="choose-sel" (change)="setTime()" >
            <option value="null" >Please choose a time</option>
            <option value="08:00" >Ochtend - 08:00</option>
            <option value="13:00" >Middag - 14:00</option>
            <option value="20:00" >Avond - 20:00</option>
         </ons-select> 
         --> 
       </div>
       <br />
      <div class="buttons" style="text-align: left">
        <ons-button (click)="next()" [disabled]="!done">Volgende</ons-button>
      </div>
      <br />
      <br />
    </div>
  `
})

export class QuestionnaireIntro {

  private time_started;
  private data;
  private progress = 0;
  private done = false; 
  private parent;
  private dataService;
  private persProfile;
  private isAuthority = false;
 

  constructor(injector: Injector, dataService: DataService, cordovaService: CordovaService, hairstyleService: HairstyleService, glassesService: GlassesService, shirtService: ShirtService, pantsService: PantsService, shoesService: ShoesService, watchService: WatchService, outfitService: OutfitService) {
    this.time_started = new Date();

    this.parent = injector.get('parent');

    this.data = injector.get('data');

    var self = this;
     
    if (this.data == null) {

      this.data = {
        current_page_id: 0,
        token: '',

        pages: [
          {
            page_id: 'coach_intro',
            text_top: '<h1>Welkom!</h1> Geweldig om te zien dat je aan de hersentraining begint. <br /> Om je op weg te helpen, vragen we je om je persoonlijke gegevens in te vullen: <br /> ',
            time_on_task: 0
          },
          {
            page_id: 'coach_gender',
            text_top: '<h1> Inleiding </h1> Voordat u begint, zou ik willen dat u uw virtuele assistent kiest. De assistent helpt je bij het navigeren door het spel. Ik wil graag de app persoonlijker maken voor u, daarom kunt u kiezen hoe deze virtuele assistent eruit zal zien. Om het nog meer op maat voor u te maken, zal de assistent u enkele vragen stellen. <br /> <br /> ',
            time_on_task: 0
          },
          {
            page_id: 'coach_hairstyle',
            text_top: '<h1>Kies uw coach\'s kapsel</h1>Selecteer het kapsel dat u het beste bevalt.<br /><br />',
            items: hairstyleService.getAllHairstyles(),
            onItemChange: function(data, value) { data.coach.hairstyle_id = value; },
            selected_item: -1,
            time_on_task: 0,
            isCoachVisible: false
          },
          {
            page_id: 'coach_talking',
            text_top: '<br /><span class="green">Hallo!</span><br />Mijn naam is Alex, aangenaam kennis te maken!<br />Het zou fijn zijn als ik hulp kan krijgen bij het selecteren van de outfit en accessoires die ik tijdens het spel zal dragen. ',
            coach_talking: true,
            time_on_task: 0
          },
          {
            page_id: 'coach_glasses',
            text_top: '<h1>Kies de bril voor je coach</h1>Selecteer de bril die u het beste bevalt.',
            items: glassesService.getAllGlasses(),
            onItemChange: function(data, value) { data.coach.glasses_id = value; },
            selected_item: -1,
            time_on_task: 0
          },
          {
            page_id: 'question_consent_1',
            text_top: 'Ik heb gehoord dat veel mensen het fijn vinden als anderen hun helpen bij het kiezen van accessoires. <br /> Hoe vaak reken je op de hulp van andere mensen om te weten wat je moet doen? ',
            likert: [
              'Nooit',
              'Heel zelden',
              'Zelden',
              'Neutraal',
              'Vaak',
              'Erg vaak',
              'Altijd'
            ],          
            selected_item: -1,
            time_on_task: 0,
            onItemChange: function(data, value) { data.persuasion_profile.consensus.q1 = value; }
          },
          {
            page_id: 'question_consent_2',
            text_top: 'Naast het vragen om hulp, hoe belangrijk is het voor jou om in een groep te passen? ',
            likert: [
              'Extreem onbelangrijk',
              'Erg onbelangrijk',
              'Onbelangrijk',
              'Neutraal',
              'Belangrijk',
              'Erg belangrijk',
              'Extreem belangrijk'
            ],
            selected_item: -1,
            time_on_task: 0,
            onItemChange: function(data, value) { data.persuasion_profile.consensus.q2 = value; }
          },
          {
            page_id: 'coach_shirt',
            text_top: '<h1> Kies het t-shirt voor je coach </h1> Selecteer het t-shirt dat je het leukst vindt. ',
            items: shirtService.getAllShirts(),
            onItemChange: function(data, value) { data.coach.shirt_id = value; },
            selected_item: -1,
            time_on_task: 0
          },
          {
            page_id: 'question_authority_1',
            text_top: 'Eens heb ik tips gekregen van een modeontwerper over hoe je je moet kleden. <br /> Hoe vaak volg je het advies van experts? ',
            likert: [
              'Nooit',
              'Heel zelden',
              'Zelden',
              'Neutraal',
              'Vaak',
              'Erg vaak',
              'Altijd'
            ],
            selected_item: -1,
            time_on_task: 0,
            onItemChange: function(data, value) { data.persuasion_profile.authority.q1 = value; }
          },        
          {
            page_id: 'question_authority_2',
            text_top: 'Oke. Stel je voor dat zowel een modeontwerper als een friend je kledingtips geven. <br /> Hoe geneigd ben je om naar het advies van de expert te luisteren in plaats van een advies van een friend?',
            likert: [
              'Niet extreem geneigd',
              'Niet erg geneigd',
              'Niet geneigd',
              'Neutraal',
              'geneigd',
              'Erg geneigd',
              'Extreem geneigd'
            ],
            selected_item: -1,
            time_on_task: 0,
            onItemChange: function(data, value) { data.persuasion_profile.authority.q2 = value; }
          },
          {
            page_id: 'coach_pants',
            text_top: '<h1> Kies de broek voor je coach </h1> Selecteer het item dat je het leukst vindt.',
            items: pantsService.getAllPants(),
            onItemChange: function(data, value) { data.coach.pants_id = value; },
            selected_item: -1,
            time_on_task: 0
          },          
          {
            page_id: 'coach_shoes',
            text_top: '<h1> Kies de schoenen voor je coach </h1> Selecteer het item dat je het leukst vindt. ',
            items: shoesService.getAllShoes(),
            onItemChange: function(data, value) { data.coach.shoes_id = value; },
            selected_item: -1,
            time_on_task: 0
          },
          {
            page_id: 'question_reciprocity_1',
            text_top: 'Stel je voor dat je schoenen online hebt gekocht en dat het pakket is afgeleverd bij het huis van je buren. Hij bracht het pakket later naar je toe. Hoe waarschijnlijk is het dat u deze gunst zou terug betalen?',
            likert: [
              'Extreem onwaarschijnlijk',
              'Erg onwaarschijnlijk',
              'Onwaarschijnlijk',
              'Neutral',
              'Waarschijnlijk',
              'Erg Waarschijnlijk',
              'Extreem Waarschijnlijk'
            ],
            selected_item: -1,            
            time_on_task: 0,
            onItemChange: function(data, value) { data.persuasion_profile.reciprocity.q1 = value; }
          },
          {
            page_id: 'question_reciprocity_2',
            text_top: 'Oke! Een andere vraag: wanneer u een geschenk ontvangt, hoe waarschijnlijk is het dat u zich verplicht voelt om een geschenk terug te sturen? ',
            likert: [
              'Extreem onwaarschijnlijk',
              'Erg onwaarschijnlijk',
              'Onwaarschijnlijk',
              'Neutral',
              'Waarschijnlijk',
              'Erg Waarschijnlijk',
              'Extreem Waarschijnlijk'
            ],
            selected_item: -1,
            time_on_task: 0,
            onItemChange: function(data, value) { data.persuasion_profile.reciprocity.q2 = value; }
          },
          {
            page_id: 'coach_watch',
            text_top: '<h1> Kies het horloge voor je coach </h1> Selecteer het item dat je het leukst vindt. ',
            items: watchService.getAllWatches(),
            onItemChange: function(data, value) { data.coach.watch_id = value; },
            selected_item: -1,
            time_on_task: 0
          },
          {
            page_id: 'question_scarcity_1',
            text_top: 'Dit horloge ziet eruit alsof het met de hand gemaakt is. Hoe vaak waardeer je op maat gemaakte producten meer dan massaproducten? ',
            likert: [
              'Nooit',
              'Heel zelden',
              'Zelden',
              'Neutraal',
              'Vaak',
              'Erg vaak',
              'Altijd'
            ],
            selected_item: -1,
            time_on_task: 0,
            onItemChange: function(data, value) { data.persuasion_profile.scarcity.q1 = value; }
          },
          {
            page_id: 'question_scarcity_2',
            text_top: 'OK! Stel je voor dat je dit horloge hebt gekocht in je favoriete winkel, die binnenkort failliet gaat. Hoe waarschijnlijk is het dat je deze winkel gaat bezoeken, omdat het je laatste kans is? ',
            likert: [
              'Extreem onwaarschijnlijk',
              'Erg onwaarschijnlijk',
              'Onwaarschijnlijk',
              'Neutral',
              'Waarschijnlijk',
              'Erg Waarschijnlijk',
              'Extreem Waarschijnlijk'
            ],
            selected_item: -1,
            time_on_task: 0,
            onItemChange: function(data, value) { data.persuasion_profile.scarcity.q2 = value; }
          },
          {
            page_id: 'question_commitment_1',
            text_top: 'Oh nee! We zijn zo bezig geweest met het kiezen van deze outfit dat ik een afspraak vergeten ben! Als dit u zou overkomen, hoe waarschijnlijk is het dat u zich zou verplichten om een vergeten afspraak goed te maken? ',
            likert: [
              'Extreem onwaarschijnlijk',
              'Erg onwaarschijnlijk',
              'Onwaarschijnlijk',
              'Neutral',
              'Waarschijnlijk',
              'Erg Waarschijnlijk',
              'Extreem Waarschijnlijk'
            ],
            selected_item: -1,
            time_on_task: 0,
            onItemChange: function(data, value) { data.persuasion_profile.commitment.q1 = value; },
            coach_timepressure: 1 /* This could be prettier by making a more general 'pose', but it's good enough for now */
          },
          {
            page_id: 'question_commitment_2',
            text_top: 'Goed om te weten! Ik heb nog een vraag voor je: hoe vaak doe je wat je beloofd hebt? ',
            likert: [
              'Nooit',
              'Heel zelden',
              'Zelden',
              'Neutraal',
              'Vaak',
              'Erg vaak',
              'Altijd'
            ],
            selected_item: -1,
            time_on_task: 0,
            onItemChange: function(data, value) 
              { 
                data.persuasion_profile.commitment.q2 = value; 
                this.checkIfMaxScoreIsComputed;
              }
          },
          {
            page_id: 'coach_profession',
            text_top: '<h1> Kies een functie voor je coach </h1> Selecteer het beroep dat je het leukst vindt. ',
            items: outfitService.getAllOutfits(this.isAuthority),            
            onItemChange: function(data, value) { data.coach.profession_id = value; },
            selected_item: -1,
            time_on_task: 0
          },
          {
            page_id: 'final_page',
            final_page: true,
            time_on_task: 0
          }        
        ],

        coach: {
          gender_id: -1,
          hairstyle_id: -1,
          glasses_id: -1,
          shirt_id: -1,
          pants_id: -1,
          shoes_id: -1,
          watch_id: -1,
          profession_id: -1
        },

        persuasion_profile: {
          consensus: {
            q1: 0,
            q2: 0
          },
          authority: {
            q1: 0,
            q2: 0          
          },
          likability: {
            q1: 0,
            q2: 0          
          },
          reciprocity: {
            q1: 0,
            q2: 0          
          },
          scarcity: {
            q1: 0,
            q2: 0          
          },
          commitment: {
            q1: 0,
            q2: 0
          }
        },

        participant: {
          gender_id: -1,
          reminder_time: "",
          age: "",
          code:""
        }
      };


      // Get a token
      // @TODO: at some point this will become a HTTPS cordova thing with pinned certificate?
      // @TODO: this needs to move to where syncing is happening
      /*participantService.getToken()
        .then((token) => {
          this.data.token = token;
          localStorage.setItem("token", token);
        });*/
    }

    dataService.getToken().then((result) => {      
      console.log("Token is");
      console.log(result);
      console.log(result.error);
    });

    
    this.done =  this.data.participant.age != "" && this.data.participant.gender_id != -1 && this.data.participant.reminder_time != "";
    
    this.dataService = dataService;

    this.progress = Math.round(this.data.current_page_id / this.data.pages.length * 100);   

  
    dataService.getPersuasionProfile().then((result) => {      
      console.log("Pers profile is");
      console.log(result);
      console.log(result.error);
    });

      //var d = new Date();
      //d.setMinutes(d.getMinutes() + 2);
      //cordova.plugins.notification.local.schedule({
      //id: 1,
      //title: "MemoryUp",
      //text:  "Please check out new tips on how to improve your memory performance by playing a new workout. These tips have been tailored just for you.",
     // at: d    
   // });
  }
  
  checkIfMaxScoreIsComputed()
  {
    if ((this.data.persuasion_profile.commitment.q1 != null) && 
        (this.data.persuasion_profile.commitment.q2 != null) && 
        (this.data.persuasion_profile.reciprocity.q1 != null) && 
        (this.data.persuasion_profile.reciprocity.q2 != null) &&
        (this.data.persuasion_profile.consensus.q1 != null) && 
        (this.data.persuasion_profile.consensus.q2 != null) &&
        (this.data.persuasion_profile.authority.q1 != null) &&
        (this.data.persuasion_profile.authority.q2 != null) &&
        (this.data.persuasion_profile.scarcity.q1 != null) &&
        (this.data.persuasion_profile.scarcity.q1 != null))
    {
      this.computePersProfile;
      console.log('got here');
    }
    else
    {
      window.setTimeout("checkIfMaxScoreIsComputed();",100);
    }
  }

  computePersProfile() {
      var profileScores = [];

      profileScores[0] = this.data.persuasion_profile.commitment.q1 + this.data.persuasion_profile.commitment.q2;
      profileScores[1] = this.data.persuasion_profile.reciprocity.q1 + this.data.persuasion_profile.reciprocity.q2;
      profileScores[2] = this.data.persuasion_profile.consensus.q1 + this.data.persuasion_profile.consensus.q2;
      profileScores[3] = this.data.persuasion_profile.authority.q1 + this.data.persuasion_profile.authority.q2;
      profileScores[4] = this.data.persuasion_profile.scarcity.q1 + this.data.persuasion_profile.scarcity.q2;

      var max = Math.max(profileScores[0], profileScores[1], profileScores[2], profileScores[3], profileScores[4], profileScores[5]);
  }   
   

  next() {
    this.data.pages[this.data.current_page_id].time_on_task = new Date().getTime() - this.time_started.getTime();


    // Send to server

    var self = this;
    
   this.dataService.saveAnswer('participant_reminder_time', this.data.participant.reminder_time, this.data.pages[this.data.current_page_id].time_on_task)
     
    this.dataService.saveAnswer('participant_gender_id', this.data.participant.gender_id, this.data.pages[this.data.current_page_id].time_on_task)
      .then(() => {
          self.dataService.saveAnswer('participant_age', self.data.participant.age, self.data.pages[self.data.current_page_id].time_on_task)
            .then(() => {
                  self.data.current_page_id++;
                  self.parent.gotoPage(QuestionnaireSelectGender, self.data);
                  //self._navigator.element.pushPage(QuestionnaireSelectGender, {data: self.data});
                });
              
          });
  }

  setGender(value: number) {
    this.data.participant.gender_id = value;
    if (this.data.participant.age !="" && this.data.participant.gender_id != -1)
    {
      this.done = true;
    } 
    else
    {
      this.done = false;
    }
  }

  setTime()
  {
    var e = (document.getElementById("choose-sel")) as HTMLSelectElement;
    var sel = e.selectedIndex;
    var opt = e.options[sel];
    var CurValue = (<HTMLOptionElement>opt).value;
    var CurText = (<HTMLOptionElement>opt).text;
    console.log("Reminder time is");
    console.log(CurValue);
    this.data.participant.reminder_time=CurValue;
     if (this.data.participant.age !="" && this.data.participant.gender_id != -1)
    {
      this.done = true;
    } 
    else
    {
      this.done = false;
    }

  }

  ageChange() {
    //if (this.data.participant.age != "" && !isNaN(this.data.participant.age) && this.data.participant.gender_id != -1) {
     // this.done = true;
    //}
    //else {
    //  this.done = false;
    //}
    if (this.data.participant.age !="" && this.data.participant.gender_id != -1)
    {
      this.done = true;
    } 
    else
    {
      this.done = false;
    }
    console.log("new age is");
    console.log(this.data.participant.age);
  
  }
}

@Component({
  selector: 'ons-page',
  providers: [DataService],
  template: `
    <ons-toolbar>
      <div class="center" style="display: flex">
        <div class="toolbar_percentage">0%</div>
        <!-- Onsen comes with a toolbar but we use our own for now.. @TODO: style this for iOS -->
        <div class="toolbar_progress">
          <div class="toolbar_progress_fill" [style.width.%]="progress"></div>
        </div>
        <div class="toolbar_percentage">100%</div> 
      </div>
    </ons-toolbar>
    <div class="content">
        <div class="intro_text" [innerHTML]="data.pages[data.current_page_id].text_top"></div>
        <div style="text-align: center; font-weight: bold">Kies het geslacht van u coach</div>

        <div class="choice_container">
          <div class="choice_item" (click)="setCoachGender(0)" [ngClass]="{'item_selected': selected_item == 0}" style="width: calc(100%/6)">
            <img src="img/icon_male.svg"/>

            Man
          </div>
          <div class="choice_item" (click)="setCoachGender(1)" [ngClass]="{'item_selected': selected_item == 1}" style="width: calc(100%/6)">
            <img src="img/icon_female.svg"/>

            Vrouw
          </div>
        </div><br />

        <div class="buttons">
          <ons-button (click)="back()">Terug</ons-button>
          <ons-button (click)="next()" [disabled]="selected_item == -1">Volgende</ons-button>
        </div>
        <br />
        <br />
    </div>
  `
})

export class QuestionnaireSelectGender {
  
  private parent;
  private data;
  private time_started;
  private progress = 0;
  private selected_item = -1;

  private dataService: DataService;

  constructor(injector: Injector, dataService: DataService) {
    //this.data = _params.data;
    this.parent = injector.get('parent');
    this.data = injector.get('data');
    this.time_started = new Date();

    this.progress = Math.round((this.data.current_page_id + 1) / this.data.pages.length * 100);
    this.dataService = dataService;

    // This page might have been converted into a 'normal' step (with 2 items and a provider) as well.. Next time!
    this.selected_item = this.data.coach.gender_id;
  }

  next() {
    this.data.pages[this.data.current_page_id].time_on_task = new Date().getTime() - this.time_started.getTime();

    var self = this;

    // Send data to server
    this.dataService.saveAnswer('coach_gender_id', this.data.coach.gender_id, this.data.pages[this.data.current_page_id].time_on_task)
      .then(() => {
          console.log(this);
          self.data.current_page_id++;
          //self._navigator.element.pushPage(QuestionnairePage, {data: self.data});
          self.parent.gotoPage(QuestionnairePage, self.data);
      });    

  }

  back() {
    // What to do with time spent on this page? -> for now we ignore it..
    this.data.current_page_id = this.data.current_page_id - 1;
    this.parent.gotoPage(QuestionnaireIntro, this.data);
  }

  setCoachGender(value: number) {
    this.data.coach.gender_id = value;
    this.selected_item = value;
  }
}


@Component({
  selector: 'ons-page',
  providers: [DataService],
  template: `
  <ons-toolbar>
    <div class="left">
    </div>    
      <div class="center">Tot de volgende keer</div>
    </ons-toolbar>
    <div>
      <div class="content" style="text-align: center;">
          <div class="coach_container">
            <coach [coachObject]="data.coach" *ngIf="data !== null && data.coach !== null"></coach>
          </div>

          <h1>Vergeet niet om tweemaal daags te oefenen!</h1>
          Het is bekend dat lichaamsbeweging leidt tot een langer en gelukkiger leven. Dus waarom zou hetzelfde niet gelden voor oefeningen voor je hersenen? <br />
           We hopen je snel weer te zien!
      </div>
    </div>
  `
})

export class ExitApp {  
  private parent;
  private data;
  dataService = null;

  constructor(injector: Injector, dataService: DataService) 
  {
    this.parent = injector.get('parent');
    this.data = injector.get('data');
    this.dataService = dataService; 
   
    var self = this;

    if (self.data == null || self.data.coach == null) {
      dataService.getCoachObject().then(function (result) {
        if (self.data == null)
        {
          self.data = {};
        }
        
        if (result.result !== undefined)
        {
          self.data.coach = result.result;
          //self.jobID = self.data.coach.profession_id;                
        }
      });
    } 
    
    setTimeout(this.parent.gotoPage(WelcomeScreen,null), 30000);
    
  }
}
  
@Component({
  selector: 'ons-page',
  providers: [DataService],
  template: `
  <ons-toolbar>
    <div class="left">
    </div>    
      <div class="center">Tot de volgende keer</div>
    </ons-toolbar>
    <div>
      <div class="content" style="text-align: center;">
          <div class="coach_container">
            <coach [coachObject]="data.coach" *ngIf="data !== null && data.coach !== null"></coach>
          </div>

          <h1>Vergeet niet om tweemaal daags te oefenen!</h1>
          Het is bekend dat lichaamsbeweging leidt tot een langer en gelukkiger leven. Dus waarom zou hetzelfde niet gelden voor oefeningen voor je hersenen? <br />
           We hopen je snel weer te zien!
      </div>
    </div>
  `
})

export class CloseApp {  
 
  private parent;
  private data;
  dataService = null;

  constructor(injector: Injector, dataService: DataService) 
  {  
    this.parent = injector.get('parent');
    this.data = injector.get('data');
    this.dataService = dataService; 
   
    var self = this;

    if (self.data == null || self.data.coach == null) {
      dataService.getCoachObject().then(function (result) {
        if (self.data == null)
        {
          self.data = {};
        }
        
        if (result.result !== undefined)
        {
          self.data.coach = result.result;
          //self.jobID = self.data.coach.profession_id;                
        }
      });
    }   
  }
}

@Component({
  selector: 'ons-page',
  providers: [DataService],
  template: `
    <ons-toolbar>
      <div class="center" style="display: flex">
        <div class="toolbar_percentage">0%</div>
        <!-- Onsen comes with a toolbar but we use our own for now.. @TODO: style this for iOS -->
        <div class="toolbar_progress">
          <div class="toolbar_progress_fill" [style.width.%]="progress"></div>
        </div>
        <div class="toolbar_percentage">100%</div> 
      </div>
    </ons-toolbar>

    <div class="content">
      <div class="coach_talking" *ngIf="data.pages[data.current_page_id].coach_talking">
        <div class="coach_talking_inner">                  
          <coach [coachObject]="data.coach" [isIntroduction]="true"></coach>
        </div>
      </div>

      <div class="intro_text" [ngClass]="{'intro_text_margin': isCoachVisible}" [innerHTML]="data.pages[data.current_page_id].text_top" *ngIf="data.pages[data.current_page_id].likert == null && data.pages[data.current_page_id].final_page == null"></div>

      <div class="likert_container" *ngIf="data.pages[data.current_page_id].likert != null || data.pages[data.current_page_id].items != null || data.pages[data.current_page_id].final_page != null"> 
        <div class="coach_container" *ngIf="data.current_page_id > 2">
          <coach [coachObject]="data.coach" [isTimePressure]="data.pages[data.current_page_id].coach_timepressure" [objChanged]="triggerChange"></coach>
        </div>

        <div class="choice_container" [ngClass]="{'choice_container_2': isCoachVisible}" *ngIf="data.pages[data.current_page_id].items != null">
          <div class="choice_item" [ngClass]="{'item_selected': selected_item == i, 'choice_item_profession': item.profession_id != null, 'choice_item_4': data.pages[data.current_page_id].items[data.coach.gender_id].length == 4}" *ngFor="let item of data.pages[data.current_page_id].items[data.coach.gender_id]; let i = index" (click)="setItem(i)">
            <img src="{{(item.image_picker != null)?item.image_picker:item.image}}" *ngIf="item.profession_id == null" />

            <div *ngIf="item.profession_id != null" class="profession_button">
            <coach [coachObject]="data.coach" [professionId]="item.profession_id"></coach>
            <p>{{item.profession_name}}</p>
            </div>
          </div>
        </div>


        <div class="likert_content">
          <div class="likert_intro" [innerHTML]="data.pages[data.current_page_id].text_top" *ngIf="data.pages[data.current_page_id].likert != null">
          </div>

          <div class="likert_into" *ngIf="data.pages[data.current_page_id].final_page != null">
            <br /><br />
            <strong>Bedankt!</strong><br /><br />
            U heeft u virtuele assistent met succes gepersonaliseerd.<br />
          </div>

          <div class="likert_scale" *ngIf="data.pages[data.current_page_id].likert != null">
            <div class="likert_item" *ngFor="let item of data.pages[data.current_page_id].likert; let i = index">
                <ons-input float class="likert_item" type="radio" name="likert_select" (change)="setLikert(i)" [checked]="selected_item == i"></ons-input>
                {{item}}
            </div>
          </div>      
        </div>
      </div>

      <br /><br />
      <div class="buttons" [ngClass]="{'next_button_spacing': isCoachVisible && (data.pages[data.current_page_id].likert != null || data.pages[data.current_page_id].items != null)}">
        <ons-button (click)="back()" *ngIf="data.pages[data.current_page_id].final_page == null">Terug</ons-button>
        <ons-button (click)="next()" [disabled]="!done">Volgende</ons-button>
      </div>
      <br />
      <br />
    </div>
  `
})

export class QuestionnairePage {
  public persuasionProfile;
  private data;
  private time_started;
  private done = false;
  private progress = 0;
  private selected_item = -1;
  private cscode = '';
  private parent = null;
  private triggerChange = false;
  private isCoachVisible = true;

  private dataService: DataService;

  constructor(injector: Injector, dataService: DataService, cordovaService: CordovaService) {
    //this.data = _params.data;
    this.parent = injector.get('parent');
    this.data = injector.get('data');

    this.time_started = new Date();

    this.done = this.data.pages[this.data.current_page_id].coach_talking; // @TODO: does this work with null?
    this.progress = Math.round((this.data.current_page_id + 1) / this.data.pages.length * 100);
    this.dataService = dataService;

    if (this.data.pages[this.data.current_page_id].final_page != null) {
      this.done = true;

      var profileScores = [];

      var max = Math.max(profileScores[0], profileScores[1], profileScores[2], profileScores[3], profileScores[4], profileScores[5]);

      // This is how we now calculate the score for each profile for now, by simply adding up the
      // responses to the two questions (on scale 0-6).
      dataService.savePersuasionProfile({
        consensus: (profileScores[0] = this.data.persuasion_profile.consensus.q1 + this.data.persuasion_profile.consensus.q2),
        authority: (profileScores[1] = this.data.persuasion_profile.authority.q1 + this.data.persuasion_profile.authority.q2),
        likability: (profileScores[2] = this.data.persuasion_profile.likability.q1 + this.data.persuasion_profile.likability.q2),
        reciprocity: (profileScores[3] = this.data.persuasion_profile.reciprocity.q1 + this.data.persuasion_profile.reciprocity.q2),
        scarcity: (profileScores[4] = this.data.persuasion_profile.scarcity.q1 + this.data.persuasion_profile.scarcity.q2),
        commitment: (profileScores[5] = this.data.persuasion_profile.commitment.q1 + this.data.persuasion_profile.commitment.q2)
      });

      dataService.saveCoachObject(this.data.coach);

      //cordovaService.sendTag("time", this.data.participant.reminder_time);
      //console.log("tag send with data" + this.data.participant.reminder_time);


      //this.participantService.getCScode(this.data.token)
      //  .subscribe(code => this.cscode = code)



    }

    if (this.data.pages[this.data.current_page_id].selected_item != null) {
      this.selected_item = this.data.pages[this.data.current_page_id].selected_item;
      this.done = this.selected_item != -1;
    }

    if (this.data.pages[this.data.current_page_id].isCoachVisible == false) {
      this.isCoachVisible = false;
    }
  }

  next() {
    var self = this;

    if (this.data.pages[this.data.current_page_id].final_page != null) {
      this.dataService.saveSetting("isIntroCompleted", 1).then((result) => {
        console.log(result);
        self.parent.gotoPage(SurveyCode, {coach: this.data.coach});
      });            

      return;
    }

    this.data.pages[this.data.current_page_id].time_on_task = new Date().getTime() - this.time_started.getTime();


    // Send data to server
    // Check what kind of data we have
    var selectedvalue = this.selected_item; // This works for likert (0-6)

    if (this.data.pages[this.data.current_page_id].items != null) {
      selectedvalue = this.data.pages[this.data.current_page_id].items[this.data.coach.gender_id][this.selected_item].id;
    }

    if (this.data.pages[this.data.current_page_id].coach_talking) {
      // Move to next page
      this.data.current_page_id++;

      this.parent.gotoPage(QuestionnairePage, this.data);

      //this._navigator.element.pushPage(QuestionnairePage, {data: this.data})    
    }

    else {
      this.dataService.saveAnswer(this.data.pages[this.data.current_page_id].page_id, selectedvalue, this.data.pages[this.data.current_page_id].time_on_task)
        .then(() => {
          if (self.data.current_page_id < self.data.pages.length) {
            // Move to next page
            self.data.current_page_id++;

            self.parent.gotoPage(QuestionnairePage, self.data);

            //self._navigator.element.pushPage(QuestionnairePage, {data: self.data})
          }
      });    
    }
  }

  back() {
    // We need to always remove the profession as it is the last step and it messes up previous steps visually..
    if (this.data.coach.profession_id != -1) {
      this.data.coach.profession_id = -1;
      this.data.pages[this.data.current_page_id].selected_item = -1;
    }

    // What to do with time spent on this page? -> for now we ignore it..
    this.data.current_page_id = this.data.current_page_id - 1;

    // Not very nice to do this hard-coded, but for now I don't see another option.
    if (this.data.current_page_id == 1){
      this.parent.gotoPage(QuestionnaireSelectGender, this.data);
    }
    else {
      this.parent.gotoPage(QuestionnairePage, this.data);
    }
  }  

  setItem(value: number) {
    this.selected_item = value;

    this.data.pages[this.data.current_page_id].onItemChange(this.data, value);
    this.data.pages[this.data.current_page_id].selected_item = value;

    this.triggerChange = !this.triggerChange;

    //@TODO: get the correct unique identifier and save it to web
    this.done = true;
  }

  setLikert(value: number) {
    this.selected_item = value;

    if (this.data.pages[this.data.current_page_id].onItemChange !== undefined)
      this.data.pages[this.data.current_page_id].onItemChange(this.data, value);

    this.data.pages[this.data.current_page_id].selected_item = value;

    this.done = true;
  }
}

@Component({
  selector: 'coach',
  providers: [HairstyleService, GlassesService, BodyService, FaceService, ShirtService, PantsService, ShoesService, WatchService, OutfitService],
  template: `
    <div [ngClass]="{'coach_wrapper_noshirt': shirt == null || pants == null}" class="coach_wrapper">

      <img src="{{bodyimg}}" style="width: 100%;" *ngIf="pants != null" />

      <img src="{{body.image_timepressure_arm}}" style="position: absolute; top: 0px; left: 0px; width: 100%; z-index: 5" *ngIf="isTimePressure" />

      <img src="{{body.image_nopants}}" style="width: 100%;" *ngIf="pants == null && shirt != null" />

      <div id="facecontainer" [ngClass]="{'face_not_absolute': shirt == null}" style="position: absolute; top: 0px; width: 100%; text-align: center; z-index: 2">
        <img src="{{hairstyleimg}}" style="width: 100%;" />     
        <div id="glassescontainer" [ngClass]="{'glasses_timepressure_male': isTimePressure && coachObject.gender_id == 0, 'glasses_timepressure_female': isTimePressure && coachObject.gender_id == 1}" *ngIf="glasses != null" style="position: absolute; left: 0px; top: 21%; width: 100%; z-index: 3">
          <img src="{{glasses.image}}" style="width: 100%;" />
        </div>
        <div id="facefeaturecontainer" style="position: absolute; left: 0px; top: 0px; width: 100%; z-index: 2">
          <img src="{{faceimg}}" style="width: 100%;" />
        </div>
        <div id="eyebrowscontainer" style="position: absolute; left: 0px; top: 0px; width: 100%; z-index: 2">
          <img src="{{eyebrowimg}}" style="width: 100%;" />
        </div>
      </div>
      <div id="coach_shirt" [ngClass]="{'coach_shirt_nopants': pants == null}" *ngIf="shirt != null">
        <img src="{{shirtimg}}" style="width: 100%;" />
      </div>
      <div id="pants" style="position: absolute; top: 40.5%; width: 100%; z-index: 3" *ngIf="pants != null">
        <img src="{{pants.image}}" style="width: 100%;" />
      </div>
      <div id="shoes" style="position: absolute; top: 85%; width: 100%; z-index: 2" *ngIf="shoes != null">
        <img src="{{shoes.image}}" style="width: 100%;" />
      </div>

      <div id="watch" style="position: absolute; top: 35%; width: 100%; z-index: 7" *ngIf="watch != null">
        <img src="{{watchimg}}" style="width: 100%;" />
      </div>

      <div id="outfit" style="position: absolute; top: 0px; width: 100%; z-index: 8" *ngIf="outfit != null">
        <img src="{{outfit.image}}" style="width: 100%;" />
      </div>
    </div>
  `
})

export class CoachComponent {
  @Input() coachObject;
  @Input() isTimePressure: boolean = false;
  @Input() professionId = -1;
  @Input() isIntroduction: boolean = false;
  @Input() objChanged: boolean = false;

  private realProfId = -1;

  private hairstyle = null;
  private glasses = null;
  private body = null;
  private face = null;
  private shirt = null;
  private pants = null;
  private shoes = null;
  private watch = null;
  private outfit = null;

  private shirtimg = null;
  private bodyimg = null;
  private faceimg = null;
  private eyebrowimg = null;
  private watchimg = null;
  private hairstyleimg = null;


  private hairstyleService: HairstyleService;
  private glassesService: GlassesService;
  private bodyService: BodyService;
  private faceService: FaceService;
  private shirtService: ShirtService;
  private pantsService: PantsService;
  private shoesService: ShoesService;
  private watchService: WatchService;
  private outfitService: OutfitService;

  constructor(hairstyleService: HairstyleService, glassesService: GlassesService, bodyService: BodyService, faceService: FaceService, shirtService: ShirtService, pantsService: PantsService, shoesService: ShoesService, watchService: WatchService, outfitService: OutfitService) {
    this.hairstyleService = hairstyleService;
    this.glassesService = glassesService;
    this.bodyService = bodyService;
    this.faceService = faceService;
    this.shirtService = shirtService;
    this.pantsService = pantsService;
    this.shoesService = shoesService;
    this.watchService = watchService;
    this.outfitService = outfitService;
  }

  ngOnChanges() {
    console.log(this.coachObject);
    this.objChanged = false;
    this.body = this.bodyService.getBody(this.coachObject.gender_id);
    this.face = this.faceService.getFace(this.coachObject.gender_id);
    this.hairstyle = this.hairstyleService.getHairstyle(this.coachObject.gender_id, this.coachObject.hairstyle_id);
    this.glasses = this.glassesService.getGlasses(this.coachObject.gender_id, this.coachObject.glasses_id);
    this.shirt = this.shirtService.getShirt(this.coachObject.gender_id, this.coachObject.shirt_id);
    this.pants = this.pantsService.getPants(this.coachObject.gender_id, this.coachObject.pants_id);
    this.shoes = this.shoesService.getShoes(this.coachObject.gender_id, this.coachObject.shoes_id);
    this.watch = this.watchService.getWatch(this.coachObject.gender_id, this.coachObject.watch_id);

    console.log(this.pants);

    // Some hacks to make sure everything refreshes properly upon being chosen.
    if (this.shirt != null)
      this.shirtimg = this.shirt.image;
    if (this.body != null)
      this.bodyimg = this.body.image;
    if (this.hairstyle != null) {
      this.hairstyleimg = this.hairstyle.image;
      this.eyebrowimg = this.hairstyle.image_eyebrows;
    }
    if (this.watch != null)
      this.watchimg = this.watch.image;
    if (this.face != null)
      this.faceimg = this.face.image;

    // Not very pretty but good enough for now..
    if (this.isTimePressure) {
      this.bodyimg = this.body.image_timepressure;
      this.faceimg = this.face.image_timepressure;
      this.eyebrowimg = this.hairstyle.image_eyebrows_timepressure;

      if (this.watch != null)
        this.watchimg = this.watch.image_timepressure;

      if (this.shirt.image_timepressure != null)
        this.shirtimg = this.shirt.image_timepressure;
    }

    this.realProfId = this.professionId;
    
    if (this.professionId == -1)
      this.realProfId = this.coachObject.profession_id;

    this.outfit = this.outfitService.getOutfit(this.coachObject.gender_id, this.realProfId);

    if (this.outfit != null) {
      if (this.outfit.alternate_body != null) {
        this.bodyimg = this.outfit.alternate_body;
      }

      // Special case for hat :-)
      if (this.realProfId == 3 && this.hairstyle.image_hat != null) {
        this.hairstyleimg = this.hairstyle.image_hat;
      }
    }

    if (this.isIntroduction) {
      this.shirt = null;
      this.pants = null;
      this.shoes = null;
      this.watch = null;
    }
  }
}
