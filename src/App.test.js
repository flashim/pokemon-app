import React from "react";
import ReactDOM from "react-dom";
import { mount, shallow, render } from "enzyme";
import App from "./App";
import PokemonContainer from "./components/PokemonContainer";
import PokemonComponent from "./components/PokemonComponent";
import AppStore from "./store/AppStore";

jest.setTimeout(30000); // as checking the actual API

describe("<App />", () => {
  it("App renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("contains <PokemonContainer />", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(".App").exists()).toBe(true);
    expect(wrapper.containsMatchingElement(<PokemonContainer />)).toBeTruthy();
  });

  it.todo("<PokemonContainer /> contains 3 <PokemonComponents /> ");

  it("tests the actual getPokemonsList for the first 3 item ", done => {
    const appStore = new AppStore();
    const pokedexFn = appStore.P;

    //.. Mock version
    /*pokedexFn.getPokemonsList = jest.fn((i, cb) => {
       {
        return {
          count: 964,
          next: "https://pokeapi.co/api/v2/pokemon/?offset=3&limit=3",
          previous: null,
          results: [
            { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
            { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
            { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" }
          ]
        }; 
    });*/

    function callback(data) {
      expect(data.next).toBe(
        "https://pokeapi.co/api/v2/pokemon/?offset=3&limit=3"
      );
      expect(data.previous).toBeNull();

      expect(data.results[0].name).toBe("bulbasaur");
      expect(data.results[1].name).toBe("ivysaur");
      expect(data.results[2].name).toBe("venusaur");

      done();
    }

    pokedexFn.getPokemonsList(appStore.interval, callback);
  });

  it("checks the subsequent details using PokemonQuery ", async () => {
    const appStore = new AppStore();
    const PokemonQueryResults = await appStore.PokemonQuery([
      { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
      { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" }
    ]);

    expect(PokemonQueryResults[0].name).toBe("bulbasaur");
    expect(PokemonQueryResults[0].id).toBe(1);
    expect(PokemonQueryResults[0].sprites.front_default).toBe(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
    );

    expect(PokemonQueryResults[1].name).toBe("ivysaur");
    expect(PokemonQueryResults[1].id).toBe(2);
    expect(PokemonQueryResults[1].sprites.front_default).toBe(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
    );

    expect(PokemonQueryResults[2].name).toBe("venusaur");
    expect(PokemonQueryResults[2].id).toBe(3);
    expect(PokemonQueryResults[2].sprites.front_default).toBe(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
    );
  });
});
