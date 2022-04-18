/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line import/no-extraneous-dependencies
// import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './App.css';

function Questions({ questionList }) {
  // pick a question
  const question = questionList[Math.floor(Math.random() * 12)];
  const [score, setScore] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    setScore(score + 1);
  }

  return (
    <div>
      <div>
        <div className="box">
          <div className="text">
            Current User
          </div>
        </div>
        <div className="box">
          <div className="text">
            {`Current Score: ${score}`}
          </div>
        </div>
        <div className="box">
          <div className="text">
            User Best Score
          </div>
        </div>
      </div>
      <div>
        <div className="box2">
          <div className="text">
            Current User
          </div>
        </div>
        <div className="box2">
          <div className="text">
            Current Score
          </div>
        </div>
      </div>
      <img className="image" src={question.img} alt="Celebrity" />
      <form>
        <p>Your Answer</p>
        <label className="container">
          {question.option1}
          <input type="radio" name="ans" id="opt1" />
          <span className="checkmark" />
        </label>
        <label className="container">
          {question.option2}
          <input type="radio" name="ans" id="opt2" />
          <span className="checkmark" />
        </label>
        <label className="container">
          {question.option3}
          <input type="radio" name="ans" id="opt3" />
          <span className="checkmark" />
        </label>
        <label className="container">
          {question.option4}
          <input type="radio" name="ans" id="opt4" />
          <span className="checkmark" />
        </label>
      </form>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

/*
Questions.defaultProps = {
  questionList: null,
};

Questions.propTypes = {
  questionList: PropTypes.arrayOf(PropTypes.shape({
    img: PropTypes.string(),
    option1: PropTypes.string(),
    option2: PropTypes.string(),
    option3: PropTypes.string(),
    option4: PropTypes.string(),
  })),
};
*/
export default Questions;
