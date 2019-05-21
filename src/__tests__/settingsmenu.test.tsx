/**
 * Current tests include:
 * it is there, renders, 
 * menu items exist in the correct order
**/
import React from 'react';
import SettingsMenu from '../components/layout/SettingsMenu'
import { shallow, configure, ReactWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<SettingsMenu />', () => {
    
    const menuWrapper = shallow(<SettingsMenu />);
    const menuDiv = menuWrapper.find('Menu');

    it('renders', () => {
        expect(menuDiv).toBeTruthy();
    });

    it('renders all elements in correct order (snapshot)', () => {
        expect(menuWrapper).toMatchSnapshot();
    })


});