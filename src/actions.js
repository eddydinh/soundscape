import {CHANGE_CURRENT_LOCATION} from './constants.js'
export const SetCurrentLocation = (location) => ({
    type: CHANGE_CURRENT_LOCATION,
    payload: location
})