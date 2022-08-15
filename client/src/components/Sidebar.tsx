import React, { useEffect, useState } from 'react';

export default function Sidebar() {
  const [activeUsers, setActiveUsers] = useState(null);

  useEffect(() => {
    const url = "http://localhost:5051/api/v1/activeusers";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        
        // Reverse messages to place most recent on top
        const jsonRev = JSON.parse(JSON.stringify({userlist: (Array.from(json.userlist).reverse())}));

        setActiveUsers(jsonRev);
        console.log(jsonRev);
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
      <p>Sidebar</p>
      <hr />
      {(activeUsers) ? activeUsers.userlist.map((userObj, i) => (
        <React.Fragment key={i}>
          <div className="sidebarUser">
            <span>{userObj.name}</span><br />
            {/* <img src={userObj.imgUrl} className="sideImg" alt="Image" /> */}
            <br />
            <span className="sideTxt">{userObj.ident.substr(0, 5)}</span><br />
            <span className="sideTxt">Posted: {userObj.lastPost}</span><br />
          </div>
          <hr />

        </React.Fragment>)): "Loading..."}
    </>
  );
}