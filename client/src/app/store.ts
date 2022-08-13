import { configureStore, getDefaultMiddleware, Store } from "@reduxjs/toolkit";
import counterReducer from '../features/test/TestSlice';
import chatRoomReducer from '../features/chatroom/ChatRoomSlice';
import { apiSlice } from "../features/chatapi/ChatApiSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    chatRoom: chatRoomReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;