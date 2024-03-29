/* eslint-disable import/no-extraneous-dependencies */
// Create express app
const express = require('express');

const webapp = express();

// import database functions
const lib = require('./dbOperations');

const url = 'mongodb+srv://cis350HW5:cis350HW5@cluster0.b0nwj.mongodb.net/Test_Data?retryWrites=true&w=majority';

let db;

webapp.use(express.json());
webapp.use(
  express.urlencoded({
    extended: true,
  }),
);

// Root endpoint
webapp.get('/', (req, res) => {
  res.json({ message: 'Welcome to HW5 Backend' });
});

// TODO: define all endpoints as specified in REST API

webapp.post('/login', async (req, resp) => {
  // check the name was provided
  if (!req.body.player || req.body.player.length === 0) {
    resp.status(404).json({ error: 'username not provided' });
    return;
  }
  try {
    const result = await lib.addPlayer(db, { player: req.body.player, points: req.body.points });
    // send the response
    resp.status(201).json({ message: `Player with id ${JSON.stringify(result.insertedId)} added` });
    console.log('player inserted');
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
  }
});

webapp.get('/quiz', async (req, resp) => {
  // check the name was provided
  try {
    const result = await lib.getQuestions(db);
    // send the response
    resp.status(200).json({ message: JSON.stringify(result) });
    console.log('questions fetched');
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
  }
});

webapp.get('/leaders/:n', async (req, resp) => {
  try {
    const result = await lib.getLeaders(db, req.params.n);
    resp.status(200).json({ message: JSON.stringify(result) });
    console.log('leaders fetched');
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
  }
});

webapp.delete('/delete/:player', async (req, resp) => {
  try {
    console.log(req.params.player);
    await lib.deletePlayer(db, req.params.player);
    resp.status(200).json({ message: JSON.stringify('player deleted') });
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
  }
});

// Update Score
webapp.put('/leaders', async (req, resp) => {
  try {
    const result = await lib.updateScore(db, req.body.player, req.body.points);
    resp.status(200).json({ message: JSON.stringify(result) });
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
  }
});

// Default response for any other request
webapp.use((_req, res) => {
  res.status(404);
});

// Start server
const port = process.env.PORT || 5005;
webapp.listen(port, async () => {
  try {
    db = await lib.connect(url);
    console.log(`Express server running on port:${port}`);
  } catch (err) {
    throw new Error('cannot start server');
  }
});

module.exports = webapp; // export for testing
