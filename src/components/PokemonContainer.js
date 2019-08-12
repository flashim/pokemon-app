import React from "react";

import { Action } from "../actions/AppActions";
import AppStore from "../store/AppStore";
import PokemonComponent from "./PokemonComponent";

var Reflux = require("reflux");

class PokemonContainer extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = AppStore;
  }

  getPokemonComponents() {
    //console.log(this.state.pokeData);

    return this.state.pokeData.map((item, id) => {
      return (
        <div className="col-sm-4 col-12" key={item.name + "-" + id}>
          <PokemonComponent
            image_url={item.sprites.front_default}
            name={item.name}
            id={item.id}
          />
        </div>
      );
    });
  }

  setBtnClass(btnLink) {
    return this.state[btnLink] === null ? "btn-grey" : "btn-green";
  }

  setBtnState(btnLink) {
    return this.state[btnLink] === null ? true : false;
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row mt-4">{this.getPokemonComponents()}</div>

        <div className="row mt-1">
          <div className="col-6">
            <div className="float-left">
              <button
                onClick={e => Action.prev()}
                className={this.setBtnClass("prevURL")}
                disabled={this.setBtnState("prevURL")}
              >
                Prev
              </button>
            </div>
          </div>
          <div className="col-6">
            <div className="float-right">
              <button
                onClick={e => Action.next()}
                className={this.setBtnClass("nextURL")}
                disabled={this.setBtnState("nextURL")}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PokemonContainer;
