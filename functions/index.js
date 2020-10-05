const functions = require('firebase-functions');

const { app } = require('./server');

const myApp = functions.https.onRequest(app);

module.exports = {
    myApp
};
