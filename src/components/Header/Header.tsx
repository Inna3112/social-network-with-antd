import React from 'react';
import {Link} from 'react-router-dom';
import {Avatar, Button, Col, Layout, Menu, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";

type PropsType = {
    login: string | null
    isAuth: boolean
    logout: () => void
}
const Header = ({isAuth, logout}: PropsType) => {

    const {Header} = Layout;

    return (
        <Header className="header">
            <div className="logo"/>
            <Row>
                <Col span={18}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1"><Link to="/users">Developers</Link></Menu.Item>
                    </Menu>
                </Col>
                {isAuth
                    ?
                    <>
                        <Col span={1}>
                            <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                        </Col>
                        <Col span={5}>
                            <Button onClick={logout}>logout</Button>
                        </Col>
                    </>
                    :
                    <Col span={6}>
                        <Link to={'/login'}>Login</Link>
                    </Col>}

            </Row>
        </Header>
    )
}

export default Header;