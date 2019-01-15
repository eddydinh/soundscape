import React, {
    Component
} from 'react'
import Marker from './Marker'
import PropTypes from 'prop-types';
export default class MarkerList extends Component { 
    
   
    

    OnDragEnd = (i,nlat,nlng) =>{
        this.props.markerArray[i].lat= nlat;
        this.props.markerArray[i].lng = nlng;
        this.props.handleMarkerDrag(nlat,nlng);
    }
    
    render(){
    
    const {markerArray,handleMarkerClick,map,google,mapCenter}= this.props;
    
   
        
    
   
    const markerComponent = markerArray.map((entry, i)=>{
        
        return <Marker 
        key ={i}
        entry={i}
        id={entry.id}
        position={{lat:entry.lat, lng: entry.lng}} 
        infowincontent = {{title: entry.title, description: entry.description}} 
        onClick={handleMarkerClick}
        map={map}
        google={google}
        mapCenter={mapCenter}
        OnDragEnd ={this.OnDragEnd}
   
        ></Marker>
    })
    return(
        <div>
            {markerComponent} 
        </div> 
    )
    }

}
MarkerList.propTypes ={
    markerArray:PropTypes.array
  
}