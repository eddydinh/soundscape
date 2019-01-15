import React, {
    Component
} from 'react'
import '../css/button.css'
import PropTypes from 'prop-types';
export default class Button extends Component{
    
    render(){
     
        const {imageSrc,as,nameofClass,placeholder,onClick, addClass, visible, iWidth,iHeight,modalID} = this.props;
        
       
     
        let styles = {};
        const styleImage ={
            width:iWidth,
            height: iHeight
        }
        
        const styleImageAddMedia ={
            width:'20px',
            height:'20px',
            marginTop:'0px'
        }
        
        
        
        if(visible!==null){
           
           
           
            if(visible){
                styles = {
                    display:'inline-block'
                }
            }
            else{
                styles ={
                    display:'none'
                }
            }
        }
        
       
        
        if(as==="a"){
   
            return (<a style={styles} className= {`btn ${addClass}`} onClick={onClick}>

                <img src={imageSrc} style={styleImage} alt={""} />

            </a>);
        }
        else if (as==="btn-input"){
            
            return (<input style={styles} type="button" className={nameofClass} onClick={onClick} value={placeholder}></input>);
        }
        else if (as==="btn-media"){
            return(   
                <button  className={nameofClass} type="button" data-toggle={"modal"} data-target={modalID}><img src={imageSrc} style={styleImageAddMedia} alt={""}></img>{placeholder}</button>);
        }
        else if (as==="btn-close"){
            return(<button type="button" className={nameofClass} data-dismiss="modal" onClick={onClick}>{placeholder}</button>)
        }
        else if (as==="modalBtn"){
            return(<button style={styles} type="button" className={nameofClass} data-toggle="modal" data-target={modalID}>{placeholder}</button>)
        }
         

    }
}
        
Button.propTypes = {
    as: PropTypes.string
}
Button.defaultProps = {
    as: "btn-input"
}