const functions = require("firebase-functions");
const admin = require('firebase-admin')
const serviceAccount = require('./the-offer-is-right-firebase-adminsdk-j8nh7-ee8f7ec3ce.json')
const express = require('express')
const cors = require('cors')
const app = express()

admin.initializeApp({
    credential: serviceAccount
})

app.use(cors({ origin: true }))

app.get('/showRanks', async (req, res) => {
    await admin
    .firestore()
    .collection('config')
    .doc('default')
    .update({
        showScores: true
    })
})

exports.api = functions.https.onRequest(app);
