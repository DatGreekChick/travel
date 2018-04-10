process.env.DEBUG = 'actions-on-google:*'
const { DialogflowApp } = require('actions-on-google')
const functions = require('firebase-functions')

import { Actions } from '../dialogflow/actions'
import { Contexts } from '../dialogflow/contexts'
import { Parameters } from '../dialogflow/parameters'

class ByLandOrBySea {
  constructor (req, res) {
    console.log(`Headers: ${JSON.stringify(req.headers)}`)
    console.log(`Body: ${JSON.stringify(req.body)}`)

    this.app = new DialogflowApp({ request: req, response: res })
    this.data = this.app.data
    this.utils = new Utils(this.app)
  }

  run () {
    strings.setLocale(this.app.getUserLocale())

    const map = this // missing something here
        , action = this.app.getIntent()

    console.log(action)

    if (!action) {
      return this.app.ask(`I didn't hear a number. What's your guess?`)
    }

    map[action]()
  }

  ask (prompt, ...args) {
    this.utils.send(prompt, args)
  }

  tell (prompt, ...args) {
    this.utils.send(prompt, args, true)
  }

  [Actions.WELCOME_INTENT] () {
    //
  }

  [Actions.NAME_AND_LOCATION] () {
    //
  }

  [Actions.QUIT] () {
    this.tell() // something
  }

  [Actions.PLAN_AGAIN_YES] () {
    //
  }

  [Actions.PLAN_AGAIN_NO] () {
    this.app.setContext(Contexts.QUIT, 1) // check
    this.tell('Let\'s plan a trip soon.')
  }

  [Actions.DEFAULT_FALLBACK] () {
    this.setContext(Contexts.DONE_YES_NO)
    this.ask('Where do you want to go?', [ // this is a particular question, make it more general
      'I didn\'t hear your answer.',
      'If you\'re still there, what\'s your desired travel location?',
      'We can stop here. Let’s plan your trip soon.'
    ])
  }

  [Actions.DONE_YES] () {
    this.app.setContext(Contexts.QUIT, 1) // check
    this.tell('Come back soon') // change
  }

  [Actions.DONE_NO] () {
    this.data.fallbackCount = 0
    this.ask(strings.prompts.reAnother)
  }

  [Actions.REPEAT] () {
    const lastResponse = this.data.lastResponse
    if (lastResponse) {
      return this.utils.sendCompiled(lastResponse) // Currently does not use repeat prompt
    }
    this.ask(strings.prompts.another)
  }
}

// HTTP Cloud Function for Firebase handler
exports.byLandOrBySea = functions.https.onRequest((req, res) =>
  new ByLandOrBySea(req, res).run())