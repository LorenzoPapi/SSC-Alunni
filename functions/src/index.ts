import { onCall } from "firebase-functions/https"
import * as functions from "firebase-functions/v2"
import * as logger from "firebase-functions/logger";

const timeouts = {};

export const onModificaAuletta = functions.database.onValueUpdated({
    ref: "aulette/{numero}",
    region: "europe-west1"
  }, (e) => {
    logger.info(e.data)
    if (e.data.before.val() == "") {
      logger.info(timeouts)
      var data = e.data.after.val()
      var msDelay = (data.ora_fine - data.ora_inizio) * 1000
      timeouts[data.studente] = setTimeout(() => {
        logger.info("Tempo scaduto!")
        e.data.after.ref.set("");
      }, msDelay)
      logger.info("Timeout impostato");
    } else if (e.data.after.val() == "") {
      logger.info("Auletta liberata dall'utente.")
      clearTimeout(timeouts[e.data.before.val().studente])
      delete timeouts[e.data.before.val().studente]
      logger.info("Cancellato timeout.")
    }
})

export const prenotaAuletta = onCall({cors: true}, (req) => {
  var currentTime = Math.floor(new Date().getTime() / 1000)
  var duration = req.data.ora_fine - currentTime
  logger.info("Tentativo di prenotazione auletta.")
  
  if (duration < 0 || duration > 6*3600) {
    logger.info("Tentativo fallito.")
    throw new functions.https.HttpsError("invalid-argument", "L'orario è invalido!")
  } else {
    logger.info("Tentativo riuscito.")
    return {
      c: currentTime
    }
  }
})

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

