import React from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';

export default function Message() {
  function handleSubmit() {

  }

  return(
    <Container fluid>
      <Form onSubmit={handleSubmit}>
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
    </Container>
  );
}