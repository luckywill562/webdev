import { createSlice } from "@reduxjs/toolkit"
export const NotificationsSlice = createSlice({
    name: "NotificationsSlice",
    initialState: [
    ],
    reducers: {
        createNotificationsList: (state, action) => {
            state.push(...action.payload)
        },
        pushnewNotifications: (state, action) => {
            state.unshift(action.payload)
        },
        updateSingleNotificationSeen: (state, action) => {
            const find = state.find((state => state.id === action.payload));
            if (find) {
                find.seen = 2
            }

        }
    }
})
export const { createNotificationsList, pushnewNotifications, updateSingleNotificationSeen } = NotificationsSlice.actions
