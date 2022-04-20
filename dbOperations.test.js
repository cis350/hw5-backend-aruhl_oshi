/* eslint-disable no-undef */
/**
* @jest-environment jsdom
*/

// import dbOperations
const dbModule = require('./dbOperations');

// MongoDB URL
const url = 'mongodb+srv://cis350HW5:cis350HW5@cluster0.b0nwj.mongodb.net/Test_Data?retryWrites=true&w=majority';

let db; 

beforeAll(async () => {
    db = await dbModule.connect(url);
});


// declare test data
const player = {
    player: 'testuser',
    points: 0,
   };

const playerToDelete = {
    player: 'Delete',
    points: 0,
   };



test('addPlayer inserts a new player', async () =>{
    //call addPlayer
    await dbModule.addPlayer(db, player);
    // find testplayer in the DB
    const newPlayer = await db.collection('Players').findOne({player: 'testuser'});
    //test that newPlayer is testuser
    expect(newPlayer.player).toEqual('testuser');
});

test('getQuestions returns the correct questions', async () =>{
    //call addPlayer
    const receivedQuestions = await dbModule.getQuestions(db);
    // find testplayer in the DB
    // get all the playes in the DB
    const questionsDB = await db.collection('Questions').find({}).toArray();
    //test that users matches  usersDB
    expect(receivedQuestions).toEqual(questionsDB);
});

test('getPlayer returns the correct player', async () =>{
    const receivedUser = await dbModule.getPlayer(db, 'oliver');
    const userDB = await db.collection('Players').findOne({ player: 'oliver' });
    //test that users matches  usersDB
    expect(receivedUser).toEqual(userDB);
});


test('deletePlayer deletes the correct player', async () =>{
    await dbModule.addPlayer(db, playerToDelete);
    const receivedUser = await dbModule.getPlayer(db, 'Delete');
    const userDB = await db.collection('Players').findOne({ player: 'Delete' });
    expect(receivedUser).toEqual(userDB);

    await dbModule.deletePlayer(db, 'Delete');
    
    const removed = await db.collection('Players').findOne({ player: 'Delete' });
    
    expect(removed).toBeNull();
});

test('getLeaders returns the top n leaders', async () =>{
    //call addPlayer
    const receivedQuestions = await dbModule.getQuestions(db);
    // find testplayer in the DB
    // get all the playes in the DB
    const questionsDB = await db.collection('Questions').find({}).toArray();
    //test that users matches  usersDB
    expect(receivedQuestions).toEqual(questionsDB);
});