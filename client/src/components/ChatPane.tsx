import ChatWindow from './ChatWindow';
import Landing from './Landing';

export default function ChatPane() {
  const userSessionExists: boolean =
    (localStorage.getItem("name") != null) || 
    (localStorage.getItem("imageUrl") != null) || 
    (localStorage.getItem("color") != null) || 
    (localStorage.getItem("pageUrl") != null) || 
    (localStorage.getItem("password") != null) || 
    (localStorage.getItem("iconUrl") != null);

  let currentChatPane = <Landing />;

  console.log(userSessionExists);

  if (userSessionExists) {
    currentChatPane = <ChatWindow />;
  } else {
    currentChatPane = <Landing />;
  }

  return(
    currentChatPane
  );
}
