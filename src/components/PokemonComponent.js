import React from "react";
import PropTypes from "prop-types";

export default class PokemonComponent extends React.Component {
  static propTypes = {
    image_url: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = { imageLoaded: false, imageStatus: "Loading..." };
  }

  getPokeId(id) {
    //.. Check for null and Cast to String
    return (this.state.imageLoaded) ? ((id === null || id === undefined) ? "" : String(id)) : "";
  }

  getPokeName(name) {
    //.. filter to uppercase
    return (this.state.imageLoaded) ? String(name).toUpperCase() : "";
  }

  setImageClass(val) {
    return val ? "image-show" : "image-hide";
  }

  handleImageLoaded() {
    //.. loader image hidden on image loaded
    this.setState({ imageLoaded: true, imageStatus: "Loaded" });
  }

  handleImageErrored() {
    this.setState({ imageLoaded: false, imageStatus: "Failed to load image" });
  }

  render() {
    return (
      <div className="card-cont">
        <div className="row card-title-cont">
          <div className="col-12">
            <div className="float-left">
              {this.getPokeName(this.props.name)}
            </div>
            <div className="float-right">{this.getPokeId(this.props.id)}</div>
          </div>
        </div>
        <div className="row no-gutters">
          <div className="col-12">
            <div className="card-img-cont">
              <img
                className={this.setImageClass(this.state.imageLoaded)}
                onLoad={this.handleImageLoaded.bind(this)}
                onError={this.handleImageErrored.bind(this)}
                src={this.props.image_url}
                alt="image pokemon"
              />
              <img
                className={this.setImageClass(!this.state.imageLoaded)}
                src="./loading.gif"
                alt="image loader"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
