/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login(props) {
  const [username, setUsername] = useState('');

  const navigator = useNavigate();

  const navigate = () => {
    localStorage.setItem('currentUser', username);
    navigator(
      '/quiz',
      {
        state: 'rest',
        questionList: props.questionList,
        user: username,
      },
    );
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const login = () => {
    if (username === '') {
      alert('enter valid username');
      return;
    }

    if (localStorage.getItem(username) !== null) {
      // user already exists
    } else {
      localStorage.setItem(username, 0);
    }
    navigate();
  };

  return (
    <div className="Login">
      <Form>
        <Form.Group size="user" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            onChange={updateUsername}
          />
        </Form.Group>
        <Button block size="lg" type="submit" onClick={login}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
