import {
  Component,
  Injector,
  ViewChild,
  Params,
  OnsNavigator,
  OnsenModule,
  NgModule,
  HostListener,
  CUSTOM_ELEMENTS_SCHEMA
} from 'angular2-onsenui';
import 'node_modules/howler/dist/howler.min.js';

import { DataService } from './dataService';
import { QuestionnaireIntro } from './questionnaire.component';
import { ExitApp, CloseApp } from './questionnaire.component';
//import { OneSignal } from 'onesignal';
import {CordovaService} from './cordovaService';

declare var Howl : any;
//declare var cordova : any;


@Component({
  selector: 'ons-page',
  template: `
    <ons-toolbar>
    <div class="left">
    </div>    
      <div class="center">Information</div>
    </ons-toolbar>
    <div>
      <div class="content">
        <div class="likert_container">
          <div class="coach_container coach_container_middle">
              <coach [coachObject]="data.coach" *ngIf="data !== null && data.coach !== null"></coach>
          </div>
          <div class="likert_content">
            <h1>Instruction for the Brain Up game</h1>
            <p>In the game, you will see a square appearing in a certain location on the grid. The appearance of the square can be accompanied by a sound of a letter. <br /> Memorize where the square appears and what sound came with it. If the current square is in the same location press “position” button, if the current square has the same sound, press “sound” button, if both press both buttons, if nothing matches, do not press any buttons. <br /><br />
            You can choose the difficulty of the game. You can choose to memorize location and sound of the square that appeared one step before the current square, or you can choose to remember these variables for 2, 3 or 4 steps behind. The more steps behind, the more difficult the game is.</p>
            <ons-button modifier="large" (click)="next()">Next</ons-button> <br /><br />
          </div>
       <div>
      <div>    
      </div>
    </div>
  `
})

export class NBackInformation {
  private parent;
  private data;
  dataService = null;

  constructor(injector: Injector, dataService: DataService) {
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

  next() {
    this.parent.gotoPage(NBackConfiguration, this.data);
  }

}


@Component({
  selector: 'ons-page',
  template: `
    <ons-toolbar>
	  <div class="left">
	  </div>    
      <div class="center">Configuration</div>
    </ons-toolbar>
    <div>
      <div class="content">
      <div class="likert_content">
      	<h1>Choose Level</h1>
      <ons-list>
        <ons-list-item *ngFor="let step of steps" tappable (click)="setNumSteps(step)">
            <ons-input type="radio" [checked]="options.numSteps == step">Level</ons-input>
            &nbsp;&nbsp;{{step}}
        </ons-list-item>
      </ons-list>     
      <br />
      <ons-button modifier="large" (click)="start()">Start game</ons-button> <br />
      </div>
      </div>
    </div>
  `
})

export class NBackConfiguration {
  private parent;
  private options;

  private modes = [
    'Dual (sound and visual)'//,
    //'Single (visual only)'
  ];

  private steps = [
    1,
     2,
     3,
     4
  ];

  constructor(injector: Injector) {
    this.parent = injector.get('parent');
    this.options = injector.get('data');

    this.options.mode = 0;
    this.options.numSteps = 1;
  }

  setNumSteps(index) {
    this.options.numSteps = index;
  }

  setMode(index) {
    this.options.mode = index;
  }

  start() {
    this.parent.gotoPage(NBackGame, this.options);
  }

}

@Component({
  selector: 'ons-page',
  template: `
    <ons-toolbar>
      <div class="center">
        {{n}} Back
      </div>
    </ons-toolbar>
    <div class="content">
      <div *ngIf="gamePlaying" style="display: flex; flex-direction: column; height: 90vh">
        <div style="display: flex; flex-grow: 2; min-height:80vw; min-width:80vw">
        <div class="nback_container" style="width:100%; display: flex; flex-wrap: wrap; border: 1px solid #dbdbdb; box-sizing: border-box">
          <div *ngFor="let number of numbers" class="nback_compartment" id="nback_{{number}}" style="width: calc(100%/3); border: 1px solid #dbdbdb; box-sizing: border-box; height: calc(100%/3); padding: 8px">
            <div class="nback_compartment_inner" style="width: 100%; height: 100%; box-sizing: border-box" [ngClass]="{'nback_compartment_selected': number == activeSquare}">
            </div>          
          </div>
        </div>
        </div>
        <div style="display: flex; flex-direction: row; flex-grow:1; width:100%; min-height:20vw">
        <div class="nback_button" style="flex-grow: 1; margin: 2.5%">
          <div [ngClass]="{'nback_button_pressed': positionPressed}" class="nback_button_inner" style="width: 100%; height: 100%; background-color: #3e81cf; color: #ffffff; display: flex; flex-direction: column; justify-content: center; align-items: center; box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);" id="btn_position">
            <img src="img/icon_position.svg" style="min-width: 10%" />
            <span style="font-size: 18pt; font-weight: bold">Position</span>
          </div>
        </div>
        <div class="nback_button" style="flex-grow: 1; margin: 2.5%">
          <div *ngIf="options.mode == 0" [ngClass]="{'nback_button_pressed': soundPressed}" class="nback_button_inner" style="width: 100%; height: 100%; background-color: #3e81cf; display: flex; flex-direction: column; justify-content: center; align-items: center; color: #ffffff; box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);" id="btn_sound">
            <img src="img/icon_sound.svg" style="min-width: 10%" />
            <span style="font-size: 18pt; font-weight: bold">Sound</span>
          </div>
        </div>      
      </div>
      </div>

      <div *ngIf="!gamePlaying" style="display: flex; width: 100%; height: 100%; align-items: center; justify-content: center" (click)="start()">
        <div style="background-color: #3e81cf; color: #ffffff; width: 60%; height: 40%; display: flex; flex-direction: column; justify-content: center; align-items: center; box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23); font-size: 18pt; font-weight: bold">
          Start!
        </div>
      </div>

      <div *ngIf="countdown_time != 0" style="position: fixed; top: 0px; left: 0px; display: flex; width: 100%; height: 100%; align-items: center; justify-content: center; font-weight: bold; font-size: 128pt">
        {{countdown_time}}
      </div>
    </div>
  `
})

export class NBackGame {
  private data;
  private dataService;
  private cordovaService

  private parent;
  private options;
  
  private activeSquare: number = -1;
  private gamePlaying: boolean = false;
  private gameRound: number = -1;

  private n: number = 1; // Number of steps back
  private block;
  private results;
  private numbers;

  private countdown_time = 0;

  private soundPressed: boolean = false; // Avoid double pressing for more mistakes
  private positionPressed: boolean = false;
  private reminderTime; 

  private letters = [
    new Howl({
      src: ['audio/b.mp3', 'audio/b.ogg', 'audio/b.wav']
    }),
    new Howl({
      src: ['audio/f.mp3', 'audio/f.ogg', 'audio/f.wav']
    }),
    new Howl({
      src: ['audio/k.mp3', 'audio/k.ogg', 'audio/k.wav']
    }),
    new Howl({
      src: ['audio/n.mp3', 'audio/n.ogg', 'audio/n.wav']
    }),
    new Howl({
      src: ['audio/p.mp3', 'audio/p.ogg', 'audio/p.wav']
    }),
    new Howl({
      src: ['audio/q.mp3', 'audio/q.ogg', 'audio/q.wav']
    }),
    new Howl({
      src: ['audio/r.mp3', 'audio/r.ogg', 'audio/r.wav']
    }),
    new Howl({
      src: ['audio/t.mp3', 'audio/t.ogg', 'audio/t.wav']
    })
  ]

  constructor(injector: Injector, dataService:DataService, cordovaService:CordovaService) {
    this.parent = injector.get('parent');
    this.options = injector.get('data');
    this.n = this.options.numSteps;
    this.cordovaService = cordovaService;
    
    this.numbers = [1,2,3,4,5,6,7,8,9];
    this.activeSquare = -1;

    // Generate steps
    this.block = this.getBlock(this.n);

    this.results = {
      num_sound_correct: 0,
      num_position_correct: 0,
      num_sound_incorrect: 0,
      num_position_incorrect: 0,
      n: this.n,
      mode: this.options.mode,
      selectedMessage: "",
      selectedReminder: "",
      showButtons: false
    };

    if (this.options.coach !== undefined)
      this.results.coach = this.options.coach;

    this.dataService = dataService;
    this.data = injector.get('data');; 
    var self = this;
    var persProfile = this;
    var authority_score;
    var commitment_score;
    var consensus_score;
    var likability_score;
    var reciprocity_score;
    var scarcity_score;
    var show;
    var highestScoresMessages: string[] = [];
    var highestScoresReminders: string[] = [];
    var length;

    /*dataService.getReminderTime().then((result) => {
      self.reminderTime = result.result.answer;
      console.log("reminder time is " + self.reminderTime);
    });*/
  

    if (this.data == null || this.data.persuasion_profile == null) {
     dataService.getPersuasionProfile().then(function(result) {
        if (persProfile.data == null){
          persProfile.data = {};
        }
        
        if (result.result !== undefined)
        {
          persProfile.data.persuasion_profile = result.result;

          authority_score = persProfile.data.persuasion_profile.authority_score;
          commitment_score = persProfile.data.persuasion_profile.commitment_score;
          consensus_score = persProfile.data.persuasion_profile.consensus_score;
          reciprocity_score = persProfile.data.persuasion_profile.reciprocity_score;
          scarcity_score = persProfile.data.persuasion_profile.scarcity_score;       

          var principles : string[] = [];
            if (authority_score == (Math.max(authority_score, commitment_score, consensus_score, reciprocity_score, scarcity_score)))
            {
              principles.push("Authority");

              //if doctor              
              if (self.data.coach.profession_id == 0)
              {
                self.results.showButtons = false;
                highestScoresMessages.push("Good that you exercised today! I prescribe you even more workouts.");        
                highestScoresMessages.push("Great to see you have completed the daily workout! I recommend to keep up a regular schedule to maximise the positive effect of the workouts.");
                highestScoresMessages.push("Prevention is the best medicine. Keep working to keep your memory fresh and active!");
                
                highestScoresReminders.push("Brain Up was prepared by researchers for people like you. Play Brain Up workout for 10 minutes today!");
                highestScoresReminders.push("According to scientists the brain is plastic and can be trained. Access Brain Up workouts to train your brain.");
                highestScoresReminders.push("Strategies in Brain Up were created by scientists for people like you! Check strategies in today’s workout!");
              }

              //if professor
              if (self.data.coach.profession_id == 1)
              {
                self.results.showButtons = false;
                highestScoresMessages.push("Good job with finishing your workout today! The workouts you play are carefully prepared by scientists, so keep playing to get good results!");
                highestScoresMessages.push("Exercising is the key for getting better, keep it up!");
                highestScoresMessages.push("Well done for working out today! Practice makes better, so keep up the good work! I am proud of you!");

                highestScoresReminders.push("Brain Up was prepared by researchers for people like you. Play Brain Up workout for 10 minutes today!");
                highestScoresReminders.push("According to scientists the brain is plastic and can be trained. Access Brain Up workouts to train your brain.");
                highestScoresReminders.push("Strategies in Brain Up were created by scientists for people like you! Check strategies in today’s workout!");
              }
              else
              {
                //if not doctor and if not professor.
                self.results.showButtons = false;
                highestScoresMessages.push("Good job with finishing your workout today! The workouts you play are carefully prepared by scientists, so keep playing to get good results!");
                highestScoresMessages.push("Exercising is the key for getting better, keep it up!");
                highestScoresMessages.push("Well done for working out today! Practice makes better, so keep up the good work! I am proud of you!");

                highestScoresReminders.push("Brain Up was prepared by researchers for people like you. Play Brain Up workout for 10 minutes today!");
                highestScoresReminders.push("According to scientists the brain is plastic and can be trained. Access Brain Up workouts to train your brain.");
                highestScoresReminders.push("Strategies in Brain Up were created by scientists for people like you! Check strategies in today’s workout!");
              }
            }

            if (commitment_score == (Math.max(authority_score, commitment_score, consensus_score, reciprocity_score, scarcity_score)))
            {
              principles.push("Commitment");
              self.results.showButtons = true;
              highestScoresMessages.push("Very good that you worked out today! Let’s play again tomorrow?");
              highestScoresMessages.push("Well done for exercising today! Would you like to commit to playing again?");
              highestScoresMessages.push("It is good that you keep on practicing! You worked out really hard today! Will i see you again tomorrow?");
              
              highestScoresReminders.push("You know that it is important to keep your brain in prime condition. Working out with Brain Up is a way to achieve your goals.");
              highestScoresReminders.push("Set yourself a new goal of improving memory. Play Brain Up today to start with this goal.");
              highestScoresReminders.push("Playing Brain Up workout takes only 15 minutes per day. Put Brain Up into your calendar not to lose a day.");
            }

            if (consensus_score == (Math.max(authority_score, commitment_score, consensus_score, reciprocity_score, scarcity_score)))
            {
             principles.push("Consensus");
             self.results.showButtons = false;
             highestScoresMessages.push("Very well done for working out today! Join other users of Brain Up and work out at least once per day! Keep up with your training!");
             highestScoresMessages.push("It is very good that you practiced! Follow the path of Brain Up users and play another workout.");
             highestScoresMessages.push("Nice! The average number of workouts per day is two, and people generally play five days a week.");
            
             highestScoresReminders.push("Many of our app users have already finished their memory training today. Join this group now!");
             highestScoresReminders.push("People like you who play the brain training daily are more likely to benefit from the program and maintain an active and healthy brain!");
             highestScoresReminders.push("Thousands of people are using apps to improve their memory. Join the group!");
            }

            if (reciprocity_score == (Math.max(authority_score, commitment_score, consensus_score, reciprocity_score, scarcity_score)))
            {
              principles.push("Reciprocity");
              self.results.showButtons = false;
              highestScoresMessages.push("Very good that you worked out today! I really enjoyed working with you today, hope to see you again tomorrow.");
              highestScoresMessages.push("Very well done for working out today! I will prepare a great workout for you tomorrow! I hope to see you then!");
              highestScoresMessages.push("Good that you are working out! I can help you even more if you come back tomorrow!");
              
              highestScoresReminders.push("We worked really hard to create this app. The best way to show us your appreciation is to do today’s training session.");
              highestScoresReminders.push("Today’s workout is our new gift for you. To access it open Brain Up now.");
              highestScoresReminders.push("Brain Up is not a usual brain game, we designed it carefully to provide you with maximum benefits. Play it to see our hard work.");
            }

            if (scarcity_score == (Math.max(authority_score, commitment_score, consensus_score, reciprocity_score, scarcity_score)))
            {
              principles.push("Scarcity");
              self.results.showButtons = false;
              highestScoresMessages.push("I am happy you worked out today! I prepared a new workout just for you, play it tomorrow!");
              highestScoresMessages.push("Good to see you are working out regularly! Let’s keep going now to get through these workouts while they’re still fresh!");
              highestScoresMessages.push("Good that you are working out! There is limited time to complete all workouts while staying on schedule, let’s keep going!");
              
              highestScoresReminders.push("The Brain Up adapts to the pace with which you learn. This adaptivity means the game is different for every user. Play the Brain Up to access the game that is just tailored for you.");
              highestScoresReminders.push("If you do not play Brain Up today, you will miss out on a chance to train your brain.");
              highestScoresReminders.push("The brain games are the most effective if played every day. Play the Brain Up today not to miss your chance to improve your memory!");
             } 

            var item = principles[Math.floor(Math.random()*principles.length)];
            var ltoken = localStorage.getItem("token");

            localStorage.setItem("principle", item);

            self.results.selectedMessage = highestScoresMessages[Math.floor(Math.random() * highestScoresMessages.length)]; 

            console.log("Selected message is " + self.results.selectedMessage);

            cordovaService.setExternalUserID(ltoken);
            console.log("persuasion porfile = " + item);
            cordovaService.sendProfile(item);
           
            //var d = new Date();  
            //var hours = self.reminderTime.substring(0,2);
            //d.setHours(hours);
            //d.setMinutes(0);
            //console.log("Time for reminder is" + d.getTime());            
            //cordova.plugins.notification.local.schedule({
            //id: 1,
            //title: "Brain Up",
            //text:  self.results.selectedReminder,
            //firstAt: d,
            //every: "day",
            //});

          }      
          }); 
        }
  }

  // Not really the cleanest way to do this, should probably turn buttons into their own components..
  @HostListener('click', ['$event'])
    onDragStart(event) {  
      console.log(event);

      if (event.srcElement.id == 'btn_position' || event.srcElement.parentElement.id == 'btn_position') {
        if (!this.positionPressed) {
          this.positionPressed = true;

          if (this.block[this.gameRound-this.n] && this.block[this.gameRound][0] == this.block[this.gameRound-this.n][0]) {
            //alert('correct position!');
            this.results.num_position_correct += 1;
          }
          else {
            //alert('incorrect position!');
            this.results.num_position_incorrect += 1;
          }
        }
      }

      else if (event.srcElement.id == 'btn_sound' || event.srcElement.parentElement.id == 'btn_sound') {
        if (!this.soundPressed) {
          this.soundPressed = true;

          if (this.block[this.gameRound-this.n] && this.block[this.gameRound][1] == this.block[this.gameRound-this.n][1]) {
            //alert('correct sound!');
            this.results.num_sound_correct += 1;
          }
          else {
            //alert('incorrect sound!');
            this.results.num_sound_incorrect += 1;
          }
        }
      }
    }

  playRound(self) {
    self.positionPressed = false;
    self.soundPressed = false;
    self.gameRound = self.gameRound + 1;

    if (self.gameRound >= 20 + this.n) {
      console.log(self.results);
      this.parent.gotoPage(NBackResults, self.results);
    }

    else {
      var target = self.block[self.gameRound][0];
      if (target >= 5)
        target = target + 1;

      self.activeSquare = target;

      if (self.options.mode == 0)
        self.letters[self.block[this.gameRound][1]-1].play();

      setTimeout(function() { self.activeSquare = -1; }, 500);

      setTimeout(function() { self.playRound(self); }, 3000);
    }
  }

  start() {
    this.gamePlaying = true;
    var self = this;

    setTimeout(function() { self.playRound(self); }, 4500);    

    setTimeout(function() { self.countdown_time = 3; }, 500);    
    setTimeout(function() { self.countdown(); }, 1500);
  }

  countdown() {
    this.countdown_time = this.countdown_time - 1;

    var self = this;

    if (this.countdown_time != 0)
      setTimeout(function() { self.countdown(); }, 1000);
  }

  getBlock(n) {
    var currentBlock = this.generateBlock(n)
    var blockEval = this.evaluateBlock(currentBlock, n);

    while(blockEval[0] != 6 || blockEval[1] != 6) {
      console.log('===');
      currentBlock = this.generateBlock(n);
      blockEval = this.evaluateBlock(currentBlock, n);
    }

    return currentBlock;  
  }

  evaluateBlock(block, n) {
    var vTargCount = 0;
    var aTargCount = 0;

    for (var i = 0; i < block.length; i++) {
      if (block[i - n]) {
        if (block[i][0] == block[i - n][0]) {
          vTargCount += 1;
        }
        if (block[i][1] == block[i - n][1]) {
          aTargCount += 1;
        }
      }
    }

    console.log([vTargCount, aTargCount]);
    return [vTargCount, aTargCount];
  }


  generateBlock(n) {
    // Empty block array

    var thisBlock = [];

    // Populate thisBlock with [0, 0] pairs

    for(var i = 0; i < 20 + n; i++) {
      thisBlock.push([0, 0]);
    }

    // Get the length of the block

    var blockLength = thisBlock.length;

    // Create 4 visual targets in empty spots

    var visuals = 0;
    while(visuals < 4) {
      var visTarg = Math.floor(Math.random() * blockLength);
      if(thisBlock[visTarg + n]) {
        if(thisBlock[visTarg][0] == 0 && thisBlock[visTarg][1] == 0 && thisBlock[visTarg + n][0] == 0 && thisBlock[visTarg + n][1] == 0) {
          thisBlock[visTarg][0] = 1 + Math.floor(Math.random() * 8);
          thisBlock[visTarg + n][0] = thisBlock[visTarg][0];
          visuals++;
        }
        else if(thisBlock[visTarg][0] !== 0 && thisBlock[visTarg][1] == 0 && thisBlock[visTarg + n][0] == 0 && thisBlock[visTarg + n][1] == 0) {
          thisBlock[visTarg + n][0] = thisBlock[visTarg][0];
          visuals++;
        }
        else if(thisBlock[visTarg][0] == 0 && thisBlock[visTarg][1] == 0 && thisBlock[visTarg + n][0] !== 0 && thisBlock[visTarg + n][1] == 0) {
          thisBlock[visTarg][0] = thisBlock[visTarg + n][0];
          visuals++;
        }
        else{
          continue;
        }
      }
      else {
        continue;
        }
    }

    // Create 4 audio targets in empty spots

    var audios = 0;
    var audioRuns = 0;
    while(audios < 4) {
      var audTarg = Math.floor(Math.random() * blockLength);
      audioRuns++;
      if(thisBlock[audTarg + n]) {
        if(thisBlock[audTarg][0] == 0 && thisBlock[audTarg][1] == 0 && thisBlock[audTarg + n][0] == 0 && thisBlock[audTarg + n][1] == 0) {
          thisBlock[audTarg][1] = 1 + Math.floor(Math.random() * 8);
          thisBlock[audTarg + n][1] = thisBlock[audTarg][1];
          audios++;
        }
        else if(thisBlock[audTarg][0] == 0 && thisBlock[audTarg][1] !== 0 && thisBlock[audTarg + n][0] == 0 && thisBlock[audTarg + n][1] == 0) {
          thisBlock[audTarg + n][1] = thisBlock[audTarg][1];
          audios++;
        }
        else if(thisBlock[audTarg][0] == 0 && thisBlock[audTarg][1] == 0 && thisBlock[audTarg + n][0] == 0 && thisBlock[audTarg + n][1] !== 0) {
          thisBlock[audTarg][1] = thisBlock[audTarg + n][1];
          audios++;
        }
        else {
          if(audioRuns>1000) {
            break;
          }
          else {
            continue;
          }
        }
      }
      else {
        continue;
      }
    }

    // Create 2 dual targets in empty spots

    var doubles = 0;
    var visualRuns = 0;
    while(doubles < 2) {
      var dualTarg = Math.floor(Math.random() * blockLength);
      visualRuns++;
      if(thisBlock[dualTarg + n]) {
        if(thisBlock[dualTarg][0] == 0 && thisBlock[dualTarg][1] == 0 && thisBlock[dualTarg + n][0] == 0 && thisBlock[dualTarg + n][1] == 0) {
          thisBlock[dualTarg][0] = 1 + Math.floor(Math.random() * 8);
          thisBlock[dualTarg][1] = 1 + Math.floor(Math.random() * 8);
          thisBlock[dualTarg + n] = thisBlock[dualTarg];
          doubles++;
        }
        else {
          if(visualRuns>1000) {
            break;
          }
          else {
            continue;
          }
        }
      }
      else {
        continue;
      }
    }

    // Fill other values with random, non-matching values

    for(var x = 0; x < blockLength; x++) {
      if(thisBlock[x][0] == 0) {
        thisBlock[x][0] = 1 + Math.floor(Math.random() * 8);
        if(thisBlock[x - n] && thisBlock[x][0] === thisBlock [x - n][0] && thisBlock[x] !== thisBlock[x - n]) {
          if(thisBlock[x][0] < 8) {
            thisBlock[x][0] += 1;
          } else {
            thisBlock[x][0] -= 1;
          }
        }
        else if(thisBlock[x + n] && thisBlock[x][0] === thisBlock [x + n][0] && thisBlock[x] !== thisBlock[x + n]) {
          if(thisBlock[x][0] < 8) {
            thisBlock[x][0] += 1;
          } else {
            thisBlock[x][0] -= 1;
          }
        }
      }
      if(thisBlock[x][1] == 0) {
        thisBlock[x][1] = 1 + Math.floor(Math.random() * 8);
        if(thisBlock[x - n] && thisBlock[x][1] === thisBlock [x - n][1] && thisBlock[x] !== thisBlock[x - n]) {
          if(thisBlock[x][1] < 8) {
            thisBlock[x][1] += 1;
          } else {
            thisBlock[x][1] -= 1;
          }
        }
        else if(thisBlock[x + n] && thisBlock[x][1] === thisBlock [x + n][1] && thisBlock[x] !== thisBlock[x + n]) {
          if(thisBlock[x][1] < 8) {
            thisBlock[x][1] += 1;
          } else {
            thisBlock[x][1] -= 1;
          }
        }
      }
    }

    return thisBlock;
  }  
}

@Component({
  selector: 'ons-page',
  providers: [DataService],
  template: `
    <ons-toolbar>
    <div class="left">
    </div>    
      <div class="center">Brain Up</div>
    </ons-toolbar>
    <div>
      <div class="content">
        <div class="likert_container"> 
          <div class="coach_container coach_container_middle">
            <coach [coachObject]="data.coach" *ngIf="data !== null && data.coach !== null"></coach>
          </div>

          <div class="likert_content">
            <div>
              <h1>Welcome back!</h1>
              I am glad to see you back again! Let's workout!<br /><br />
            </div>
          </div>
        </div>
      </div>

      <div class="buttons">
        <ons-button (click)="next()">Let's go!</ons-button>
      </div>
      <br />
      <br />
    </div>
  `
})

export class WelcomeScreen {
  private parent;
  private data;  
  
  constructor(injector: Injector, dataService: DataService) {
    this.parent = injector.get('parent');
    this.data = injector.get('data');
    
    //if (this.data == null || this.data.reminder == null) {
    //  dataService.getReminderObject().then(function (result) {
     //   if (self.data == null)
      //    self.data = {};
    //    if (result.result !== undefined)
     //     self.data.reminder = result.result;
     // });
    //}

    var self = this;

    if (this.data == null || this.data.coach == null) {
      dataService.getCoachObject().then(function (result) {
        if (self.data == null)
          self.data = {};
        
        if (result.result !== undefined)
          self.data.coach = result.result;
      });
    }
  }

  next() {
    this.parent.gotoPage(NBackInformation, this.data);
  }
}

@Component({
  selector: 'ons-page',
  providers: [DataService],
  template: `
    <ons-toolbar>
    <div class="left">
    </div>    
      <div class="center">Your results</div>
    </ons-toolbar>
    <div>
      <div class="content">
        <div class="likert_container"> 
          <div class="coach_container">
            <coach [coachObject]="data.coach" *ngIf="data !== null && data.coach !== null"></coach>
          </div>

          <div class="likert_content">
            <div>
              <h1>Well done!</h1>
              <!--<p style="font-size:28px">{{data.selectedMessage}}</p>-->
              You played a game of <strong>{{modes[data.mode]}} {{data.n}}-back</strong> with a score of:<br /><br />
              <div style="text-align: center; line-height: 34pt"><strong>{{data.num_position_correct}}/6</strong> visual cues, <strong>{{data.num_position_incorrect}}</strong> incorrect</div>
              <div style="text-align: center;" *ngIf="data.mode == 0"><strong>{{data.num_sound_correct}}/6</strong> auditory cues, <strong>{{data.num_sound_incorrect}}</strong> incorrect</div><br /><br />
            </div>
          </div>
        </div>
        <div class="buttons">
                  <ons-button (click)="playagain()" >Play Again</ons-button> 
                  <ons-button (click)="exit()" >Exit</ons-button> 
        </div>
      </div>
    </div>
  `
})


export class NBackResults {
  private parent;
  private data;
  private selectedReminder;
  private showButtons;
  private jobID;
  private modes = [
    'Dual (sound and visual)',
    'Single (visual only)'
  ];  
  
  dataService = null;
  highestScores: any[];
    

  constructor(injector: Injector, dataService: DataService) {
    this.parent = injector.get('parent');
    this.data = injector.get('data');
    this.dataService = dataService; 
   
    var self = this;

    dataService.saveEvent('game completed')

    if (self.data == null || self.data.coach == null) {
      dataService.getCoachObject().then(function (result) {
        if (self.data == null)
        {
          self.data = {};
        }
        
        if (result.result !== undefined)
        {
          self.data.coach = result.result;
          self.jobID = self.data.coach.profession_id;                
        }
      });
    } 
}   

  playagain() {
    this.parent.gotoPage(NBackConfiguration, this.data);
  }

  yesFirstPage() {
    this.dataService.saveEvent("user_clicked_yes");
    this.parent.gotoPage(CloseApp, this.data);
  }

  exit() {
    this.dataService.saveEvent("user_exited_the_app");
    this.parent.gotoPage(ExitApp, this.data);
  }
}

@Component({
  selector: 'ons-page',
  providers: [DataService],
  template: `
    <ons-toolbar>
    <div class="left">
    </div>    
      <div class="center">Brain Up</div>
    </ons-toolbar>

    <div>
      <div class="content">
        <div class="likert_container"> 
            <div style="max-width: 500px; max-height:400px;  margin:0 auto;">
              <h1 style="text-align:center">Welcome to Brain Up!</h1>
              <img style="display:block; margin:auto;" src="img/brain-logo.jpg" width="417" height="208" >
              <div class="buttons">
                 <ons-button (click)="enter()" style="float:left">Enter!</ons-button>
                 <ons-button (click)="leave()" style="float:right">Leave!</ons-button>
              </div>
            </div>
        </div>
      </div>
    </div>

  `
})

export class SplashScreen 
{
  private parent;
  private data;  
  
  dataService = null;

  constructor(injector: Injector, dataService: DataService) 
  {
    this.parent = injector.get('parent');
    this.data = injector.get('data');  
    this.dataService = dataService;  
  }

  enter()
  {
     this.dataService.getSetting("isIntroCompleted").then((result) =>
     {
      if (result && result.settingValue == 1) 
      {
        console.log('nback config');
        this.parent.gotoPage(WelcomeScreen, null);
      }
      else 
      {
        console.log('consent screen');
        this.parent.gotoPage(ConsentScreen, null);
      }    
    }); 
  }

  leave()
  {
    console.log('Leave page');
    this.parent.gotoPage(ExitApp, null);
  }
}




@Component({
  selector: 'ons-page',
  providers: [DataService],
  template: `
      <ons-toolbar>
    <div class="left">
    </div>    
      <div class="center">Brain Up</div>
    </ons-toolbar>

    <div>
      <div class="content page__content page--material__content">
        <div class="likert_container"> 
            <div class="intro_text">
              <h1> Consent form!</h1>
              <b> Title of Research Project:</b> Evaluation of a simple brain training game. <br /><br />
              Thank you for your interest in our research study. Please read the information below. <br /><br />
              <b>What the study is about:</b> The aim of this study is to measure the effects of playing a simple brain training game, over a longer period of time, on memory. <br /><br />
              <b>What we will ask you to do:</b> If you agree to participate in this study, we will ask you to play the game on your laptop for two weeks at a time convenient to you. Each game session should take maximum 10 minutes; however, you are allowed to play for longer if you enjoy the game. When the study reaches completion, we will send you, through Prolific, a questionnaire and a debriefing document explaining what exactly we have measured during the two week period during which you played the game. Please fill in the survey, it is an essential part of the study, and we will not be able to remunerate you if you do not submit it. All the steps in the study will be further explained when action is required from you. <br /><br />
              <b>Confidentiality:</b> Your answers will be confidential. The records of this study will be kept private. In any sort of report we make public, we will not include any information that will make it possible to identify you. Only the researchers will have access to the records. <br /><br />
              <b>Taking part is voluntary:</b> Taking part in this study is completely voluntary. If you decide to take part, you are free to withdraw at any time. If you decide to withdraw from participation your data will not be used for analysis. You can also withdraw after participation, to do this simply contact one of the researchers (see details below) and provide the researcher with the code from the “thank you” screen, which you will be asked to copy and paste into the survey. Please note, however, that if you decide to withdraw at a later point, your data might still be used in a collated form and published. Please also note that <i>we will only reimburse complete entrance.</i><br /><br />
              If you have a concern about any aspect of your participation or any other queries please raise this with the researchers. The researchers conducting this study are Marta Kaczmarczyk (<a href="mailto:m.e.kaczmarczyk@tue.nl">m.e.kaczmarczyk@tue.nl</a>) and Tudor Vacaretu (<a href="mailto:t.vacaretu@tue.nl">t.vacaretu@tue.nl</a>).<br /><br />
              However, if you would like to contact an independent party please contact the Head of Department (Prof. dr. Panos Markopulos <a href="mailto:p.markopoulos@tue.nl">p.markopoulos@tue.nl</a>). Please print this consent form for your records, if you wish, by clicking <a href="javascript:window.print()">here</a>.<br /><br />
              <ons-input type="checkbox" (change)="agree()"></ons-input><b>Statement of Consent:</b> I have read the above information, and have received answers to any questions I asked. I consent to take part in the study. I understand that the information I provide will be treated in confidence by the investigator and that my identity will be protected in the publication of any findings, and that data will be collected and processed in accordance with the Data Protection Act 1998 and with the University’s Data Protection Policy.<br /><br />
            </div>
            <div class="buttons" style="text-align: left">
                <ons-button (click)="next()" [disabled]="!done">Next</ons-button>
            </div>
        </div>
       </div>
    </div>
  `
})

export class ConsentScreen 
{
  private parent;
  private data;  
  private done = false;

  dataService = null;

  constructor(injector: Injector, dataService: DataService) 
  {
    this.parent = injector.get('parent');
    this.data = injector.get('data');  
    this.dataService = dataService;  
  }

  agree()
  {
    this.done = !this.done;
  }

  next()
  {
    console.log('questionnaire intro');
    this.parent.gotoPage(QuestionnaireIntro, null);
      
  }
}