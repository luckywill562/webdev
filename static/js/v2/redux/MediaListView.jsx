import { createSlice } from "@reduxjs/toolkit"
export const MediaListView = createSlice({
    name: "MediaListView",
    initialState: [
    ],
    reducers: {
        createMediaListSingle: (state, action) => {
            state.push(action.payload)
        },
        changeMediaVisibility: (state, action) => {
            const obj = state.find((element => element.content.media_id === action.payload));
            if (obj) {
                obj.content.deblocked_by_viewer = true
            }
        },
        
        singleMediaAction: (state, action) => {
            const obj = state.find((element =>
                element.content.content_type === action.payload.content.content.content_type &&
                element.content.media_id === action.payload.content.content.media_id
            ));
            if (obj) {
                if (action.payload.action === 'reaction') {
                    if (action.payload.likes) {
                        obj.content.like_counter = action.payload.likes
                    } else {
                        obj.content.liked_by_viewer = !obj.content.liked_by_viewer
                    }
                }else if (action.payload.action === 'push_comment') {
                    obj.comments.unshift(action.payload.comment)
                }else if(action.payload.action === 'pushComments'){
                    obj.comments.push(...action.payload.payload.comments)
                    obj.has_next_page = action.payload.payload.has_next_page
                }else if (action.payload.action === 'confirm_added') {

                    const fakeID = obj.comments.find((element => element.response_id === action.payload.fakeID))
                    if(fakeID){
                        fakeID.process = false
                        fakeID.response_id = action.payload?.comment.response_id
                        fakeID.posted_date = action.payload?.comment.posted_date
                        return state
                    }
                }else if(action.payload?.action === 'save'){
                    obj.content.saved_by_viewer = !obj.content.saved_by_viewer
                }
            }
        }

    }
})
export const SavedMedia =  createSlice({
    name: "SavedMedia",
    initialState: [

    ],
    reducers: {
        createSavedList : (state, action)=>{
            state.push(...action.payload)
        }
    }
})
export const { createMediaListSingle, changeMediaVisibility, singleMediaAction } = MediaListView.actions
export const {createSavedList} = SavedMedia.actions