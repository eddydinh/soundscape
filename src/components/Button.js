import React, {
    Component
} from 'react'
import '../css/button.css'
export default class Button extends Component{

    render(){
        const {imageSrc,onButtonClick,as,nameofClass,placeholder,onClick} = this.props;
   
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
   
            return (<a className="btn" onClick={onButtonClick}>

                <img src={imageSrc} style={styleImage} />

            </a>);
        }
        else if (as==="btn-input"){
            
            return (<input type="button" className={nameofClass} onClick={onClick} value={placeholder}></input>);
        }
        else if (as==="btn"){
            return(  <button className={nameofClass}><img src={imageSrc} style={styleImageAddMedia}></img>{placeholder}</button>);
        }

    }
}