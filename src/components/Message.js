import React, {
    Component
} from 'react'
import '../css/message.css'
import PropTypes from 'prop-types';
export default class Message extends Component{
    render(){
        const {as,success,error,onClose} = this.props; 
        switch(as){
            case 'none':
                return null;
            case 'success':
                return (
                    <div id="messageWrapper" >
                     <div id={'light'} className={'white_content'}>
                    <div className={'alert alert-success'}>
                        <a className={'close'} onClick={onClose} data-dismiss={'alert'} aria-label={'close'}>&times;</a>
                        <p>{success}</p></div>
                      </div>
                      <div id={'fade'} className={'black_overlay'}></div>
                </div>
                );
            case 'error':
                return (
                    <div id="messageWrapper" >
                     <div id={'light'} className={'white_content'}>
                    <div className={'alert alert-danger'}>
                        <a className={'close'} onClick={onClose} data-dismiss={'alert'} aria-label={'close'}>&times;</a>
                        <p>Cannot add marker. There were error(s) in your submission:</p>{error}</div>
                      </div>
                      <div id={'fade'} className={'black_overlay'}></div>
                </div>
                );
            default: 
                return null;
        }
    }
   
 
}

Message.propTypes ={
    as:PropTypes.string,
    success:PropTypes.string,
    error:PropTypes.string
  
}