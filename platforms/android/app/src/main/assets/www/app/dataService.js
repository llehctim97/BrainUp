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
var localDataService_1 = require("./localDataService");
var participantService_1 = require("./participantService");
var DataService = /** @class */ (function () {
    function DataService(localDataService, participantService) {
        this.isLocal = false;
        this.localService = localDataService;
        this.remoteService = participantService;
        //if (window.sqlitePlugin !== undefined) {
        // this.isLocal = true;
        // }
    }
    DataService.prototype.getToken = function () {
        var promise;
        if (this.isLocal)
            console.log("no token needed");
        else
            promise = this.remoteService.getToken();
        return promise;
    };
    DataService.prototype.getPid = function () {
        var promise;
        if (this.isLocal) {
            console.log("is Local");
            //promise = this.localService.getReminderObject();
        }
        else {
            console.log("not local");
            promise = this.remoteService.getPid();
        }
        return promise;
    };
    DataService.prototype.getReminderTime = function () {
        var promise;
        if (this.isLocal) {
            console.log("is Local");
            //promise = this.localService.getReminderObject();
        }
        else {
            console.log("not local");
            promise = this.remoteService.getReminderTime();
        }
        return promise;
    };
    DataService.prototype.getGroup = function () {
        var promise;
        if (this.isLocal) {
            console.log("is Local");
            //promise = this.localService.getReminderObject();
        }
        else {
            console.log("not local");
            promise = this.remoteService.getGroup();
        }
        return promise;
    };
    DataService.prototype.getCoachObject = function () {
        var promise;
        if (this.isLocal)
            promise = this.localService.getCoachObject();
        else
            promise = this.remoteService.getCoachObject();
        return promise;
    };
    DataService.prototype.saveCoachObject = function (coach) {
        var promise;
        if (this.isLocal)
            promise = this.localService.saveCoachObject(coach);
        else
            promise = this.remoteService.saveCoachObject(coach);
        return promise;
    };
    DataService.prototype.saveEvent = function (event) {
        var promise;
        if (this.isLocal)
            promise = this.localService.saveEvent(event);
        else
            promise = this.remoteService.saveEvent(event);
        return promise;
    };
    DataService.prototype.saveAnswer = function (question, answer, time_on_task) {
        var promise;
        if (this.isLocal)
            promise = this.localService.saveAnswer(question, answer, time_on_task);
        else
            promise = this.remoteService.saveAnswer(question, answer, time_on_task);
        return promise;
    };
    DataService.prototype.getSetting = function (key) {
        var promise;
        if (this.isLocal)
            promise = this.localService.getSetting(key);
        else
            promise = this.remoteService.getSetting(key);
        return promise;
    };
    DataService.prototype.saveSetting = function (key, value) {
        var promise;
        if (this.isLocal)
            promise = this.localService.saveSetting(key, value);
        else
            promise = this.remoteService.saveSetting(key, value);
        return promise;
    };
    DataService.prototype.clearSettings = function () {
        var promise;
        if (this.isLocal)
            promise = this.localService.clearSettings();
        else
            promise = this.remoteService.clearSettings();
    };
    DataService.prototype.getPersuasionProfile = function () {
        var promise;
        if (this.isLocal) {
            console.log("get Pers Profile");
            console.log(this.isLocal);
            promise = this.localService.getPersuasionProfile();
            console.log(promise);
        }
        else {
            console.log("get Pers Profile");
            console.log(this.isLocal);
            promise = this.remoteService.getPersuasionProfile();
            console.log(promise);
        }
        return promise;
    };
    DataService.prototype.savePersuasionProfile = function (profile) {
        var promise;
        if (this.isLocal)
            promise = this.localService.savePersuasionProfile(profile);
        else
            promise = this.remoteService.savePersuasionProfile(profile);
        return promise;
    };
    DataService.prototype.saveScore = function (mode, n_back, num_position_correct, num_position_incorrect, num_sound_correct, num_sound_incorrect) {
        var promise;
        if (this.isLocal)
            promise = this.localService.saveScore(mode, n_back, num_position_correct, num_position_incorrect, num_sound_correct, num_sound_incorrect);
        else
            promise = this.remoteService.saveScore(mode, n_back, num_position_correct, num_position_incorrect, num_sound_correct, num_sound_incorrect);
        return promise;
    };
    DataService.prototype.sync = function () {
        // If local is available, try to sync with remote.
        if (this.isLocal) {
            // Sync everything that is not yet synced with the server
            // Questionnaire answers
            // Events
            // Game results
            // @TODO: this will need something like this to sync everything with server using separate calls:
            /*Promise.all([
                this.storage.remove(key1),
                this.storage.remove(key2),
                this.storage.remove(key3),
              ]).then(value => doSomething());*/
        }
    };
    DataService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [localDataService_1.LocalDataService, participantService_1.ParticipantService])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=dataService.js.map