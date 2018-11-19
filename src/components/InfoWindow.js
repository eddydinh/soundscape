import React, {
    Component
} from 'react'
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server'

export default class InfoWindow extends Component{
    render(){
        return null;
    }
    componentDidUpdate(prevProps,prevState){
        if (this.props.map!==prevProps.map){
            this.renderInfoWindow();
        }
        if (this.props.children !== prevProps.children){
            this.updateContent();
        }
        if ((this.props.visible!== prevProps.visible)||(this.props.marker!== prevProps.marker)){
            this.props.visible?
                this.openWindow():
                this.closeWindow();
        }
    }
    
    renderInfoWindow(){
        let {map,google,mapCenter}=this.props;
        const iw = this.infowindow = new google.maps.InfoWindow({
            content:''
        })
    }
    updateContent(){
        const content = this.renderChildren();
        this.infowindow.setContent(content);
    }
    
    renderChildren(){
        const{children} = this.props;
        return ReactDOMServer.renderToString(children);
    }
    openWindow(){
        this.infowindow.open(this.props.map, this.props.marker);
    }
    closeWindow(){
        this.infowindow.close();
    }
}