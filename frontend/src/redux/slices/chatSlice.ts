import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
}

interface ChatState {
  messages: ChatMessage[];
}

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
    receiveMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
    clearChat: (state) => {
      state.messages = [];
    },
  },
});

export const { sendMessage, receiveMessage, clearChat } = chatSlice.actions;
export default chatSlice.reducer;