import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

// React-Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useAppDispatch } from '../app/hooks';
import { toggleEntered } from '../features/chatroom/ChatRoomSlice';

// Encryption
import sha1 from 'crypto-js/sha1';
import sha512 from 'crypto-js/sha512';

export default function Login() {
  const dispatch = useAppDispatch();
  let ident = '';

  useEffect(() => {
    const url = 'https://geolocation-db.com/json/';

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        
        const apiIdent = sha1(json.IPv4).toString();

        ident = apiIdent

        console.log(ident); //.substring(0, 5)

      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  function handleSubmit(e) {
    console.log(e.target[0].value, e.target[1].value, e.target[2].value, e.target[3].value, "Password Hash: ", sha512(e.target[4].value).toString(), e.target[5].value);
    //e.preventDefault();
    dispatch(toggleEntered());

    // Set local login session
    let name = e.target[0].value, imageUrl = e.target[1].value, color = e.target[2].value,
    pageUrl = e.target[3].value, password = sha512(e.target[4].value).toString(), iconUrl = e.target[5].value;

    localStorage.setItem('name', name);
    localStorage.setItem('imageUrl', imageUrl);
    localStorage.setItem('color', color);
    localStorage.setItem('pageUrl', pageUrl);
    localStorage.setItem('password', password);
    localStorage.setItem('iconUrl', iconUrl);

    // POST login message
    (async () => {
      let name = e.target[0].value, imageUrl = e.target[1].value, color = e.target[2].value,
      pageUrl = e.target[3].value, password = sha512(e.target[4].value).toString(), iconUrl = e.target[5].value;
      const msgBody = {
        msgType: "login",
        message: name + " has logged in.",
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

    // POST activeuser entry
    (async () => {
      let name = e.target[0].value, imageUrl = e.target[1].value, color = e.target[2].value,
      pageUrl = e.target[3].value, password = sha512(e.target[4].value).toString(), iconUrl = e.target[5].value;
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

  return(
    <>
      <Container fluid>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <InputGroup className="mb-2">
                <InputGroup.Text className="chat-form-label" id="basic-addon1">Name</InputGroup.Text>
                <Form.Control
                  className="chat-form"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup className="mb-2">
                <InputGroup.Text className="chat-form-label" id="basic-addon1">Image Link</InputGroup.Text>
                <Form.Control
                  className="chat-form"
                  placeholder="https://i.imgur.com/EJOjIMC.jpeg"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputGroup className="mb-2">
                <InputGroup.Text className="chat-form-label" id="basic-addon1">Color</InputGroup.Text>
                <Form.Control
                  className="chat-form"
                  placeholder="#ffffff"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup className="mb-2">
                <InputGroup.Text className="chat-form-label" id="basic-addon1">Page Link</InputGroup.Text>
                <Form.Control
                  className="chat-form"
                  placeholder="https://example.com/"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputGroup className="mb-2">
                <InputGroup.Text className="chat-form-label" id="basic-addon1">Password</InputGroup.Text>
                <Form.Control
                  className="chat-form"
                  type="password"
                  placeholder="mypass123"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup className="mb-2">
                <InputGroup.Text className="chat-form-label" id="basic-addon1">Icon</InputGroup.Text>
                <Form.Select className="chat-form" aria-label="Default select example" defaultValue="">
                  <option value="">Choose icon</option>
                  <option value="nobody">Nobody</option>
                  <option value="droid2">R2-D2</option>
                  <option value="st_aurora">Aurora</option>
                  <option value="st_eclipse">Eclipse</option>
                  <option value="st_imp">Imperial Remnant</option>
                  <option value="st_jedimaster">Jedi Master</option>
                  <option value="st_nr2">New Republic</option>
                </Form.Select>
              </InputGroup>
            </Col>
          </Row>
          <Button type="submit" className="chat-form">Join</Button>
        </Form>
      </Container>
    </>
  );
}
