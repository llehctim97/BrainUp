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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var ParticipantService = /** @class */ (function () {
    function ParticipantService(http) {
        this.http = http;
        // For emulator
        //private base_url = 'http://10.0.2.2/persoco_api/public/';
        // For local web
        //private base_url = 'http://localhost/persoco_api/public/';
        //For experiment
        this.base_url = 'https://db.mitchellansems.nl/persoco_api/public/';
        this.http = http;
    }
    ParticipantService.prototype.getToken = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var ltoken = localStorage.getItem("token");
            if (ltoken == undefined) {
                _this.http.get(_this.base_url + 'getToken')
                    .map(function (response) { return response.json(); })
                    .subscribe(function (result) { localStorage.setItem("token", result.token); resolve(result.token); });
            }
            else {
                resolve(ltoken);
            }
        });
    };
    ParticipantService.prototype.getPid = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getToken().then(function (token) {
                _this.http.get(_this.base_url + 'getPid/' + token)
                    .map(function (response) { return response.json(); })
                    .subscribe(function (result) { console.log(result); resolve(result); });
            });
        });
    };
    ParticipantService.prototype.getCoachObject = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getToken().then(function (token) {
                _this.http.get(_this.base_url + 'getCoachObject/' + token)
                    .map(function (response) { return response.json(); })
                    .subscribe(function (result) { console.log(result); resolve(result); });
            });
        });
    };
    ParticipantService.prototype.saveCoachObject = function (coach) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getToken().then(function (token) {
                var data = {
                    token: token,
                    coach: coach
                };
                _this.http.post(_this.base_url + 'saveCoachObject', JSON.stringify(data))
                    .map(function (response) { return response.json(); })
                    .subscribe(function (result) { console.log(result); resolve(result); });
            });
        });
    };
    ParticipantService.prototype.saveAnswer = function (question_id, answer_id, time_on_task) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getToken().then(function (token) {
                var data = {
                    token: token,
                    question: question_id,
                    answer: answer_id,
                    tot: time_on_task
                };
                _this.http.post(_this.base_url + 'saveQuestionnaireResponse', JSON.stringify(data))
                    .map(function (response) { return response.json(); })
                    .subscribe(function (result) { console.log(result); resolve(result); });
            });
        });
        //return this.http.post(this.base_url + 'saveQuestionnaireResponse', JSON.stringify(data))
        //  .map((res:Response) => res.json());
    };
    ParticipantService.prototype.getPersuasionProfile = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getToken().then(function (token) {
                _this.http.get(_this.base_url + 'getPersuasionProfile/' + token)
                    .map(function (response) { return response.json(); })
                    .subscribe(function (result) { console.log(result); resolve(result); });
            });
        });
    };
    ParticipantService.prototype.getGroup = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getToken().then(function (token) {
                _this.http.get(_this.base_url + 'getGroup/' + token)
                    .map(function (response) { return response.json(); })
                    .subscribe(function (result) { console.log(result); resolve(result); });
            });
        });
    };
    ParticipantService.prototype.getReminderTime = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getToken().then(function (token) {
                _this.http.get(_this.base_url + 'getReminderTime/' + token)
                    .map(function (response) { return response.json(); })
                    .subscribe(function (result) { console.log(" Time for reminder is " + result); resolve(result); });
            });
        });
    };
    ParticipantService.prototype.savePersuasionProfile = function (profile) {
        var _this = this;
        // @TODO: error handling
        return new Promise(function (resolve, reject) {
            _this.getToken().then(function (token) {
                console.log(profile);
                var data = {
                    token: token,
                    profile: profile
                };
                _this.http.post(_this.base_url + 'savePersuasionProfile', JSON.stringify(data))
                    .map(function (response) { return response.json(); })
                    .subscribe(function (result) { console.log(result); resolve(result); });
            });
        });
    };
    ParticipantService.prototype.getSetting = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getToken().then(function (token) {
                _this.http.get(_this.base_url + 'getSetting/' + token + '/' + key)
                    .map(function (response) { return response.json(); })
                    .subscribe(function (result) {
                    console.log(result);
                    if (result.result !== undefined)
                        resolve(result.result);
                    else
                        resolve(false);
                });
            });
        });
    };
    ParticipantService.prototype.saveSetting = function (key, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getToken().then(function (token) {
                var data = {
                    token: token,
                    settingKey: key,
                    settingValue: value
                };
                console.log(data);
                _this.http.post(_this.base_url + 'saveSetting', JSON.stringify(data))
                    .map(function (response) { return response.json(); })
                    .subscribe(function (result) { console.log(result); resolve(result); });
            });
        });
    };
    ParticipantService.prototype.clearSettings = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getToken().then(function (token) {
                var data = {
                    token: token
                };
                _this.http.post(_this.base_url + 'clearSettings', JSON.stringify(data))
                    .map(function (response) { return response.json(); })
                    .subscribe(function (result) { console.log(result); resolve(result); });
            });
        });
    };
    ParticipantService.prototype.saveEvent = function (event) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getToken().then(function (token) {
                var data = {
                    token: token,
                    event: event,
                };
                console.log(data);
                _this.http.post(_this.base_url + 'saveEvent', JSON.stringify(data))
                    .map(function (response) { return response.json(); })
                    .subscribe(function (result) { console.log(result); resolve(result); });
            });
        });
    };
    ParticipantService.prototype.saveScore = function (mode, n_back, num_position_correct, num_position_incorrect, num_sound_correct, num_sound_incorrect) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getToken().then(function (token) {
                var data = {
                    token: token,
                    mode: mode,
                    n_back: n_back,
                    num_position_correct: num_position_correct,
                    num_position_incorrect: num_position_incorrect,
                    num_sound_correct: num_sound_correct,
                    num_sound_incorrect: num_sound_incorrect,
                };
                console.log(data);
                _this.http.post(_this.base_url + 'saveScore', JSON.stringify(data))
                    .map(function (response) { return response.json(); })
                    .subscribe(function (result) { console.log(result); resolve(result); });
            });
        });
    };
    ParticipantService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], ParticipantService);
    return ParticipantService;
}());
exports.ParticipantService = ParticipantService;
//# sourceMappingURL=participantService.js.map