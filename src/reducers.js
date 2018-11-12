import {CHANGE_CURRENT_LOCATION} from './constants.js'

const initialState = {
    currentLocation: {
        lat: 49.939823,
        lng: -119.396775
    }
}

export const SetCurrentPosReducer= (state=initialState, action={}) =>{
    switch(action.type){
        case CHANGE_CURRENT_LOCATION:
            return Object.assign({},state,{currentLocation:action.payload});
        default:
            return state;
    }
}