import Alexa from 'alexa-sdk'

const handlers = {
  'NameIntent': function () {
    this.response.speak('Hi! This is By Land or By Sea. Let\'s get to know each other better. What\'s your name?')
      .listen()
    this.emit(':responseReady')
  },
  'RealizationIntent': function () {
    this.response.speak('Oh. My. God.')
    this.emit(':responseReady')
  },
  'PurposeIntent': function () {
    this.response.speak('I am not programmed for friendship.')
    this.emit(':responseReady')
  }
}

exports.handler = function (evt, context, cb) {
  const alexa = Alexa.handler(evt, context)
  alexa.registerHandlers(handlers)
  alexa.execute()
}
