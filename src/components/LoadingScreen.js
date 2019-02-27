import React, {
    Component
} from 'react'
import '../css/loadingscreen.css'
import PropTypes from 'prop-types';
export default class LoadingScreen extends Component{
    constructor(props){
      
        super(props);
        this.state = {
            
            text:'LOADING REQUEST'
        
        }
        
        
        
        
    }
    componentDidMount(){
        this.AddDot();
    }
    render(){
        const {visible} = this.props;
        
       if(visible){
            return(
            
            <div id="loaderDiv" >
                <div id="spinnerDiv">
                    <div id="loader"></div>
                    <p>{this.state.text}</p>
                </div>

            </div>
            )
       }else{
           return null;
       }
        
    }
    
    
    AddDot = () =>{
      let dots = 0;
      let addDotInterval;
    

      clearInterval(addDotInterval);

      addDotInterval = setInterval( () =>{
        if (dots < 3) {
            this.setState({text:this.state.text +="."});
            dots++;
        } else {

            this.setState({text:"LOADING REQUEST"});
            dots = 0;
        }
    }, 400);

  
        
    }
   
 
}

LoadingScreen.propTypes ={
    visible:PropTypes.bool
  
  
}