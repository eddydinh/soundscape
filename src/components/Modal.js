import React, {
    Component
} from 'react'
import '../css/modal.css'
import '../css/button.css'
import PropTypes from 'prop-types'
import Button from './Button'
export default class Modal extends Component{
    constructor(props){
        super(props);
        this.state = {
            inputFileName:'Upload your sound file (Maximum size: 1GB)'
        }
    }
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

                            <input type="file" onChange={this.OnFileValueChange} className="custom-file-input" id="mediaUploader" name="media"></input>
                            <label className="custom-file-label" id="mediaLabel" >{this.state.inputFileName}</label>
                        </div>
                    </div>
                

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
    
    OnFileValueChange= (e)=>{
        this.setState({inputFileName: e.target.files[0].name});
    

}
}
Modal.propTypes = {
    as: PropTypes.string
}
Modal.defaultProps = {
    as: "mediaModal"
}