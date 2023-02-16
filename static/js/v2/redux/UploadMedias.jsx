import { createSlice } from "@reduxjs/toolkit"
export const MessageUploadMedia = createSlice({
    name: "MessageUploadMedia",
    initialState: [
    ],
    reducers: {
        createMessageMediaUploadSlice: (state, action) => {
            state = action.payload
            return state
        }, 
        setMediaUploadIndex: (state,action)=>{
            state.uploadIndex = state.uploadIndex+1
            return state
        }  
    }
})
export const {createMessageMediaUploadSlice,setMediaUploadIndex} = MessageUploadMedia.actions