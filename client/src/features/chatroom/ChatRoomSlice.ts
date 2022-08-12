import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatRoomState {
  entered: boolean;
}

const initialState: ChatRoomState = {
  entered: false,
}

const chatRoomSlice = createSlice({
  name: 'Chat Room',
  initialState,
  reducers: {
    toggleEntered(state) {
      if (state.entered === false) {
        state.entered = true;
      } else {
        state.entered = false;
      }
    },
  }
});

export const { toggleEntered } = chatRoomSlice.actions;
export default chatRoomSlice.reducer;