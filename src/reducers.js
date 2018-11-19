import {CHANGE_CURRENT_LOCATION,ON_INFOWIN_EVENT,ON_RECORD_LATLNG} from './constants.js'

const initialStateUserPosition = {
    currentLocation: {
        lat: 49.939823,
        lng: -119.396775
    }
}
const initialStateInfoWinEvent = {
    showingInfoWindow:false,
    activeMarker: {},
    selectedPlace: {}
}

const initialStateLatLng = {
    lat:'LAT',
    lng:'LNG',
}
export const SetCurrentPosReducer= (state=initialStateUserPosition, action={}) =>{
    switch(action.type){
        case CHANGE_CURRENT_LOCATION:
            return Object.assign({},state,{currentLocation:action.payload});
        default:
            return state;
    }
}

export const OnInfowinEventReducer= (state=initialStateInfoWinEvent, action={}) =>{
    switch(action.type){
        case ON_INFOWIN_EVENT:
            return Object.assign({},state,{selectedPlace:action.payload1,activeMarker:action.payload2,showingInfoWindow:action.payload3});
        default:
            return state;
    }
}

export const OnRecordLatLngReducer= (state=initialStateLatLng, action={}) =>{
    switch(action.type){
        case ON_RECORD_LATLNG:
            return Object.assign({},state,{lat:action.lat,lng:action.lng});
        default:
            return state;
    }
}