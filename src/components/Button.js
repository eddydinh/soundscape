import React, {
    Component
} from 'react'
import '../css/button.css'
import PropTypes from 'prop-types';
export default class Button extends Component{

    render(){
        const {imageSrc,onButtonClick,as,nameofClass,placeholder,onClick, addClass} = this.props;
   
        const styleImage ={
            width:'35px',
            height:'45px'
        }
        
        const styleImageAddMedia ={
            width:'20px',
            height:'20px',
            marginTop:'0px'
        }
        
        if(as==="a"){
   
            return (<a className= {`btn ${addClass}`} onClick={onButtonClick}>

                <img src={imageSrc} style={styleImage} alt={""} />

            </a>);
        }
        else if (as==="btn-input"){
            
            return (<input type="button" className={nameofClass} onClick={onClick} value={placeholder}></input>);
        }
        else if (as==="btn-media"){
            return(   <button className={nameofClass} type="button" data-toggle="modal" data-target="#myModal"><img src={imageSrc} style={styleImageAddMedia} alt={""}></img>{placeholder}</button>);
        }
        else if (as==="btn-close"){
            return(<button type="button" className={nameofClass} data-dismiss="modal">Close and Save</button>)
        }

    }
}
        
Button.propTypes = {
    as: PropTypes.string
}
Button.defaultProps = {
    as: "btn-input"
}