
import { createSlice } from "@reduxjs/toolkit"
export const InboxSlice = createSlice({
    name: "InboxSlice",
    initialState: [
    ],
    reducers: {
        createInboxSlice: (state, action) => {
            state = action.payload;
            return state
        },
        changeMessagePosition: (state, action) => {
            const message_list = state.message_list;
            if (message_list) {
                const objIndex = message_list.findIndex((message_list => message_list.client.user.user_id === action.payload.client.user.user_id));
                if (objIndex >= 0) {
                    message_list.splice(objIndex, 1);
                    message_list.unshift(action.payload);
                }
                return state
            }
        },


        changeMessageSendElement: (state, action) => {
            const message_list = state.message_list;
            const objIndex = message_list.findIndex((message_list => +message_list.id === +action.payload.message.messages.fakeID));
            if (objIndex >= 0) {
                message_list[objIndex] = action.payload.message.messages;
            }
            return state;
        },
        viewMessage: (state, action) => {
            const message_list = state.message_list;
            if (message_list) {
                const objIndex = message_list.find((message_list => message_list.client.user.user_id === action.payload));
                if (objIndex) {
                    objIndex.seen = true;
                    return state;
                }
            }
        },

    }
})

export const ConversationsSlice = createSlice({
    name: "ConversationsSlice",
    initialState: [
    ],
    reducers: {
        createConversationsSlice: (state, action) => {
            const objIndex = state.findIndex((state => state.client.user.user_id === action.payload.client.user.user_id));
            if (objIndex < 0) {
                state.push(action.payload)
            }
        },
        pushNewMessage: (state, action) => {
            const objIndex = state.find((state => state.client.user.user_id === action.payload.user_id));
            if (objIndex) {
                objIndex.messages.push(action.payload);
            }
            return state
        },
        changeMessageSendedStatus: (state, action) => {
            const conversationIndex = state.findIndex((state => state.client.user.user_id === action.payload.messages.client.user.user_id));
            if (conversationIndex >= 0) {
                const objIndex = state[conversationIndex].messages.findIndex((element => element.id === action.payload.messages.fakeID))
                if (objIndex >= 0) {
                    const message = state[conversationIndex].messages[objIndex]
                    message.process = false;
                    message.id = action.payload.messages.id
                }
                return state;
            }
        },
        MessageUploadMediaProcess: (state, action) => {
            const conversationIndex = state.findIndex((state => state.client.user.user_id === action.payload.messages.client.user.user_id));
            if (conversationIndex >= 0) {
                const objIndex = state[conversationIndex].messages.findIndex((element => element.fakeID === action.payload.messages.fakeID))
                if (objIndex >= 0) {
                    const message = state[conversationIndex].messages[objIndex]
                    message.mesmedia[action.payload.index].progress = action.payload.progress
                }
                return state;
            }
        },
        setUploadProgress: (state, action) => {
            const conversationIndex = state.findIndex((state => state.client.user.user_id === action.payload.messages.client.user.user_id));
            if (conversationIndex >= 0) {
                const objIndex = state[conversationIndex].messages.findIndex((element => element.fakeID === action.payload.messages.fakeID))
                if (objIndex >= 0) {
                    const message = state[conversationIndex].messages[objIndex]
                    message.mesmedia[action.payload.index].progress = false
                    message.mesmedia[action.payload.index].media_id = action.payload.media.element_id
                }
                return state;
            }
        },
        pushNewMessageOnConversations: (state, action) => {
            const conversationIndex = state.findIndex((state => state.client.user.user_id === action.payload.messages.client.user.user_id));
            if (conversationIndex >= 0) {
                state[conversationIndex].messages.push(action.payload.messages)
            }
            return state;
        },
        displayMedia: (state, action) => {
            //display the photo uploaded
            const conversationIndex = state.findIndex((state => +state.client.user.user_id === +action.payload.client_id));
            if (conversationIndex) {
                const objIndex = state[conversationIndex].messages.findIndex((element => element.id === action.payload.id))
                if (objIndex >= 0) {
                    state[conversationIndex].messages[objIndex] = action.payload;
                }
                return state;
            }
        },
        messageSendError: (state, action) => {
            const objIndex = state.find((state => state.client.user.user_id === action.payload.client_id));
            if (objIndex) {
                for (let index = 0; index < objIndex.messages.length; index++) {
                    objIndex.messages[index].error = true;
                }
                return state;
            }
        },
        changeConversationClientElement: (state, action) => {
            const objIndex = state.find((state => state.client.user.user_id === action.payload.user_id));
            if (objIndex) {
                objIndex.client.user[action.payload.name] = !objIndex.client.user[action.payload.name]
            }
        },
        changeConversationView: (state, action) => {
            const objIndex = state.find((state => state.client.user.user_id === action.payload.message_id));
            if (objIndex) {
                for (let index = 0; index < objIndex.messages.length; index++) {
                    objIndex.messages[index].seen = true;
                }
            }
        }
    }
})

export const { createInboxSlice, changeMessagePosition, changeMessageSendElement, viewMessage,
} = InboxSlice.actions
export const { createConversationsSlice, pushNewMessage, changeMessageSendedStatus,
    pushNewMessageOnConversations, displayMedia, messageSendError,
    changeConversationClientElement, changeConversationView, MessageUploadMediaProcess, setUploadProgress
} = ConversationsSlice.actions
