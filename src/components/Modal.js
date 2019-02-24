import React, {
    Component
} from 'react'
import '../css/modal.css'
import '../css/button.css'
import PropTypes from 'prop-types'
import Button from './Button'
export default class Modal extends Component{

    render(){
        const {as, modalID,value,onYesClick} = this.props;  
        
        //add media modal
        if(as==="mediaModal"){
            return(
                
        <div id={modalID} className="modal fade" role="dialog">
        <div className="modal-dialog">

     
            <div className="modal-content">
                <div className="modal-header">
                    <h4>Media Uploader</h4>
                </div>

                <div className="modal-body">


                    <div className="input-group mb-3">
                        <div className="custom-file">

                            <input type="file" onChange={this.props.handleUploadedFile} className="custom-file-input" id="mediaUploader" name="media"></input>
                            <label className="custom-file-label" id="mediaLabel" >{this.props.inputFileName}</label>
                        </div>
                    </div>
                       
                       
                       
            

                </div>
                <div className="modal-footer">
                    <Button as={"btn-close"} nameofClass={"btn-form btn-close"} placeholder={"CLOSE & SAVE"}></Button>
                </div>
            </div>

        </div>
    </div>
                
            )
        }
        
        //common modal
        else if (as==="normalModal"){
           return (
                
                 <div id={modalID} className="modal fade" role="dialog">
        
                 <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h4>{value}</h4>
                </div>

                <div className="modal-footer" style={{textAlign:"center"}}>
                  

                        <Button as={"btn-close"} nameofClass={"btn-form btn-close"} placeholder={"YES"} onClick ={onYesClick}></Button>
                           
                            <Button as={"btn-close"} nameofClass={"btn-form btn-close"} placeholder={"NO"}></Button>
                   
                </div>
            </div>

        </div>
    </div>
           
           )
        }
    }
    

}
Modal.propTypes = {
    as: PropTypes.string,
    modalID: PropTypes.string
}
Modal.defaultProps = {
    as: "mediaModal"
}