import React, { useEffect, useState } from 'react';

export default function ChatWindow() {
  const [chat, setChat] = useState(null);

  useEffect(() => {
    const url = "http://localhost:5051/api/v1/messages";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        
        setChat(json);
        
        //console.log(JSON.stringify(messages));

      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return(
    <>
      {/* <h1>Chat Window</h1>
      {JSON.stringify(messages)} */}

      {(chat) ? chat.messages.map((messageObj, i) => (
        <p key={i}>{messageObj.message}</p>
      )) : "Loading"}
      {/* <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br />
      <span>Text sample.</span><br /> */}
    </>
  );
}


