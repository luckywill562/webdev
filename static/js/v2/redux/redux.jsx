import {
  configureStore,
} from '@reduxjs/toolkit'
import {todoSlice,circleSlice, circleVisited, GroupConversations} from "./CercleRedux"
import { ContactsList, MatchList } from './ContactsRedux'
import { ConversationsSlice, InboxSlice } from "./InboxRedux"
import { IncognitoMessagesSlice } from './IncognitoRedux'
import { MediaListView, SavedMedia } from './MediaListView'
import { NotificationsSlice } from "./NotificationsRedux"
import { PhotosExploreSlice } from './PhotoExploreRedux'
import { AllPosts, SingleAlbumLists, SinglePosts } from './PostsRedux'
import { RencardSlice } from './RencardRedux'
import { RequestFollowSlice, RequestReceivedSlice } from "./RequestRedux"
import { AllSuggestions, UserSuggestions } from './SuggestionsRedux'
import { MessageUploadMedia } from './UploadMedias'
import { userFilterSlice } from "./UserFilterRedux"
import { UserProfiles } from "./UserProfiles"
import { AlertBox, Gifts, hasNExtPage, MatchBox, NotificationBox, ViewBoxHistory, Websocket } from "./UtilRedux"

export const store = configureStore({
    reducer: {
        mycircles: todoSlice.reducer,
        circles: circleSlice.reducer,
        circlesVisited: circleVisited.reducer,
        GroupConversations: GroupConversations.reducer,
        Util: Websocket.reducer,
        RequestReceivedList: RequestReceivedSlice.reducer ,
        UserProfiles: UserProfiles.reducer,
        UserFilter: userFilterSlice.reducer,
        NotificationsList: NotificationsSlice.reducer,
        InboxList: InboxSlice.reducer,
        Conversations: ConversationsSlice.reducer,
        GiftLists: Gifts.reducer,
        NotificationBox: NotificationBox.reducer,
        AlertBox: AlertBox.reducer,
        AllPosts: AllPosts.reducer,
        SinglePostsList: SinglePosts.reducer ,
        Suggestions: UserSuggestions.reducer,
        AllSuggestions: AllSuggestions.reducer,
        viewBoxHistory: ViewBoxHistory.reducer,
        IncognitoMessages: IncognitoMessagesSlice.reducer,
        MediaListView: MediaListView.reducer,
        FollowerRequest: RequestFollowSlice.reducer,
        Next_Page: hasNExtPage.reducer,
        PhotosExplore: PhotosExploreSlice.reducer,
        MatchList: MatchList.reducer,
        MatchBox: MatchBox.reducer,
        ContactsList: ContactsList.reducer,
        MessageUploadMediaSlice: MessageUploadMedia.reducer,
        VisitedAlbumLists: SingleAlbumLists.reducer,
        RencardList: RencardSlice.reducer,
        SavedMedia: SavedMedia.reducer
    },
    middleware: getDefaultMiddleware=>
    getDefaultMiddleware({
        serializableCheck: false
    })
})