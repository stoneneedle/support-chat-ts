import React from 'react';
import Message from './Message';
import Login from './Login';
import { useAppSelector } from '../app/hooks';
import { current } from '@reduxjs/toolkit';

export default function MsgPane() {
  const userEntered: boolean = useAppSelector((state) => state.chatRoom.entered.valueOf());
  let currentChatPane = <Login />;

  if (userEntered) {
    currentChatPane = <Message />;
  }

  return (
    currentChatPane
  );

}
