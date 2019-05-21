import { configure, mount, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from '../../../configureStore';
import LessonsIndexPage from '../index';

configure({ adapter: new Adapter() });
const history = createBrowserHistory()
const initialState = window.initialReduxState
const store = configureStore(history, initialState)

describe('The Lessons Learned list page', () => {
  it('renders.', () => {
    const wrapper: ReactWrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <LessonsIndexPage dispatch={store.dispatch}>
          </LessonsIndexPage>
        </BrowserRouter>
      </Provider>
    );
    expect(wrapper.find(LessonsIndexPage)).toHaveLength(1);
  });
});