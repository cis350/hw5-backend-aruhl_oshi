import React from 'react';
import './App.css';
// import Leaderboard from './Leaderboard';
// import { useNavigate } from 'react-router-dom';
import quiz from './quiz.json';
import Login from './Login';

function App() {
  // const navigate = useNavigate();
  return (
    <div>
      <Login questionList={quiz} />
    </div>
  );
}

export default App;
