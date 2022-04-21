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
    player: 'alex',
    points: 6,
};

const playerToDelete = {
    player: 'Delete2',
    points: 4,
};

const playerToUpdate = {
    player: 'Update2',
    points: 2,
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

describe('/leaders get endpoint tests',  ()=> {
     test('status code 200 and response', () =>{
        return request(webapp).get('/leaders/5')
        .expect(200) // test the response status code
         // process the response
        .then((response)=> expect(JSON.parse(response.text).message).toContain('alex'));
    }); 
});

describe('/leaders put endpoint tests',  ()=> {
    test('status code 201 and response', () =>{
        return request(webapp).post('/login/')
        .send(playerToUpdate)
        .expect(201) // test the response status code
         // process the response
        .then((response)=> expect(JSON.parse(response.text).message).toContain('Player with id'));
    }); 
    test('status code 200 and response', () =>{
        return request(webapp).put('/leaders/')
        .send({player: 'Update2', points: 10})
        .expect(200) // test the response status code
        // process the response
        .then((response)=> expect(JSON.parse(response.text).message).toContain('10'));
   }); 
   test('status code 200 and response', () =>{
    return request(webapp).delete('/delete/Update2')
        .expect(200) // test the response status code
         // process the response
        .then((response)=> expect(true));
}); 
});

describe('/quiz endpoint tests',  ()=> {
    test('status code 200 and response', () =>{
       return request(webapp).get('/quiz/')
       .expect(200) // test the response status code
        // process the response
       .then((response)=> expect(JSON.parse(response.text).message).toContain('Margot Robbie'));
   }); 
});


describe('/delete endpoint tests',  ()=> {
     test('status code 200 and response', () =>{
        request(webapp).post('/login/')
        .send(playerToDelete);
        return request(webapp).delete('/delete/delete2')
        .expect(200) // test the response status code
         // process the response
        .then((response)=> expect(true));
    }); 
});




