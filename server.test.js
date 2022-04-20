// import supertest
const request = require('supertest');

// import our web app
const webapp = require('./server');

// Import database operations
const dbLib = require('./dbOperations');


// MongoDB URL
const url = 'mongodb+srv://cis350HW5:cis350HW5@cluster0.b0nwj.mongodb.net/Test_Data?retryWrites=true&w=majority';

let db; 

beforeAll(async () => {
    db = await dbLib.connect(url);
});

const player = {
    player: 'oliver',
    points: 6,
};

describe('/login endpoint tests',  ()=> {
    test('/login endpoint status code and response 404', ()=>{
        //construct a supertest request with our app
        // send an HTTP POST request with data (body)
        return request(webapp).post('/login/')
        .send({player:'', points:3}).expect(404)
        .then((response)=> expect(JSON.parse(response.text).error).toBe('username not provided'));
    });

     test('status code 201 and response', () =>{
        return request(webapp).post('/login/')
        .send(player)
        .expect(201) // test the response status code
         // process the response
        .then((response)=> expect(JSON.parse(response.text).message).toContain('Player with id'));
    }); 
});