import { createSlice } from "@reduxjs/toolkit"
export const PhotosExploreSlice = createSlice({
    name: "PhotosExploreSlice",
    initialState: [
    ],
    reducers: {
        createPhotosExploreSlice: (state, action) => {
            state.push(...action.payload)
            return state
        },
       
    }
})
export const {createPhotosExploreSlice} = PhotosExploreSlice.actions