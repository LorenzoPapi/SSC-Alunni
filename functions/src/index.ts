/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

//import {onRequest} from "firebase-functions/v2/https";
//import { getDatabase } from "firebase-admin/database"
import { onCall } from "firebase-functions/https"
import * as functions from "firebase-functions/v2"
//import * as logger from "firebase-functions/logger";

export const update = functions.database.onValueCreated({
  ref: "aulette/{numero}/ora_fine",
  region: "europe-west1"
}, (event) => {
  // var currentTime = Math.floor(new Date(event.time).getTime() / 1000)
  // var duration = event.data.val() - currentTime
  
  // if (duration < 0 || duration > 6*3600) {
  //   event.data.ref.parent!.set("")
  //   throw new functions.https.HttpsError("invalid-argument", "L'orario è invalido!")
    
  // } else {
  //   return event.data.ref.parent!.child("ora_inizio").set(currentTime)
  // }
})

export const prenotaAuletta = onCall({cors: true}, (req) => {
  var currentTime = Math.floor(new Date().getTime() / 1000)
  var duration = req.data.ora_fine - currentTime
  
  if (duration < 0 || duration > 6*3600) {
    throw new functions.https.HttpsError("invalid-argument", "L'orario è invalido!")
  } else {
    return {
      c: currentTime
    }
  }
})

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

