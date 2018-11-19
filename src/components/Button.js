import React, {
    Component
} from 'react'
import '../css/button.css'
export default class Button extends Component{

    render(){
        const {imageSrc,onButtonClick,as,nameofClass,placeholder} = this.props;
   
        const styleImage ={
            width:'35px',
            height:'45px'
        }
        
        if(as=="a"){
   
        return (<a className="btn" onClick={onButtonClick}>
     
            <img src={imageSrc} style={styleImage} />
        
        </a>);
        }
        else if (as=="btn"){
            
            return (<button className={nameofClass}>{placeholder}</button>);
        }
    }
}