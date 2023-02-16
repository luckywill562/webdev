import { createSlice } from "@reduxjs/toolkit"
export const RequestReceivedSlice = createSlice({
    name: "RequestReceivedSlice",
    initialState: [
    ],
    reducers: {
        createRequestReceivedSlice: (state, action) => {
            state.push(...action.payload)
        },
        unshiftUserOnList: (state, action) => {
            const objIndex = state.findIndex((state => state.user_id === action.payload));
            if (objIndex >= 0) {
                state.splice(objIndex, 1);
            }
        },
        websocketNewReceivedLove: (state, action) => {
            const objIndex = state.find((state => state.user_id === action.payload.user_id));
            if (!objIndex) {
                state.unshift(action.payload)
                return state
            }
        }
    }
})
export const { createRequestReceivedSlice, unshiftUserOnList, websocketNewReceivedLove } = RequestReceivedSlice.actions

export const RequestFollowSlice = createSlice({
    name: "RequestFollowSlice",
    initialState: [
    ],
    reducers: {
        createFollowRequestListSlice: (state, action) => {
            state.push(...action.payload)
            return state
        },
        FollowRequestListButtonAction: (state, action) => {
            const userIndex = state.findIndex((state => state.user_id === action.payload.user_id));
            if (userIndex >= 0) {
                state.splice(userIndex, 1);
            }
        }
    }
})


export const { createFollowRequestListSlice, FollowRequestListButtonAction } = RequestFollowSlice.actions