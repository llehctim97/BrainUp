import { Injectable } from '@angular/core';
import { LocalDataService } from './localDataService';
import { ParticipantService } from './participantService';
import { Observable } from 'rxjs/Rx';

declare var window : any;

@Injectable()
export class DataService {

  private isLocal: boolean = false;
  private localService: LocalDataService;
  private remoteService: ParticipantService;

  constructor(localDataService: LocalDataService, participantService: ParticipantService) {
    this.localService = localDataService;
    this.remoteService = participantService;

     //if (window.sqlitePlugin !== undefined) {
     // this.isLocal = true;
     // }
  }

  getToken(){
    var promise;

    if (this.isLocal)
      console.log("no token needed");
    else
      promise = this.remoteService.getToken();

    return promise;
  }

 getReminderTime()
 {
    var promise;
    if (this.isLocal)
    {
      console.log("is Local");
      //promise = this.localService.getReminderObject();
    }
    else
    {
      console.log("not local");
      promise = this.remoteService.getReminderTime();
    }

   return promise;
 }

  getCoachObject() {
    var promise;

    if (this.isLocal)
      promise = this.localService.getCoachObject();
    else
      promise = this.remoteService.getCoachObject();

    return promise;
  }

  saveCoachObject(coach) {
    var promise;

    if (this.isLocal)
      promise = this.localService.saveCoachObject(coach);
    else
      promise = this.remoteService.saveCoachObject(coach);

    return promise;
  }

  saveEvent(event) {
    var promise;

    if (this.isLocal)
      promise = this.localService.saveEvent(event);
    else
      promise = this.remoteService.saveEvent(event);

    return promise;
  }

  saveAnswer(question, answer, time_on_task) {
    var promise;

    if (this.isLocal)
      promise = this.localService.saveAnswer(question, answer, time_on_task);
    else
      promise = this.remoteService.saveAnswer(question, answer, time_on_task);

    return promise;    
  }

  getSetting(key) {
    var promise;

    if (this.isLocal)
      promise = this.localService.getSetting(key);
    else
      promise = this.remoteService.getSetting(key);

    return promise;
  }

  saveSetting(key, value) {
    var promise;

    if (this.isLocal)
      promise = this.localService.saveSetting(key, value);
    else
      promise = this.remoteService.saveSetting(key, value);

    return promise;
  }

  clearSettings() {
    var promise;

    if (this.isLocal)
      promise = this.localService.clearSettings();
    else
      promise = this.remoteService.clearSettings();
  }

  getPersuasionProfile() {
    var promise;

    if (this.isLocal)
    {
      console.log("get Pers Profile");
      console.log(this.isLocal);
      promise = this.localService.getPersuasionProfile();
      console.log(promise);
    }
    else
    {
      console.log("get Pers Profile");
      console.log(this.isLocal);
      promise = this.remoteService.getPersuasionProfile();
      console.log(promise);
    }

    return promise;
  }

  savePersuasionProfile(profile) {
    var promise;

    if (this.isLocal)
      promise = this.localService.savePersuasionProfile(profile);
    else
      promise = this.remoteService.savePersuasionProfile(profile);

    return promise;
  }

  sync() {
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
  }
}