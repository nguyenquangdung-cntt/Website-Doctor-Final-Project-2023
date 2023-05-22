var admin = require("firebase-admin");

var serviceAccount = require("..//covid19-93267-firebase-adminsdk-3gpv2-843dc7bd64.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://covid19-93267-default-rtdb.firebaseio.com"
});

const db = admin.database();
module.exports = db;