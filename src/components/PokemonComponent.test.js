import React from "react";
import PropTypes from "prop-types";
import { mount, shallow, render } from "enzyme";

import PokemonComponent from "./PokemonComponent";


let c_props;
beforeEach(() => {
  c_props = {
        name:"pokemon",
        id:100,
        image_url:"./loader.gif"
    }
});


describe("<PokemonComponent />", () => {

  it("renders ", () => {
      const wrapper = shallow(<PokemonComponent />);
      expect(wrapper.exists()).toBe(true);
      expect(wrapper).toMatchSnapshot();
  });  

  it("renders correctly without props ", () => {
      const wrapper = shallow(<PokemonComponent />);
      expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly with null props ", () => {
      const wrapper = shallow(<PokemonComponent name={null} id={null} image_url={null} />);
      expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly with undefined props ", () => {
      const wrapper = shallow(<PokemonComponent name={undefined} id={undefined} image_url={undefined} />);
      expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly with specified props ", () => {
      const wrapper = shallow(<PokemonComponent name={c_props.name} id={c_props.id} image_url={c_props.image_url} />);
      expect(wrapper).toMatchSnapshot();
  });

  it("sets imageLoaded=true when image is loaded ", () => {
    const wrapper = shallow(<PokemonComponent />);
      expect(wrapper.state().imageLoaded).toBe(false); 
      wrapper.instance().handleImageLoaded();
      expect(wrapper.state().imageLoaded).toBe(true); 
  });
  
});
