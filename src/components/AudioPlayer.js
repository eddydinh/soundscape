import React, {
    Component
} from 'react'
import '../css/audioplayer.css'
import Button from './Button'
import PropTypes from 'prop-types';
export default class AudioPlayer extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            
            play: false,
            url : "http://localhost:3000/bgAudio.mp3",
            
        
        }
        this.audio = new Audio (this.state.url)
        this.togglePlay = this.togglePlay.bind(this);
        this.audio.autoplay =true;
        this.audio.loop =true;
    }
    
    render(){
        return (  <div className="audioWrapper">   
            <button onClick={this.togglePlay}>{this.state.play ? 'Play' : 'Pause'}</button>
           </div>)
    }
    
    togglePlay(){
        this.setState({play:!this.state.play});
        console.log(this.state.play);
        this.state.play ? this.audio.muted = false  : this.audio.muted = true
    }


}