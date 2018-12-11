import React, {
    Component
} from 'react'
import Button from '../components/Button'
import Form from './Form';
import AudioPlayer from '../components/AudioPlayer'
import {
    connect
} from 'react-redux'
import{
    OnReset
}from '../actions'


const mapStateToProps = state => {
  
    return {
        filename: state.PassFileNameReducer.filename,
        resetclick: state.OnResetReducer.resetclick
    }

}

const mapDispatchToProps = dispatch => {
  
    return {
        OnResetClick: (click)=> dispatch(OnReset(click))
    }

}

export class Navbar extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            clicked: false
        }
        this.btnImg = require('../img/addPinBtn.png');
    }
    render() {

        const navStyles = {
            width: '100%',
            height: '8%',
            background: '#F4F4F4',
            position: 'absolute',
            zIndex: '1000',
            boxShadow: '0 0 25px #888888'
        }
      
        const {clicked} = this.state;
        
        
      
   
      return (<div width={'100%'} height={'100%'}> <div style = {navStyles}> 
            <Button as= {"a"} imageSrc = {this.btnImg} onButtonClick = {this.OnClickEvent}/> 
            
            <AudioPlayer markerAudio={this.props.filename}></AudioPlayer>
            
            <Button addClass={"resetBtn"} as= {"a"} imageSrc = {require('../img/FindMeIcon.png')} onButtonClick = {this.OnReset}/> 
            
            </div>
            
            <div>
            <Form closeForm={this.OnClickEvent} visible = {clicked}></Form>
            
            </div>
            
            </div>)
        


    }
    OnClickEvent = ()=> {
        this.setState({
            clicked: !this.state.clicked
        });
        if(!this.state.clicked){
        
                this.btnImg = require('../img/addPinBtnClicked.png');
           
           
        }else{
 
                this.btnImg = require('../img/addPinBtn.png');
           
        }
    }
    
    OnReset = () =>{
        const {OnResetClick, resetclick} = this.props;
        OnResetClick(!resetclick)
    }
    
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);