//1. Import MongoDB driver
const { MongoClient } = require('mongodb');

//2. Connect to the DB and return the connection object
const connect = async (url) => {
    try {
        const conn = (await MongoClient.connect(url,
            {useNewUrlParser: true, useUnifiedTopology: true})).db();
    
        console.log(`Connected to the database: ${conn.databaseName}`);
        return conn;

    } catch(err){
        console.error(err)
        throw new Error('could not connect to db');
    }
}

//3. add a player to the DB
const addPlayer = async (db, newPlayer) => {
    try{
        const result = await db.collection('Players').insertOne(newPlayer);
        console.log(`Created player with id: ${result.insertedId}`);
        return result;

    }catch(err){
        console.error(err);
        throw new Error('could not add a player');
    }

}

connect('mongodb+srv://cis350HW5:cis350HW5@cluster0.b0nwj.mongodb.net/Test_Data?retryWrites=true&w=majority');
//this is the URL from the database
//cis350HW5 = password
//Test_Data is database name