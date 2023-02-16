import { createSlice } from "@reduxjs/toolkit"
import { changeFollowButton } from "./functions";
export const UserSuggestions = createSlice({
    name: "UserSuggestions",
    initialState: [
    ],
    reducers: {
        createUserSuggestions: (state, action) => {
            state.push(...action.payload)
            return state
        },
        updateButtonUserSuggestions: (state, action) => {
            const objIndex = state.find((state => state.user_id === action.payload.user_id));
            if (objIndex) {
                changeFollowButton(state, action, objIndex)
            }
        },

    }
})
export const AllSuggestions = createSlice({
    name: "AllSuggestions",
    initialState: [
    ],
    reducers: {
        createAllSuggestionsList: (state, action) => {
            state.push(...action.payload)
            return state
        },
        updateButtonAllSuggestions: (state, action) => {
            const objIndex = state.find((state => state.user_id === action.payload.user_id));
            if (objIndex) {
                changeFollowButton(state, action, objIndex)
            }
        }
    }
})
export const { createAllSuggestionsList, updateButtonAllSuggestions } = AllSuggestions.actions
export const { createUserSuggestions, updateButtonUserSuggestions } = UserSuggestions.actions