import React, {
    Component
} from 'react'
import PropTypes from 'prop-types';
export default class Marker extends Component{
   
    marker = null;
    componentDidUpdate(prevProps){
        //if there is a change in map or current user's position
        if((this.props.map !== prevProps.map)||(this.props.mapCenter !== prevProps.mapCenter)){
            this.renderMarker();
        }
    }

//If there is no marker => instantiate new marker / else => set new marker's position.
    renderMarker(){
        
        let{map,google,position,mapCenter,icon,onInstantiate,infowincontent,onClick}=this.props;
     
        let pos = position||mapCenter;
        position= new google.maps.LatLng(pos.lat,pos.lng);
  
        if(this.marker == null){
        
            const pref = {
                map:map,
                position:position,
                animation:google.maps.Animation.DROP,
                 
            };
            
            this.marker = new google.maps.Marker(pref);
            if(icon!=null) {this.marker.setIcon(icon);}
            else{
                  const usericon = require('../img/AddPinIcon.png')
                  icon = {url:usericon,scaledSize: new this.props.google.maps.Size(45, 50)};
                  this.marker.setIcon(icon);
            }
            if(onInstantiate!=null)onInstantiate(infowincontent,this.marker,true);
            if(onClick!=null){   
                
                this.marker.addListener('click', function() {
                    onClick(infowincontent,this,true);
            });
            }
        }else{
            
            this.marker.setPosition(position);
            
        }
        
        
    }


    render(){
        return null;
    }
}
Marker.propTypes ={
    position:PropTypes.object,
    map:PropTypes.object,
  
}