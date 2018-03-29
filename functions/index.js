process.env.DEBUG = 'actions-on-google:*'

const App = require('actions-on-google').DialogflowApp
    , functions = require('firebase-functions')

// intents
const WELCOME_INTENT = 'input.welcome'
    , NAME_AND_LOCATION_INTENT = 'input.name_and_location'

// parameters parsed from the above intents
const NAME_ARGUMENT = 'input.name'
    , COUNTRY_ARGUMENT = 'input.country' // versus .live?


exports.travel = functions.https.onRequest((req, res) => {
  const app = new App({ req, res })

  console.log('Request headers: ' + JSON.stringify(req.headers))
  console.log('Request body: ' + JSON.stringify(req.body))

  function responseHandler() {
    // intent contains the name of the intent you defined in the Actions area of Dialogflow
    let intent = app.getIntent()

    switch (intent) {
      case WELCOME_INTENT:
        let name = app.getArgument(NAME_ARGUMENT)
          , live = app.getArgument(COUNTRY_ARGUMENT)

        app.ask(`Welcome to By Land or By Sea. What's your name and current country location?
        Please say it as such: my name is Aloy, and I live in the United States.`)
        break;

      case NAME_AND_LOCATION_INTENT:
        app.ask(`Nice to meet you ${name}. Would you prefer to go abroad or stay in ${live}?`)
        break;
    }
  }

  // can add function name instead of making a map here
  app.handleRequest(responseHandler)
})

// hook this up
function defaultFallback (app) {
  const DONE_YES_NO_CONTEXT = 'DONE_YES_NO_CONTEXT'

  app.setContext(DONE_YES_NO_CONTEXT)
  app.ask('Where do you want to go?', [
    'I didn\'t hear your answer.',
    'If you\'re still there, what\'s your desired travel location?',
    'We can stop here. Let’s plan your trip soon.'
  ])
}