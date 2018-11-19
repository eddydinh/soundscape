import React, { Component } from 'react';
import GoogleApiComponent from '../components/GoogleApiHandlers/GoogleApiComponent'
import {ApiKey} from './ApiKey'
import Map from './Map'
import Marker from '../components/Marker'
import InfoWindow from '../components/InfoWindow'
import {
    connect
} from 'react-redux'
import {
    OnInfowinEventAction
} from '../actions'

//pass state in reducer to props
const mapStateToProps = state => {

    return {
        selectedPlace: state.OnInfowinEventReducer.selectedPlace,
        activeMarker:state.OnInfowinEventReducer.activeMarker,
        showingInfoWindow:state.OnInfowinEventReducer.showingInfoWindow,

    }

}
//Pass action to event handler
const mapDispatchToProps = (dispatch) => {
    return {
        OnInfoWindowEvent: (props,marker,e) => dispatch(OnInfowinEventAction(props,marker,e))
    }

}
export class Container extends Component {
    render(){
        const style = {
            width:'100vw',
            height: '100vh'
        }
        const usericon = require('../img/usericon.png')
        
        if (!this.props.loaded){
            return <div>Loading...</div>
        }
        return (
            <div style={style}><Map google ={this.props.google}>
               
               
                <Marker icon={{url:usericon,scaledSize: new this.props.google.maps.Size(45, 45)}} onInstantiate={this.props.OnInfoWindowEvent} infowincontent={{title: "YOU ARE HERE!"}}/>
                
                <InfoWindow marker={this.props.activeMarker} visible = {this.props.showingInfoWindow}>
                    <div>
                        <h1>{this.props.selectedPlace.title}</h1>
                    </div>
                </InfoWindow>
            </Map></div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiComponent({
    apiKey: ApiKey[0].key

})(Container))