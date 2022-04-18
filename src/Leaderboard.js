/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import './App.css';

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const archive = [];
    const keys = Object.keys(localStorage);
    let i = 0;

    while (i < keys.length) {
      const user = keys[i];
      archive.push({
        key: Number(localStorage.getItem(user)),
        value: `${user} | ${localStorage.getItem(user)}`,
      });
      i += 1;
    }

    const users = archive.sort(((a, b) => b.key - a.key));
    console.log(users);

    setLeaders(users);
  }, []);

  return (
    <div className="leaderboardend">
      <div className="text">
        Leaderboard
      </div>
        <div><ol>
          {leaders.map((leader) => (
            <li key={leader.key}>{leader.value}</li>
         ))}
        </ol></div>
    </div>
  );
}

export default Leaderboard;
