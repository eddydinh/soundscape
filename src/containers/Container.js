import React, { Component } from 'react';
import GoogleApiComponent from '../components/GoogleApiHandlers/GoogleApiComponent.js'
import {ApiKey} from './ApiKey'
import Map from '../components/Map.js'
export class Container extends Component {
    render(){
        const style = {
            width:'100vw',
            height: '100vh'
        }
        if (!this.props.loaded){
            return <div>Loading...</div>
        }
        return (
            <div style={style}><Map google ={this.props.google}/></div>
        )
    }
}
export default GoogleApiComponent({
    apiKey: ApiKey[0].key

})(Container)