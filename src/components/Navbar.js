import React, {
    Component
} from 'react'
import Button from './Button'
import Form from './Form';
export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false
        }
    }
    render() {

        const styles = {
            width: '100%',
            height: '8%',
            background: '#F4F4F4',
            position: 'absolute',
            zIndex: '1000',
            boxShadow: '0 0 25px #888888'
        }
        const formStyles={
    

            height: "70%",
            /* Full-height: remove this if you want "auto" height */
            width: "60%",
            /* Set the width of the sidebar */
            position: "fixed",
            margin:'0px 20%',
            top:'10%',
            /* Fixed Sidebar (stay in place on scroll) */
            zIndex: '1001',
            /* Black */
            overflowX: 'hidden',
            /* Disable horizontal scroll */
            overflowY: 'visible',
            background: 'rgba(0, 0, 0, 0.5)',
            color: 'white'
        }
        if (!this.state.clicked) {
            return ( <div style = {styles}> <Button as= {"a"} imageSrc = {require('../img/addPinBtn.png')} onButtonClick = {this.OnClickEvent}/>   </div > )
        } else {
            return (<div width={'100%'} height={'100%'}> <div style = {styles}> <Button as= {"a"} imageSrc = {require('../img/addPinBtnClicked.png')} onButtonClick = {this.OnClickEvent}/> </div> <div style={formStyles}><Form></Form></div></div>)
        }


    }
    OnClickEvent = ()=> {
        this.setState({
            clicked: !this.state.clicked
        });
    }
}