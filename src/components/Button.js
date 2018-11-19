import React, {
    Component
} from 'react'
import '../css/button.css'
export default class Button extends Component{

    render(){
        const {imageSrc,onButtonClick} = this.props;
   
        const styleImage ={
            width:'35px',
            height:'45px'
        }
   
        return (<a className="btn" onClick={onButtonClick}>
     
            <img src={imageSrc} style={styleImage} />
        
        </a>);
    }
}