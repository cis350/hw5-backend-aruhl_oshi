/* eslint-disable no-unused-vars */
// 1. Import MongoDB driver
const { MongoClient } = require('mongodb');

// 2. Connect to the DB and return the connection object
const connect = async (url) => {
  try {
    const conn = (await MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
    )).db();

    console.log(`Connected to the database: ${conn.databaseName}`);
    return conn;
  } catch (err) {
    console.error(err);
    throw new Error('could not connect to db');
  }
};
/*
// 3. add a player to the DB
const addPlayer = async (db, newPlayer) => {
  try {
    const result = await db.collection('Players').insertOne(newPlayer);
    console.log(`Created player with id: ${result.insertedId}`);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('could not add a player');
  }
}; */

// 4. get all players
async function getPlayer(db, name) {
  try {
    const result = await db.collection('Players').findOne({ player: name });
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('could not find player');
  }
}

// Get questions
async function getQuestions(db) {
  try {
    const results = await db.collection('Questions').find({}).toArray();
    // console.log(results);
    return results;
  } catch (err) {
    console.error(err);
    throw new Error('could not retrieve questions');
  }
}

const addPlayer = async (db, newPlayer) => {
  try {
    let result;
    const existingPlayer = await getPlayer(db, newPlayer.player);
    console.log(existingPlayer);
    if (existingPlayer === null) {
      console.log('creating new player');
      try {
        result = await db.collection('Players').insertOne(newPlayer);
        console.log(`Created player with id: ${result.insertedId}`);
        return result;
      } catch (err) {
        throw new Error('could not add a player');
      }
    }
    return existingPlayer;
  } catch (e) {
    throw new Error('could not add a player');
  }
};

// delete player
async function deletePlayer(db, name) {
  try {
    // retrieve all the players in the collection and convert the cursor
    // to an array
    await db.collection('Players').deleteMany({ player: name });
  } catch (err) {
    console.error(err);
    throw new Error('could not delete player');
  }
}

// get n leaders
async function getLeaders(db, n) {
  try {
    // retrieve all the players in the collection and convert the cursor
    // to an array
    const arr = await db.collection('Players').find({}).toArray();
    arr.sort((a, b) => b.points - a.points);
    /// console.log(arr);
    const nleaders = arr.slice(0, n);
    return nleaders;
  } catch (err) {
    console.error(err);
    throw new Error('could not find leaders');
  }
}

// update player score
// delete player
async function updateScore(db, name, score) {
  try {
    // retrieve all the players in the collection and convert the cursor
    // to an array
    const user = await getPlayer(db, name);
    if (user.points >= score) {
      return user;
    }
    await db.collection('Players').updateOne({ player: name }, { $set: { points: score } });
    const result = await getPlayer(db, name);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('could not delete player');
  }
}

module.exports = {
  connect, addPlayer, getPlayer, getQuestions, deletePlayer, getLeaders, updateScore,
};

connect('mongodb+srv://cis350HW5:cis350HW5@cluster0.b0nwj.mongodb.net/Test_Data?retryWrites=true&w=majority');
// this is the URL from the database
// cis350HW5 = password
// Test_Data is database name
/*
const main = async () => {
  const db = await connect('mongodb+srv://cis350HW5:cis350HW5@cluster0.b0nwj.mongodb.net/Test_Data?retryWrites=true&w=majority');
  // await addPlayer(db, {name: 'Chris', points: 0});
  await addPlayer(db, { name: 'Lena', points: 1 });
};

main();
*/
