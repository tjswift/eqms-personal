import * as React from 'react';
import LayoutContainer from '../../containers/LayoutContainer';
import { Menu, MenuItem, MenuDivider } from '@blueprintjs/core';

//todo: add settings specific menu items and props

interface SettingsProps {
    
}

const SettingsMenu: React.SFC<SettingsProps> = ({  }) => (
    <Menu>
        <MenuItem text="Report Feedback" href="https://nsieng.atlassian.net/rest/collectors/1.0/template/form/b46977fb?os_authType=none#"/>
        <MenuDivider />
        <MenuItem text="Item 2" />
        <MenuItem text="Item 3" />
        <MenuDivider />
        <LayoutContainer>
            {({ theme, setTheme }) => (
                <React.Fragment>
                    <MenuItem text="Sign Out" onClick={() => {}} />
                </React.Fragment>
            )}
        </LayoutContainer>
        
    </Menu>
)

export default SettingsMenu

