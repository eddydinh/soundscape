import React, {
    Component
} from 'react'
import PropTypes from 'prop-types'
import '../css/infoWindow.css'
export default class InfoWindowInput extends Component{
    
    render(){
        const {value,visibility,onChange,inputType,name,addClass} = this.props;
     
           let styles={ display:'block'};
        if(visibility!==null){
           
           
           
            if(!visibility){
       
                styles ={
                    display:'none'
                }
            }
        }
        return(
            <input className={addClass} style={styles} type={inputType} name={name} value={value} onChange={onChange}></input>
        )
    }
}
InfoWindowInput.propTypes = {
    value: PropTypes.string,
    name: PropTypes.string,
    inputType: PropTypes.string,
    visibility: PropTypes.bool,
    onChange: PropTypes.func,

    
}
InfoWindowInput.defaultProps = {
    value: "",
    visibility: false,
    inputType:"text"
}