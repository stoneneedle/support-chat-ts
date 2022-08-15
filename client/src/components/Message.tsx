import React, { useEffect } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { checkServerIdentity } from 'tls';

// Encryption
// import sha256 from 'crypto-js/sha256';
import sha1 from 'crypto-js/sha1';


export default function Message() {
  let ident = '';

  useEffect(() => {
    const url = 'https://geolocation-db.com/json/';

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        
        ident = sha1(json.IPv4).toString();
        console.log(ident);
        //console.log(sha1(json.IPv4).toString()); //.substring(0, 5)

      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  console.log("TEST");

  function handleMessage(e) {
    //e.preventDefault();
    let message = e.target[0].value;
    console.log(message);
    // POST login message with JS fetch()
    (async () => {

      let message = e.target[0].value;

      let name = localStorage.getItem('name'), imageUrl = localStorage.getItem('imageUrl'),
        color = localStorage.getItem('color'), pageUrl = localStorage.getItem('pageUrl'),
        password =localStorage.getItem('password'),
        iconUrl = localStorage.getItem('iconUrl');

        //,
        //ident = localStorage.getItem('ident')

      const msgBody = {
        msgType: "msg",
        message: message,
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
  }

  function handleLogout() {
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