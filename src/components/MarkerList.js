import React, {
    Component
} from 'react'
import Marker from './Marker'

export default class MarkerList extends Component { 
  
    
    render(){
          const {markers,handleMarkerClick}= this.props;
    const markerComponent = markers.map((entry, i)=>{
        return <Marker key ={i.toString()} position = {markers[i].latlng} infowincontent ={{title:markers[i].title, description: markers[i].description}} onClick={handleMarkerClick}></Marker>
    })
    return(
        <div>
            {markerComponent} 
        </div> 
    )
    }

}