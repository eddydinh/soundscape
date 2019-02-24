import {
    Component
} from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import '../css/infoWindow.css'

export default class InfoWindow extends Component{

    //No display function
    render(){
        return null;
    }

    
    componentDidUpdate(prevProps,prevState){
        
        
        //Render new infowin on new map
        if (this.props.map!==prevProps.map){
            this.renderInfoWindow();
        }
        
        
        //render info content on open
        if(this.props.children.props!==prevProps.children.props){
             const {onOpen} = this.props;
            onOpen();
        }

        
        //Display window on visible = true and vice versa
        if ((this.props.visible!== prevProps.visible)||(this.props.marker!== prevProps.marker)){

            this.props.visible?
                this.openWindow():
                this.closeWindow();
        }
        
       
    }
    
    //Construct google maps api infowin
    
    renderInfoWindow(){
        let {google,onClose}=this.props;
        const iw = this.infowindow = new google.maps.InfoWindow()
         google.maps.event.addListener(iw, 'domready', this.styleWindow);
        google.maps.event.addListener(iw,'closeclick',function(){
            onClose({},null,false,false);
        });
   
    }
    

    openWindow(){
        const {onOpen} = this.props;
        onOpen();
        this.infowindow.open(this.props.map, this.props.marker);
    }
    closeWindow(){
        this.infowindow.close();
    }
    
    //style window on dom ready
    styleWindow(){
        let iwOuter = $('.gm-style-iw');
        
        iwOuter.children(':nth-child(1)').children(':nth-child(1)').css({
           'overflowX': 'hidden' 
        });

        let iwBackground = iwOuter.prev();

        // Removes background shadow DIV
        iwBackground.children(':nth-child(2)').css({
            'display': 'none'
        });

        // Removes white background DIV
        iwBackground.children(':nth-child(4)').css({
            'display': 'none'
        });

        // Changes the desired tail shadow color.
        iwBackground.children(':nth-child(3)').find('div').children().css({
            'box-shadow': '#FF7964 0px 5px 6px',
            'background-color': "#FF7964",
            'z-index': '1'
        });



  
    }
}
InfoWindow.propTypes = {
    google: PropTypes.object,
    map: PropTypes.object,
    marker: PropTypes.object,
    infowincontent: PropTypes.object,
    visible: PropTypes.bool
}