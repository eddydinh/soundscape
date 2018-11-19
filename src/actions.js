import {CHANGE_CURRENT_LOCATION,ON_INFOWIN_EVENT,ON_RECORD_LATLNG} from './constants.js'

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

export const RecordLatLng = (location) => ({
    type: ON_RECORD_LATLNG,
    lat: location.lat,
    lng: location.lng
    
})

