import React, { Component } from 'react'
import GoogleApiComponent from '../components/GoogleApiHandlers/GoogleApiComponent'
import {ApiKey} from './ApiKey'
import Map from './Map'
import Marker from '../components/Marker'
import InfoWindow from '../components/InfoWindow'
import {
    connect
} from 'react-redux'
import {
    OnInfowinEventAction,RecordLatLng
} from '../actions'
import Navbar from '../components/Navbar'
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
        OnInfoWindowEvent: (props,marker,e) => dispatch(OnInfowinEventAction(props,marker,e)),
        OnGuidingMarkerClick: (location) => dispatch(RecordLatLng(location))
    }

}
export class Container extends Component {
    guidingMarker = null;
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
            <div style={style}>
                  <Navbar/>
              <Map click={this.OnMapClick} google ={this.props.google}>
               
               
                <Marker icon={{url:usericon,scaledSize: new this.props.google.maps.Size(45, 45)}} onInstantiate={this.props.OnInfoWindowEvent} infowincontent={{title: "YOU ARE HERE!"}}/>
                
                
                <InfoWindow marker={this.props.activeMarker} visible = {this.props.showingInfoWindow}>
                    <div>
                        <h1>{this.props.selectedPlace.title}</h1>
                    </div>
                </InfoWindow>
            </Map>
        
            </div>
        )
    }
    
OnMapClick=(props,map,event)=>{
        const pos = {
            lat:event.latLng.lat(),
            lng: event.latLng.lng()
        };
        const {google, OnGuidingMarkerClick} = this.props;
        
        OnGuidingMarkerClick(pos);
        let position= new google.maps.LatLng(pos.lat,pos.lng);
        
        
    
        if(this.guidingMarker == null){
        
            const pref = {
                map:map,
                position:position,
                animation:google.maps.Animation.DROP,
                 
            };
            
            this.guidingMarker = new google.maps.Marker(pref);
            setTimeout(()=>{
                this.guidingMarker.setAnimation(google.maps.Animation.BOUNCE);
                },1000);
    }else{
        this.guidingMarker.setPosition(position);
        setTimeout(()=>{
            this.guidingMarker.setAnimation(google.maps.Animation.BOUNCE);
        },1000);
        this.guidingMarker.setAnimation(google.maps.Animation.DROP);
    }
}
}
export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiComponent({
    apiKey: ApiKey[0].key

})(Container))