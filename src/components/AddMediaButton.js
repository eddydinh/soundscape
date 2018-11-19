import React, {
    Component
} from 'react'
import '../css/button.css'
export default class Button extends Component{

    render(){
        const {imageSrc,onButtonClick,nameofClass,placeholder} = this.props;
   
        const styleImage ={
            width:'20px',
            height:'20px',
            marginTop:'0px'
        }
        
        return (    <button className={nameofClass} type="button" data-toggle="modal" data-target="#myModal"><img src={imageSrc} style={styleImage}></img>{placeholder}</button>);
   
    }
}