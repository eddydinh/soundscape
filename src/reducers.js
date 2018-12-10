import {CHANGE_CURRENT_LOCATION,
        ON_INFOWIN_EVENT,
        ON_RECORD_LATLNG,
        REQUEST_MARKERS_PENDING,
        REQUEST_MARKERS_SUCCESS,
        REQUEST_MARKERS_ERROR,
        PASS_FILE_NAME,
        ON_RESET
       } from './constants.js'

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

const initialStateMarkers = {
    isPending:false,
    markers:[],
    error: ''
    
}

const initialFileName = {
    filename:''
    
}
const initialResetClick = {
    resetclick:true
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

export const OnRequestMarkesReducer = (state = initialStateMarkers, action={})=>{
    switch(action.type){
        case REQUEST_MARKERS_PENDING:
            return Object.assign({},state,{isPending: true});
        case REQUEST_MARKERS_SUCCESS:
            return Object.assign({},state,{markers: action.payload, isPending: false}); 
        case REQUEST_MARKERS_ERROR:
            return Object.assign({},state,{error: action.payload, isPending: false});  
        default:
            return state;
    }
}

export const PassFileNameReducer= (state=initialFileName, action={}) =>{
    switch(action.type){
        case PASS_FILE_NAME:
            return Object.assign({},state,{filename:action.payload1});
        default:
            return state;
    }
}

export const OnResetReducer= (state=initialResetClick, action={}) =>{
    switch(action.type){
        case ON_RESET:
            return Object.assign({},state,{resetclick:action.payload1});
        default:
            return state;
    }
}

