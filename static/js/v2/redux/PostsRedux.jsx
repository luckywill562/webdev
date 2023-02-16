import { createSlice } from "@reduxjs/toolkit"
export const AllPosts = createSlice({
    name: "AllPosts",
    initialState: [
    ],
    reducers: {
        createAllPostsSlice: (state, action) => {
            state = action.payload
            return state
        },
        pushPostsSlice: (state, action) => {
            state.push(...action.payload)
        },
        LikePost: (state, action) => {
            const objIndex = state.findIndex((element => element.post.post_id === action.payload.post_id))
            if (objIndex >= 0) {
                if (action.payload.likes) {
                    state[objIndex].post.like_counter = action.payload.likes
                } else {
                    state[objIndex].post.liked_by_viewer = !state[objIndex].post.liked_by_viewer
                }
                return state;
            }
        },

    }
})

export const SinglePosts = createSlice({
    name: "SinglePosts",
    initialState: [
    ],
    reducers: {
        createSinglePostsSlice: (state, action) => {
            state.push(action.payload)
        },
        LikeSinglePost: (state, action) => {
            const objIndex = state.findIndex((element => element.post.post_id === action.payload.post_id))
            if (objIndex >= 0) {
                if (action.payload.likes) {
                    state[objIndex].post.like_counter = action.payload.likes
                } else {
                    state[objIndex].post.liked_by_viewer = !state[objIndex].post.liked_by_viewer
                }
                return state
            }
        },

        AddComment: (state, action) => {
            const objIndex = state.findIndex((element => element.post.post_id === action.payload.discussion_id))
            state[objIndex].post_reply.unshift(action.payload)
        },
        updateAddedComment: (state, action) => {
            const objIndex = state.findIndex((element => element.post.post_id === action.payload.content?.discussion_id))
            const fakeIDindex = state[objIndex].post_reply.findIndex((element => element.response_id === +action.payload.fakeID))
            if (fakeIDindex >= 0) {
                state[objIndex].post_reply[fakeIDindex].response_id = action.payload.content.response_id;
                state[objIndex].post_reply[fakeIDindex].process = false;
                return state
            }
        },
        deleteSinglePost: (state, action) => {
            const objIndex = state.findIndex((element => element.post.post_id === action.payload.post_id))
            if (objIndex >= 0) {
                state.splice(objIndex, 1);
            }
        },
        likePostComment: (state, action) => {
            for (let index = 0; index < state.length; index++) {
                const objIndex = state[index].post_reply.find((reply => reply.response_id === action.payload.comment_id))
                if (objIndex) {
                    action.payload.likes ? objIndex.like_count = action.payload.likes : objIndex.liked_by_viewer = !objIndex.liked_by_viewer
                }
            }
        },
        pushCommentData: (state, action) => {
            const objIndex = state.find((element => element.post.post_id === action.payload.post_id))
            if (objIndex) {
                objIndex.has_next_page = action.payload.data.has_next_page
                objIndex.post_reply.push(...action.payload.data?.comments)
            }
        }
    }
})

export const SingleAlbumLists = createSlice({
    name: "SingleAlbumLists",
    initialState: [
    ],
    reducers: {
        createSingleAlbumLists: (state, action) => {
            state.push(action.payload)
        },
    
        singleAlbumActions: (state, action) => {
            const objIndex = state.find((element => element.album.album_id === action.payload.album_id))
            if (objIndex && action.payload.action === 'PushComments') {
                /*infinite scroll*/
                objIndex.album.comments.push(...action.payload?.data)
                objIndex.album.has_next_page = action.payload.has_next_page
            }else if( objIndex && action.payload.action === 'LIKE_AND_UNLIKE'){
                if (action.payload.likes) {
                    objIndex.album.like_counter = action.payload.likes
                } else {
                    objIndex.album.liked_by_viewer = !objIndex.album.liked_by_viewer
                }
                return state
            }else if(objIndex && action.payload.action === 'NEW_COMMENT'){
                /*add comment*/
                objIndex.album.comments.unshift(action.payload?.comment);
            }else if(objIndex && action.payload.action === 'COMMENT_SUCCESS'){
                const fakeID = objIndex?.album?.comments.find((element => element.response_id === action.payload?.fakeID))
                if(fakeID){
                    fakeID.process = false
                    fakeID.response_id = action.payload?.comment.response_id
                    fakeID.posted_date = action.payload?.comment.posted_date
                    return state
                }
            }else if(objIndex && action.payload.action === 'RELOAD_COMMENT'){
                objIndex.album.comments = [];
                return state
            }
        }
    }
})
export const { createAllPostsSlice, LikePost, pushPostsSlice } = AllPosts.actions
export const { createSinglePostsSlice, LikeSinglePost, AddComment, updateAddedComment,
    deleteSinglePost, likePostComment, pushCommentData } = SinglePosts.actions
export const { createSingleAlbumLists, singleAlbumActions
} = SingleAlbumLists.actions