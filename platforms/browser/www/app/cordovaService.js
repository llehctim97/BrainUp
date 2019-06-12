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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/fromEvent");
require("rxjs/add/operator/map");
function _window() {
    // return the global native browser window object
    return window;
}
var CordovaService = /** @class */ (function () {
    function CordovaService(zone) {
        var _this = this;
        this.zone = zone;
        this.resume = new BehaviorSubject_1.BehaviorSubject(null);
        Observable_1.Observable.fromEvent(document, 'resume').subscribe(function (event) {
            _this.zone.run(function () {
                _this.onResume();
            });
        });
    }
    Object.defineProperty(CordovaService.prototype, "cordova", {
        get: function () {
            return _window().cordova;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CordovaService.prototype, "onCordova", {
        get: function () {
            return !!_window().cordova;
        },
        enumerable: true,
        configurable: true
    });
    CordovaService.prototype.onResume = function () {
        //navigator.notification.alert("app resumed", this.resumed, "resumed")
        this.resume.next(true);
    };
    CordovaService.prototype.resumed = function () {
        console.log("application resumed");
    };
    CordovaService.prototype.sendProfile = function (profile) {
        _window().plugins.OneSignal.sendTag("profile", profile);
        console.log("Tag is Send for: " + profile);
    };
    CordovaService.prototype.setExternalUserID = function (token) {
        _window().plugins.OneSignal.setExternalUserId(token);
        console.log("externalUserID is set for " + token);
    };
    CordovaService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], CordovaService);
    return CordovaService;
}());
exports.CordovaService = CordovaService;
//# sourceMappingURL=cordovaService.js.map