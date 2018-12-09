import React, { Component } from 'react'
import GoogleApiComponent from '../components/GoogleApiHandlers/GoogleApiComponent'
import {ApiKey} from './ApiKey'
import Map from './Map'
import Marker from '../components/Marker'
import InfoWindow from '../components/InfoWindow'
import MarkerList from '../components/MarkerList'
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
        const{OnInfoWindowEvent}=this.props;
        const style = {
            width:'100vw',
            height: '100vh'
        }
        const usericon = require('../img/usericon.png')
        
        if (!this.props.loaded){
            return <div>Loading...</div>
        }
        const markers =[
        {
            id:'123',
            title: 'Sound 1',
            description : 'Description of the sound 1',
            latlng:{lat: 49.87209070145184,lng:-119.48294539209593},
            filename:`soundeffect1.mp3`,
            filetype:'mp3'
            
        },
        
          {
            id:'124',
            title: 'Sound 2',
            description : 'Description of the sound 2',
            latlng:{lat: 49.86877153448667,lng:-119.47601456400145},
            filename:`soundeffect1.mp3`,
            filetype:'mp3'
            
        }
    ];
        return (
            <div style={style}>
                  <Navbar/>
              <Map click={this.OnMapClick} google ={this.props.google}>
               
               
                <Marker icon={{url:usericon,scaledSize: new this.props.google.maps.Size(45, 45)}} onInstantiate={OnInfoWindowEvent} infowincontent={{title: "  YOU ARE HERE!"}}/>

                
                <MarkerList markerArray={markers} handleMarkerClick = {this.props.OnInfoWindowEvent}></MarkerList>
                
                <InfoWindow marker={this.props.activeMarker} visible = {this.props.showingInfoWindow} onClose={OnInfoWindowEvent}>
                    <div style={{margin:'10px', color:'#7C7C7C',display:'table'}}>
                       <p style={{color:'black', fontWeight:'bold'}}>{this.props.selectedPlace.title}</p>
                       <p>{this.props.selectedPlace.description}</p>
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
             const usericon = require('../img/AddPinIcon.png')
             const icon = {url:usericon,scaledSize: new this.props.google.maps.Size(45, 50)};
                  
            const pref = {
                map:map,
                position:position,
                icon:icon,
                animation:google.maps.Animation.DROP
            
                 
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