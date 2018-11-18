import React, { Component } from 'react';
import GoogleApiComponent from '../components/GoogleApiHandlers/GoogleApiComponent'
import {ApiKey} from './ApiKey'
import Map from './Map'
import Marker from '../components/Marker'
export class Container extends Component {
    render(){
        const style = {
            width:'100vw',
            height: '100vh'
        }
        const usericon = require('../img/usericon.png')
        
        if (!this.props.loaded){
            return <div>Loading...</div>
        }
        return (
            <div style={style}><Map google ={this.props.google}>
                <Marker icon={{url:usericon,scaledSize: new this.props.google.maps.Size(45, 45)}}/>
            </Map></div>
        )
    }
}
export default GoogleApiComponent({
    apiKey: ApiKey[0].key

})(Container)