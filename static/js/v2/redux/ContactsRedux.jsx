import { createSlice } from "@reduxjs/toolkit"
export const MatchList = createSlice({
    name: "MatchList",
    initialState: [],
    reducers: {
        createMatchList: (state, action) => {
            state.push(...action.payload)
        },
        RetireUserOnMatchList :(state, action)=>{
            const findIndex = state.findIndex((element=>element.user_id === action.payload.user_id))
            if(findIndex >= 0){
                state.splice(findIndex, 1);
                return state;
            } 
        }
        
    }
})
export const {createMatchList, RetireUserOnMatchList} = MatchList.actions
export const ContactsList = createSlice({
    name: "ContactsList",
    initialState: [],
    reducers: {
        createContactsList: (state, action) => {
            state.push(...action.payload)
        },
       
    }
})
export const {createContactsList} = ContactsList.actions