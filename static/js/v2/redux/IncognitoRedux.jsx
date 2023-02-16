import {  createSlice } from "@reduxjs/toolkit"
export const IncognitoMessagesSlice = createSlice({
    name: "IncognitoMessagesSlice",
    initialState: [
    ],
    reducers: {
        newIncognitoClient: (state, action)=>{
            state = action.payload
            return state
        },
        createIncognitoMessagesSlice: (state, action) => {
            state.messages.push(action.payload)
        },
        deleteIncognitoChat: (state, action) =>{
            if(action.payload.client_id === state.user){
                state = [];
                return state
            }
        }
    }
})
export const  {newIncognitoClient,createIncognitoMessagesSlice,deleteIncognitoChat} = IncognitoMessagesSlice.actions