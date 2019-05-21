/** Current tests include
 *The header renders (it’s there, it exists)
 * The elements are there and are in the correct order/have the correct alignment
 * The user message is rendered correctly
 **/
import React from 'react';
import Header from '../components/layout/Header'
import { shallow, configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer' 

configure({ adapter: new Adapter() });

describe('<Header />', () => {
    const title = 'EQMS Application';
    //todo: dynamic welcome message
    const welcomeMessageText = 'Welcome Firstname';

    const headerObj = < Header title={title} welcomeMessage={welcomeMessageText} />;
    const menuProps = mount(headerObj);
    const menuWrapper = shallow(headerObj);


    it('renders everything correct (snapshot)', () => {
        const component = renderer.create(<Header title={title} welcomeMessage={welcomeMessageText} />);
        const json = component.toJSON();
        expect(json).toMatchSnapshot();
    });

    it('renders', () => {
        expect(menuWrapper.find('Navbar')).toBeTruthy();
    });

    it('renders title first', () => {
        expect(menuWrapper.childAt(0).hasClass("title")).toBe(true);
    });

    it('renders navigation second', () => {
        expect(menuWrapper.childAt(1).hasClass("navigation")).toBe(true);
    });

    it('renders user/settings third', () => {
        expect(menuWrapper.childAt(2).hasClass("userSettings")).toBe(true);
    });

    it('renders the correct user message', () => {
        expect(menuProps.props().welcomeMessage).toEqual(welcomeMessageText);
    });

    
});
