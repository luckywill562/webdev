import {  createSlice } from "@reduxjs/toolkit"
export const RencardSlice = createSlice({
    name: "RencardSlice",
    initialState: [
    ],
    reducers: {
        CreateRencardList: (state, action)=>{
            state = action.payload
            return state
        },
        ChangeRencardInterestedButton: (state, action)=>{
            const find = state.find((element=> element.content.id === action.payload));
            if(find){
                find.content.viewer_intersted = !find.content.viewer_intersted
                return state
            }
        }
       
    }
})
export const  {CreateRencardList,ChangeRencardInterestedButton} = RencardSlice.actions