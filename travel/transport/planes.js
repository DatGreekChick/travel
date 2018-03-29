// a. the action name from the get_name Dialogflow intent
export const LOCATION_ACTION = 'get_desired_location'

// parameters parsed from make_name intent
const NAME_ARGUMENT = 'name'

export const locationLimits = app => {
  let country = app.getArgument(NAME_ARGUMENT)

  app.tell(`Ok. Do you prefer to go abroad or stay within ${country}`)
}