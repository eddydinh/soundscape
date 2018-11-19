import React, {
    Component
} from 'react'
import '../css/button.css'
export default class Modal extends Component{

    render(){
     
   
   
        
        
   
        return (
            
            <div>
                  
    <div id="myModal" class="modal fade" role="dialog">
        <div class="modal-dialog">

         
            <div class="modal-content">
                <div class="modal-header">
                    <h4>Media Uploader</h4>
                </div>

                <div class="modal-body">


                    <div class="input-group mb-3">
                        <div class="custom-file">

                            <input type="file" class="custom-file-input" id="mediaUploader" name="media"></input>
                            <label class="custom-file-label" id="mediaLabel" for="mediaUploader">Upload a media for the artwork (Maximum size: 2MB)</label>
                        </div>
                    </div>
                    <label for="mediaSelection">Media type: </label>
                    <select name="mediaSelection" id="mediaSelection">
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                        <option value="audio">Audio</option>
                        
  </select>



                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close and Save</button>
                </div>
            </div>

        </div>
    </div>
            </div>
          
        
    )
}
}