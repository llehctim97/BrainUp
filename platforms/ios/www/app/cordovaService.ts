import { Injectable,NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';


function _window(): any {
 // return the global native browser window object
 return window;
}
@Injectable()
export class CordovaService {
   
   private resume: BehaviorSubject<boolean>;
   constructor(private zone: NgZone) {
      this.resume = new BehaviorSubject<boolean>(null);
      Observable.fromEvent(document, 'resume').subscribe(event => {
         this.zone.run(() => {
            this.onResume();
         });
      });
    }
   
   get cordova(): any {
      return _window().cordova;
   }
   get onCordova(): Boolean {
    return !!_window().cordova;
    }
   public onResume(): void {
      //navigator.notification.alert("app resumed", this.resumed, "resumed")
      this.resume.next(true);
   }

   resumed(){
     console.log("application resumed")
   }

   public sendProfile(profile: any){
     _window().plugins.OneSignal.sendTag("profile", profile);
     console.log("Tag is Send for: " + profile);
   }

   public sendTag(key: string, tag: string){
     _window().plugins.OneSignal.sendTag(key, tag);
     console.log("Tag " + key + " is Send for: " + tag);
   }

   public setExternalUserID(token){
     _window().plugins.OneSignal.setExternalUserId(token);
     console.log("externalUserID is set for " + token);
   }
}