import { createSlice } from "@reduxjs/toolkit"
export const todoSlice = createSlice({
    name: "mycircles",
    initialState: [
    ],
    reducers: {
        //{type:"todo/addTask", payload:"aller faire les courses"}
        addTask: (state, action) => {
            const CircleList = action.payload?.Circle_list
            const newTask = {
                id: Date.now(),
                done: false,
                text: action.paylod
            }
            state = CircleList
            return state;
        },
        toggleTask: () => { },
        deleteTask: () => { }
    }
})
export const circleSlice = createSlice({
    name: "circleSlice",
    initialState: [],
    reducers: {
        createCircleList: (state, action) => {
            state.push(...action.payload)
            return state;
        },
        UnshiftNewCercle: (state, action)=>{
            state.unshift(action.payload);
        },
        moveCircleIndex: (state, action) => {
            state.forEach(function (item, i) {
                if (item.group_id === action.payload?.group.group_id) {
                    state.splice(i, 1);
                    item.subject = action.payload?.conversations.content.subject
                    item.sended = action.payload?.conversations.content.sended
                    item.seen_by_viewer = false
                    state.unshift(item);
                }
            });
        },
        seenNewMessageInbox: (state,action)=>{
            state.forEach(function (item, i) {
                if (item.group_id === action.payload) {
                    item.seen_by_viewer = true
                }
            });
        }
    }
})
export const circleVisited = createSlice({
    name: "circlevisited",
    initialState: [],
    reducers: {
        createCircleVisitedList: (state, action) => {
            state.push(action.payload)
        },
        addVisitedCircleSubjectList: (state, action) => {
            const findindex = state.findIndex((state => state.circle_info.id === action.payload.circle_id))
            if (findindex >= 0) {
                state[findindex].subjects.push(...action.payload.subjects)
            }
        }
    }
})
export const GroupConversations = createSlice({
    name: "GroupConversations",
    initialState: [],
    reducers: {
        createGroupConversations: (state, action) => {
            state.push(action.payload)
        },
        pushnewGroupMessage: (state, action) => {
            const findindex = state.find((element => element?.group.group_id === action.payload?.group.group_id))
            if (findindex) {
                findindex.conversations?.push(action.payload?.conversations)
            }
        }
    }
})
export const { addTask } = todoSlice.actions
export const { createCircleList, moveCircleIndex,UnshiftNewCercle,seenNewMessageInbox } = circleSlice.actions
export const { createCircleVisitedList, addVisitedCircleSubjectList } = circleVisited.actions
export const { createGroupConversations, pushnewGroupMessage } = GroupConversations.actions