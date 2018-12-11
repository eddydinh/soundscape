import React, {
    Component
} from 'react'
import '../css/audioplayer.css'
export default class AudioPlayer extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            
            play: false,
            url : "http://localhost:3000/bgAudio.mp3",
            
        
        }
        this.audio = new Audio (this.state.url);
        this.markerAudio = new Audio ();
        this.togglePlay = this.togglePlay.bind(this);
        this.audio.autoplay =true;
        this.audio.loop =true;
        
    }
    
    componentDidUpdate(prevProps,prevState){
        if(prevProps.markerAudio !== this.props.markerAudio){
            this.TurnOnMarkerAudio(this.props.markerAudio);
        }
    }
    
    //Turn on audio for marker in close proximity
    TurnOnMarkerAudio(filename){
       const {FadeInVolume, FadeOutVolume} = this;
       
        FadeOutVolume(()=>{
             this.audio.pause()
        const src = `http://localhost:3000/${filename}`
        this.markerAudio.src = src;
        this.markerAudio.volume = 0;
        this.markerAudio.play();
        FadeInVolume(()=>{return},50,0.01,1,"marker");
        this.markerAudio.onended = () => {
            this.audio.play()
            FadeInVolume(()=>{return},10, 0.01, 1,"main")
            
        }
        },10, 0.01,"main" )
       
      
    }
    
   FadeOutVolume =(callback,speed,factor,_audio) =>{
       const {audio,markerAudio} = this;
         let fadedaudio = null;
       if(_audio=="main"){
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
       if(_audio=="main"){
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

    render(){
        return (  <div className="audioWrapper">   
            <button onClick={this.togglePlay}>{this.state.play ? <i className="fas fa-volume-off"></i>: <i className="fas fa-volume-up"></i> }</button>
           </div>)
    }
    
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