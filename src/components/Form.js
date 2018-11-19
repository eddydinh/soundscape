import React, {
    Component
} from 'react'
import '../css/form.css'
export default class Form extends Component{
    
    render(){
        
        return(
            <div>
                <form className="form">
            
                    <input className="form-map-input" type={"text"} placeholder={"TITLE"}></input>
                    <br/>  
                    <input className="form-map-input" type={"text"} placeholder={"DESCRIPTION"}></input>
                </form>
            </div>
        )
    }
}
