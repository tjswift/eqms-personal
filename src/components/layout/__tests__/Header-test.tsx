import React from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from '../../../main';
import { createBrowserHistory } from 'history'
import configureStore from '../../../configureStore'

configure({ adapter: new Adapter() });

describe('The Header component', () => {
  it('contains a link to the homepage.', () => {
    const history = createBrowserHistory()
  
    const initialState = window.initialReduxState
    const store = configureStore(history, initialState)
    const wrapper = mount(<Main store={store} history={history} theme='light'/>);
    const homeLinkComponent: ReactWrapper = wrapper.find({href: "/"});
    expect(homeLinkComponent.html()).toContain('"/"');
  });

  it('contains a link to the Lessons Learned module.', () => {
    const history = createBrowserHistory()
  
    const initialState = window.initialReduxState
    const store = configureStore(history, initialState)
    const wrapper = mount(<Main store={store} history={history} theme='light'/>);
    const lessonsLinkComponent: ReactWrapper = wrapper.find({href: "/lessons"});
    expect(lessonsLinkComponent.html()).toContain('"/lessons"');
  });

  it('does not contain a link to Microsoft Bing.', () => {
    const history = createBrowserHistory()
  
    const initialState = window.initialReduxState
    const store = configureStore(history, initialState)
    const wrapper = mount(<Main store={store} history={history} theme='light'/>);
    const lessonsLinkComponent: ReactWrapper = wrapper.find({href: "https://www.bing.com/"});
    expect(lessonsLinkComponent).toHaveLength(0);
  });
});