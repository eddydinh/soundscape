import React, {
    Component
} from 'react'
import PropTypes from 'prop-types'
export default class InfoWindowText extends Component{

    render(){
        const {value,visibility,styles} = this.props;
        let pStyle ={};
        pStyle = Object.assign({},styles,{display:"block"});
        
        if(visibility!==null){
           
        
            if(!visibility){
       
               pStyle = Object.assign({},styles,{display:"none"});
            }
        }
      
        return (
          <p style={pStyle}>{value}</p>
                             
        )
    }
}
InfoWindowText.propTypes = {
    value: PropTypes.string,
    visibility: PropTypes.bool,
    styles:PropTypes.object
}
InfoWindowText.defaultProps = {
    value: "",
    visibility: true,
    styles:{}
}