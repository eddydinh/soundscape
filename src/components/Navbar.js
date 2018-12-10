import React, {
    Component
} from 'react'
import Button from './Button'
import Form from '../containers/Form';
import AudioPlayer from '../components/AudioPlayer'
export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false
        }
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
      
        if (!this.state.clicked) {
            return ( 
                
        <div style = {navStyles}> 
            <Button as= {"a"} imageSrc = {require('../img/addPinBtn.png')} onButtonClick = {this.OnClickEvent}/>   
            <AudioPlayer></AudioPlayer>
            </div > )
        } else {
            return (<div width={'100%'} height={'100%'}> <div style = {navStyles}> 
            <Button as= {"a"} imageSrc = {require('../img/addPinBtnClicked.png')} onButtonClick = {this.OnClickEvent}/> 
            
            <AudioPlayer></AudioPlayer>
            
            </div>
            
            <div>
            <Form></Form>
            
            </div>
            
            </div>)
        }


    }
    OnClickEvent = ()=> {
        this.setState({
            clicked: !this.state.clicked
        });
    }
}