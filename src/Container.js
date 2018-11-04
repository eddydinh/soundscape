import React, { Component } from 'react';
import GoogleApiComponent from './GoogleApiComponent.js'
import ApiKey from './ApiKey'
export class Container extends Component {
    render(){
        if (!this.props.loaded){
            return <div>Loading...</div>
        }
        return (
            <div>Map will go here</div>
        )
    }
}
export default GoogleApiComponent({
    apiKey: ApiKey.deliver

})(Container)