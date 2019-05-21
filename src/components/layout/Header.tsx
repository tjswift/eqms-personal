import * as React from 'react';
import SettingsMenu from './SettingsMenu';
import { Colors, Navbar, Alignment, Popover, Button, ButtonGroup, Position} from '@blueprintjs/core';

interface HeaderProps {
    title: string,
    welcomeMessage: string
}

const Header: React.SFC<HeaderProps> = ({ title, welcomeMessage }) => (

    <Navbar style={{ color: Colors.WHITE, background: Colors.BLUE2 }}>
        <Navbar.Group align={Alignment.LEFT} className="title">
            <Navbar.Heading>{title}</Navbar.Heading>
            <Navbar.Divider style={{ background: Colors.WHITE }}/>
        </Navbar.Group>
        <Navbar.Group className="navigation">
            <ButtonGroup minimal={true}>
                <a href="/"><Button title="Dashboard" text="Dashboard" icon="dashboard" intent="primary" style={{ color: Colors.WHITE }}/></a>
                <a href="/lessons"><Button title="Lessons Learned" text="Lessons Learned" icon="clipboard" intent="primary" style={{ color: Colors.WHITE }} /></a>
            </ButtonGroup>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT} className="userSettings">
            <ButtonGroup minimal={true} className="SettingsGroup">       
                <Button className="userButton" title="UserIcon" text={welcomeMessage} rightIcon="user" intent="primary" style={{ color: Colors.WHITE }} />
                <Popover content={ <SettingsMenu/> }
                    position={Position.BOTTOM}>
                    <Button title="Settings" icon="cog" intent="primary" style={{ color: Colors.WHITE }} />
                </Popover>
            </ButtonGroup>
        </Navbar.Group>
    </Navbar>
)

export default Header
