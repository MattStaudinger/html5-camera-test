import React, { Component } from "react";
import api from "../../api";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class AddDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoSrc: null,
      modal: false
    };
  }
 
  
  

  render() {
    return (
      <div className="add-document">
          <div className="video-container"
          ref={input => {
            this.videoContainer = input;
          }}>
            <video
              id="video"
              className="cameraFrame"
              autoPlay="true"
              ref={input => {
                this.videoElement = input;
              }}
              />
            <canvas
              id="canvas"
              width= "600px"
              className="capture-frame"
              ref={input => {this.canvasElement = input}}
              />
              </div>
            </div>
    );
  }

  componentDidMount() {
    {console.log(this.videoElement.offsetWidth)}

    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia ||
      navigator.oGetUserMedia;
    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        { video: true },
        this.handleVideo,
        this.videoError
      );
    }

  }
  handleVideo = stream => {
    console.log("stream ", stream, this.state);
    // Update the state, triggering the component to re-render with the correct stream
    this.setState({ videoSrc: stream });
    this.videoElement.srcObject = stream;
    this.videoElement.play();
  };
  videoError = () => {};

  


}

export default AddDocument;
