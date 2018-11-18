import React, {
    Component
} from 'react'
import PropTypes from 'prop-types';
export default class Marker extends Component{
    componentDidUpdate(prevProps){
        if((this.props.map !== prevProps.map)||(this.props.mapCenter !== prevProps.mapCenter)){
            this.renderMarker();
        }
    }
    
    renderMarker(){
        
        let{map,google,position,mapCenter,icon}=this.props;
     
        let pos = position||mapCenter;
        position= new google.maps.LatLng(pos.lat,pos.lng);
  
        
        
        const pref = {
            map:map,
            position:position,
            animation:google.maps.Animation.DROP,
            icon:icon         
        };
        this.marker = new google.maps.Marker(pref);
        
        
    }
    render(){
        return null;
    }
}
Marker.propTypes ={
    position:PropTypes.object,
    map:PropTypes.object,
    icon:PropTypes.object
}