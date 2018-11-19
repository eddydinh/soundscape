import React, {
    Component
} from 'react'
import '../css/form.css'
import Button from '../components/Button'
import {
    connect
} from 'react-redux'
import {
    RecordLatLng
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
        OnAutoButtonClick: (location) => dispatch(RecordLatLng(location))
    }

}

export class Form extends Component{
    
    render(){
        const {lat,lng}= this.props;
        return(<div><div className="form-div">    
            <div className="form">
               
            
                    <input className="form-map-input" type={"text"} name="title" placeholder={"TITLE"}></input>
                    <br/>  
                    <input className="form-map-input" type={"text"} name="description" placeholder={"DESCRIPTION"}></input>
                    <br/>
                    
                    <input readOnly className="latlng-input" id="lat" name="lat" type="float" placeholder="LAT" value={lat}></input>

                    <input readOnly className="latlng-input" id="lng" name="lng" type="float" placeholder="LNG" value={lng}></input>
                   
                    
                   <Button as={"btn-input"} onClick={this.AutoButtonClick}placeholder={"AUTO"} nameofClass={"btn-form btn-auto"}></Button>
                   <br/>
                   <Button as={"btn-media"} nameofClass= {"btn-form btn-media"} placeholder= {"  ADD MEDIA"} imageSrc={require("../img/AddMediaIcon.png")}></Button>
                   <br/>
                   <Button as={"btn-input"} placeholder={"ADD PIN"} nameofClass = {"btn-form btn-addPin"}></Button>
   
            </div>
               
            </div>
            <Modal as={"mediaModal"}></Modal>
            </div>
        )
    }
    AutoButtonClick = ()=>{
        const {currentLocation,OnAutoButtonClick} = this.props;
        OnAutoButtonClick(currentLocation);
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form);