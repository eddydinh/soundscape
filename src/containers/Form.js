import React, {
    Component
} from 'react'
import '../css/form.css'
import Button from '../components/Button'
import {
    connect
} from 'react-redux'
import {
    RecordLatLng,
    requestMarkers
} from '../actions'
import Modal from "../components/Modal"
import '../css/form.css';
//pass state in reducer to props
const mapStateToProps = state => {
  
    return {
        lat: state.OnRecordLatLngReducer.lat,
        lng: state.OnRecordLatLngReducer.lng,
        currentLocation: state.SetCurrentPosReducer.currentLocation
    }

}
//Pass action to event handler
const mapDispatchToProps = (dispatch) => {
    return {
        OnAutoButtonClick: (location) => dispatch(RecordLatLng(location)),
        OnRequestMarkers: () => dispatch(requestMarkers())
    }

}

export class Form extends Component{
      constructor(props){
        super(props);
        this.state = {
            title:'',
            description:'',
            lat:0,
            lng:0,
            file:null,
            filetype:'wav',
            filename:'Upload a sound file (Max: 1GB)'
            
        }
    }
    
    HandleUploadedFile = (event)=>{

        this.setState({file: event.target.files[0]});
        this.setState({filename: event.target.files[0].name});
        
    }
    
    HandleFileType = (event)=>{
        this.setState({filetype: event.target.value});
       
        
    }
    
    HandleTitle = (event)=>{
        this.setState({title: event.target.value});
       
        
    }
    
    HandleDescription = (event)=>{
        this.setState({description: event.target.value});
       
        
    }
    
    AutoButtonClick = ()=>{
        const {currentLocation,OnAutoButtonClick} = this.props;
        OnAutoButtonClick(currentLocation);
    }
    
    HandleSubmit = () =>{
       const formData = new FormData();
       const obj = this.state;
       Object.keys(obj).forEach(function(key) {

            formData.append(key,obj[key]);
           
        });
        
        for (var pair of formData.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
}
      
        fetch('http://localhost:3000/addmarker',{
            method: 'post',
            body:formData
            
        })
        .then(response => response.json())
        .then((data) => {
           if(data === 'success'){console.log(data);
                                 
                                 }
            else console.log("failed");
        })
        
        
       
        
        
    }
    
    componentDidUpdate(prevProps, prevState){
        if(prevProps.lat !== this.props.lat){
            
            this.setState({lat: this.props.lat});
        }
        if(prevProps.lng !== this.props.lng){

            this.setState({lng: this.props.lng});
        }
    }

componentDidMount(){
    if(this.props.lat!== "LAT" && this.props.lng !== "LNG"){
     this.setState({lat: this.props.lat});
     this.setState({lng: this.props.lng});
    }
}
    
    render(){
        const {lat,lng}= this.props;
        return(
            
            <div><div className="form-div">    
            <div className="form">
               
            
                    <input className="form-map-input" type={"text"} name="title" placeholder={"TITLE"} onChange={this.HandleTitle}></input>
                    <br/>  
                    <input className="form-map-input" type={"text"} name="description" placeholder={"DESCRIPTION"} onChange={this.HandleDescription}></input>
                    <br/>
                    
                    <input readOnly className="latlng-input" id="lat" name="lat" type="float" placeholder="LAT" value={lat}></input>

                    <input readOnly className="latlng-input" id="lng" name="lng" type="float" placeholder="LNG" value={lng}></input>
                   
                    
                   <Button as={"btn-input"} onClick={this.AutoButtonClick} placeholder={"AUTO"} nameofClass={"btn-form btn-auto"}></Button>
                   <br/>
                   <Button as={"btn-media"} nameofClass= {"btn-form btn-media"} placeholder= {"  ADD MEDIA"} imageSrc={require("../img/AddMediaIcon.png")}></Button>
                   <br/>
                   <Button as={"btn-input"} placeholder={"ADD PIN"} nameofClass = {"btn-form btn-addPin"} onClick={this.HandleSubmit}></Button>
   
            </div>
               
            </div>
            <Modal as={"mediaModal"} handleUploadedFile ={this.HandleUploadedFile} inputFileName ={this.state.filename} handleFileType = {this.HandleFileType}></Modal>
            </div>
        )
    }
    

    
    

}
export default connect(mapStateToProps,mapDispatchToProps)(Form);