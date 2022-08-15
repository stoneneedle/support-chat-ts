import React, { useEffect, useState } from 'react';

export default function ChatWindow() {
  const [chat, setChat] = useState(null);

  useEffect(() => {
    const url = "http://localhost:5051/api/v1/messages";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        
        // Reverse messages to place most recent on top
        const jsonRev = JSON.parse(JSON.stringify({messages: (Array.from(json.messages).reverse())}));

        setChat(jsonRev);
        console.log("Refreshed...");

      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
    setInterval(() => fetchData(), 10000);
  }, []);

  return(
    <>
      <h1>Chat Window</h1>

      {(chat) ? chat.messages.map((messageObj, i) => (
        (messageObj.msgType === "msg") ?
          <React.Fragment key={i}>
            <span>
              <span style={{fontSize: '8pt'}}>{messageObj.ident.substring(0, 5)},</span>&nbsp;
              {(messageObj.auth === "admin") ? "º" :(messageObj.auth === "user")?  "*": ""}<a href={messageObj.pageUrl}>{messageObj.name}</a>: <span style={{color: messageObj.color}}>{messageObj.message}</span>
            </span>
            <br />
          </React.Fragment>
        : messageObj.msgType === "login" ?
        <React.Fragment key={i}>
          <span key={i}><u>LOGIN:</u> {messageObj.name} has joined the room.</span><br />
        </React.Fragment>
        :
        <React.Fragment key={i}>
          <span key={i}><u>LOGOUT:</u> {messageObj.name} has left the room.</span><br />
        </React.Fragment>

      )) : "Loading"}

    </>
  );
}

