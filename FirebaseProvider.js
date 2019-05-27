import * as firebase from "firebase";
const config = {
  apiKey: "AIzaSyDit2GzkXnQ3PgxrU73aqZpLzz5MQLzJMA",
  authDomain: "hybridprojectreportzone.firebaseapp.com",
  databaseURL: "https://hybridprojectreportzone.firebaseio.com",
  projectId: "hybridprojectreportzone",
  storageBucket: "hybridprojectreportzone.appspot.com",
  messagingSenderId: "1079147380244",
  appId: "1:1079147380244:web:a536d468f6473224"
};
const firebaseApp = firebase.initializeApp(config);

function getExpenseRef(node) {
  console.log("getExpenseRef called");
  return firebaseApp.database().ref(node);
}
function listenerForExpenses(expRef, callback) {
  //return expRef.orderByChild('expdate').on('value',(snap)=>{callback(snap)}) ;
  return expRef.on("value", snap => {
    callback(snap);
  });
}
function addExpense(expRef, expData) {
  console.log("add an expense");
  console.dir(expData);
  expRef.push(expData);
}
function updateExpense(expRef, key, expData) {
  expRef.child(key).update(expData);
}
function getExpenseByKey(expRef, key) {
  return expRef.child(key).once("value");
}
export default {
  getExpenseRef,
  listenerForExpenses,
  addExpense,
  updateExpense,
  getExpenseByKey
};
