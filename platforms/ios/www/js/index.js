/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Add to index.js or the first page that loads with your app.
// For Intel XDK and please add this to your app.js.
var start;
var end;
var excisting_time = 0;

document.addEventListener('deviceready', function () {
  start = new Date();
  console.log("start time is: " + start);
  var xmlhttp = new XMLHttpRequest();
  var base_url = 'https://db.mitchellansems.nl/persoco_api/public/getTime/';
  var token = localStorage.getItem("token");
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var rs = this.response;
      console.log(rs); 
    }
  };
  xmlhttp.open("GET", base_url + token, true);
  xmlhttp.send(); 

  // Enable to debug issues.
  //window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  document.addEventListener("pause", onPause, false);
  document.addEventListener("resume", onResume, false);
  document.addEventListener("offline", onOffline, false);
  document.addEventListener("online", onOnline, false);

  
  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    sendUsefullness(jsonData.action.actionID);
  };

  window.plugins.OneSignal
    .startInit("5cb0082b-dadc-4e66-93d7-63147799e000")
    .handleNotificationOpened(notificationOpenedCallback)
    .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
    .endInit();

  window.plugins.OneSignal.sendTag("test", "test2");
  window.plugins.OneSignal.getTags(function(tags) {
  console.log('Tags Received: ' + JSON.stringify(tags));
  });
  console.log("init done");

}, false);

document.addEventListener("pause", onPause, false);

function onPause() {
  end = new Date();
  console.log(end);
  var current_time_spent = end - start
  console.log("current_time = " + current_time_spent)
  var time_spent = current_time_spent + excisting_time;
  console.log("time_spent = " + time_spent); 
  sendPause();
  var xmlhttp = new XMLHttpRequest();
  var base_url = 'https://db.mitchellansems.nl/persoco_api/public/saveTime';
  var token = localStorage.getItem("token")
  var data = {
            token: token,
            time: time_spent,
            };

  xmlhttp.open("POST", base_url);
  xmlhttp.send(JSON.stringify(data));
  console.log(JSON.stringify(data) + "is send"); 
}

function onStart(){
  start = new Date();
  console.log("start time is: " + start);
}

function onOffline(){
  navigator.notification.alert(
    'An active internet connection is required for BrainUp to function ',  // message
    offlineDismissed,         // callback
    'You are offline'            // title
  );
  //document.getElementById("overlay").style.display = "block";
}

function offlineDismissed(){
  document.getElementById("overlay").style.display = "block";
}

function onlineDismissed(){
  document.getElementById("overlay").style.display = "none";
}

function onOnline () {
  navigator.notification.alert(
    'An active internet connection has been established',  // message
    onlineDismissed,         // callback
    "We're back on track"         // title
  );
 //document.getElementById("overlay").style.display = "none"; 
}

function sendPause(){
  var xmlhttp = new XMLHttpRequest();
  var base_url = 'https://db.mitchellansems.nl/persoco_api/public/saveEvent';
  var token = localStorage.getItem("token")
  var data = {
            token: token,
            event: 'app_paused',
            };

  xmlhttp.open("POST", base_url);
  xmlhttp.send(JSON.stringify(data));
  console.log(JSON.stringify(data) + "is send"); 
}

function get(){
  var xmlhttp = new XMLHttpRequest();
  var base_url = 'https://db.mitchellansems.nl/persoco_api/public/getTime/';
  var token = localStorage.getItem("token");
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var rs = this.responseText;
      excisting_time = Number(rs);
      console.log("excisting time = " + excisting_time); 
    }
  };
  xmlhttp.open("GET", base_url + token, true);
  xmlhttp.send();
}

function onResume() {
  start = new Date();
  console.log("start time is: " + start);
  get();
  var xmlhttp = new XMLHttpRequest();
  var base_url = 'https://db.mitchellansems.nl/persoco_api/public/saveEvent';
  var token = localStorage.getItem("token")
  var data = {
            token: token,
            event: 'app_resumed',
            };

  xmlhttp.open("POST", base_url);
  xmlhttp.send(JSON.stringify(data));
  console.log(JSON.stringify(data) + "is send"); 
}

function sendUsefullness(actionID){
  var xmlhttp = new XMLHttpRequest();
  var base_url = 'https://db.mitchellansems.nl/persoco_api/public/saveNotification';
  var token = localStorage.getItem("token")
  var data = {
            token: token,
            notification: actionID,
            };

  xmlhttp.open("POST", base_url);
  xmlhttp.send(JSON.stringify(data));
  console.log(JSON.stringify(data) + "is send");
}