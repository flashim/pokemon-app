import { Action } from "../actions/AppActions";

var Reflux = require("reflux");
var Pokedex = require("pokedex-promise-v2");

class AppStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      pokeData: this.loadingPokeData().pokeData,
      prevURL: this.loadingPokeData().previousURL,
      nextURL: this.loadingPokeData().nextURL
    };
    this.listenables = [Action];

    //.. init the pokedex
    this.P = new Pokedex();
    this.interval = {
      limit: 2
    };
    /*timeout: 2000*/

    //.. load the uri for pokemons to load
    this.InitDataSetRequest();
  }

  /** Action Event callbacks */
  onPrev() {
    this.UserLoadPokemons(this.state.prevURL);
  }

  onNext() {
    this.UserLoadPokemons(this.state.nextURL);
  }

  /** Utility functions and helpers */

  //.. initial api call to load data
  InitDataSetRequest() {
    this.P.getPokemonsList(this.interval, cb => {
      //console.log("results ", cb.results);
      if (cb === "Pokedex-promise-v2 error") {
        alert("Pokedex-promise-v2 error");
      } else {
        //.. subsequent calls to load pokemons
        this.APICallToSetData(cb);
      }
      //return cb
    });
  }

  //.. call to api and set the states
  APICallToSetData(obj) {
    this.PokemonQuery(obj.results)
      .then(data => {
        //console.log("-> ", obj.previous, obj.next, data);
        this.setState(this.updateData(obj.previous, obj.next, data));
      })
      .catch(error => {
        console.log(error);
      });
  }

  PokemonQuery(queries) {
    /* wrapping all request here */
    return Promise.all(
      queries.map(query => {
        return this.P.getPokemonByName(query.name).then(response => {
          // TODO: check for individual error incase, otherwise handled by the integrated call
          return response;
        });
      })
    );
  }

  UserLoadPokemons(url) {
    //.. start the loading and set the
    this.setState(
      this.updateData(
        this.loadingPokeData().previousURL,
        this.loadingPokeData().nextURL,
        this.loadingPokeData().pokeData
      )
    );

    this.P.resource(url).then(response => {
      this.APICallToSetData(response);
    });
  }

  updateData(previousURL, nextURL, data) {
    let new_state = Object.assign({}, this.state);
    new_state.pokeData = data;
    new_state.prevURL = previousURL;
    new_state.nextURL = nextURL;
    return new_state;
  }

  //.. pokedata for loading visual
  loadingPokeData() {
    let emptyPokeData = {
      id: null,
      name: "",
      sprites: {
        front_default: "./loading.gif"
      }
    };

    return {
      pokeData: [emptyPokeData, emptyPokeData, emptyPokeData],
      previousURL: null,
      nextURL: null
    };
  }
}

//AppStore.id = "test";
export default AppStore;
