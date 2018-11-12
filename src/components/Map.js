import React, {
    Component
} from 'react'
import ReactDOM from 'react-dom'
import {
    MapStyle
} from './MapStyle'
import PropTypes from 'prop-types';
import {
    SetCurrentLocation
} from '../actions'
import {
    connect
} from 'react-redux'




const mapStateToProps = state => {
   
    return {
        currentLocation: state.currentLocation,
        
    }
    
}

const mapDispatchToProps = (dispatch) =>{
   return{ 
       OnDetectLocation: (location) => dispatch(SetCurrentLocation(location))
   }

}
class Map extends Component {


  
    componentDidUpdate(prevProps, prevState) {
        
    
       const {currentLocation} = this.props;
        
       if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        
        if (prevProps.currentLocation !== currentLocation){
            this.recenterMap();
        }
        
        

    }
    componentDidMount() {
        
        const {OnDetectLocation} = this.props;
        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.watchPosition((pos) => {
                    const coords = pos.coords;
                    const userPos = {
                        lat: coords.latitude,
                        lng: coords.longitude
                    };
                    
                    OnDetectLocation(userPos);
                })
            }
        }
        this.loadMap();
    }
    loadMap() {
        if (this.props && this.props.google) {
            const {
                google
            } = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            let {
                initialCenter,
                zoom,
                styles
            } = this.props;
            const {
                lat,
                lng
            } = initialCenter;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom,
                styles: styles
            })

            this.map = new maps.Map(node, mapConfig);


        }

    }
    
    recenterMap(){
        const map = this.map;
        const {currentLocation} = this.props;
        
        const {google} = this.props;
        const maps = google.maps;
        
        if(map){
            let center = new maps.LatLng(currentLocation.lat,currentLocation.lng);
            map.panTo(center);
        }
    }

    render() {
        const style = {
            width: '100%',
            height: '100%'
        }
        return ( < div style = {
                style
            }
            ref = 'map' >
            Map goes here...

            <
            /div>
        )

    }
}

Map.propTypes = {
    google: PropTypes.object,
    zoom: PropTypes.number,
    initialCenter: PropTypes.object,
    styles: PropTypes.array,
    centerAroundCurrentLocation: PropTypes.bool
}

Map.defaultProps = {
    zoom: 16,
    // San Francisco, by default
    initialCenter: {
        lat: 49.939823,
        lng: -119.396775
    },

    styles: MapStyle,
    centerAroundCurrentLocation: true
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)