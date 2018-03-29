process.env.DEBUG = 'actions-on-google:*'
const App = require('actions-on-google').DialogflowApp
const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((req, res) => {
//  res.send("Hello from Firebase!");
// });


// a. the action name from the make_name Dialogflow intent
const NAME_ACTION = 'make_name'

// b. the parameters that are parsed from the make_name intent
const COLOR_ARGUMENT = 'color'
const NUMBER_ARGUMENT = 'number'

// change blobs to something else later
exports.blobs = functions.https.onRequest((req, res) => {
  const app = new App({req, res})
  console.log('Request headers: ' + JSON.stringify(req.headers))
  console.log('Request body: ' + JSON.stringify(req.body))


// c. The function that generates the silly name
  function makeName (app) {
    let number = app.getArgument(NUMBER_ARGUMENT)
    let color = app.getArgument(COLOR_ARGUMENT)
    app.tell('Alright, your silly name is ' +
      color + ' ' + number +
      '! I hope you like it. See you next time.')
  }

  // d. build an action map, which maps intent names to ok-google
  let actionMap = new Map()
  actionMap.set(NAME_ACTION, makeName)

  app.handleRequest(actionMap)
})