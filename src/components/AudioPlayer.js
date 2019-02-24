import React, {
    Component
} from 'react'
import {
    serverURL
} from '../serverurl'
import '../css/audioplayer.css'

export default class AudioPlayer extends Component{
    
    constructor(props){
        const url = serverURL[0].url;
        super(props);
        this.state = {
            
            play: false,
            url : url+"bgAudio.mp3",
            
        
        }
        
        
        this.audio = new Audio (this.state.url); //Background audio
        this.markerAudio = new Audio (); //Marker's audio
        this.togglePlay = this.togglePlay.bind(this);
        this.audio.autoplay =true;
        this.audio.loop =true;
        
    }
    
    componentDidUpdate(prevProps,prevState){
        if(prevProps.markerAudio !== this.props.markerAudio){
            this.TurnOnMarkerAudio(this.props.markerAudio); //if marker's audio value changed
        }
    }
    
    //Turn on audio for marker in close proximity
    TurnOnMarkerAudio(filename){
       const {FadeInVolume, FadeOutVolume} = this;
       const url = serverURL[0].url;
        
        //if there is media file attached to marker
        if(filename!=='none'){
            
        FadeOutVolume(()=>{
            
        this.audio.pause() // pause background audio
            
        const src = `${url}${filename}`
        
        this.markerAudio.src = src; //Set marker's audio's source
        this.markerAudio.volume = 0;// Initial marker's audio volume
        this.markerAudio.play(); //Play marker's audio
            
        FadeInVolume(()=>{return},50,0.01,1,"marker"); //Gradually increase marker's audio volume
            
            
        //When marker's audio ends
        this.markerAudio.onended = () => {
            this.audio.play()
            FadeInVolume(()=>{return},10, 0.01, 1,"main") //Graudually increase background audio volume
            
        }
        },10, 0.01,"main" ) //Fade Out Volume of background
            
        }
       
      
    }
    
    

    
   FadeOutVolume =(callback,speed,factor,_audio) =>{
       const {audio,markerAudio} = this;
         let fadedaudio = null;
       if(_audio==="main"){
           fadedaudio = audio;
       }else{
           fadedaudio = markerAudio;
       }
       if(fadedaudio.volume > factor){
   		fadedaudio.volume -= factor;
        setTimeout(this.FadeOutVolume,speed,callback,speed,factor,_audio);
    }else{
    	(typeof(callback) !== 'function') || callback();
    }
   }
   
   
   FadeInVolume =(callback,speed,factor,target,_audio) =>{
       
       const {audio,markerAudio} = this;
       let fadedaudio = null;
       if(_audio==="main"){
           fadedaudio = audio;
       }else{
           fadedaudio = markerAudio;
       }
       
       if(fadedaudio.volume < target-factor){
   		fadedaudio.volume += factor;
        setTimeout(this.FadeInVolume,speed,callback,speed,factor,target,_audio);
    }else{
    	(typeof(callback) !== 'function') || callback();
    }
   }

   //Display mute button
    render(){
        return (<div className="audioWrapper">   
            <button onClick={this.togglePlay}>{this.state.play ? <i className="fas fa-volume-off"></i>: <i className="fas fa-volume-up"></i> }</button>
           </div>)
    }
    
    //Mute toggle function
    togglePlay(){
        this.setState({play:!this.state.play});
        if (this.state.play){
            this.audio.muted = false ;
            this.markerAudio.muted =false;
        }else{
            this.audio.muted = true;
            this.markerAudio.muted = true;
        }
    }


}