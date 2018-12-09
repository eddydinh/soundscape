import React, {
    Component
} from 'react'
import Marker from './Marker'

export default class MarkerList extends Component { 
  
    
    render(){
          const {markerArray,handleMarkerClick,map,google,mapCenter}= this.props;
   
    const markerComponent = markerArray.map((entry, i)=>{
    
        return <Marker 
        key ={i} 
        position={entry.latlng} 
        infowincontent = {{title: entry.title, description:entry.description}} 
        onClick={handleMarkerClick}
        map={map}
        google={google}
        mapCenter={mapCenter}
        ></Marker>
    })
    return(
        <div>
            {markerComponent} 
        </div> 
    )
    }

}