import React from "react";
import { mount, shallow, render } from "enzyme";

import AppStore from "./AppStore";

var PokedexFn = require("pokedex-promise-v2");

describe("Test API in <AppStore />", () => {
  it("mock API testing", () => {
    const myMockFn = jest
      .fn(() => "default return value")
      .mockImplementationOnce(() => {
        return "first implementation";
      })
      .mockImplementationOnce(() => {
        return "second implementation";
      });
    //call function
    //console.log(myMockFn(), myMockFn());
  });

  it("loads the data for the 1st set ", () => {
    /* const shallowStore = shallow(<AppStore />);
    const spy = jest.spyOn(AppStore.prototype, "fakeMethod");
    shallowStore.instance().fakeMethod();

    expect(spy).toHaveBeenCalled(); */

    /* const spy = jest.spyOn(AppStore.prototype, "fakeMethod");
    //console.log(spy);
    expect(spy.fakeMethod()).toHaveBeenCalled(); */
    //spy.fakeMethod();

    /* const app = shallow(<AppStore />)
        const instance = app.instance()
        const spy = jest.spyOn(instance, 'fakeMethod')
    
        instance.forceUpdate();    
    
        spy(); */

    /* const p = app.find('.App-intro')
        p.simulate('click') */
    //expect(spy).toHaveBeenCalled()

    /* const wrapper = shallow((<AppStore />));
        wrapper.instance().fakeMethod();
        expect(fooSpy).toHaveBeenCalled(); */

    /* const users = [{first_name: 'Ross'}];
        const resp = {data: users};
        // append .mockResolvedValue(<return value>) to the module method
        PokedexFn.get.mockResolvedValue(resp);
        // carry out your test
        return expect(resp.data).toEqual(users)) */
  });
});
