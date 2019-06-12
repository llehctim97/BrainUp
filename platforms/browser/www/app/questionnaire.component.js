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
var dataService_1 = require("./dataService");
var questionnaireItemServices_1 = require("./questionnaireItemServices");
var nback_component_1 = require("./nback.component");
var QuestionnaireIntro = /** @class */ (function () {
    function QuestionnaireIntro(injector, dataService, hairstyleService, glassesService, shirtService, pantsService, shoesService, watchService, outfitService) {
        this.progress = 0;
        this.done = false;
        this.isAuthority = false;
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
                        text_top: '<h1>Welcome!</h1>Great to see you start the brain training game.<br />To get you started we will ask you to fill in your personal information:<br />',
                        time_on_task: 0
                    },
                    {
                        page_id: 'coach_gender',
                        text_top: '<h1>Introduction</h1>Before you start, we would like you to choose your virtual assistant. The assistant will help you with navigating through the game. We would like to make our app more personal for you that is why you can choose how this virtual assistant will look like. To make it even more tailored for you, the assistant will ask you some questions.<br /><br />',
                        time_on_task: 0
                    },
                    {
                        page_id: 'coach_hairstyle',
                        text_top: '<h1>Choose your coach\'s hairstyle</h1>Please select the item that you like best.<br /><br />',
                        items: hairstyleService.getAllHairstyles(),
                        onItemChange: function (data, value) { data.coach.hairstyle_id = value; },
                        selected_item: -1,
                        time_on_task: 0,
                        isCoachVisible: false
                    },
                    {
                        page_id: 'coach_talking',
                        text_top: '<br /><span class="green">Hello!</span><br />My name is Alex, pleased to meet you!<br />It would be nice to get some help with selecting the outfit and accessories I will wear throughout the game.',
                        coach_talking: true,
                        time_on_task: 0
                    },
                    {
                        page_id: 'coach_glasses',
                        text_top: '<h1>Choose the glasses for your coach</h1>Please select the item that you like best.',
                        items: glassesService.getAllGlasses(),
                        onItemChange: function (data, value) { data.coach.glasses_id = value; },
                        selected_item: -1,
                        time_on_task: 0
                    },
                    {
                        page_id: 'question_consent_1',
                        text_top: 'I heard that many people prefer to have others help them choose accessories.<br />How often do you rely on the help of other people to know what to do?',
                        likert: [
                            'Never',
                            'Very rarely',
                            'Rarely',
                            'Neutral',
                            'Frequently',
                            'Very frequently',
                            'Always'
                        ],
                        selected_item: -1,
                        time_on_task: 0,
                        onItemChange: function (data, value) { data.persuasion_profile.consensus.q1 = value; }
                    },
                    {
                        page_id: 'question_consent_2',
                        text_top: 'Besides asking for help, how important is it for you to fit in with a group?',
                        likert: [
                            'Extremely unimportant',
                            'Very unimportant',
                            'Unimportant',
                            'Neutral',
                            'Important',
                            'Very important',
                            'Extremely important'
                        ],
                        selected_item: -1,
                        time_on_task: 0,
                        onItemChange: function (data, value) { data.persuasion_profile.consensus.q2 = value; }
                    },
                    {
                        page_id: 'coach_shirt',
                        text_top: '<h1>Choose the t-shirt for your coach</h1>Please select the item that you like best.',
                        items: shirtService.getAllShirts(),
                        onItemChange: function (data, value) { data.coach.shirt_id = value; },
                        selected_item: -1,
                        time_on_task: 0
                    },
                    {
                        page_id: 'question_authority_1',
                        text_top: 'Once, I got tips from a fashion designer on how to dress.<br />How often do you follow the advice of experts?',
                        likert: [
                            'Never',
                            'Very rarely',
                            'Rarely',
                            'Neutral',
                            'Frequently',
                            'Very frequently',
                            'Always'
                        ],
                        selected_item: -1,
                        time_on_task: 0,
                        onItemChange: function (data, value) { data.persuasion_profile.authority.q1 = value; }
                    },
                    {
                        page_id: 'question_authority_2',
                        text_top: 'Okay. Imagine that both the fashion designer and your peer give you clothing tips.<br />How inclined are you to listen to the expert’s advice instead of an advice from a peer?',
                        likert: [
                            'Extremely uninclined',
                            'Very uninclined',
                            'Uninclined',
                            'Neutral',
                            'Inclined',
                            'Very inclined',
                            'Extremely inclined'
                        ],
                        selected_item: -1,
                        time_on_task: 0,
                        onItemChange: function (data, value) { data.persuasion_profile.authority.q2 = value; }
                    },
                    {
                        page_id: 'coach_pants',
                        text_top: '<h1>Choose the pants for your coach</h1>Please select the item that you like best.',
                        items: pantsService.getAllPants(),
                        onItemChange: function (data, value) { data.coach.pants_id = value; },
                        selected_item: -1,
                        time_on_task: 0
                    },
                    {
                        page_id: 'coach_shoes',
                        text_top: '<h1>Choose the shoes for your coach</h1>Please select the item that you like best.',
                        items: shoesService.getAllShoes(),
                        onItemChange: function (data, value) { data.coach.shoes_id = value; },
                        selected_item: -1,
                        time_on_task: 0
                    },
                    {
                        page_id: 'question_reciprocity_1',
                        text_top: 'Imagine that you bought shoes online and the package was delivered to your neighbour’s house. He then later brought the package to you. How likely would you be to pay back this favor?',
                        likert: [
                            'Extremely unlikely',
                            'Very unlikely',
                            'Unlikely',
                            'Neutral',
                            'Likely',
                            'Very likely',
                            'Extremely likely'
                        ],
                        selected_item: -1,
                        time_on_task: 0,
                        onItemChange: function (data, value) { data.persuasion_profile.reciprocity.q1 = value; }
                    },
                    {
                        page_id: 'question_reciprocity_2',
                        text_top: 'Okay! Another question: When you receive a gift, how likely are you to feel obliged to return a gift?',
                        likert: [
                            'Extremely unlikely',
                            'Very unlikely',
                            'Unlikely',
                            'Neutral',
                            'Likely',
                            'Very likely',
                            'Extremely likely'
                        ],
                        selected_item: -1,
                        time_on_task: 0,
                        onItemChange: function (data, value) { data.persuasion_profile.reciprocity.q2 = value; }
                    },
                    {
                        page_id: 'coach_watch',
                        text_top: '<h1>Choose the watch for your coach</h1>Please select the item that you like best.',
                        items: watchService.getAllWatches(),
                        onItemChange: function (data, value) { data.coach.watch_id = value; },
                        selected_item: -1,
                        time_on_task: 0
                    },
                    {
                        page_id: 'question_scarcity_1',
                        text_top: 'This watch looks like it’s handmade. How often do you value tailored products over mass products?',
                        likert: [
                            'Never',
                            'Very rarely',
                            'Rarely',
                            'Neutral',
                            'Frequently',
                            'Very frequently',
                            'Always'
                        ],
                        selected_item: -1,
                        time_on_task: 0,
                        onItemChange: function (data, value) { data.persuasion_profile.scarcity.q1 = value; }
                    },
                    {
                        page_id: 'question_scarcity_2',
                        text_top: 'Ok! Imagine that you bought this watch in your favourite store, which is about to go out of business. How likely are you to visit it, since it’s your last chance?',
                        likert: [
                            'Extremely unlikely',
                            'Very unlikely',
                            'Unlikely',
                            'Neutral',
                            'Likely',
                            'Very likely',
                            'Extremely likely'
                        ],
                        selected_item: -1,
                        time_on_task: 0,
                        onItemChange: function (data, value) { data.persuasion_profile.scarcity.q2 = value; }
                    },
                    {
                        page_id: 'question_commitment_1',
                        text_top: 'Oh no! We got so caught up in choosing this outfit that I forgot an appointment! If this would happen to you, how likely would you commit to making up for a forgotten appointment?',
                        likert: [
                            'Extremely unlikely',
                            'Very unlikely',
                            'Unlikely',
                            'Neutral',
                            'Likely',
                            'Very likely',
                            'Extremely likely'
                        ],
                        selected_item: -1,
                        time_on_task: 0,
                        onItemChange: function (data, value) { data.persuasion_profile.commitment.q1 = value; },
                        coach_timepressure: 1 /* This could be prettier by making a more general 'pose', but it's good enough for now */
                    },
                    {
                        page_id: 'question_commitment_2',
                        text_top: 'Good to know! I have another question for you: How often do you do what you promised?',
                        likert: [
                            'Never',
                            'Very rarely',
                            'Rarely',
                            'Neutral',
                            'Frequently',
                            'Very frequently',
                            'Always'
                        ],
                        selected_item: -1,
                        time_on_task: 0,
                        onItemChange: function (data, value) {
                            data.persuasion_profile.commitment.q2 = value;
                            this.checkIfMaxScoreIsComputed;
                        }
                    },
                    {
                        page_id: 'coach_profession',
                        text_top: '<h1>Choose a job for your coach</h1>Please select the item that you like best.',
                        items: outfitService.getAllOutfits(this.isAuthority),
                        onItemChange: function (data, value) { data.coach.profession_id = value; },
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
                    age: ""
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
        dataService.getToken().then(function (result) {
            console.log("Token is");
            console.log(result);
            console.log(result.error);
        });
        this.done = this.data.participant.age != "" && this.data.participant.gender_id != -1; //&& this.data.participant.reminder_time != "";
        this.dataService = dataService;
        this.progress = Math.round(this.data.current_page_id / this.data.pages.length * 100);
        dataService.getPersuasionProfile().then(function (result) {
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
    QuestionnaireIntro.prototype.checkIfMaxScoreIsComputed = function () {
        if ((this.data.persuasion_profile.commitment.q1 != null) &&
            (this.data.persuasion_profile.commitment.q2 != null) &&
            (this.data.persuasion_profile.reciprocity.q1 != null) &&
            (this.data.persuasion_profile.reciprocity.q2 != null) &&
            (this.data.persuasion_profile.consensus.q1 != null) &&
            (this.data.persuasion_profile.consensus.q2 != null) &&
            (this.data.persuasion_profile.authority.q1 != null) &&
            (this.data.persuasion_profile.authority.q2 != null) &&
            (this.data.persuasion_profile.scarcity.q1 != null) &&
            (this.data.persuasion_profile.scarcity.q1 != null)) {
            this.computePersProfile;
            console.log('got here');
        }
        else {
            window.setTimeout("checkIfMaxScoreIsComputed();", 100);
        }
    };
    QuestionnaireIntro.prototype.computePersProfile = function () {
        var profileScores = [];
        profileScores[0] = this.data.persuasion_profile.commitment.q1 + this.data.persuasion_profile.commitment.q2;
        profileScores[1] = this.data.persuasion_profile.reciprocity.q1 + this.data.persuasion_profile.reciprocity.q2;
        profileScores[2] = this.data.persuasion_profile.consensus.q1 + this.data.persuasion_profile.consensus.q2;
        profileScores[3] = this.data.persuasion_profile.authority.q1 + this.data.persuasion_profile.authority.q2;
        profileScores[4] = this.data.persuasion_profile.scarcity.q1 + this.data.persuasion_profile.scarcity.q2;
        var max = Math.max(profileScores[0], profileScores[1], profileScores[2], profileScores[3], profileScores[4], profileScores[5]);
    };
    QuestionnaireIntro.prototype.next = function () {
        this.data.pages[this.data.current_page_id].time_on_task = new Date().getTime() - this.time_started.getTime();
        // Send to server
        var self = this;
        this.dataService.saveAnswer('participant_reminder_time', this.data.participant.reminder_time, this.data.pages[this.data.current_page_id].time_on_task);
        this.dataService.saveAnswer('participant_gender_id', this.data.participant.gender_id, this.data.pages[this.data.current_page_id].time_on_task)
            .then(function () {
            self.dataService.saveAnswer('participant_age', self.data.participant.age, self.data.pages[self.data.current_page_id].time_on_task)
                .then(function () {
                self.data.current_page_id++;
                self.parent.gotoPage(QuestionnaireSelectGender, self.data);
                //self._navigator.element.pushPage(QuestionnaireSelectGender, {data: self.data});
            });
        });
    };
    QuestionnaireIntro.prototype.setGender = function (value) {
        this.data.participant.gender_id = value;
        if (this.data.participant.age != "" && this.data.participant.gender_id != -1) {
            this.done = true;
        }
        else {
            this.done = false;
        }
    };
    QuestionnaireIntro.prototype.setTime = function () {
        var e = (document.getElementById("choose-sel"));
        var sel = e.selectedIndex;
        var opt = e.options[sel];
        var CurValue = opt.value;
        var CurText = opt.text;
        console.log("Reminder time is");
        console.log(CurValue);
        this.data.participant.reminder_time = CurValue;
        if (this.data.participant.age != "" && this.data.participant.gender_id != -1) {
            this.done = true;
        }
        else {
            this.done = false;
        }
    };
    QuestionnaireIntro.prototype.ageChange = function () {
        //if (this.data.participant.age != "" && !isNaN(this.data.participant.age) && this.data.participant.gender_id != -1) {
        // this.done = true;
        //}
        //else {
        //  this.done = false;
        //}
        if (this.data.participant.age != "" && this.data.participant.gender_id != -1) {
            this.done = true;
        }
        else {
            this.done = false;
        }
        console.log("new age is");
        console.log(this.data.participant.age);
    };
    QuestionnaireIntro = __decorate([
        core_1.Component({
            selector: 'ons-page',
            providers: [dataService_1.DataService, questionnaireItemServices_1.HairstyleService, questionnaireItemServices_1.GlassesService, questionnaireItemServices_1.ShirtService, questionnaireItemServices_1.PantsService, questionnaireItemServices_1.ShoesService, questionnaireItemServices_1.WatchService, questionnaireItemServices_1.OutfitService],
            template: "\n    <ons-toolbar>\n      <div class=\"center\" style=\"display: flex\">\n        <div class=\"toolbar_percentage\">0%</div>\n        <!-- Onsen comes with a toolbar but we use our own for now.. @TODO: style this for iOS -->\n        <div class=\"toolbar_progress\">\n          <div class=\"toolbar_progress_fill\" [style.width.%]=\"progress\"></div>\n        </div>\n        <div class=\"toolbar_percentage\">100%</div> \n      </div>    \n    </ons-toolbar>  \n    <div class=\"content\"  style=\"font-size:24px\">\n      <div class=\"intro_text\" [innerHTML]=\"data.pages[data.current_page_id].text_top\"></div><br /><br />\n\n      <div class=\"demographics\">        \n        <!--<div class=\"input_label\">Gender</div>-->\n        <ons-input float type=\"radio\" name=\"gender_select\" (change)=\"setGender(0)\" [checked]=\"data.participant.gender_id == 0\"></ons-input> Male\n        <ons-input float type=\"radio\" name=\"gender_select\" (change)=\"setGender(1)\" [checked]=\"data.participant.gender_id == 1\" style=\"margin-left: 32px\"></ons-input> Female\n\n        <br /><br />\n        <!--<div class=\"input_label\">Age</div>-->\n        <ons-input placeholder=\"Type in your age\" type=\"number\" (keyup)=\"ageChange()\" [(value)]=\"data.participant.age\"></ons-input><br /><br /><br />\n        <!--\n         <label> We will remind you about playing the game through notifications (short messages sent to you on your device). Please set up a convenient for you time for these messages.<br /><br /></label> \n         <ons-select id=\"choose-sel\" (change)=\"setTime()\" >\n            <option value=\"01:00\" >01:00</option>\n            <option value=\"02:00\" >02:00</option>\n            <option value=\"03:00\" >03:00</option>\n            <option value=\"04:00\" >04:00</option>\n            <option value=\"05:00\" >05:00</option>\n            <option value=\"06:00\" >06:00</option>\n            <option value=\"07:00\" >07:00</option>\n            <option value=\"08:00\" >08:00</option>\n            <option value=\"09:00\" >09:00</option>\n            <option value=\"10:00\" >10:00</option>\n            <option value=\"11:00\" >11:00</option>\n            <option value=\"12:00\" >12:00</option>\n            <option value=\"13:00\" >13:00</option>\n            <option value=\"14:00\" >14:00</option>\n            <option value=\"15:00\" >15:00</option>\n            <option value=\"16:00\" >16:00</option>\n            <option value=\"17:00\" >17:00</option>\n            <option value=\"18:00\" >18:00</option>\n            <option value=\"19:00\" >19:00</option>\n            <option value=\"20:00\" >20:00</option>\n            <option value=\"21:00\" >21:00</option>\n            <option value=\"22:00\" >22:00</option>\n            <option value=\"23:00\" >23:00</option>\n         </ons-select> \n       --> \n       </div>\n       <br />\n      <div class=\"buttons\" style=\"text-align: left\">\n        <ons-button (click)=\"next()\" [disabled]=\"!done\">Next</ons-button>\n      </div>\n      <br />\n      <br />\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [core_1.Injector, dataService_1.DataService, questionnaireItemServices_1.HairstyleService, questionnaireItemServices_1.GlassesService, questionnaireItemServices_1.ShirtService, questionnaireItemServices_1.PantsService, questionnaireItemServices_1.ShoesService, questionnaireItemServices_1.WatchService, questionnaireItemServices_1.OutfitService])
    ], QuestionnaireIntro);
    return QuestionnaireIntro;
}());
exports.QuestionnaireIntro = QuestionnaireIntro;
var QuestionnaireSelectGender = /** @class */ (function () {
    function QuestionnaireSelectGender(injector, dataService) {
        this.progress = 0;
        this.selected_item = -1;
        //this.data = _params.data;
        this.parent = injector.get('parent');
        this.data = injector.get('data');
        this.time_started = new Date();
        this.progress = Math.round((this.data.current_page_id + 1) / this.data.pages.length * 100);
        this.dataService = dataService;
        // This page might have been converted into a 'normal' step (with 2 items and a provider) as well.. Next time!
        this.selected_item = this.data.coach.gender_id;
    }
    QuestionnaireSelectGender.prototype.next = function () {
        var _this = this;
        this.data.pages[this.data.current_page_id].time_on_task = new Date().getTime() - this.time_started.getTime();
        var self = this;
        // Send data to server
        this.dataService.saveAnswer('coach_gender_id', this.data.coach.gender_id, this.data.pages[this.data.current_page_id].time_on_task)
            .then(function () {
            console.log(_this);
            self.data.current_page_id++;
            //self._navigator.element.pushPage(QuestionnairePage, {data: self.data});
            self.parent.gotoPage(QuestionnairePage, self.data);
        });
    };
    QuestionnaireSelectGender.prototype.back = function () {
        // What to do with time spent on this page? -> for now we ignore it..
        this.data.current_page_id = this.data.current_page_id - 1;
        this.parent.gotoPage(QuestionnaireIntro, this.data);
    };
    QuestionnaireSelectGender.prototype.setCoachGender = function (value) {
        this.data.coach.gender_id = value;
        this.selected_item = value;
    };
    QuestionnaireSelectGender = __decorate([
        core_1.Component({
            selector: 'ons-page',
            providers: [dataService_1.DataService],
            template: "\n    <ons-toolbar>\n      <div class=\"center\" style=\"display: flex\">\n        <div class=\"toolbar_percentage\">0%</div>\n        <!-- Onsen comes with a toolbar but we use our own for now.. @TODO: style this for iOS -->\n        <div class=\"toolbar_progress\">\n          <div class=\"toolbar_progress_fill\" [style.width.%]=\"progress\"></div>\n        </div>\n        <div class=\"toolbar_percentage\">100%</div> \n      </div>\n    </ons-toolbar>\n    <div class=\"content\">\n        <div class=\"intro_text\" [innerHTML]=\"data.pages[data.current_page_id].text_top\"></div>\n        <div style=\"text-align: center; font-weight: bold\">Choose the gender of your coach:</div>\n\n        <div class=\"choice_container\">\n          <div class=\"choice_item\" (click)=\"setCoachGender(0)\" [ngClass]=\"{'item_selected': selected_item == 0}\" style=\"width: calc(100%/6)\">\n            <img src=\"img/icon_male.svg\"/>\n\n            Male\n          </div>\n          <div class=\"choice_item\" (click)=\"setCoachGender(1)\" [ngClass]=\"{'item_selected': selected_item == 1}\" style=\"width: calc(100%/6)\">\n            <img src=\"img/icon_female.svg\"/>\n\n            Female\n          </div>\n        </div><br />\n\n        <div class=\"buttons\">\n          <ons-button (click)=\"back()\">Back</ons-button>\n          <ons-button (click)=\"next()\" [disabled]=\"selected_item == -1\">Next</ons-button>\n        </div>\n        <br />\n        <br />\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [core_1.Injector, dataService_1.DataService])
    ], QuestionnaireSelectGender);
    return QuestionnaireSelectGender;
}());
exports.QuestionnaireSelectGender = QuestionnaireSelectGender;
var ExitApp = /** @class */ (function () {
    function ExitApp(injector, dataService) {
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
    ExitApp = __decorate([
        core_1.Component({
            selector: 'ons-page',
            providers: [dataService_1.DataService],
            template: "\n  <ons-toolbar>\n    <div class=\"left\">\n    </div>    \n      <div class=\"center\">Till next time</div>\n    </ons-toolbar>\n    <div>\n      <div class=\"content\" style=\"text-align: center;\">\n          <div class=\"coach_container\">\n            <coach [coachObject]=\"data.coach\" *ngIf=\"data !== null && data.coach !== null\"></coach>\n          </div>\n\n          <h1>Don't forget to exercise daily!</h1>\n          It is well known that physical exercise leads to a longer and happier life. So what about exercise for your brain? <br />\n          We hope to see you again soon!\n      </div>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [core_1.Injector, dataService_1.DataService])
    ], ExitApp);
    return ExitApp;
}());
exports.ExitApp = ExitApp;
var CloseApp = /** @class */ (function () {
    function CloseApp(injector, dataService) {
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
    CloseApp = __decorate([
        core_1.Component({
            selector: 'ons-page',
            providers: [dataService_1.DataService],
            template: "\n  <ons-toolbar>\n    <div class=\"left\">\n    </div>    \n      <div class=\"center\" style=\"text-align: center;\">Great that you commited to exercise again! Hope to see you again soon!</div>\n    </ons-toolbar>\n    <div>\n      <div class=\"content\" style=\"text-align: center;\">\n          <div class=\"coach_container\">\n            <coach [coachObject]=\"data.coach\" *ngIf=\"data !== null && data.coach !== null\"></coach>\n          </div>\n\n          <h1>Don't forget to exercise daily!</h1>\n          It is well known that physical exercise leads to a longer and happier life. So what about exercise for your brain? <br />\n          We hope to see you again soon!\n      </div>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [core_1.Injector, dataService_1.DataService])
    ], CloseApp);
    return CloseApp;
}());
exports.CloseApp = CloseApp;
var QuestionnairePage = /** @class */ (function () {
    function QuestionnairePage(injector, dataService) {
        this.done = false;
        this.progress = 0;
        this.selected_item = -1;
        this.cscode = '';
        this.parent = null;
        this.triggerChange = false;
        this.isCoachVisible = true;
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
    QuestionnairePage_1 = QuestionnairePage;
    QuestionnairePage.prototype.next = function () {
        var _this = this;
        var self = this;
        if (this.data.pages[this.data.current_page_id].final_page != null) {
            this.dataService.saveSetting("isIntroCompleted", 1).then(function (result) {
                console.log(result);
                self.parent.gotoPage(nback_component_1.NBackInformation, { coach: _this.data.coach });
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
            this.parent.gotoPage(QuestionnairePage_1, this.data);
            //this._navigator.element.pushPage(QuestionnairePage, {data: this.data})    
        }
        else {
            this.dataService.saveAnswer(this.data.pages[this.data.current_page_id].page_id, selectedvalue, this.data.pages[this.data.current_page_id].time_on_task)
                .then(function () {
                if (self.data.current_page_id < self.data.pages.length) {
                    // Move to next page
                    self.data.current_page_id++;
                    self.parent.gotoPage(QuestionnairePage_1, self.data);
                    //self._navigator.element.pushPage(QuestionnairePage, {data: self.data})
                }
            });
        }
    };
    QuestionnairePage.prototype.back = function () {
        // We need to always remove the profession as it is the last step and it messes up previous steps visually..
        if (this.data.coach.profession_id != -1) {
            this.data.coach.profession_id = -1;
            this.data.pages[this.data.current_page_id].selected_item = -1;
        }
        // What to do with time spent on this page? -> for now we ignore it..
        this.data.current_page_id = this.data.current_page_id - 1;
        // Not very nice to do this hard-coded, but for now I don't see another option.
        if (this.data.current_page_id == 1)
            this.parent.gotoPage(QuestionnaireSelectGender, this.data);
        else
            this.parent.gotoPage(QuestionnairePage_1, this.data);
    };
    QuestionnairePage.prototype.setItem = function (value) {
        this.selected_item = value;
        this.data.pages[this.data.current_page_id].onItemChange(this.data, value);
        this.data.pages[this.data.current_page_id].selected_item = value;
        this.triggerChange = !this.triggerChange;
        //@TODO: get the correct unique identifier and save it to web
        this.done = true;
    };
    QuestionnairePage.prototype.setLikert = function (value) {
        this.selected_item = value;
        if (this.data.pages[this.data.current_page_id].onItemChange !== undefined)
            this.data.pages[this.data.current_page_id].onItemChange(this.data, value);
        this.data.pages[this.data.current_page_id].selected_item = value;
        this.done = true;
    };
    var QuestionnairePage_1;
    QuestionnairePage = QuestionnairePage_1 = __decorate([
        core_1.Component({
            selector: 'ons-page',
            providers: [dataService_1.DataService],
            template: "\n    <ons-toolbar>\n      <div class=\"center\" style=\"display: flex\">\n        <div class=\"toolbar_percentage\">0%</div>\n        <!-- Onsen comes with a toolbar but we use our own for now.. @TODO: style this for iOS -->\n        <div class=\"toolbar_progress\">\n          <div class=\"toolbar_progress_fill\" [style.width.%]=\"progress\"></div>\n        </div>\n        <div class=\"toolbar_percentage\">100%</div> \n      </div>\n    </ons-toolbar>\n\n    <div class=\"content\">\n      <div class=\"coach_talking\" *ngIf=\"data.pages[data.current_page_id].coach_talking\">\n        <div class=\"coach_talking_inner\">                  \n          <coach [coachObject]=\"data.coach\" [isIntroduction]=\"true\"></coach>\n        </div>\n      </div>\n\n      <div class=\"intro_text\" [ngClass]=\"{'intro_text_margin': isCoachVisible}\" [innerHTML]=\"data.pages[data.current_page_id].text_top\" *ngIf=\"data.pages[data.current_page_id].likert == null && data.pages[data.current_page_id].final_page == null\"></div>\n\n      <div class=\"likert_container\" *ngIf=\"data.pages[data.current_page_id].likert != null || data.pages[data.current_page_id].items != null || data.pages[data.current_page_id].final_page != null\"> \n        <div class=\"coach_container\" *ngIf=\"data.current_page_id > 2\">\n          <coach [coachObject]=\"data.coach\" [isTimePressure]=\"data.pages[data.current_page_id].coach_timepressure\" [objChanged]=\"triggerChange\"></coach>\n        </div>\n\n        <div class=\"choice_container\" [ngClass]=\"{'choice_container_2': isCoachVisible}\" *ngIf=\"data.pages[data.current_page_id].items != null\">\n          <div class=\"choice_item\" [ngClass]=\"{'item_selected': selected_item == i, 'choice_item_profession': item.profession_id != null, 'choice_item_4': data.pages[data.current_page_id].items[data.coach.gender_id].length == 4}\" *ngFor=\"let item of data.pages[data.current_page_id].items[data.coach.gender_id]; let i = index\" (click)=\"setItem(i)\">\n            <img src=\"{{(item.image_picker != null)?item.image_picker:item.image}}\" *ngIf=\"item.profession_id == null\" />\n\n            <div *ngIf=\"item.profession_id != null\" class=\"profession_button\">\n            <coach [coachObject]=\"data.coach\" [professionId]=\"item.profession_id\"></coach>\n            <p>{{item.profession_name}}</p>\n            </div>\n          </div>\n        </div>\n\n\n        <div class=\"likert_content\">\n          <div class=\"likert_intro\" [innerHTML]=\"data.pages[data.current_page_id].text_top\" *ngIf=\"data.pages[data.current_page_id].likert != null\">\n          </div>\n\n          <div class=\"likert_into\" *ngIf=\"data.pages[data.current_page_id].final_page != null\">\n            <br /><br />\n            <strong>Thank you!</strong><br /><br />\n            This concludes the avatar creator.<br />\n          </div>\n\n          <div class=\"likert_scale\" *ngIf=\"data.pages[data.current_page_id].likert != null\">\n            <div class=\"likert_item\" *ngFor=\"let item of data.pages[data.current_page_id].likert; let i = index\">\n                <ons-input float class=\"likert_item\" type=\"radio\" name=\"likert_select\" (change)=\"setLikert(i)\" [checked]=\"selected_item == i\"></ons-input>\n                {{item}}\n            </div>\n          </div>      \n        </div>\n      </div>\n\n      <br /><br />\n      <div class=\"buttons\" [ngClass]=\"{'next_button_spacing': isCoachVisible && (data.pages[data.current_page_id].likert != null || data.pages[data.current_page_id].items != null)}\">\n        <ons-button (click)=\"back()\" *ngIf=\"data.pages[data.current_page_id].final_page == null\">Back</ons-button>\n        <ons-button (click)=\"next()\" [disabled]=\"!done\">Next</ons-button>\n      </div>\n      <br />\n      <br />\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [core_1.Injector, dataService_1.DataService])
    ], QuestionnairePage);
    return QuestionnairePage;
}());
exports.QuestionnairePage = QuestionnairePage;
var CoachComponent = /** @class */ (function () {
    function CoachComponent(hairstyleService, glassesService, bodyService, faceService, shirtService, pantsService, shoesService, watchService, outfitService) {
        this.isTimePressure = false;
        this.professionId = -1;
        this.isIntroduction = false;
        this.objChanged = false;
        this.realProfId = -1;
        this.hairstyle = null;
        this.glasses = null;
        this.body = null;
        this.face = null;
        this.shirt = null;
        this.pants = null;
        this.shoes = null;
        this.watch = null;
        this.outfit = null;
        this.shirtimg = null;
        this.bodyimg = null;
        this.faceimg = null;
        this.eyebrowimg = null;
        this.watchimg = null;
        this.hairstyleimg = null;
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
    CoachComponent.prototype.ngOnChanges = function () {
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
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CoachComponent.prototype, "coachObject", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CoachComponent.prototype, "isTimePressure", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CoachComponent.prototype, "professionId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CoachComponent.prototype, "isIntroduction", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CoachComponent.prototype, "objChanged", void 0);
    CoachComponent = __decorate([
        core_1.Component({
            selector: 'coach',
            providers: [questionnaireItemServices_1.HairstyleService, questionnaireItemServices_1.GlassesService, questionnaireItemServices_1.BodyService, questionnaireItemServices_1.FaceService, questionnaireItemServices_1.ShirtService, questionnaireItemServices_1.PantsService, questionnaireItemServices_1.ShoesService, questionnaireItemServices_1.WatchService, questionnaireItemServices_1.OutfitService],
            template: "\n    <div [ngClass]=\"{'coach_wrapper_noshirt': shirt == null || pants == null}\" class=\"coach_wrapper\">\n\n      <img src=\"{{bodyimg}}\" style=\"width: 100%;\" *ngIf=\"pants != null\" />\n\n      <img src=\"{{body.image_timepressure_arm}}\" style=\"position: absolute; top: 0px; left: 0px; width: 100%; z-index: 5\" *ngIf=\"isTimePressure\" />\n\n      <img src=\"{{body.image_nopants}}\" style=\"width: 100%;\" *ngIf=\"pants == null && shirt != null\" />\n\n      <div id=\"facecontainer\" [ngClass]=\"{'face_not_absolute': shirt == null}\" style=\"position: absolute; top: 0px; width: 100%; text-align: center; z-index: 2\">\n        <img src=\"{{hairstyleimg}}\" style=\"width: 100%;\" />     \n        <div id=\"glassescontainer\" [ngClass]=\"{'glasses_timepressure_male': isTimePressure && coachObject.gender_id == 0, 'glasses_timepressure_female': isTimePressure && coachObject.gender_id == 1}\" *ngIf=\"glasses != null\" style=\"position: absolute; left: 0px; top: 21%; width: 100%; z-index: 3\">\n          <img src=\"{{glasses.image}}\" style=\"width: 100%;\" />\n        </div>\n        <div id=\"facefeaturecontainer\" style=\"position: absolute; left: 0px; top: 0px; width: 100%; z-index: 2\">\n          <img src=\"{{faceimg}}\" style=\"width: 100%;\" />\n        </div>\n        <div id=\"eyebrowscontainer\" style=\"position: absolute; left: 0px; top: 0px; width: 100%; z-index: 2\">\n          <img src=\"{{eyebrowimg}}\" style=\"width: 100%;\" />\n        </div>\n      </div>\n      <div id=\"coach_shirt\" [ngClass]=\"{'coach_shirt_nopants': pants == null}\" *ngIf=\"shirt != null\">\n        <img src=\"{{shirtimg}}\" style=\"width: 100%;\" />\n      </div>\n      <div id=\"pants\" style=\"position: absolute; top: 40.5%; width: 100%; z-index: 3\" *ngIf=\"pants != null\">\n        <img src=\"{{pants.image}}\" style=\"width: 100%;\" />\n      </div>\n      <div id=\"shoes\" style=\"position: absolute; top: 85%; width: 100%; z-index: 2\" *ngIf=\"shoes != null\">\n        <img src=\"{{shoes.image}}\" style=\"width: 100%;\" />\n      </div>\n\n      <div id=\"watch\" style=\"position: absolute; top: 35%; width: 100%; z-index: 7\" *ngIf=\"watch != null\">\n        <img src=\"{{watchimg}}\" style=\"width: 100%;\" />\n      </div>\n\n      <div id=\"outfit\" style=\"position: absolute; top: 0px; width: 100%; z-index: 8\" *ngIf=\"outfit != null\">\n        <img src=\"{{outfit.image}}\" style=\"width: 100%;\" />\n      </div>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [questionnaireItemServices_1.HairstyleService, questionnaireItemServices_1.GlassesService, questionnaireItemServices_1.BodyService, questionnaireItemServices_1.FaceService, questionnaireItemServices_1.ShirtService, questionnaireItemServices_1.PantsService, questionnaireItemServices_1.ShoesService, questionnaireItemServices_1.WatchService, questionnaireItemServices_1.OutfitService])
    ], CoachComponent);
    return CoachComponent;
}());
exports.CoachComponent = CoachComponent;
//# sourceMappingURL=questionnaire.component.js.map