import React, {
    Component
} from 'react'
import GoogleApiComponent from '../components/GoogleApiHandlers/GoogleApiComponent'
import {
    ApiKey
} from './MapData/ApiKey'
import {
    serverURL
} from '../serverurl'
import Map from './Map'
import Marker from '../components/Marker'
import MarkerList from '../components/MarkerList'
import Message from '../components/Message'
import Button from '../components/Button'
import Modal from "../components/Modal"
import InfoWindowInput from "../components/InfoWindowInput"
import InfoWindowText from "../components/InfoWindowText"
import InfoWindowEx from '../components/InfoWindowEx'

import {
    connect
} from 'react-redux'
import {
    OnInfowinEventAction,
    RecordLatLng,
    requestMarkers,
    PassFileName,
    SetMessage,
    OnDisplayEdit
} from '../actions'
import Navbar from './Navbar'
//pass state in reducer to props
const mapStateToProps = state => {

    return {
        btnVisible: state.OnInfowinEventReducer.btnVisible,
        selectedPlace: state.OnInfowinEventReducer.selectedPlace,
        activeMarker: state.OnInfowinEventReducer.activeMarker,
        showingInfoWindow: state.OnInfowinEventReducer.showingInfoWindow,
        markers: state.OnRequestMarkesReducer.markers,
        error: state.OnRequestMarkesReducer.error,
        currentLocation: state.SetCurrentPosReducer.currentLocation,
        messageType: state.SetMessageReducer.messageType,
        messageSuccess: state.SetMessageReducer.messageSuccess,
        messageError: state.SetMessageReducer.messageError


    }

}
//Pass action to event handler
const mapDispatchToProps = (dispatch) => {
    return {
        OnInfoWindowEvent: (props, marker, e) => dispatch(OnInfowinEventAction(props, marker, e)),
        OnGuidingMarkerClick: (location) => dispatch(RecordLatLng(location)),
        OnRequestMarkers: () => dispatch(requestMarkers()),
        PlayMarkerAudio: (filename) => dispatch(PassFileName(filename)),
        SetMessage: (type, success, error) => dispatch(SetMessage(type, success, error)),
        OnDisplayEdit: (visible) => dispatch(OnDisplayEdit(visible))
    }

}
export class Container extends Component {
    guidingMarker = null;


    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            lat: null,
            lng: null,
            file: null,
            filetype: 'wav',
            filename: 'Upload a sound file (Max: 1GB)'

        }
    }

    componentDidMount() {

        //Request markers from database
        this.props.OnRequestMarkers();

    }

    componentDidUpdate(prevProps, prevState) {
        
        //Check markers position everytime player moves
        if ((prevProps.currentLocation !== this.props.currentLocation) || (prevProps.markers !== this.props.markers)) {
            this.CheckMarkers();


        }



    }

//display app
    render() {

        const {
            messageType,
            messageSuccess,
            messageError
        } = this.props;

        const style = {
            width: '100vw',
            height: '100vh'
        }
        const usericon = require('../img/usericon.png')

        const deleteModalID = "deleteModal";
        const editMediaModalID = "editMediaModal";
        const saveModalID = "saveModal";

        if (!this.props.loaded) {
            return <div > Loading... < /div>
        }


        return ( <div style = {
                style
            } >
            <Navbar/>

            <Message onClose = {
                this.ClosePopUp
            }
            as = {
                messageType
            }
            success = {
                messageSuccess
            }
            error = {
                messageError
            } > < /Message>

            <Modal as = {
                "normalModal"
            }
            modalID = {
                deleteModalID
            }
            value = {
                "Are you sure you want to delete this pin?"
            }
            onYesClick = {
                this.HandleDelete
            } > < /Modal>

            <Modal as = {
                "normalModal"
            }
            modalID = {
                saveModalID
            }
            value = {
                "Do you want to save changes?"
            }
            onYesClick = {
                this.HandleEdit
            } > </Modal>

            <Modal as = {
                "mediaModal"
            }
            handleUploadedFile = {
                this.HandleUploadedFile
            }
            inputFileName = {
                this.state.filename
            }
            modalID = {
                editMediaModalID
            } > </Modal>



            
            <Map click = {
                this.OnMapClick
            }
            google = {
                this.props.google
            } >


            <Marker icon = {
                {
                    url: usericon,
                    scaledSize: new this.props.google.maps.Size(45, 45)
                }
            }
            onInstantiate = {
                this.InfoWindow
            }
            infowincontent = {
                {
                    title: "  YOU ARE HERE!"
                }
            }
            />


            <MarkerList as = {
                'remote'
            }
            markerArray = {
                this.props.markers
            }
            handleMarkerClick = {
                this.InfoWindow
            }
            handleMarkerDrag = {
                this.HandleDragMarker
            } > < /MarkerList>




            <InfoWindowEx marker = {
                this.props.activeMarker
            }
            visible = {
                this.props.showingInfoWindow
            }
            onClose = {
                this.InfoWindow
            } >
            <div style = {
                {
                    margin: '10px',
                    color: '#7C7C7C'
                }
            } >



            <InfoWindowText visibility = {
                this.props.btnVisible
            }
            styles = {
                {
                    color: 'black',
                    fontWeight: 'bold'
                }
            }
            value = {
                this.props.selectedPlace.title
            } > < /InfoWindowText>

            <InfoWindowInput addClass = {
                "infoInput"
            }
            visibility = {
                this.ReturnBtnVisibility()
            }
            inputType = {
                "text"
            }
            name = {
                "title"
            }
            value = {
                this.state.title
            }
            onChange = {
                this.HandleTitle
            } > < /InfoWindowInput>


            <InfoWindowText visibility = {
                this.props.btnVisible
            }
            value = {
                this.props.selectedPlace.description
            } > < /InfoWindowText>


            <InfoWindowInput addClass = {
                "infoInput"
            }
            visibility = {
                this.ReturnBtnVisibility()
            }
            inputType = {
                "text"
            }
            name = {
                "description"
            }
            value = {
                this.state.description
            }
            onChange = {
                this.HandleDescription
            } > < /InfoWindowInput>

            <div style = {
                {
                    display: "block",
                    marginTop: "5px",
                    position: "relative",
                    left: "0%",
                    top: "0%"
                }
            } >
            
            <Button addClass = {
                "editBtn"
            }
            as = {
                "a"
            }
            imageSrc = {
                require('../img/EditPinSanstext.png')
            }
            visible = {
                this.props.btnVisible
            }
            onClick = {
                this.EditClick
            }
            /> 
            
            </div>

            <div style = {
                {
                    display: "block",
                    marginTop: "10px",
                    marginLeft: "-2px"
                }
            } >


            <Button nameofClass = {
                "btn-form"
            }
            as = {
                "modalBtn"
            }
            visible = {
                this.ReturnBtnVisibility()
            }
            placeholder = {
                `DELETE`
            }
            modalID = {
                "#" + deleteModalID
            }
            />

            <Button nameofClass = {
                "btn-form"
            }
            as = {
                "modalBtn"
            }
            visible = {
                this.ReturnBtnVisibility()
            }
            placeholder = {
                `MEDIA`
            }
            modalID = {
                "#" + editMediaModalID
            }
            />

            <Button nameofClass = {
                "btn-form"
            }
            as = {
                "btn-input"
            }
            visible = {
                this.ReturnBtnVisibility()
            }
            placeholder = {
                `CANCEL`
            }
            onClick = {
                this.CancelClick
            }
            />

            <Button nameofClass = {
                "btn-form"
            }
            as = {
                "modalBtn"
            }
            visible = {
                this.ReturnBtnVisibility()
            }
            placeholder = {
                `SAVE`
            }
            modalID = {
                "#" + saveModalID
            }/>

            </div>

            </div>

            </InfoWindowEx>



            </Map>



            </div>


        )
    }
    
    
    ReturnBtnVisibility = () => {
        if (this.props.btnVisible !== undefined) {
            return !this.props.btnVisible;
        } else {
            return false;
        }
    }
    ClosePopUp = () => {
        const {
            SetMessage
        } = this.props;
        SetMessage('none', '', '')
    }
    CheckMarkers = () => {
        const {
            markers,
            currentLocation
        } = this.props;
        for (let i = 0; i < markers.length; i++) {
            
            
            if (this.getDistance({
                    lat: markers[i].lat,
                    lng: markers[i].lng
                }, currentLocation) < 100) {

                this.props.PlayMarkerAudio(markers[i].filename)
            }
        }
    }
    EditClick = () => {
        const {
            OnDisplayEdit
        } = this.props;
        OnDisplayEdit(false);
        this.setState({
            title: this.props.selectedPlace.title,
            description: this.props.selectedPlace.description
        })



    }
    CancelClick = () => {
        const {
            OnDisplayEdit
        } = this.props;
        OnDisplayEdit(true);



    }

      HandleUploadedFile = (event)=>{

        let uploadedFile =  event.target.files[0];
        let filename = uploadedFile.name;
        this.setState({file: uploadedFile});
        this.setState({filename: filename});
        this.setState({filetype: filename.split('.').pop()})
        
    }


    HandleTitle = (event) => {
        this.setState({
            title: event.target.value
        });



    }

    HandleDescription = (event) => {
        this.setState({
            description: event.target.value
        });


    }

    HandleDragMarker = (_lat, _lng) => {
        this.setState({
            lat: _lat
        });
        this.setState({
            lng: _lng
        });
        if (this.state.title === '' || this.state.description === '' || this.state.title === undefined || this.state.description === undefined ) {
            this.setState({
                title:  this.props.selectedPlace.title,
                description: this.props.selectedPlace.description
            })
            console.log(this.state, this.props.selectedPlace);
        }

        

    }

    HandleDelete = () => {
        const {
            OnRequestMarkers,
            SetMessage,
            OnInfoWindowEvent
        } = this.props;
        const url = serverURL[0].url;
        const formData = new FormData();
        formData.append("id", this.props.activeMarker.get("id"));

                    
        //delete post request
        fetch(url+'deletemarker', {
                method: 'post',
                body: formData

            })
            .then(response => response.json())
            .then((data) => {
                if (data === 'delete success') {
                    this.props.activeMarker.setMap(null);
                    console.log(data);
                    OnInfoWindowEvent({}, null, false, false);
                    OnRequestMarkers();
                    SetMessage('success', 'Congratulations! You successfully deleted a marker!', '');


                } else SetMessage('error', 'Unable to delete marker - please try again later', '');
            })
    }

    HandleEdit = () => {

        const {
            SetMessage,
            OnRequestMarkers,
            OnDisplayEdit
        } = this.props
        if (this.state.filename !== 'Upload a sound file (Max: 1GB)' && !(this.CheckExtension(this.state.filename))) {
            SetMessage('error', '', 'Uploaded file is not a sound file');
            return
        }
        const formData = new FormData();
        const obj = this.state;
        formData.append("id", this.props.activeMarker.get("id"));
        Object.keys(obj).forEach(function (key) {

            //Only add necessary data to submit form for edit
            switch (key) {
                case 'title':
                    if (obj[key] !== '') formData.append(key, obj[key]);
                    break;
                case 'description':
                    if (obj[key] !== '') formData.append(key, obj[key]);
                    break;
                case 'lat':
                    if (obj[key] !== null) formData.append(key, obj[key]);
                    break;
                case 'lng':
                    if (obj[key] !== null) formData.append(key, obj[key]);
                    break;
                case 'file':
                    if (obj[key] !== null) formData.append(key, obj[key]);
                    break;
                case 'filetype':
                    if (obj[key] !== '') formData.append(key, obj[key]);
                    break;
                case 'filename':
                    if (obj[key] !== 'Upload a sound file (Max: 1GB)') formData.append(key, obj[key]);
                    break;
                default:
                    break;
            }
        });

//Use this to inspect formdata's content
                    
//        for (var pair of formData.entries()) {
//            console.log(pair[0] + ', ' + pair[1]);
//        }
        
        //edit marker post request
        const url = serverURL[0].url;
        fetch(url+'editmarker', {
                method: 'post',
                body: formData

            })
            .then(response => response.json())
            .then((data) => {
                if (data === 'edit success') {
                    console.log(data);
                    OnDisplayEdit(true);
                    OnRequestMarkers();
                    this.props.selectedPlace.title = this.state.title;
                    this.props.selectedPlace.description = this.state.description;
                    this.ResetState();
                    
                    SetMessage('success', 'Congratulations! You successfully edited a marker!', '');

                } else SetMessage('error', 'Unable to edit marker - please try again later', '');;
            })






    }

   
    //Check file's extension
    CheckExtension = (filename) => {

        if (/\.(ogg|wav|mp3|)$/i.test(filename) === false) {
            return false;
        }
        return true;
    }
    ResetState = () => {
        this.setState({
            title: '',
            description: '',
            lat: null,
            lng: null,
            file: null,
            filetype: 'wav',
            filename: 'Upload a sound file (Max: 1GB)'
        });
    }




    InfoWindow = (props, marker, e, visible) => {
        const {
            OnInfoWindowEvent,
            OnDisplayEdit
        } = this.props;
        OnDisplayEdit(visible);
        OnInfoWindowEvent(props, marker, e)

    }


    //Convert from Degree to rad
    rad = (x) => {
        return x * Math.PI / 180;
    };

    //Function to calculate distance between two points on the map
    getDistance = (p1, p2) => {
        var R = 6378137; // Earth’s mean radius in meter
        var dLat = this.rad(p2.lat - p1.lat);
        var dLong = this.rad(p2.lng - p1.lng);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.rad(p1.lat)) * Math.cos(this.rad(p2.lat)) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        //console.log("Distance between p1 and p2: " + d);
        return d; // returns the distance in meter
    };

    OnMapClick = (props, map, event) => {
        const pos = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };
        const {
            google,
            OnGuidingMarkerClick,
            OnInfoWindowEvent
        } = this.props;

        OnGuidingMarkerClick(pos);
        OnInfoWindowEvent({}, null, false, false)
        let position = new google.maps.LatLng(pos.lat, pos.lng);



        if (this.guidingMarker == null) {
            const usericon = require('../img/AddPinIcon.png')
            const icon = {
                url: usericon,
                scaledSize: new this.props.google.maps.Size(45, 50)
            };

            const pref = {
                map: map,
                position: position,
                icon: icon,
                animation: google.maps.Animation.DROP


            };

            this.guidingMarker = new google.maps.Marker(pref);
            setTimeout(() => {
                this.guidingMarker.setAnimation(google.maps.Animation.BOUNCE);
            }, 1000);
        } else {
            this.guidingMarker.setPosition(position);
            setTimeout(() => {
                this.guidingMarker.setAnimation(google.maps.Animation.BOUNCE);
            }, 1000);
            this.guidingMarker.setAnimation(google.maps.Animation.DROP);
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiComponent({
    apiKey: ApiKey[0].key

})(Container))