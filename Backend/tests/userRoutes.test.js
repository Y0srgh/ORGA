import request from 'supertest';
import {app} from '../index.js'; //Express app instance is exported from index.js

describe('User Routes', ()=> {
  // Test case for POST /users
 /*  it('should create a new user', async function() {
      this.timeout(7000);
      const userData = {
      firstName: 'Zayneb',
      lastName: 'Fathalli',
      email: 'zayneb.fathalli@insat.ucar.tn',
      password: 'zayneb123',
      levelOfStudy:3,
      phoneNumber:'28771588',
      role:'Président',
      StudentID:"2133433",
      clubs:["a club"],

    };

    const res = await request(app)
      .post('/users')
      .send(userData)
      .expect(201);

    //assertions to verify the response body
  }); */
// Test case for GET /users
it('should get all users', async function() {
  this.timeout(5000);
  const res = await request(app)
    .get('/users')
    .expect(200);

  //assertions to verify the response body
});
});
