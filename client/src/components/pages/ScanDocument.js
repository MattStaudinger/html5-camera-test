import React, { Component } from "react";
import api from "../../api";
import {
  Alert,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

class AddDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoSrc: null,
      modal: false,
      alertVisible: false,
      resInfo: null
    };
    this.image = null;
  }

  captureImage = () => {
    let tempScale =
      this.videoElement.offsetHeight / this.videoElement.offsetWidth;
    this.canvasElement.height = parseInt(
      this.canvasElement.offsetWidth * tempScale
    ,10);
    this.canvasElement.width = this.canvasElement.offsetWidth;
    let context = this.canvasElement.getContext("2d");
    context.drawImage(
      this.videoElement,
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    this.image = this.canvasElement.toDataURL("image/png", 0.5);
    return this.image;
  };

  handletakePicture() {
    let image = this.captureImage();
    if (image) {
      api.addPicture(image).then(res => {
        this.setState({
          modal: !this.state.modal
        });
      });
    } else {
      console.log("error sending picture");
    }
  }
  
  handleSendImage() {
    api.sendPicture(this.image).then(res => {
      this.setState({
        alertVisible: true,
        resInfo: res.message
      });
    });
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div className="add-document">
        <Alert
          color="info"
          isOpen={this.state.alertVisible}
          toggle={() => {
            this.setState({ alertVisible: false });
          }}
        >
          <p>{this.state.resInfo}</p>
        </Alert>
        <i
          onClick={() => this.handletakePicture()}
          className="submit-btn fas fa-circle"
        />
        {this.state.videoSrc && (
          <Modal isOpen={this.state.modal} className="custom-modal" size="lg">
            <ModalHeader>Send document to MieterEngel?</ModalHeader>
            <ModalBody>
              <img style={{ width: "80%" }} src={this.image} alt="captured frame"/>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() => {
                  this.setState({
                    modal: !this.state.modal
                  });
                }}
              >
                Back
              </Button>
              <Button
                color="success"
                onClick={() => {
                  this.handleSendImage();
                }}
              >
                Send
              </Button>
            </ModalFooter>
          </Modal>
        )}
        <div className="video-container">
          <video
            id="video"
            className="camera-frame"
            autoPlay
            ref={input => {
              this.videoElement = input;
            }}
          />
          <canvas
            id="canvas"
            width="600px"
            className="capture-frame"
            ref={input => {
              this.canvasElement = input;
            }}
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (navigator.mediaDevices
      .getUserMedia){
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: "environment" //on mobile phones the back-camera will automatically be activated
        }
      })
      .then(stream => {
        this.setState({ videoSrc: stream });
        this.videoElement.srcObject = stream;
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  else {
    alert("Your browser doesn't support activating your camera")
  }
}
}

export default AddDocument;
