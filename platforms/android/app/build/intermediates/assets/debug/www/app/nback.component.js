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
var angular2_onsenui_1 = require("angular2-onsenui");
require("node_modules/howler/dist/howler.min.js");
var dataService_1 = require("./dataService");
var questionnaire_component_1 = require("./questionnaire.component");
var questionnaire_component_2 = require("./questionnaire.component");
//import { OneSignal } from 'onesignal';
var cordovaService_1 = require("./cordovaService");
//declare var cordova : any;
var NBackInformation = /** @class */ (function () {
    function NBackInformation(injector, dataService) {
        this.dataService = null;
        this.parent = injector.get('parent');
        this.data = injector.get('data');
        this.dataService = dataService;
        var self = this;
        if (self.data == null || self.data.coach == null) {
            dataService.getCoachObject().then(function (result) {
                if (self.data == null) {
                    self.data = {};
                }
                if (result.result !== undefined) {
                    self.data.coach = result.result;
                    //self.jobID = self.data.coach.profession_id;                
                }
            });
        }
    }
    NBackInformation.prototype.next = function () {
        this.parent.gotoPage(NBackConfiguration, this.data);
    };
    NBackInformation = __decorate([
        angular2_onsenui_1.Component({
            selector: 'ons-page',
            template: "\n    <ons-toolbar>\n    <div class=\"left\">\n    </div>    \n      <div class=\"center\">Informatie</div>\n    </ons-toolbar>\n    <div>\n      <div class=\"content\">\n        <div class=\"likert_container\">\n          <div class=\"coach_container coach_container_middle\">\n              <coach [coachObject]=\"data.coach\" *ngIf=\"data !== null && data.coach !== null\"></coach>\n          </div>\n          <div class=\"likert_content\">\n            <h1>Instructies voor de Brain Up game</h1>\n            <p>In het spel zie je een vierkant verschijnen op een bepaalde locatie in het raster. Het verschijnen van het vierkant kan vergezeld gaan met een geluid van een letter. <br /> Onthoud waar het vierkant verschijnt en welk geluid erbij hoort. Als het huidige vierkant zich op dezelfde locatie bevindt, druk dan op de knop \"positie\", als het huidige vierkant hetzelfde geluid heeft, drukt u op de knop \"geluid\". Als beide hetzelfde zijn druk dan op beide knoppen. Druk op geen enkele knop als er niets overeenkomt. <br /> <br /> Je kunt de moeilijkheidsgraad van het spel kiezen. Je kunt ervoor kiezen om de locatie en het geluid van het vierkant dat een stap v\u00F3\u00F3r het huidige vierkant verscheen te onthouden, of je kunt ervoor kiezen om deze variabelen voor 2, 3 of 4 stappen terug je te onthouden. Hoe meer stappen terug, hoe moeilijker het spel.</p>\n            <ons-button modifier=\"large\" (click)=\"next()\">Next</ons-button> <br /><br />\n          </div>\n       <div>\n      <div>    \n      </div>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [angular2_onsenui_1.Injector, dataService_1.DataService])
    ], NBackInformation);
    return NBackInformation;
}());
exports.NBackInformation = NBackInformation;
var NBackConfiguration = /** @class */ (function () {
    function NBackConfiguration(injector) {
        this.modes = [
            'Dubbel (geluid en positie)',
            'Single (alleen positie)'
        ];
        this.steps = [
            1,
            2,
            3,
            4
        ];
        this.parent = injector.get('parent');
        this.options = injector.get('data');
        this.options.mode = 0;
        this.options.numSteps = 1;
    }
    NBackConfiguration.prototype.setNumSteps = function (index) {
        this.options.numSteps = index;
    };
    NBackConfiguration.prototype.setMode = function (index) {
        this.options.mode = index;
    };
    NBackConfiguration.prototype.start = function () {
        this.parent.gotoPage(NBackGame, this.options);
    };
    NBackConfiguration = __decorate([
        angular2_onsenui_1.Component({
            selector: 'ons-page',
            template: "\n    <ons-toolbar>\n\t  <div class=\"left\">\n\t  </div>    \n      <div class=\"center\">Configuratie</div>\n    </ons-toolbar>\n    <div>\n      <div class=\"content\">\n      <div class=\"likert_content\">\n      \t<h1>Kies een Level</h1>\n      <ons-list>\n        <ons-list-item *ngFor=\"let step of steps\" tappable (click)=\"setNumSteps(step)\">\n            <ons-input type=\"radio\" [checked]=\"options.numSteps == step\">&nbsp;&nbsp;Level</ons-input>\n            &nbsp;&nbsp;{{step}}\n        </ons-list-item>\n      </ons-list>\n      <br />\n      <h1>Kies een Modus</h1>\n      <ons-list>\n        <ons-list-item (click)=\"setMode(0)\">\n            <ons-input type=\"radio\" [checked]=\"options.mode == 0\"></ons-input>\n            &nbsp;&nbsp;Dubbel (geluid en positie)\n        </ons-list-item>\n        <ons-list-item (click)=\"setMode(1)\">\n            <ons-input type=\"radio\" [checked]=\"options.mode == 1\"></ons-input>\n            &nbsp;&nbsp;Single (alleen positie)\n        </ons-list-item>\n      </ons-list>    \n      <br />\n      <ons-button modifier=\"large\" (click)=\"start()\">Start game</ons-button> <br />\n      </div>\n      </div>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [angular2_onsenui_1.Injector])
    ], NBackConfiguration);
    return NBackConfiguration;
}());
exports.NBackConfiguration = NBackConfiguration;
var NBackGame = /** @class */ (function () {
    function NBackGame(injector, dataService, cordovaService) {
        this.activeSquare = -1;
        this.gamePlaying = false;
        this.gameRound = -1;
        this.n = 1; // Number of steps back
        this.countdown_time = 0;
        this.soundPressed = false; // Avoid double pressing for more mistakes
        this.positionPressed = false;
        this.letters = [
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
        ];
        this.parent = injector.get('parent');
        this.options = injector.get('data');
        this.n = this.options.numSteps;
        this.cordovaService = cordovaService;
        this.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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
        this.data = injector.get('data');
        ;
        var self = this;
        var persProfile = this;
        var authority_score;
        var commitment_score;
        var consensus_score;
        var likability_score;
        var reciprocity_score;
        var scarcity_score;
        var show;
        var highestScoresMessages = [];
        var highestScoresReminders = [];
        var length;
        /*dataService.getReminderTime().then((result) => {
          self.reminderTime = result.result.answer;
          console.log("reminder time is " + self.reminderTime);
        });*/
        if (this.data == null || this.data.persuasion_profile == null) {
            dataService.getPersuasionProfile().then(function (result) {
                if (persProfile.data == null) {
                    persProfile.data = {};
                }
                if (result.result !== undefined) {
                    persProfile.data.persuasion_profile = result.result;
                    authority_score = persProfile.data.persuasion_profile.authority_score;
                    commitment_score = persProfile.data.persuasion_profile.commitment_score;
                    consensus_score = persProfile.data.persuasion_profile.consensus_score;
                    reciprocity_score = persProfile.data.persuasion_profile.reciprocity_score;
                    scarcity_score = persProfile.data.persuasion_profile.scarcity_score;
                    var principles = [];
                    if (authority_score == (Math.max(authority_score, commitment_score, consensus_score, reciprocity_score, scarcity_score))) {
                        principles.push("Authority");
                        //if doctor              
                        if (self.data.coach.profession_id == 0) {
                            self.results.showButtons = false;
                            highestScoresMessages.push("Good that you exercised today! I prescribe you even more workouts.");
                            highestScoresMessages.push("Great to see you have completed the daily workout! I recommend to keep up a regular schedule to maximise the positive effect of the workouts.");
                            highestScoresMessages.push("Prevention is the best medicine. Keep working to keep your memory fresh and active!");
                            highestScoresReminders.push("Brain Up was prepared by researchers for people like you. Play Brain Up workout for 10 minutes today!");
                            highestScoresReminders.push("According to scientists the brain is plastic and can be trained. Access Brain Up workouts to train your brain.");
                            highestScoresReminders.push("Strategies in Brain Up were created by scientists for people like you! Check strategies in today’s workout!");
                        }
                        //if professor
                        if (self.data.coach.profession_id == 1) {
                            self.results.showButtons = false;
                            highestScoresMessages.push("Good job with finishing your workout today! The workouts you play are carefully prepared by scientists, so keep playing to get good results!");
                            highestScoresMessages.push("Exercising is the key for getting better, keep it up!");
                            highestScoresMessages.push("Well done for working out today! Practice makes better, so keep up the good work! I am proud of you!");
                            highestScoresReminders.push("Brain Up was prepared by researchers for people like you. Play Brain Up workout for 10 minutes today!");
                            highestScoresReminders.push("According to scientists the brain is plastic and can be trained. Access Brain Up workouts to train your brain.");
                            highestScoresReminders.push("Strategies in Brain Up were created by scientists for people like you! Check strategies in today’s workout!");
                        }
                        else {
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
                    if (commitment_score == (Math.max(authority_score, commitment_score, consensus_score, reciprocity_score, scarcity_score))) {
                        principles.push("Commitment");
                        self.results.showButtons = true;
                        highestScoresMessages.push("Very good that you worked out today! Let’s play again tomorrow?");
                        highestScoresMessages.push("Well done for exercising today! Would you like to commit to playing again?");
                        highestScoresMessages.push("It is good that you keep on practicing! You worked out really hard today! Will i see you again tomorrow?");
                        highestScoresReminders.push("You know that it is important to keep your brain in prime condition. Working out with Brain Up is a way to achieve your goals.");
                        highestScoresReminders.push("Set yourself a new goal of improving memory. Play Brain Up today to start with this goal.");
                        highestScoresReminders.push("Playing Brain Up workout takes only 15 minutes per day. Put Brain Up into your calendar not to lose a day.");
                    }
                    if (consensus_score == (Math.max(authority_score, commitment_score, consensus_score, reciprocity_score, scarcity_score))) {
                        principles.push("Consensus");
                        self.results.showButtons = false;
                        highestScoresMessages.push("Very well done for working out today! Join other users of Brain Up and work out at least once per day! Keep up with your training!");
                        highestScoresMessages.push("It is very good that you practiced! Follow the path of Brain Up users and play another workout.");
                        highestScoresMessages.push("Nice! The average number of workouts per day is two, and people generally play five days a week.");
                        highestScoresReminders.push("Many of our app users have already finished their memory training today. Join this group now!");
                        highestScoresReminders.push("People like you who play the brain training daily are more likely to benefit from the program and maintain an active and healthy brain!");
                        highestScoresReminders.push("Thousands of people are using apps to improve their memory. Join the group!");
                    }
                    if (reciprocity_score == (Math.max(authority_score, commitment_score, consensus_score, reciprocity_score, scarcity_score))) {
                        principles.push("Reciprocity");
                        self.results.showButtons = false;
                        highestScoresMessages.push("Very good that you worked out today! I really enjoyed working with you today, hope to see you again tomorrow.");
                        highestScoresMessages.push("Very well done for working out today! I will prepare a great workout for you tomorrow! I hope to see you then!");
                        highestScoresMessages.push("Good that you are working out! I can help you even more if you come back tomorrow!");
                        highestScoresReminders.push("We worked really hard to create this app. The best way to show us your appreciation is to do today’s training session.");
                        highestScoresReminders.push("Today’s workout is our new gift for you. To access it open Brain Up now.");
                        highestScoresReminders.push("Brain Up is not a usual brain game, we designed it carefully to provide you with maximum benefits. Play it to see our hard work.");
                    }
                    if (scarcity_score == (Math.max(authority_score, commitment_score, consensus_score, reciprocity_score, scarcity_score))) {
                        principles.push("Scarcity");
                        self.results.showButtons = false;
                        highestScoresMessages.push("I am happy you worked out today! I prepared a new workout just for you, play it tomorrow!");
                        highestScoresMessages.push("Good to see you are working out regularly! Let’s keep going now to get through these workouts while they’re still fresh!");
                        highestScoresMessages.push("Good that you are working out! There is limited time to complete all workouts while staying on schedule, let’s keep going!");
                        highestScoresReminders.push("The Brain Up adapts to the pace with which you learn. This adaptivity means the game is different for every user. Play the Brain Up to access the game that is just tailored for you.");
                        highestScoresReminders.push("If you do not play Brain Up today, you will miss out on a chance to train your brain.");
                        highestScoresReminders.push("The brain games are the most effective if played every day. Play the Brain Up today not to miss your chance to improve your memory!");
                    }
                    var item = principles[Math.floor(Math.random() * principles.length)];
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
    NBackGame.prototype.onDragStart = function (event) {
        console.log(event);
        if (event.srcElement.id == 'btn_position' || event.srcElement.parentElement.id == 'btn_position') {
            if (!this.positionPressed) {
                this.positionPressed = true;
                if (this.block[this.gameRound - this.n] && this.block[this.gameRound][0] == this.block[this.gameRound - this.n][0]) {
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
                if (this.block[this.gameRound - this.n] && this.block[this.gameRound][1] == this.block[this.gameRound - this.n][1]) {
                    //alert('correct sound!');
                    this.results.num_sound_correct += 1;
                }
                else {
                    //alert('incorrect sound!');
                    this.results.num_sound_incorrect += 1;
                }
            }
        }
    };
    NBackGame.prototype.playRound = function (self) {
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
                self.letters[self.block[this.gameRound][1] - 1].play();
            setTimeout(function () { self.activeSquare = -1; }, 500);
            setTimeout(function () { self.playRound(self); }, 3000);
        }
    };
    NBackGame.prototype.start = function () {
        this.gamePlaying = true;
        var self = this;
        setTimeout(function () { self.playRound(self); }, 4500);
        setTimeout(function () { self.countdown_time = 3; }, 500);
        setTimeout(function () { self.countdown(); }, 1500);
    };
    NBackGame.prototype.countdown = function () {
        this.countdown_time = this.countdown_time - 1;
        var self = this;
        if (this.countdown_time != 0)
            setTimeout(function () { self.countdown(); }, 1000);
    };
    NBackGame.prototype.getBlock = function (n) {
        var currentBlock = this.generateBlock(n);
        var blockEval = this.evaluateBlock(currentBlock, n);
        while (blockEval[0] != 6 || blockEval[1] != 6) {
            console.log('===');
            currentBlock = this.generateBlock(n);
            blockEval = this.evaluateBlock(currentBlock, n);
        }
        return currentBlock;
    };
    NBackGame.prototype.evaluateBlock = function (block, n) {
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
    };
    NBackGame.prototype.generateBlock = function (n) {
        // Empty block array
        var thisBlock = [];
        // Populate thisBlock with [0, 0] pairs
        for (var i = 0; i < 20 + n; i++) {
            thisBlock.push([0, 0]);
        }
        // Get the length of the block
        var blockLength = thisBlock.length;
        // Create 4 visual targets in empty spots
        var visuals = 0;
        while (visuals < 4) {
            var visTarg = Math.floor(Math.random() * blockLength);
            if (thisBlock[visTarg + n]) {
                if (thisBlock[visTarg][0] == 0 && thisBlock[visTarg][1] == 0 && thisBlock[visTarg + n][0] == 0 && thisBlock[visTarg + n][1] == 0) {
                    thisBlock[visTarg][0] = 1 + Math.floor(Math.random() * 8);
                    thisBlock[visTarg + n][0] = thisBlock[visTarg][0];
                    visuals++;
                }
                else if (thisBlock[visTarg][0] !== 0 && thisBlock[visTarg][1] == 0 && thisBlock[visTarg + n][0] == 0 && thisBlock[visTarg + n][1] == 0) {
                    thisBlock[visTarg + n][0] = thisBlock[visTarg][0];
                    visuals++;
                }
                else if (thisBlock[visTarg][0] == 0 && thisBlock[visTarg][1] == 0 && thisBlock[visTarg + n][0] !== 0 && thisBlock[visTarg + n][1] == 0) {
                    thisBlock[visTarg][0] = thisBlock[visTarg + n][0];
                    visuals++;
                }
                else {
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
        while (audios < 4) {
            var audTarg = Math.floor(Math.random() * blockLength);
            audioRuns++;
            if (thisBlock[audTarg + n]) {
                if (thisBlock[audTarg][0] == 0 && thisBlock[audTarg][1] == 0 && thisBlock[audTarg + n][0] == 0 && thisBlock[audTarg + n][1] == 0) {
                    thisBlock[audTarg][1] = 1 + Math.floor(Math.random() * 8);
                    thisBlock[audTarg + n][1] = thisBlock[audTarg][1];
                    audios++;
                }
                else if (thisBlock[audTarg][0] == 0 && thisBlock[audTarg][1] !== 0 && thisBlock[audTarg + n][0] == 0 && thisBlock[audTarg + n][1] == 0) {
                    thisBlock[audTarg + n][1] = thisBlock[audTarg][1];
                    audios++;
                }
                else if (thisBlock[audTarg][0] == 0 && thisBlock[audTarg][1] == 0 && thisBlock[audTarg + n][0] == 0 && thisBlock[audTarg + n][1] !== 0) {
                    thisBlock[audTarg][1] = thisBlock[audTarg + n][1];
                    audios++;
                }
                else {
                    if (audioRuns > 1000) {
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
        while (doubles < 2) {
            var dualTarg = Math.floor(Math.random() * blockLength);
            visualRuns++;
            if (thisBlock[dualTarg + n]) {
                if (thisBlock[dualTarg][0] == 0 && thisBlock[dualTarg][1] == 0 && thisBlock[dualTarg + n][0] == 0 && thisBlock[dualTarg + n][1] == 0) {
                    thisBlock[dualTarg][0] = 1 + Math.floor(Math.random() * 8);
                    thisBlock[dualTarg][1] = 1 + Math.floor(Math.random() * 8);
                    thisBlock[dualTarg + n] = thisBlock[dualTarg];
                    doubles++;
                }
                else {
                    if (visualRuns > 1000) {
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
        for (var x = 0; x < blockLength; x++) {
            if (thisBlock[x][0] == 0) {
                thisBlock[x][0] = 1 + Math.floor(Math.random() * 8);
                if (thisBlock[x - n] && thisBlock[x][0] === thisBlock[x - n][0] && thisBlock[x] !== thisBlock[x - n]) {
                    if (thisBlock[x][0] < 8) {
                        thisBlock[x][0] += 1;
                    }
                    else {
                        thisBlock[x][0] -= 1;
                    }
                }
                else if (thisBlock[x + n] && thisBlock[x][0] === thisBlock[x + n][0] && thisBlock[x] !== thisBlock[x + n]) {
                    if (thisBlock[x][0] < 8) {
                        thisBlock[x][0] += 1;
                    }
                    else {
                        thisBlock[x][0] -= 1;
                    }
                }
            }
            if (thisBlock[x][1] == 0) {
                thisBlock[x][1] = 1 + Math.floor(Math.random() * 8);
                if (thisBlock[x - n] && thisBlock[x][1] === thisBlock[x - n][1] && thisBlock[x] !== thisBlock[x - n]) {
                    if (thisBlock[x][1] < 8) {
                        thisBlock[x][1] += 1;
                    }
                    else {
                        thisBlock[x][1] -= 1;
                    }
                }
                else if (thisBlock[x + n] && thisBlock[x][1] === thisBlock[x + n][1] && thisBlock[x] !== thisBlock[x + n]) {
                    if (thisBlock[x][1] < 8) {
                        thisBlock[x][1] += 1;
                    }
                    else {
                        thisBlock[x][1] -= 1;
                    }
                }
            }
        }
        return thisBlock;
    };
    __decorate([
        angular2_onsenui_1.HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NBackGame.prototype, "onDragStart", null);
    NBackGame = __decorate([
        angular2_onsenui_1.Component({
            selector: 'ons-page',
            template: "\n    <ons-toolbar>\n      <div class=\"center\">\n        {{n}} Back\n      </div>\n    </ons-toolbar>\n    <div class=\"content\">\n      <div *ngIf=\"gamePlaying\" style=\"display: flex; flex-direction: column; height: 90vh\">\n        <div style=\"display: flex; flex-grow: 2; min-height:80vw; min-width:80vw\">\n        <div class=\"nback_container\" style=\"width:100%; display: flex; flex-wrap: wrap; border: 1px solid #dbdbdb; box-sizing: border-box\">\n          <div *ngFor=\"let number of numbers\" class=\"nback_compartment\" id=\"nback_{{number}}\" style=\"width: calc(100%/3); border: 1px solid #dbdbdb; box-sizing: border-box; height: calc(100%/3); padding: 8px\">\n            <div class=\"nback_compartment_inner\" style=\"width: 100%; height: 100%; box-sizing: border-box\" [ngClass]=\"{'nback_compartment_selected': number == activeSquare}\">\n            </div>          \n          </div>\n        </div>\n        </div>\n        <div style=\"display: flex; flex-direction: row; flex-grow:1; width:100%; min-height:20vw\">\n        <div class=\"nback_button\" style=\"flex-grow: 1; margin: 2.5%\">\n          <div [ngClass]=\"{'nback_button_pressed': positionPressed}\" class=\"nback_button_inner\" style=\"width: 100%; height: 100%; background-color: #3e81cf; color: #ffffff; display: flex; flex-direction: column; justify-content: center; box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);\" id=\"btn_position\">\n            <img src=\"img/icon_position.svg\" style=\"min-width: 10%\" />\n            <span style=\"font-size: 18pt; font-weight: bold; align-self: center\">Positie</span>\n          </div>\n        </div>\n        <div *ngIf=\"options.mode == 0\" class=\"nback_button\" style=\"flex-grow: 1; margin: 2.5%\">\n          <div [ngClass]=\"{'nback_button_pressed': soundPressed}\" class=\"nback_button_inner\" style=\"width: 100%; height: 100%; background-color: #3e81cf; display: flex; flex-direction: column; justify-content: center; color: #ffffff; box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);\" id=\"btn_sound\">\n            <img src=\"img/icon_sound.svg\" style=\"min-width: 10%\" />\n            <span style=\"font-size: 18pt; font-weight: bold; align-self: center\">Geluid</span>\n          </div>\n        </div>      \n      </div>\n      </div>\n\n      <div *ngIf=\"!gamePlaying\" style=\"display: flex; width: 100%; height: 100%; align-items: center; justify-content: center\" (click)=\"start()\">\n        <div style=\"background-color: #3e81cf; color: #ffffff; width: 60%; height: 40%; display: flex; flex-direction: column; justify-content: center; align-items: center; box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23); font-size: 18pt; font-weight: bold\">\n          Start!\n        </div>\n      </div>\n\n      <div *ngIf=\"countdown_time != 0\" style=\"position: fixed; top: 0px; left: 0px; display: flex; width: 100%; height: 100%; align-items: center; justify-content: center; font-weight: bold; font-size: 128pt\">\n        {{countdown_time}}\n      </div>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [angular2_onsenui_1.Injector, dataService_1.DataService, cordovaService_1.CordovaService])
    ], NBackGame);
    return NBackGame;
}());
exports.NBackGame = NBackGame;
var WelcomeScreen = /** @class */ (function () {
    function WelcomeScreen(injector, dataService) {
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
    WelcomeScreen.prototype.next = function () {
        this.parent.gotoPage(NBackInformation, this.data);
    };
    WelcomeScreen = __decorate([
        angular2_onsenui_1.Component({
            selector: 'ons-page',
            providers: [dataService_1.DataService],
            template: "\n    <ons-toolbar>\n    <div class=\"left\">\n    </div>    \n      <div class=\"center\">Brain Up</div>\n    </ons-toolbar>\n    <div>\n      <div class=\"content\">\n        <div class=\"likert_container\"> \n          <div class=\"coach_container coach_container_middle\">\n            <coach [coachObject]=\"data.coach\" *ngIf=\"data !== null && data.coach !== null\"></coach>\n          </div>\n\n          <div class=\"likert_content\">\n            <div>\n              <h1>Welkom terug!</h1>\n              Ik ben blij om je terug te zien! Laten we gaan trainen!<br /><br />\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"buttons\">\n        <ons-button (click)=\"next()\">Let's go!</ons-button>\n      </div>\n      <br />\n      <br />\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [angular2_onsenui_1.Injector, dataService_1.DataService])
    ], WelcomeScreen);
    return WelcomeScreen;
}());
exports.WelcomeScreen = WelcomeScreen;
var NBackResults = /** @class */ (function () {
    function NBackResults(injector, dataService) {
        this.modes = [
            'Dubbel (geluid en positie )',
            'Single (alleen geluid)'
        ];
        this.dataService = null;
        this.parent = injector.get('parent');
        this.data = injector.get('data');
        this.dataService = dataService;
        var self = this;
        dataService.saveEvent('game completed');
        dataService.saveScore(this.data.mode, this.data.n, this.data.num_position_correct, this.data.num_position_incorrect, this.data.num_sound_correct, this.data.num_sound_incorrect);
        if (self.data == null || self.data.coach == null) {
            dataService.getCoachObject().then(function (result) {
                if (self.data == null) {
                    self.data = {};
                }
                if (result.result !== undefined) {
                    self.data.coach = result.result;
                    self.jobID = self.data.coach.profession_id;
                }
            });
        }
    }
    NBackResults.prototype.playagain = function () {
        this.parent.gotoPage(NBackConfiguration, this.data);
    };
    NBackResults.prototype.yesFirstPage = function () {
        this.dataService.saveEvent("user_clicked_yes");
        this.parent.gotoPage(questionnaire_component_2.CloseApp, this.data);
    };
    NBackResults.prototype.exit = function () {
        this.dataService.saveEvent("user_exited_the_app");
        this.parent.gotoPage(questionnaire_component_2.ExitApp, this.data);
    };
    NBackResults = __decorate([
        angular2_onsenui_1.Component({
            selector: 'ons-page',
            providers: [dataService_1.DataService],
            template: "\n    <ons-toolbar>\n    <div class=\"left\">\n    </div>    \n      <div class=\"center\">Je resultaten</div>\n    </ons-toolbar>\n    <div>\n      <div class=\"content\">\n        <div class=\"likert_container\"> \n          <div class=\"coach_container\">\n            <coach [coachObject]=\"data.coach\" *ngIf=\"data !== null && data.coach !== null\"></coach>\n          </div>\n\n          <div class=\"likert_content\">\n            <div>\n              <h1>Goed gedaan!</h1>\n              <!--<p style=\"font-size:28px\">{{data.selectedMessage}}</p>-->\n              Je hebt een <strong>{{modes[data.mode]}} {{data.n}}-back</strong> game gespeeld met een score van:<br /><br />\n              <div style=\"text-align: center; line-height: 34pt\"><strong>{{data.num_position_correct}}/6</strong> visuele signalen, <strong>{{data.num_position_incorrect}}</strong> onjuist</div>\n              <div style=\"text-align: center;\" *ngIf=\"data.mode == 0\"><strong>{{data.num_sound_correct}}/6</strong> audio signalen, <strong>{{data.num_sound_incorrect}}</strong> onjuist</div><br /><br />\n            </div>\n          </div>\n        </div>\n        <div class=\"buttons\">\n                  <ons-button (click)=\"playagain()\" >Opnieuw spelen</ons-button> \n                  <ons-button (click)=\"exit()\" >Stop</ons-button> \n        </div>\n      </div>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [angular2_onsenui_1.Injector, dataService_1.DataService])
    ], NBackResults);
    return NBackResults;
}());
exports.NBackResults = NBackResults;
var SplashScreen = /** @class */ (function () {
    function SplashScreen(injector, dataService, cordovaService) {
        this.dataService = null;
        this.cordovaService = null;
        this.parent = injector.get('parent');
        this.data = injector.get('data');
        this.dataService = dataService;
        this.cordovaService = cordovaService;
    }
    SplashScreen.prototype.enter = function () {
        var _this = this;
        this.dataService.getSetting("isIntroCompleted").then(function (result) {
            if (result && result.settingValue == 1) {
                _this.dataService.getSetting("isCodeCompleted").then(function (result) {
                    if (result && result.settingValue == 1) {
                        console.log('nback config');
                        _this.parent.gotoPage(WelcomeScreen, null);
                    }
                    else {
                        console.log('survey code 2');
                        _this.parent.gotoPage(SurveyCode, null);
                    }
                });
            }
            else {
                console.log('consent screen');
                _this.parent.gotoPage(ConsentScreen, null);
            }
        });
    };
    SplashScreen.prototype.leave = function () {
        console.log('Leave page');
        this.parent.gotoPage(questionnaire_component_2.ExitApp, null);
    };
    SplashScreen = __decorate([
        angular2_onsenui_1.Component({
            selector: 'ons-page',
            providers: [dataService_1.DataService],
            template: "\n    <ons-toolbar>\n    <div class=\"left\">\n    </div>    \n      <div class=\"center\">Brain Up</div>\n    </ons-toolbar>\n\n    <div>\n      <div class=\"content\">\n        <div class=\"likert_container\"> \n            <div style=\"max-width: 500px; max-height:400px;  margin:0 auto;\">\n              <h1 style=\"text-align:center\">Welkom Bij Brain Up!</h1>\n              <img style=\"display:block; margin:auto;\" src=\"img/brain-logo.jpg\" width=\"417\" height=\"208\" >\n              <div class=\"buttons\">\n                 <ons-button (click)=\"enter()\" style=\"float:left\">Start!</ons-button>\n                 <ons-button (click)=\"leave()\" style=\"float:right\">Stop!</ons-button>\n              </div>\n            </div>\n        </div>\n      </div>\n    </div>\n\n  "
        }),
        __metadata("design:paramtypes", [angular2_onsenui_1.Injector, dataService_1.DataService, cordovaService_1.CordovaService])
    ], SplashScreen);
    return SplashScreen;
}());
exports.SplashScreen = SplashScreen;
var ConsentScreen = /** @class */ (function () {
    function ConsentScreen(injector, dataService, cordovaService) {
        this.done = false;
        this.dataService = null;
        this.cordovaService = null;
        this.parent = injector.get('parent');
        this.data = injector.get('data');
        this.dataService = dataService;
        this.cordovaService = cordovaService;
        this.data = { code: "" };
    }
    ConsentScreen.prototype.codeChange = function () {
        if (this.data.code != "" && this.data.code == "07091997") {
            this.done = !this.done;
        }
    };
    ConsentScreen.prototype.next = function () {
        var _this = this;
        this.dataService.getGroup().then(function (result) {
            console.log(result.result);
            _this.cordovaService.sendTag("group", result.result);
        });
        this.dataService.getToken().then(function (result) {
            _this.cordovaService.setExternalUserID(result);
        });
        console.log('questionnaire intro');
        this.parent.gotoPage(questionnaire_component_1.QuestionnaireIntro, null);
    };
    ConsentScreen = __decorate([
        angular2_onsenui_1.Component({
            selector: 'ons-page',
            providers: [dataService_1.DataService],
            template: "\n      <ons-toolbar>\n    <div class=\"left\">\n    </div>    \n      <div class=\"center\">Brain Up</div>\n    </ons-toolbar>\n\n    <div>\n      <div class=\"content page__content page--material__content\">\n        <div class=\"likert_container\"> \n            <div class=\"intro_text\">\n              <h1> Studie Code </h1>\n              <p> Vul hieronder de studie code in die je per mail hebt ontvangen</p> \n              <br />\n              <ons-input type=\"number\" placeholder=\"studie code\" (keyup)=\"codeChange()\" [(value)]=\"data.code\"></ons-input>\n              <!--\n              Bedankt voor uw interesse in mijn onderzoek. Lees alstublieft de onderstaande informatie. <br /><br />\n              <b> Doel van het onderzoek </b> Het doel van deze studie is om het gebruik van een hersentrainingstoepassing, genaamd BrainUp, gedurende de periode van een week te evalueren. <br /><br />\n              <b>Wat er van je wordt gevraagd</b> Als u ermee instemt deel te nemen aan deze studie, wordt u gevraagd om de game een week op uw telefoon te spelen. Hoe vaak je speelt is aan jou, we hopen echter dat je vooruitgang boekt gedurende de week. Tijdens deze week ontvangt u twee keer per dag herinneringen op uw telefoon. Aan het einde van de studie wordt een samenvatting van onze metingen naar u verzonden. <br /><br />\n              <b>Vertrouwelijkheid</b> Uw antwoorden zullen vertrouwelijk zijn. De gegevens van deze studie worden priv\u00E9 bewaard. In elk soort rapport dat openbaar wordt gemaakt, wordt alle informatie die het mogelijk maakt om u te identificeren, niet opgenomen. Alleen de onderzoeker heeft toegang tot de data.<br /><br />\n              <b>Deelnemen is vrijwillig</b> Taking part in this study is completely voluntary. If you decide to take part, you are free to withdraw at any time. If you decide to withdraw from participation your data will not be used for analysis. You can also withdraw after participation, to do this simply contact one of the researchers (see details below) and provide the researcher with the code from the \u201Cthank you\u201D screen, which you will be asked to copy and paste into the survey. Please note, however, that if you decide to withdraw at a later point, your data might still be used in a collated form and published. Please also note that <i>we will only reimburse complete entrance.</i><br /><br />\n              If you have a concern about any aspect of your participation or any other queries please raise this with the researchers. The researchers conducting this study are Marta Kaczmarczyk (<a href=\"mailto:m.e.kaczmarczyk@tue.nl\">m.e.kaczmarczyk@tue.nl</a>) and Tudor Vacaretu (<a href=\"mailto:t.vacaretu@tue.nl\">t.vacaretu@tue.nl</a>).<br /><br />\n              However, if you would like to contact an independent party please contact the Head of Department (Prof. dr. Panos Markopulos <a href=\"mailto:p.markopoulos@tue.nl\">p.markopoulos@tue.nl</a>). Please print this consent form for your records, if you wish, by clicking <a href=\"javascript:window.print()\">here</a>.<br /><br /> \n              <ons-input type=\"checkbox\" (change)=\"agree()\"></ons-input> Ik ga akkoord met de bovenstaande verklaring <br /><br />-->\n            </div>\n            <br />\n            <div class=\"buttons\" style=\"text-align: left\">\n                <ons-button (click)=\"next()\" [disabled]=\"!done\">Next</ons-button>\n            </div>\n        </div>\n       </div>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [angular2_onsenui_1.Injector, dataService_1.DataService, cordovaService_1.CordovaService])
    ], ConsentScreen);
    return ConsentScreen;
}());
exports.ConsentScreen = ConsentScreen;
var SurveyCode = /** @class */ (function () {
    function SurveyCode(injector, dataService, cordovaService) {
        this.done = false;
        this.dataService = null;
        this.cordovaService = null;
        this.parent = injector.get('parent');
        this.data = injector.get('data');
        this.dataService = dataService;
        this.cordovaService = cordovaService;
        this.data = { code2: "" };
    }
    SurveyCode.prototype.codeChange = function () {
        if (this.data.code2 != "" && this.data.code2 == "12052019") {
            this.done = !this.done;
        }
    };
    SurveyCode.prototype.next = function () {
        var _this = this;
        console.log('');
        this.dataService.saveSetting("isCodeCompleted", 1).then(function (result) {
            console.log(result);
            _this.parent.gotoPage(WelcomeScreen, null);
        });
    };
    SurveyCode = __decorate([
        angular2_onsenui_1.Component({
            selector: 'ons-page',
            providers: [dataService_1.DataService],
            template: "\n      <ons-toolbar>\n    <div class=\"left\">\n    </div>    \n      <div class=\"center\">Brain Up</div>\n    </ons-toolbar>\n\n    <div>\n      <div class=\"content page__content page--material__content\">\n        <div class=\"likert_container\"> \n            <div class=\"intro_text\">\n              <h1> Studie Code </h1>\n              <p> Vul hieronder de tweede studie code in die je per mail hebt ontvangen</p> \n              <br />\n              <ons-input type=\"number\" placeholder=\"studie code\" (keyup)=\"codeChange()\" [(value)]=\"data.code2\"></ons-input>\n            </div>\n            <br />\n            <div class=\"buttons\" style=\"text-align: left\">\n                <ons-button (click)=\"next()\" [disabled]=\"!done\">Next</ons-button>\n            </div>\n        </div>\n       </div>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [angular2_onsenui_1.Injector, dataService_1.DataService, cordovaService_1.CordovaService])
    ], SurveyCode);
    return SurveyCode;
}());
exports.SurveyCode = SurveyCode;
//# sourceMappingURL=nback.component.js.map