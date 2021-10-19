import React from 'react';
import s from './User.module.css'
import {NavLink} from 'react-router-dom';
import {UsersType} from '../../../redux/users-reducer';
import {Avatar, Button, Descriptions} from 'antd';
import {UserOutlined} from "@ant-design/icons";

type PropsType = {
    user: UsersType
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    followingInProgress: number[]
}

let User: React.FC <PropsType> = ({user, follow, unFollow, followingInProgress}) => {

            const onClickFollowHandler = () => follow(user.id)
            const onClickUnFollowHandler = () => unFollow(user.id)

            return <div className={s.user}>
                <div className={s.followingBlock}>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <Avatar size={64} icon={<UserOutlined />} src={user.photos.small && user.photos.small}/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <Button disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={onClickUnFollowHandler}
                                      className={s.button}
                                      danger={true}
                            >Unfollow</Button>
                            : <Button disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={onClickFollowHandler}
                                      className={s.button}
                            >Follow</Button>}
                    </div>
                </div>
                <Descriptions layout="vertical" labelStyle={{fontWeight: 'bold'}} >
                    <Descriptions.Item label="UserName">{user.name}</Descriptions.Item>
                    <Descriptions.Item label="UserStatus">{user.status}</Descriptions.Item>
                </Descriptions>

                {/*<div className={s.content}>*/}
                {/*    <div className={s.nameAndStatus}>*/}
                {/*        <div className={s.name}>{user.name}</div>*/}
                {/*        <div className={s.status}>{user.status}</div>*/}
                {/*    </div>*/}
                {/*    <div className={s.location}>*/}
                {/*        <div className={s.country}>{'u.location.country'}</div>*/}
                {/*        <div className={s.city}>{'u.location.city'}</div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        }

export default User