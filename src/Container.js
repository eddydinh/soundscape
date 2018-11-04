import React, { Component } from 'react';
import GoogleApiComponent from './GoogleApiComponent.js'
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
    apiKey: 'AIzaSyD7z_bsfW9JU3xMhcUcIkuhZnzf_rqRZV4'

})(Container)