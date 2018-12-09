import React, {
    Component
} from 'react'
import '../css/modal.css'
import '../css/button.css'
import PropTypes from 'prop-types'
import Button from './Button'
export default class Modal extends Component{

    render(){
        const {as} = this.props;   
        if(as==="mediaModal"){
            return(
                
        <div id="myModal" className="modal fade" role="dialog">
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
                       
                       
                        <label>Media type:    </label>
                    <select name="mediaSelection" id="mediaSelection" onChange={this.props.handleFileType}>
                        <option value="wav">wav</option>
                        <option value="mp3">mp3</option>
                        <option value="ogg">ogg</option>
                     
                        
                    </select>

                </div>
                <div className="modal-footer">
                    <Button as={"btn-close"} nameofClass={"btn-form btn-close"}>Close and Save</Button>
                </div>
            </div>

        </div>
    </div>
                
            )
        }
    }
    

}
Modal.propTypes = {
    as: PropTypes.string
}
Modal.defaultProps = {
    as: "mediaModal"
}