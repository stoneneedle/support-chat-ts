import React from 'react';
import { useAppSelector } from '../app/hooks';
import ChatWindow from './ChatWindow';
import Landing from './Landing';

export default function App() {
  const userEntered: boolean = useAppSelector((state) => state.chatRoom.entered.valueOf());
  //console.log(userEntered);

  let currentChatPane = <Landing />;

  if (userEntered) {
    currentChatPane = <ChatWindow />;
  }

  return(
    currentChatPane
  );
}
