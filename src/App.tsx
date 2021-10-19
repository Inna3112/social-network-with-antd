import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Link, Switch, Redirect, Route, RouteComponentProps, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {AppStateType} from './redux/redux-store';
import {appStateType, initializeApp} from './redux/app-reducer';
import {Layout, Menu, Breadcrumb, Spin} from 'antd';
import {UserOutlined, LaptopOutlined} from '@ant-design/icons';
import {withSuspense} from "./HOC/withSuspense";
import HeaderContainer from "./components/Header/HeaderContainer";
import { LoadingOutlined } from '@ant-design/icons';


const {SubMenu} = Menu;
const {Content, Footer, Sider} = Layout;

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const LoginContainer = React.lazy(() => import('./components/Login/LoginContainer'));

type MapStatePropsType = {
    initialized: boolean,
    error: string | null,
}
type MapDispatchPropsType = {
    initializeApp: () => void
}
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class App extends React.Component<PropsType & RouteComponentProps> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return (
                <div className="example">
                    <Spin />
                </div>
            )
        } else {
            return <Layout>
                <HeaderContainer />
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                // defaultOpenKeys={['sub1']}
                                style={{height: '100%'}}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined/>} title="My profile">
                                    <Menu.Item key="1"><Link to="/profile">Profile</Link></Menu.Item>
                                    <Menu.Item key="2"><Link to="/dialogs">Messeges</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Users">
                                    <Menu.Item key="5"><Link to="/users">Users</Link></Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                             <Switch>
                                <Route exact path='/'
                                       render={() => <Redirect to={'/profile'}/>}/>
                                <Route path='/dialogs'
                                       render={withSuspense(DialogsContainer)}/>
                                <Route path='/profile/:userId?'
                                       render={withSuspense(ProfileContainer)}/>
                                <Route path='/users'
                                       render={withSuspense(UsersContainer)}/>
                                <Route path='/login'
                                       render={withSuspense(LoginContainer)}/>
                                <Route path='*'
                                       render={() => '404 NOT FOUND'}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        }
    }
}

const mapStateToProps = (state: AppStateType): appStateType => {
    return {
        initialized: state.app.initialized,
        error: null,
    }
}

let AppWithRouter = withRouter(App)
export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    initializeApp
})(AppWithRouter)
