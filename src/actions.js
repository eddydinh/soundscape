import {CHANGE_CURRENT_LOCATION,ON_INFOWIN_EVENT} from './constants.js'

export const SetCurrentLocation = (location) => ({
    type: CHANGE_CURRENT_LOCATION,
    payload: location
})

export const OnInfowinEventAction = (props,marker,e) => ({
    type: ON_INFOWIN_EVENT,
    payload1: props,
    payload2: marker,
    payload3: e
})
