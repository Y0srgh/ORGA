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
/* it('should get all users', async function() {
  this.timeout(5000);
  const res = await request(app)
    .get('/users')
    .expect(200);

  //assertions to verify the response body
}); */
// Test case for GET /users/:id
/* it('should get a specific user by id', async function() {
  this.timeout(5000);
  const userId = '66084692c74f968f094f046b'; 

  const res = await request(app)
    .get(`/users/${userId}`)
    .expect(200);

  //assertions to verify the response body
}); */
// Test case for PUT /users/update-password/:id
/* it('should update a user password', async function()  {
  this.timeout(6000);
  const userId = '66084692c74f968f094f046b'; 
  const newPassword = 'zayneb12345';

  const res = await request(app)
    .put(`/users/update-password/${userId}`)
    .send({ password: newPassword })
    .expect(200);

  // assertions to verify the response body
}); */
  // Test case for PUT /users/update-details/:id
 /*  it('should update user details', async function()  {
    this.timeout(5000);
    const userId = '66084692c74f968f094f046b'; // Replace with an actual user id
    const updatedUserData = {
      firstName: 'Yosr',
      lastName: 'Ghozzi',
      email: 'yosr.Ghozzi@insat.ucar.tn',
      password: 'yosr123',
      levelOfStudy:3,
      phoneNumber:'27082088',
      role:'Président',
      StudentID:"2133433",
      clubs:["a club"],
      
    };

    const res = await request(app)
      .put(`/users/update-details/${userId}`)
      .send(updatedUserData)
      .expect(200);

    //assertions to verify the response body
  }); */
// Test case for DELETE /users/:id
/* it('should delete a user', async () => {
  const userId = '66084692c74f968f094f046b'; // Replace with an actual user id

  const res = await request(app)
    .delete(`/users/${userId}`)
    .expect(200);

  //assertions to verify the response body
}); */
});
