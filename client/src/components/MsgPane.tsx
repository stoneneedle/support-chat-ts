import { useEffect } from 'react';

import Message from './Message';
import Login from './Login';

export default function MsgPane() {
  let currentChatPane = <Login />;

  const userSessionExists: boolean =
    (localStorage.getItem("name") != null) || 
    (localStorage.getItem("imageUrl") != null) || 
    (localStorage.getItem("color") != null) || 
    (localStorage.getItem("pageUrl") != null) || 
    (localStorage.getItem("password") != null) || 
    (localStorage.getItem("iconUrl") != null);
  
  if (userSessionExists) {
    currentChatPane = <Message />;
  } else {
    currentChatPane = <Login />;
  }

  return (
    currentChatPane
  );

}
