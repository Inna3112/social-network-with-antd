import React from 'react';
import {UsersType} from '../../redux/users-reducer';
import User from './User/User';
import {BackTop, Pagination} from "antd";


type PropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (page: number) => void
    followingInProgress: number[]
    follow: (userId: number) => void
    unFollow: (userId: number) => void
}

let Users: React.FC<PropsType> = (props) => {

    let {
        users,
        pageSize,
        totalUsersCount,
        currentPage,
        onPageChanged,
        followingInProgress,
        follow,
        unFollow
    } = props

    const style = {
        height: 40,
        width: 40,
        lineHeight: '40px',
        borderRadius: 4,
        backgroundColor: '#1088e9',
        color: '#fff',
        textAlign: 'center' as 'center',
        fontSize: 14,
    }

    return <div>
        <Pagination defaultCurrent={6}
                    total={totalUsersCount}
                    pageSize={pageSize}
                    current={currentPage}
                    onChange={onPageChanged}
        />
        <div>
            {users.map(u => <User key={u.id}
                                  user={u}
                                  follow={follow}
                                  unFollow={unFollow}
                                  followingInProgress={followingInProgress}/>
            )}
        </div>
        <div>
            <BackTop>
               <div style={style}>UP</div>
            </BackTop>
        </div>
    </div>
}

export default Users