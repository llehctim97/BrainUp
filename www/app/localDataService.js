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
var LocalDataService = /** @class */ (function () {
    function LocalDataService() {
        this.isDBConnected = false;
    }
    LocalDataService.prototype.connectDb = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            console.log(window.sqlitePlugin);
            if (self.isDBConnected)
                resolve();
            document.addEventListener('deviceready', function () {
                self.db = window.sqlitePlugin.openDatabase({ name: 'persoco.db', location: 'default' });
                resolve();
            });
        });
    };
    //getReminderObject()
    //{
    // var key = 'participant_reminder_time';
    // return new Promise((resolve, reject) => {
    //   this.connectDb().then(() => {
    //     this.db.executeSql('SELECT answer FROM q_answers WHERE question = ? ', [key], function(rs) {
    //       if (rs.rows.length > 0)
    //         resolve(rs.rows.item(0));
    //      else {
    //        resolve({
    //           error: {
    //             text: "NODATA"
    //            }
    //         });
    //        }
    ///     }, 
    //     function(error) {
    //        resolve({
    //          error: {
    //            text: "NODATA"
    ////          }
    //        });          
    //       })
    //  });
    // }
    LocalDataService.prototype.getCoachObject = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connectDb().then(function () {
                _this.db.executeSql('SELECT * FROM Coach', [], function (rs) {
                    if (rs.rows.length > 0)
                        resolve(rs.rows.item(0));
                    else {
                        resolve({
                            error: {
                                text: "NODATA"
                            }
                        });
                    }
                }, function (error) {
                    resolve({
                        error: {
                            text: "NODATA"
                        }
                    });
                });
            });
        });
    };
    LocalDataService.prototype.saveCoachObject = function (coach) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connectDb().then(function () {
                // Create tables tructure if it doesn't exist yet, then store the event
                _this.db.transaction(function (tx) {
                    //tx.executeSql('DROP TABLE Coach');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS Coach (ID PRIMARY KEY, gender_id, hairstyle, glasses, shirt, pants, shoes, watch, profession, isSynced)');
                    tx.executeSql('INSERT OR REPLACE INTO Coach VALUES (?,?,?,?,?,?,?,?,?,?)', [1, coach.gender_id, coach.hair_id, coach.glasses_id, coach.tshirt_id, coach.pants_id, coach.shoes_id, coach.watch_id, coach.profession_id, 0]);
                }, function (error) {
                    console.log('Transaction ERROR: ' + error.message);
                }, function () {
                    console.log('Populated database OK');
                });
                _this.db.executeSql('SELECT * FROM Coach', [], function (rs) {
                    for (var x = 0; x < rs.rows.length; x++) {
                        console.log(rs.rows.item(x));
                    }
                });
                resolve();
            });
        });
    };
    LocalDataService.prototype.getPersuasionProfile = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connectDb().then(function () {
                _this.db.executeSql('SELECT * FROM PersuasionProfile', [], function (rs) {
                    if (rs.rows.length > 0)
                        resolve(rs.rows.item(0));
                    else {
                        resolve({
                            error: {
                                text: "NODATA"
                            }
                        });
                    }
                }, function (error) {
                    resolve({
                        error: {
                            text: "NODATA"
                        }
                    });
                });
            });
        });
    };
    LocalDataService.prototype.savePersuasionProfile = function (profile) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connectDb().then(function () {
                // Create tables tructure if it doesn't exist yet, then store the event
                _this.db.transaction(function (tx) {
                    //tx.executeSql('DROP TABLE PersuasionProfile');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS PersuasionProfile (ID PRIMARY KEY, consensus_score, authority_score, likability_score, reciprocity_score, scarcity_score, commitment_score, isSynced)');
                    tx.executeSql('INSERT OR REPLACE INTO PersuasionProfile VALUES (?,?,?,?,?,?,?,?)', [1, profile.consensus, profile.authority, profile.likability, profile.reciprocity, profile.scarcity, profile.commitment, 0]);
                }, function (error) {
                    console.log('Transaction ERROR: ' + error.message);
                }, function () {
                    console.log('Populated database OK');
                });
                _this.db.executeSql('SELECT * FROM PersuasionProfile', [], function (rs) {
                    for (var x = 0; x < rs.rows.length; x++) {
                        console.log(rs.rows.item(x));
                    }
                });
                resolve();
            });
        });
    };
    LocalDataService.prototype.saveEvent = function (event) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connectDb().then(function () {
                // Create tables tructure if it doesn't exist yet, then store the event
                _this.db.transaction(function (tx) {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS Events (event, timestamp, isSynced)');
                    tx.executeSql('INSERT INTO Events VALUES (?,?,?)', [event, Math.round(new Date().getTime() / 1000), 0]);
                }, function (error) {
                    console.log('Transaction ERROR: ' + error.message);
                }, function () {
                    console.log('Populated database OK');
                });
                /*this.db.executeSql('SELECT * FROM Events', [], function(rs) {
                    for(var x = 0; x < rs.rows.length; x++) {
                        console.log(rs.rows.item(x));
                    }
                });*/
                resolve();
            });
        });
    };
    LocalDataService.prototype.saveScore = function (mode, n_back, num_position_correct, num_position_incorrect, num_sound_correct, num_sound_incorrect) {
    };
    LocalDataService.prototype.saveAnswer = function (question, answer, time_on_task) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connectDb().then(function () {
                // Create tables tructure if it doesn't exist yet, then store the event
                _this.db.transaction(function (tx) {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS QuestionnaireAnswers (question PRIMARY KEY, answer, time_on_task_ms, isSynced)');
                    tx.executeSql('INSERT OR REPLACE INTO QuestionnaireAnswers VALUES (?,?,?,?)', [question, answer, time_on_task, 0]);
                }, function (error) {
                    console.log('Transaction ERROR: ' + error.message);
                }, function () {
                    console.log('Populated database OK');
                });
                _this.db.executeSql('SELECT * FROM QuestionnaireAnswers', [], function (rs) {
                    for (var x = 0; x < rs.rows.length; x++) {
                        console.log(rs.rows.item(x));
                    }
                });
                resolve();
            });
        });
    };
    LocalDataService.prototype.getSetting = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connectDb().then(function () {
                _this.db.executeSql('SELECT * FROM Settings WHERE settingKey = ?', [key], function (rs) {
                    if (rs.rows.length > 0) {
                        console.log(rs.rows.item(0));
                        resolve(rs.rows.item(0));
                    }
                    else {
                        resolve({
                            error: {
                                text: "NODATA"
                            }
                        });
                    }
                }, function (error) {
                    resolve({
                        error: {
                            text: "NODATA"
                        }
                    });
                });
            });
        });
    };
    LocalDataService.prototype.clearSettings = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connectDb().then(function () {
                _this.db.executeSql('DELETE FROM Settings', [], function (rs) {
                    resolve({
                        result: 'OK'
                    });
                }, function (error) {
                    resolve({
                        error: {
                            text: "ERROR"
                        }
                    });
                });
            });
        });
    };
    LocalDataService.prototype.saveSetting = function (key, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connectDb().then(function () {
                // Create tables tructure if it doesn't exist yet, then store the keyvalue pair
                _this.db.transaction(function (tx) {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS Settings (settingKey PRIMARY KEY, settingValue, isSynced)');
                    tx.executeSql('INSERT OR REPLACE INTO Settings VALUES (?,?,?)', [key, value, false]);
                }, function (error) {
                    console.log('Transaction ERROR: ' + error.message);
                }, function () {
                    console.log('Populated database OK');
                });
                _this.db.executeSql('SELECT * FROM Settings', [], function (rs) {
                    for (var x = 0; x < rs.rows.length; x++) {
                        console.log(rs.rows.item(x));
                    }
                });
                resolve();
            });
        });
    };
    LocalDataService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], LocalDataService);
    return LocalDataService;
}());
exports.LocalDataService = LocalDataService;
//# sourceMappingURL=localDataService.js.map