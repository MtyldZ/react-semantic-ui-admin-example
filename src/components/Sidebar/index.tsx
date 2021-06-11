import React, {memo, ReactNode, useState} from "react";
import {Grid, Icon, Menu, Segment, Sidebar} from "semantic-ui-react";

import './index.scss';

type Props = {
    children?: ReactNode;
}

type SideBarWidthType = 'very thin' | 'thin' | 'wide' | 'very wide';

export const SidebarComponent = memo(function SidebarComponent(props: Props) {
    // const [visible, setVisible] = React.useState(true)
    const [width, setWidth] = useState<SideBarWidthType>('wide');
    const [uiKitIsVisible, setUiKitIsVisible] = useState<Boolean>(false);

    return (
        <React.Fragment>
            <Sidebar.Pushable as={Segment}>
                <Sidebar
                    as={Menu}
                    animation='push'
                    icon='labeled'
                    inverted
                    // onHide={() => setVisible(false)}
                    vertical
                    visible={true}
                    width={width}
                    className="sidebar-custom"
                >
                    <Menu.Item as='a' onClick={() => null}>
                        <Grid.Column>
                            <Icon name='home'/>
                            <span>Home</span>
                        </Grid.Column>
                    </Menu.Item>
                    <Menu.Item as='a'>
                        <Grid.Column>
                            <Icon name='gamepad'/>
                            <span>Games</span>
                        </Grid.Column>
                    </Menu.Item>
                    <Menu.Item as='a'>
                        <Grid.Column>
                            <Icon name='camera'/>
                            <span>Channels</span>
                        </Grid.Column>
                    </Menu.Item>
                    <Menu.Item as='a' onClick={() => setUiKitIsVisible(pre => !pre)}>
                        <Grid.Column>
                            <span className="dropdown-text">UI-Kit</span>
                            <i className="dropdown icon"/>
                        </Grid.Column>
                    </Menu.Item>
                    <Menu.Item
                        className={"content sidebar-dropdown " + (uiKitIsVisible && width === 'wide' ? "sidebar-show-dropdown" : "sidebar-hide-dropdown")}
                        as='div'>
                        <a className="item" href="/">Accordion
                        </a>
                        <a className="item" href="/">Breadcrumb
                        </a>
                        <a className="item" href="/">Button
                        </a>
                        <a className="item" href="/">Divider
                        </a>
                        <a className="item" href="/">Dropdown
                        </a>
                    </Menu.Item>
                    <Menu.Item onClick={() => (width === 'wide' ? setWidth('thin') : setWidth('wide'))}>
                        {width === 'wide' ?
                            <Icon name="angle left"/>
                            :
                            <Icon name="angle right"/>
                        }
                    </Menu.Item>
                </Sidebar>
                <div className={`content-container ${width}`}>
                    {props.children}
                </div>
            </Sidebar.Pushable>
        </React.Fragment>
    )
})