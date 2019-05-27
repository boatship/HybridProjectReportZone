import * as firebase from "firebase";
const config = {
  apiKey: "AIzaSyC8oK8soTs6uzZk2TdSePjGjudcn4SBizs",
  authDomain: "reportzone.firebaseapp.com",
  databaseURL: "https://reportzone.firebaseio.com",
  projectId: "reportzone",
  storageBucket: "reportzone.appspot.com",
  messagingSenderId: "274456498797",
  appId: "1:274456498797:web:7d72b4547d4581e0"
};
const firebaseApp = firebase.initializeApp(config);

function getIncidentRef(node) {
  console.log("getIncidentRef called");
  return firebaseApp.database().ref(node);
}

function listenerForIncidents(incRef, callback) {
  //return expRef.orderByChild('expdate').on('value',(snap)=>{callback(snap)}) ;
  return incRef.on("value", snap => {
    callback(snap);
  });
}
function addIncident(incRef, incData) {
  console.log("add an expense");
  console.log(incData)
  incRef.push(incData);
}
function updateIncident(incRef, key, incData) {
  incRef.child(key).update(incData);
}
function getIncidentByKey(incRef, key) {
  return incRef.child(key).once("value");
}
export default {
  getIncidentRef,
  listenerForIncidents,
  addIncident,
  updateIncident,
  getIncidentByKey
};
