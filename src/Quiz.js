/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import './App.css';
import { useNavigate } from 'react-router-dom';
import quiz from './quiz.json';

function Quiz() {
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [questionNum, setQuestionNum] = useState(0);
  const [question, setQuestion] = useState(quiz[Math.floor(Math.random() * 12)]);
  const [username] = useState(localStorage.getItem('currentUser'));
  const navigator = useNavigate();
  const handleSubmit = () => {
    if (selectedAnswer === question.correct) {
      setScore(score + 1);
    }
    setQuestionNum(questionNum + 1);
    setQuestion(quiz[Math.floor(Math.random() * 12)]);

    if (questionNum > 10) {
      if (Number(localStorage.getItem(username)) < score) {
        localStorage.setItem(username, score);
      }
      navigator(
        '/leaderboard',
      );
    }
  };

  const handleChange = (e) => {
    setSelectedAnswer(e.target.id);
    console.log(localStorage.getItem('currentUser'));
  };

  return (
    <div>
      <div>
        <div className="box">
          <div className="text">
            {username}
          </div>
        </div>
        <div className="box">
          <div className="text">
            {`Current Score: ${score}`}
          </div>
        </div>
        <div className="box">
          <div className="text">
            {`Best Score: ${localStorage.getItem(username)}`}
          </div>
        </div>
      </div>
      <div>
        <div className="box2">
          <div className="text">
            Best User
          </div>
        </div>
        <div className="box2">
          <div className="text">
            Best Score
          </div>
        </div>
        <div className="whoisthisceleb">
          <div className="text">
            Who is this Celebrity?
          </div>
        </div>
      </div>
      <img className="image" src={question.img} alt="Celebrity" />
      <form>
        <p>Your Answer</p>
        <label className="container">
          {question.option1}
          <input type="radio" name="ans" id="option1" onChange={handleChange} />
          <span className="checkmark" />
        </label>
        <label className="container">
          {question.option2}
          <input type="radio" name="ans" id="option2" onChange={handleChange} />
          <span className="checkmark" />
        </label>
        <label className="container">
          {question.option3}
          <input type="radio" name="ans" id="option3" onChange={handleChange} />
          <span className="checkmark" />
        </label>
        <label className="container">
          {question.option4}
          <input type="radio" name="ans" id="option4" onChange={handleChange} />
          <span className="checkmark" />
        </label>
      </form>
      <button type="submit" onClick={handleSubmit}>submit</button>
    </div>
  );
}
export default Quiz;
