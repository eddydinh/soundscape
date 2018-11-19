import React, {
    Component
} from 'react'
import '../css/form.css'
import Button from './Button'
import AddMediaButton from './AddMediaButton'
export default class Form extends Component{
    
    render(){
        
        return(
            <div>
                <form className="form">
            
                    <input className="form-map-input" type={"text"} name="title" placeholder={"TITLE"}></input>
                    <br/>  
                    <input className="form-map-input" type={"text"} name="description" placeholder={"DESCRIPTION"}></input>
                    <br/>
                    
                    <input readonly className="latlng-input" id="lat" name="lat" type="float" placeholder="LAT"></input>

                    <input readonly className="latlng-input" id="lon" name="lon" type="float" placeholder="LNG"></input>
                   
                    
                   <Button as={"btn"} placeholder={"AUTO"} nameofClass={"btn-form btn-auto"}></Button>
                   <br/>
                   <AddMediaButton nameofClass= {"btn-form btn-media"} placeholder= {"  ADD MEDIA"} imageSrc={require("../img/AddMediaIcon.png")}></AddMediaButton>
                </form>
            </div>
        )
    }
}
