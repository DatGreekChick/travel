process.env.DEBUG = 'actions-on-google:*'

const App = require('actions-on-google').DialogflowApp
    , functions = require('firebase-functions')

// a. the action name from the get_name Dialogflow intent
const NAME_ACTION = 'get_name'

// b. the parameters that are parsed from the make_name intent
const NAME_ARGUMENT = 'name'


exports.userName = functions.https.onRequest((req, res) => {
  const app = new App({ req, res })

  console.log('Request headers: ' + JSON.stringify(req.headers))
  console.log('Request body: ' + JSON.stringify(req.body))

// c. The function that grabs the user's name
  function getName(app) {
    let name = app.getArgument(NAME_ARGUMENT)

    app.tell(`Nice to meet you ${name}. What is your current country location?`)
  }

  // d. build an action map, which maps intent names to functions
  const actionMap = new Map()
  actionMap.set(NAME_ACTION, getName)

  app.handleRequest(actionMap)
})