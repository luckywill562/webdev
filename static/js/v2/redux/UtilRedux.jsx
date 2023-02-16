import { createSlice } from "@reduxjs/toolkit"
export const Websocket = createSlice({
    name: "Websocket",
    initialState: [
    ],
    reducers: {
        createWebsocket: (state, action) => {
            state = action
            return state
        },
        createPageElement: (state, action) => {
            state = action.payload
            return state
        },
        updateInboxState: (state, action) => {
            state.stats.inbox = action.payload;
            return state;
        },

        updateNotificationCountState: (state, action) => {
            state.stats.notifications = action.payload;
            return state;
        },
        updateRequestStats: (state, action)=>{
            state.stats.request = action.payload
        },
        UpdatePrivacy: (state, action) => {
            state.c_user[action.payload.name] = !state.c_user[action.payload.name]
        },
        ChangeFilterValue: (state, action) => {
            const change = state.Filtre;
            const name = action.payload.name
            change[name] = action.payload.value;
            return state
        },
        changeSexeFilterValue: (state, action) => {
            state.Filtre.sex_type = action.payload;
        },
    }
})
export const Gifts = createSlice({
    name: 'Gifts',
    initialState: [],
    reducers: {
        createGiftsSlice: (state, action) => {
            state.push(...action.payload)
        }
    }
})
export const NotificationBox = createSlice({
    name: 'NotificationBox',
    initialState: [],
    reducers: {
        showNotificationBox: (state, action) => {
            state = action.payload
            return state;
        },
        closeNotificationBox: (state, action) => {
            state = '';
            return state;
        }
    }
})
export const AlertBox = createSlice({
    name: 'AlertBox',
    initialState: [],
    reducers: {
        showAlertBox: (state, action) => {
            state = action.payload
            return state;
        },
        closeAlertBox: (state, action) => {
            state = '';
            return state;
        }
    }
})

export const ViewBoxHistory = createSlice({
    name: 'ViewBoxHistory',
    initialState: [],
    reducers: {
        setCount: (state, action) => {
            state = action.payload
            return state
        }
        
    }
})
export const hasNExtPage = createSlice({
    name: 'hasNExtPage',
    initialState: [],
    reducers: {
        createNextPayload: (state, action) => {
            state = action.payload
            return state
        },
        changeNextStatus: (state, action) => {
            state[action.payload.name] = action.payload.value
            return state
        }
    }
})
export const MatchBox = createSlice({
    name: 'MatchBox',
    initialState: [],
    reducers: {
        showMatchBox: (state, action) => {
            state = action.payload
            return state;
        },
        closeMatchBox: (state, action) => {
            state = {};
            return state;
        }
    }
})
export const { createGiftsSlice } = Gifts.actions
export const { createWebsocket, createPageElement,
    updateInboxState, updateNotificationCountState,
    UpdatePrivacy, ChangeFilterValue, changeSexeFilterValue,websocketReconnect,
updateRequestStats } = Websocket.actions
export const { showNotificationBox, closeNotificationBox } = NotificationBox.actions
export const { showAlertBox, closeAlertBox } = AlertBox.actions
export const { setCount } = ViewBoxHistory.actions
export const { createNextPayload, changeNextStatus } = hasNExtPage.actions
export const {showMatchBox, closeMatchBox} = MatchBox.actions