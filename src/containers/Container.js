import React, { Component } from 'react'
import GoogleApiComponent from '../components/GoogleApiHandlers/GoogleApiComponent'
import {ApiKey} from './MapData/ApiKey'
import Map from './Map'
import Marker from '../components/Marker'
import InfoWindow from '../components/InfoWindow'
import MarkerList from '../components/MarkerList'
import Message from '../components/Message'
import {
    connect
} from 'react-redux'
import {
    OnInfowinEventAction,
    RecordLatLng,
    requestMarkers,
    PassFileName,
    SetMessage
} from '../actions'
import Navbar from './Navbar'
//pass state in reducer to props
const mapStateToProps = state => {
  
    return {
        selectedPlace: state.OnInfowinEventReducer.selectedPlace,
        activeMarker:state.OnInfowinEventReducer.activeMarker,
        showingInfoWindow:state.OnInfowinEventReducer.showingInfoWindow,
        markers: state.OnRequestMarkesReducer.markers,
        error: state.OnRequestMarkesReducer.error,
        currentLocation: state.SetCurrentPosReducer.currentLocation,
        messageType: state.SetMessageReducer.messageType,
        messageSuccess:state.SetMessageReducer.messageSuccess,
        messageError:state.SetMessageReducer.messageError
  

    }

}
//Pass action to event handler
const mapDispatchToProps = (dispatch) => {
    return {
        OnInfoWindowEvent: (props,marker,e) => dispatch(OnInfowinEventAction(props,marker,e)),
        OnGuidingMarkerClick: (location) => dispatch(RecordLatLng(location)),
        OnRequestMarkers: () => dispatch(requestMarkers()),
        PlayMarkerAudio: (filename)=>dispatch(PassFileName(filename)),
        OnCloseMessage: (type, success, error) => dispatch(SetMessage(type, success, error))
    }

}
export class Container extends Component {
    guidingMarker = null;
    
    componentDidMount(){
        
        this.props.OnRequestMarkers();
    }

    componentDidUpdate(prevProps, prevState){
        if((prevProps.currentLocation !== this.props.currentLocation)|| (prevProps.markers !== this.props.markers)){
            this.CheckMarkers();
        }
    }
    render(){
        const{OnInfoWindowEvent,messageType,messageSuccess, messageError}=this.props;

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
                  <Message onClose ={this.ClosePopUp} as={messageType} success={messageSuccess} error={messageError} ></Message>
                  
                  <Map click={this.OnMapClick} google ={this.props.google}>
               
               
                <Marker icon={{url:usericon,scaledSize: new this.props.google.maps.Size(45, 45)}} onInstantiate={OnInfoWindowEvent} infowincontent={{title: "  YOU ARE HERE!"}}/>

                
                <MarkerList as={'remote'} markerArray={this.props.markers} handleMarkerClick = {this.props.OnInfoWindowEvent}></MarkerList>
                
                
                
                
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
ClosePopUp = () =>{
    const{OnCloseMessage} = this.props;
    OnCloseMessage('none','','')
}
CheckMarkers = () =>{
    const {markers, currentLocation} = this.props;
    for(let i=0; i< markers.length; i ++){
        if(this.getDistance({lat: markers[i].lat, lng:markers[i].lng}, currentLocation) < 100){
           
                this.props.PlayMarkerAudio(markers[i].filename)
        }
    }
}
  
  //Convert from Degree to rad
        rad = (x)=> {
            return x * Math.PI / 180;
        };

//Function to calculate distance between two points on the map
getDistance = (p1, p2) => {
            var R = 6378137; // Earth’s mean radius in meter
            var dLat = this.rad(p2.lat - p1.lat);
            var dLong = this.rad(p2.lng - p1.lng);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(this.rad(p1.lat)) * Math.cos(this.rad(p2.lat)) *
                Math.sin(dLong / 2) * Math.sin(dLong / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            //console.log("Distance between p1 and p2: " + d);
            return d; // returns the distance in meter
        };

OnMapClick=(props,map,event)=>{
        const pos = {
            lat:event.latLng.lat(),
            lng: event.latLng.lng()
        };
        const {google, OnGuidingMarkerClick,OnInfoWindowEvent} = this.props;
        
        OnGuidingMarkerClick(pos);
        OnInfoWindowEvent({},null,false)
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