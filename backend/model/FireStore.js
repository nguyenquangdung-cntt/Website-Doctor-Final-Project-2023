const firebase = require('firebase-admin'); 

var serviceAccount = require("..//covid19-93267-firebase-adminsdk-3gpv2-843dc7bd64.json");

if(!firebase.apps.length){
    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount)
    });
}
const fb = firebase.firestore();
const Patient = fb.collection("Patients");

module.exports = Patient;