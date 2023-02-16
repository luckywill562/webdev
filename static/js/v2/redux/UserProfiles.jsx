import { createSlice } from "@reduxjs/toolkit"
import { changeFollowButton } from "./functions";
export const UserProfiles = createSlice({
    name: "UserProfiles",
    initialState: [
    ],
    reducers: {
        createUserProfilesSlice: (state, action) => {
            state.push(action.payload)
        },
        AddAlbumContent: (state, action) => {
            if(state[action.payload.index]){
                state[action.payload.index].content.media.push(...action.payload.name);
                state[action.payload.index].content.media_has_next_page = action.payload.plus
                return state
            }
        },
        AddPostsContent: (state, action) => {
            if(state[action.payload.index]){
                state[action.payload.index].content.posts.push(...action.payload.name);
                state[action.payload.index].content.posts_has_next_page = action.payload.next_page
                return state
            }
        },
        AddAboutContent: (state,action)=>{
            if(state[action.payload.index]){
                state[action.payload.index].about = action.payload.data;
                return state
            }
        },
        onClickLoveButtonProfile: (state, action) => {
            const objIndex = state.find((state => state.user_id === action.payload));
            if (objIndex) {
                objIndex.requested_love_by_viewer = !objIndex.requested_love_by_viewer
                return state;
            }
        },
        onClickFollowButton: (state, action) => {
            const objIndex = state.find((state => state.user_id === action.payload.user_id));
            if (objIndex) {
                changeFollowButton(state, action, objIndex)
                return state
            }
        },
        createFollowersList: (state, action) => {
            const objIndex = state.findIndex((state => state.user_id === action.payload.user_id));
            if (objIndex >= 0) {
                state[objIndex].content.followers.push(...action.payload.followers)
                state[objIndex].content.followers_list_has_next_page = action.payload.next_page
            }
            return state;
        },
        createFollowingList: (state, action) => {
            const objIndex = state.findIndex((state => state.user_id === action.payload.user_id));
            if (objIndex >= 0) {
                state[objIndex].content.following.push(...action.payload.followers)
                state[objIndex].content.following_list_has_next_page = action.payload.next_page
            }
            return state;
        },
        onClickLikeUserPosts: (state, action) => {
            for (let index = 0; index < state.length; index++) {
                const element = state[index];
                const objIndex = element.content.posts.findIndex((element => element.post.post_id === action.payload.post_id))
                if (objIndex >= 0) {
                    if (action.payload.likes) {
                        element.content.posts[objIndex].post.like_counter = action.payload.likes
                    } else {
                        element.content.posts[objIndex].post.liked_by_viewer = !element.content.posts[objIndex].post.liked_by_viewer
                    }
                    return state
                }
            }
        },

        onClickFollowersButtonAction: (state, action) => {
            for (let index = 0; index < state.length; index++) {
                const element = state[index];
                const objIndex = element.content.followers.findIndex((state => state.user_id === action.payload.user_id));
                if (objIndex >= 0) {
                    changeFollowButton(state, action, element.content.followers[objIndex])
                }
            }
        },
        onClickFollowingsButtonAction: (state, action) => {
            for (let index = 0; index < state.length; index++) {
                const element = state[index];
                const objIndex = element.content.following.findIndex((state => state.user_id === action.payload.user_id));
                if (objIndex >= 0) {
                    changeFollowButton(state, action, element.content.following[objIndex])
                }
            }
        },
        change_has_request_viewer: (state, action) => {
            const userIndex = state.find((state => state.user_id === action.payload.data.user_data.user_id));
            if (userIndex) {
                if(action.payload.data.follower_type === "DELETE_REQUEST" || action.payload.data.follower_type === "REQUEST"){
                    userIndex.has_requested_follow_viewer = !userIndex.has_requested_follow_viewer
                }
                return state
            }
        },  
        changeButtonOnaccetpt: (state, action)=>{
            const userIndex = state.find((state => state.user_id === action.payload.user_id));
            if (userIndex) {
                userIndex.has_requested_follow_viewer = !userIndex.has_requested_follow_viewer
                
                return state
            }
        },

        websocketChangeLoveButton: (state, action)=>{
            const userIndex = state.find((state => state.user_id === action.payload.user.user_id));
            if (userIndex) {
                if(action.payload.type === "UNLOVE"){
                    userIndex.has_requested_love_viewer = false
                }else if(action.payload.type === "LOVE"){
                    userIndex.has_requested_love_viewer = true
                }
            }
        },
        changeUserProfileElement: (state, action)=>{
            const userIndex = state.find((state => state.user_id === action.payload.user_id));
            if(userIndex){
                userIndex[action.payload.name]= !userIndex[action.payload.name]
            }
        }
    }
})
export const { createUserProfilesSlice, AddAlbumContent,
    onClickLoveButtonProfile, onClickFollowButton, createFollowersList,
    createFollowingList, AddPostsContent, onClickLikeUserPosts,
    onClickFollowersButtonAction, onClickFollowingsButtonAction, change_has_request_viewer,
    changeUserPostLikeCounter,websocketChangeLoveButton,changeUserProfileElement,AddAboutContent,changeButtonOnaccetpt
} = UserProfiles.actions