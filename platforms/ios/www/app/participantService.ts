import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ParticipantService {
  // For emulator
  //private base_url = 'http://10.0.2.2/persoco_api/public/';
  
  // For local web
  //private base_url = 'http://localhost/persoco_api/public/';

  //For experiment
  private base_url = 'https://db.mitchellansems.nl/persoco_api/public/';

  constructor(private http: Http) {
  	this.http = http;
  }
  
  getToken() {
    return new Promise((resolve, reject) => { 
      var ltoken = localStorage.getItem("token");

      if (ltoken == undefined) {   
        this.http.get(this.base_url + 'getToken')
        .map(response => response.json())
        .subscribe(result => { localStorage.setItem("token", result.token); resolve(result.token) });
      }

      else {
        resolve(ltoken);
      }
    });      
  }

  getCoachObject() {
    return new Promise((resolve, reject) => {
      this.getToken().then((token) => {
        this.http.get(this.base_url + 'getCoachObject/' + token)
        .map(response => response.json())
        .subscribe(result => { console.log(result); resolve(result) });
      });
    });
  }


  saveCoachObject(coach) {
    return new Promise((resolve, reject) => {
      this.getToken().then((token) => {

        var data = {
          token: token,
          coach: coach
        };

        this.http.post(this.base_url + 'saveCoachObject', JSON.stringify(data))
        .map(response => response.json())
        .subscribe(result => { console.log(result); resolve(result) });
      });
    });
  }

  saveAnswer(question_id, answer_id, time_on_task) {
    return new Promise((resolve, reject) => {
      this.getToken().then((token) => {
        var data = {
          token: token,
          question: question_id,
          answer: answer_id,
          tot: time_on_task
        };

        this.http.post(this.base_url + 'saveQuestionnaireResponse', JSON.stringify(data))
        .map(response => response.json())
        .subscribe(result => { console.log(result); resolve(result) });
      });
    });

    //return this.http.post(this.base_url + 'saveQuestionnaireResponse', JSON.stringify(data))
    //  .map((res:Response) => res.json());
  }

  getPersuasionProfile() {
    return new Promise((resolve, reject) => {
      this.getToken().then((token) => {
        this.http.get(this.base_url + 'getPersuasionProfile/' + token)
        .map(response => response.json())
        .subscribe(result => { console.log(result); resolve(result) });
      });
    });
  }

  getReminderTime() {
      return new Promise((resolve, reject) => {
        this.getToken().then((token) => {
          console.log("The magic token is: "+token);
          this.http.get(this.base_url + 'getReminderTime/' + token)
          .map(response => response.json())
          .subscribe(result => { console.log(" Time for reminder is " + result); resolve(result) });
        });
      });
    }

  savePersuasionProfile(profile) {
    // @TODO: error handling
    return new Promise((resolve, reject) => {
      this.getToken().then((token) => {
        console.log(profile);

        var data = {
          token: token,
          profile: profile
        };

        this.http.post(this.base_url + 'savePersuasionProfile', JSON.stringify(data))
        .map(response => response.json())
        .subscribe(result => { console.log(result); resolve(result) });
      });
    });
  }

  getSetting(key) {
    return new Promise((resolve, reject) => {
      this.getToken().then((token) => {
        this.http.get(this.base_url + 'getSetting/' + token + '/' + key)
        .map(response => response.json())
        .subscribe(result => { 
          console.log(result); 
          if (result.result !== undefined) 
            resolve(result.result);
          else
            resolve(false);
          });
      });
    });    
  }

  saveSetting(key, value) {
    return new Promise((resolve, reject) => {
      this.getToken().then((token) => {

        var data = {
          token: token,
          settingKey: key,
          settingValue: value
        };

        console.log(data);

        this.http.post(this.base_url + 'saveSetting', JSON.stringify(data))
        .map(response => response.json())
        .subscribe(result => { console.log(result); resolve(result) });
      });
    });    
  }

  clearSettings() {
    return new Promise((resolve, reject) => {
      this.getToken().then((token) => {

        var data = {
          token: token
        };

        this.http.post(this.base_url + 'clearSettings', JSON.stringify(data))
        .map(response => response.json())
        .subscribe(result => { console.log(result); resolve(result) });
      });
    });    
  }

  saveEvent(event) {
    return new Promise((resolve, reject) => {
      this.getToken().then((token) => {

        var data = {
          token: token,
          event: event,
        };

        console.log(data);

        this.http.post(this.base_url + 'saveEvent', JSON.stringify(data))
        .map(response => response.json())
        .subscribe(result => { console.log(result); resolve(result) });
      });
    });
  }

  getCScode(token_id): Observable<string> {
    return this.http.get(this.base_url + 'getCScode/' + token_id)
      .map((res:Response) => res.json().code)
  }
}