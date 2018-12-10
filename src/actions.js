import {
        CHANGE_CURRENT_LOCATION,
        ON_INFOWIN_EVENT,
        ON_RECORD_LATLNG,
        REQUEST_MARKERS_PENDING,
        REQUEST_MARKERS_SUCCESS,
        REQUEST_MARKERS_ERROR,
        PASS_FILE_NAME
} from './constants.js'

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

export const PassFileName = (filename) => ({
    type: PASS_FILE_NAME,
    payload1: filename
    
})

export const requestMarkers = ()=>(dispatch) => {
    
    
    dispatch({type: REQUEST_MARKERS_PENDING});
    fetch('http://localhost:3000/database')
        .then(response => response.json())
        .then(data => dispatch({type:REQUEST_MARKERS_SUCCESS, payload:data}))
        .catch(err=>dispatch({type:REQUEST_MARKERS_ERROR, payload:err}))
    

}

