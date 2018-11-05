import React, {
    Component
} from 'react'
import ReactDOM from 'react-dom'
import {
    MapStyle
} from './MapStyle.js'
export default class Map extends Component {

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }

    }
    componentDidMount() {
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

            let zoom = 16;
            let lat = 49.939823;
            let lng = -119.396775;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom,
                styles: MapStyle
            })

            this.map = new maps.Map(node, mapConfig);


        }

    }

    render() {
        const style = {
            width: '100%',
            height: '100%'
        }
        return ( <div style={style} ref = 'map' >
            Map goes here...

            </div>
        )

    }
}