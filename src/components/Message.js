import React, {
    Component
} from 'react'
import '../css/message.css'
import $ from 'jquery'
export default class Message extends Component{
    render(){
        const {as,error,success} = this.props; 
        switch(as){
            case 'none':
                return null;
            case 'error':
                return (
                    <div id="messageWrapper" >
                     <div id={'light'} className={'white_content'}>
                    <div className={'alert alert-danger'}>
                        <a className={'close'} onClick={this.errorToggle} data-dismiss={'alert'} aria-label={'close'}>&times;</a>
                        <p>Cannot add pin. There were error(s) in your submission:</p>{error}</div>
                      </div>
                      <div id={'fade'} className={'black_overlay'}></div>
                </div>
                );
            default: 
                return null;
        }
    }
    
    errorToggle =() =>{
        $("#fade").toggle();
    }

}