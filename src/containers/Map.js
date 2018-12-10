import React, {
    Component
} from 'react'
import ReactDOM from 'react-dom'
import {
    MapStyle
} from './MapData/MapStyle'
import PropTypes from 'prop-types';
import {
    SetCurrentLocation
} from '../actions'
import {
    connect
} from 'react-redux'



//pass state in reducer to props
const mapStateToProps = state => {

    return {
        currentLocation: state.SetCurrentPosReducer.currentLocation,

    }

}
//Pass action to event handler
const mapDispatchToProps = (dispatch) => {
    return {
        OnDetectLocation: (location) => dispatch(SetCurrentLocation(location))
    }

}
class Map extends Component {
    
    initialRecenter = false;

    //When there is an update in Map.props
    componentDidUpdate(prevProps, prevState) {


        const {
            currentLocation
        } = this.props;
        //Initially load the map
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        //When user's location changes 
        if (prevProps.currentLocation !== currentLocation) {
            this.recenterMap();
        }



    }
    //After we have initially loaded the map, determine user's location    
    componentDidMount() {

        const {
            OnDetectLocation
        } = this.props;
        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.watchPosition((pos) => {
                    const coords = pos.coords;
                    const userPos = {
                        lat: coords.latitude,
                        lng: coords.longitude
                    };

                    OnDetectLocation(userPos); //Event handling user's location

                })
            }
        }
        this.loadMap();
    }


    //Load the map with default attributes got from props
    loadMap() {
        if (this.props && this.props.google) {
            
            const evtNames = ['click'];
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
            
            evtNames.forEach(e=>{
                this.map.addListener(e,this.handleEvent(e));
            })

            
        }

    }
    handleEvent(evtName){
        let timeout;
        const handlerName = evtName;
        return (e)=>{
            if(timeout){
                clearTimeout(timeout);
                timeout = null;
            }
            timeout= setTimeout(()=>{
                if(this.props[handlerName]){
                    this.props[handlerName](this.props,this.map,e);
                }
            },0);
        }
    }
    //Method to recenter Map when User's location is defined
    recenterMap() {
        const map = this.map; //the map itsel
        const {
            currentLocation
        } = this.props; //Current location got from Map.props

        const {
            google
        } = this.props; //Google object

        const maps = google.maps; //Maps object with its methods and classes

        if (map) {
            let center = new maps.LatLng(currentLocation.lat, currentLocation.lng);
            if(!this.initialRecenter){
                map.panTo(center);
                this.initialRecenter = true;
            }
        }
    }
    //Render and passing down props to children components of Map
    renderChildren() {
        const {
            children
        } = this.props;
        if (!children) return;

        return React.Children.map(children, c => {
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.props.currentLocation
            });
        })
    }

    //Return the map
    render() {


        const style = {
            width: '100%',
            height: '100%'
        }

        return ( < div style = {
                style
            }
            ref = 'map' >
            Map goes here...{
                this.renderChildren()
            }

            </div>
        )

    }
}


//Required attributes
Map.propTypes = {
    google: PropTypes.object,
    zoom: PropTypes.number,
    initialCenter: PropTypes.object,
    styles: PropTypes.array,
    centerAroundCurrentLocation: PropTypes.bool
}

//Default attributes of the map
Map.defaultProps = {
    zoom: 16,
    // UBCO, by default
    initialCenter: {
        lat: 49.939823,
        lng: -119.396775
    },

    styles: MapStyle,
    centerAroundCurrentLocation: true
}
//Connect the Map to Redux store, subscribe to relevant actions and reducers
export default connect(mapStateToProps, mapDispatchToProps)(Map)