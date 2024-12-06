/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

//import {onRequest} from "firebase-functions/v2/https";
import * as functions from "firebase-functions/v2"
import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const update = functions.database.onValueCreated({
  ref: "aulette/{numero}/ora_fine",
  region: "europe-west1"
}, (event) => {
  var currentTime = Math.floor(new Date(event.time).getTime() / 1000)
  var duration = event.data.val() - currentTime
  
  if (duration < 0 || duration > 6*3600) {
    return event.data.ref.parent!.set("").then(() => {
      logger.info("Coglione l'orario è invalido!!!")
    })
  } else {
    return event.data.ref.parent!.child("ora_inizio").set(currentTime)
  }
})

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

