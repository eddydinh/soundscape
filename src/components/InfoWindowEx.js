import React, { Component } from "react";
import ReactDOM from "react-dom";
import InfoWindow from "./InfoWindow"
export default class InfoWindowEx extends Component {
  constructor(props) {
    super(props);
    this.infoWindowRef = React.createRef();
    this.onInfoWindowOpen = this.onInfoWindowOpen.bind(this);
    //Create div for infowin content
    if (!this.containerElement) {
      this.containerElement = document.createElement(`div`);
      this.containerElement.setAttribute('id','iwc')
    }
  }

//Render info content on open
  onInfoWindowOpen= ()=> {
      ReactDOM.render(
      React.Children.only(this.props.children),
      this.containerElement
    );
    this.infoWindowRef.current.infowindow.setContent(this.containerElement);
  }
  
  //display infowindow
  render() {
    return (
      <InfoWindow
        onOpen={this.onInfoWindowOpen}
        ref={this.infoWindowRef}
        
        {...this.props}
      />
    );
  }
}