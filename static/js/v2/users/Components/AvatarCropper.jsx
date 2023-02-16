import React from "react";
import {croppie} from "croppie"
const croppieOptions = {
  showZoomer: true,
  enableOrientation: true,
  mouseWheelZoom: "ctrl",
  viewport: {
    width: 300,
    height: 300,
    type: "square"
  },
  boundary: {
    width: "50vw",
    height: "50vh"
  }
};

const cropps = document.getElementById("#image_demo");
const c = new croppie(cropps, croppieOptions)
class AvatarCropper extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      croppedImage: null,
      isFileUploaded: false
    };
  }

  file = React.createRef();
  croppie = React.createRef();
  img = React.createRef();

  onFileUpload = e => {
    this.setState({ isFileUploaded: true }, 
      () => {
      const reader = new FileReader();
      const file = this.file.current.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        c.bind({ url: reader.result });
      };
      reader.onerror = function(error) {
        console.log("Error: ", error);
      };
    });
  };

  onResult = e => {
    c.result("base64").then(base64 => {
      this.setState(
        { croppedImage: base64 },
        () => (this.img.current.src = base64)
      );
    });
  };

  render() {
    const { isFileUploaded, croppedImage } = this.state;

    return (
      <div className="App">
          <div id="#image_demo"></div>
        <input
          type="file"
          id="files"
          ref={this.file}
          onChange={this.onFileUpload}
        />
        <hr />
        <button
          type="button"
          disabled={!isFileUploaded}
          onClick={this.onResult}
        >
          Crop!
        </button>
        <hr />
        <h2> Result! </h2>
        <div>
          <img ref={this.img} alt="cropped image" />
          <a hidden={!croppedImage} href={croppedImage} download="cropped.png">
            Download Cropped Image
          </a>
        </div>
      </div>
    );
  }
}
export default AvatarCropper