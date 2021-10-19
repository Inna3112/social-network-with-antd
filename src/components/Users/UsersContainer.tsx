import React, {ComponentType} from 'react';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    setCurrentPage,
    UsersStateType,
    UsersType, unFollow, follow, requestUsers
} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../../common/Preloader/Preloader';
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from 'redux';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/selectors/users-selectors";
import {Spin} from "antd";


type MapStatePropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}
type MapDispatchPropsType = {
    setCurrentPage: (pageNumber: number) => void
    requestUsers: (currentPage: number, pageSize: number) => void
    follow: (userId: number) => void
    unFollow: (userId: number) => void
}
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        const {currentPage, pageSize, requestUsers} = this.props

        requestUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize, requestUsers} = this.props
        requestUsers(pageNumber, pageSize)
    }

    render() {
        return <>
            {
                this.props.isFetching
                    ? <div className="example">
                        <Spin/>
                    </div>
                    :
                    <Users totalUsersCount={this.props.totalUsersCount}
                           pageSize={this.props.pageSize}
                           currentPage={this.props.currentPage}
                           onPageChanged={this.onPageChanged}
                           users={this.props.users}
                           followingInProgress={this.props.followingInProgress}
                           follow={this.props.follow}
                           unFollow={this.props.unFollow}
                    />
            }
        </>
    }
}

const mapStateToProps = (state: AppStateType): UsersStateType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

// const mapDispatchToProps = (dispatch: any) => {
//     return {
//         follow: (userId: number) => dispatch(followAC(userId)),
//         unFollow: (userId: number) => dispatch(unFollowAC(userId)),
//         setUsers: (users: Array<UsersType>) => dispatch(setUsersAC(users)),
//         setCurrentPage: (pageNumber: number) => dispatch(setCurrentPageAC(pageNumber)),
//         setTotalUsersCount: (totalUsersCount: number) => dispatch(setTotalUsersCountAC(totalUsersCount)),
//         toggleIsFetching: (isFetching: boolean) => dispatch(toggleIsFetchingAC(isFetching)),
//     }
// }

export default compose<ComponentType>(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        setCurrentPage, requestUsers, follow, unFollow
    })
)(UsersContainer)

// export default withAuthRedirect(connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
//     setCurrentPage, requestUsers, follow, unFollow
// })(UsersContainer))

