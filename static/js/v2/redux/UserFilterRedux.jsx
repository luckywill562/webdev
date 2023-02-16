import { createSlice } from "@reduxjs/toolkit"
export const userFilterSlice = createSlice({
    name: "RequestReceivedSlice",
    initialState: [],
    reducers: {
        createUserFilterSlice: (state, action) => {
            state.push(...action.payload)
            return state;
        },
        newFilterResult : (state, action)=>{
            state = action.payload
            return state
        },
        UpdateLoveButton: (state, action)=>{
            const list = state; 
            const objIndex = list.findIndex((list => list.user.user_id === action.payload));
            if(objIndex>=0){
                list[objIndex].user.requested_love_by_viewer = !list[objIndex].user.requested_love_by_viewer    
            }
            return state
        },
        pushNewDataOnUserFilter: (state, action)=>{
            state.has_next_page = action.payload.has_next_page
        },
        spliceUserFilter: (state, action) =>{
            const objIndex =state.findIndex((list => list.user.user_id === action.payload));
            if(objIndex>=0){
                state.splice(objIndex, 1); 
            }
        }
    }
})
export const { createUserFilterSlice,UpdateLoveButton,pushNewDataOnUserFilter,spliceUserFilter ,newFilterResult} = userFilterSlice.actions