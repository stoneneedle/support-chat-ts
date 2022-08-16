import React, { useEffect } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';

// Encryption
// import sha256 from 'crypto-js/sha256';
import sha1 from 'crypto-js/sha1';

export default function Message() {
  let ident = '', auth = '';

    // POST user authentication
    const authUrl = 'http://localhost:5051/api/v1/auth';

    const fetchAuth = async () => {
      try {
        const authBody = {
          name: localStorage.getItem('name').trim(),
          password: localStorage.getItem('password').trim(),
        };

        console.log(authBody);

        const response = await fetch(authUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(authBody)
        });
        const json = await response.json();
        
        console.log(json.message);
        auth = json.auth;
      } catch (error) {
        console.log("error", error);
      }
    };

  useEffect(() => {
    // Get IP and hash with SHA1
    const ipUrl = 'https://geolocation-db.com/json/';

    const fetchIP = async () => {
      try {
        const response = await fetch(ipUrl);
        const json = await response.json();
        
        ident = sha1(json.IPv4).toString();
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchIP();
    fetchAuth();
  }, []);

  function handleMessage(e) {
    //e.preventDefault();
    let message = e.target[0].value;
    console.log(message);
    // POST chat message
    (async () => {

      let message = e.target[0].value;

      let name = localStorage.getItem('name'), imageUrl = localStorage.getItem('imageUrl'),
        color = localStorage.getItem('color'), pageUrl = localStorage.getItem('pageUrl'),
        password =localStorage.getItem('password'),
        iconUrl = localStorage.getItem('iconUrl');

      const msgBody = {
        msgType: "msg",
        message: message,
        name: name,
        color: color,
        password: password,
        imageUrl: imageUrl,
        pageUrl: pageUrl,
        iconUrl: iconUrl,
        ident: ident,
        auth: auth
      };

      console.log(msgBody);

      const loginPost = await fetch('http://localhost:5051/api/v1/addmessage', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(msgBody)
      });
      const content = await loginPost.json();
    
      console.log(content);
    })();

    // console.log("Name: ", localStorage.getItem('name'));
    // alert(localStorage.getItem('imageUrl'));

    // POST activeuser entry
    (async () => {
      let name = localStorage.getItem('name'), imageUrl = localStorage.getItem('imageUrl');

      const activeUserBody = {
        name: name,
        imageUrl: imageUrl,
        ident: ident,
      };

      const loginPost = await fetch('http://localhost:5051/api/v1/addactiveuser', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(activeUserBody)
      });
      const content = await loginPost.json();
    
      console.log(content);
    })();

  }

  function handleLogout() {
    // DELETE activeuser entry
    (async () => {
      const activeUserDelete = await fetch('http://localhost:5051/api/v1/removeactiveuser/' + ident, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const content = await activeUserDelete.json();
    
      console.log(content);
    })();

    // POST logout message
    (async () => {
      let name = localStorage.getItem('name'), imageUrl = localStorage.getItem('imageUrl'),
        color = localStorage.getItem('color'), pageUrl = localStorage.getItem('pageUrl'),
        password =localStorage.getItem('password'),
        iconUrl = localStorage.getItem('iconUrl');

      const msgBody = {
        msgType: "logout",
        message: name + " has logged out.",
        name: name,
        color: color,
        password: password,
        imageUrl: imageUrl,
        pageUrl: pageUrl,
        iconUrl: iconUrl,
        ident: ident
      };

      const loginPost = await fetch('http://localhost:5051/api/v1/addmessage', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(msgBody)
      });
      const content = await loginPost.json();
    
      console.log(content);
    })();

    localStorage.clear();
  }

  return(
    <Container fluid>
      <Form onSubmit={handleMessage}>
        <Row>
          <InputGroup>
            <Col>
              <Form.Control
                className="chat-form"
                placeholder="Message"
                aria-label="Message"
                aria-describedby="basic-addon1"
              />
            </Col>
          </InputGroup>
        </Row>
        <Row>
          <Col>
            <InputGroup className="mt-2">
              <Button type="submit" className="chat-form">Post</Button>
            </InputGroup>
          </Col>
        </Row>
      </Form>
      <Form onSubmit={handleLogout}>
        <Row>
          <Col>
          <InputGroup className="mt-2">
            <Button type="submit" className="chat-form">Logout</Button>
          </InputGroup>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}