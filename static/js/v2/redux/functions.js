export const changeFollowButton = (state, action, element) => {
    if (action.payload.type === 'FOLLOW') {
        element.followed_by_viewer = !element.followed_by_viewer
    } else if (action.payload.type === 'REQUEST') {
        element.requested_follow_by_viewer = !element.requested_follow_by_viewer
    } else if (action.payload.type === 'UNFOLLOW') {
        element.followed_by_viewer = false;
    }else if(action.payload.type === 'DELETE_REQUEST'){
        element.requested_follow_by_viewer = false;
    }
}