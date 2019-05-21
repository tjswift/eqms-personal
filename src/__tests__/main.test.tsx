import React from 'react';
import Main from '../main';
import { createBrowserHistory } from 'history'
import configureStore from '../configureStore'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('The main component', () => {
    it('renders without crashing', () => {
        const history = createBrowserHistory()

        const initialState = window.initialReduxState
        const store = configureStore(history, initialState)
        shallow(<Main store={store} history={history} />);
    });

});


describe('Hello, Enzyme!', () => {
    it('renders', () => {
        const wrapper = shallow(<div>
            <h1>Hello, Enzyme!</h1>
        </div>)
        expect(wrapper.find('h1').html()).toMatch(/Hello, Enzyme/)
    });

    it('renders snapshots, too', () => {
        const wrapper = shallow(<div>
            <h1>Hello, Enzyme!</h1>
        </div>)
        expect(wrapper).toMatchSnapshot()
    });
})