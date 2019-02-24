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
    requestMarkers,
    SetMessage
} from '../actions'
import {
    serverURL
} from '../serverurl'
import Modal from "../components/Modal"
import '../css/form.css';
//pass state in reducer to props
const mapStateToProps = state => {
  
    return {
        lat: state.OnRecordLatLngReducer.lat,
        lng: state.OnRecordLatLngReducer.lng,
        currentLocation: state.SetCurrentPosReducer.currentLocation,
       
    }

}
//Pass action to event handler
const mapDispatchToProps = (dispatch) => {
    return {
        OnAutoButtonClick: (location) => dispatch(RecordLatLng(location)),
        OnRequestMarkers: () => dispatch(requestMarkers()),
        SetMessage: (type, success, error) => dispatch(SetMessage(type, success, error))
       
    }

}

export class Form extends Component{
      constructor(props){
        super(props);
        this.state = {
            title:'',
            description:'',
            lat:null,
            lng:null,
            file:null,
            filetype:'wav',
            filename:'Upload a sound file (Max: 1GB)'
            
        }
    }
    
    HandleUploadedFile = (event)=>{

        let uploadedFile =  event.target.files[0];
        let filename = uploadedFile.name;
        this.setState({file: uploadedFile});
        this.setState({filename: filename});
        this.setState({filetype: filename.split('.').pop()})
        
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
    const{title,description,lat,lng,file,filename}= this.state;
    const {closeForm, SetMessage,OnRequestMarkers} = this.props;
        
   
    //If there is no marker's location => can't add marker    
    if((lat === null) || (lng === null)){
        SetMessage('error', '', 'Please specify marker\'s location');
        return
    } 
        
    //If there is uploaded file
    if(filename !== "Upload a sound file (Max: 1GB)"){
    //Validate extension
    if (!(this.CheckExtension(filename))){
        SetMessage('error', '', 'Uploaded file is not a sound file');
        return
    }
    }

       const formData = new FormData();
       const obj = this.state;
       Object.keys(obj).forEach(function(key) {
            
            //Only add file's information if there is any
               switch (key) {
                case 'file':
                    if (obj[key] !== null) formData.append(key, obj[key]);
                    else  break;
                    break;
                case 'filename':
                    if (obj[key] !== 'Upload a sound file (Max: 1GB)') formData.append(key, obj[key]);
                    else  formData.append(key, 'none');
                    break;
                default:
                    formData.append(key, obj[key]);
                    break;
            }
           
          
           
        });

//  //Use this to inspect formData
//        for (var pair of formData.entries()) {
//            console.log(pair[0]+ ', ' + pair[1]); 
//        }

      const url = serverURL[0].url;
        
        //Add marker server query
        fetch(url+ 'addmarker',{
            method: 'post',
            body:formData
            
        })
        .then(response => response.json())
        .then((data) => {
           if(data === 'success'){
               console.log(data);
               OnRequestMarkers();
               this.ResetState();
               SetMessage('success', 'Congratulations! You successfully added a marker!', '');
               
            }
            else SetMessage('error', 'Unable to add marker - please try again later', '');;
        })
        
        closeForm(); 
        
       
        
        
    }
    
    ResetState =() =>{
        this.setState({title:'', description:''});
        
    }
    
    //Src:https://stackoverflow.com/questions/4234589/validation-of-file-extension-before-uploading-file
    //Check file upload extension with RegEx
    CheckExtension = (filename) => {
        
        if ( /\.(ogg|wav|mp3|)$/i.test(filename) === false ) { return false; }
        return true;
}
    //Update lat and lng 
    componentDidUpdate(prevProps, prevState){
        if(prevProps.lat !== this.props.lat){
            
            this.setState({lat: this.props.lat});
        }
        if(prevProps.lng !== this.props.lng){

            this.setState({lng: this.props.lng});
        }
    }

//set lat and lng states according to global lat and lng
componentDidMount(){
    if(this.props.lat!== "LAT" && this.props.lng !== "LNG"){
     this.setState({lat: this.props.lat});
     this.setState({lng: this.props.lng});
    }
}
    //display form
    render(){
        const {lat,lng,visible}= this.props;
        const modalID = "myModal";
        return  !visible ? null :
        
        (
            
            <div>
            <div className="form-div">    
            <div className="form">
               
            
                    <input className="form-map-input" type={"text"} name="title" placeholder={"TITLE"} onChange={this.HandleTitle}></input>
                    <br/>  
                    <input className="form-map-input" type={"text"} name="description" placeholder={"DESCRIPTION"} onChange={this.HandleDescription}></input>
                    <br/>
                    
                    <input readOnly className="latlng-input" id="lat" name="lat" type="float" placeholder="LAT" value={lat}></input>

                    <input readOnly className="latlng-input" id="lng" name="lng" type="float" placeholder="LNG" value={lng}></input>
                   
                    
                   <Button as={"btn-input"} onClick={this.AutoButtonClick} placeholder={"AUTO"} nameofClass={"btn-form btn-auto"} visible={true}></Button>
                   <br/>
                   <Button as={"btn-media"} nameofClass= {"btn-form btn-media"} placeholder= {"  ADD MEDIA"} imageSrc={require("../img/AddMediaIcon.png")}  visible={true} modalID={"#"+modalID}></Button>
                   <br/>
                   <Button as={"btn-input"} placeholder={"ADD PIN"} nameofClass = {"btn-form btn-addPin"} onClick={this.HandleSubmit}  visible={true}></Button>
                   
             
   
            </div>
               
            </div>
            <Modal as={"mediaModal"} handleUploadedFile ={this.HandleUploadedFile} inputFileName ={this.state.filename} modalID={modalID}></Modal>
            </div>
        )
    }
    

    
    

}
export default connect(mapStateToProps,mapDispatchToProps)(Form);