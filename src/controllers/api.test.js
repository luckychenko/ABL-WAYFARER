
import { expect } from 'chai';
import request from 'supertest';
import { env } from '../config';

env.config();
const server = request.agent(`http://localhost:${process.env.PORT || '3000'}`);


describe('API root json ok test', () => {
  it('responds with json', (done) => {
    server
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('Users Can Signup', () => {
  it('should not create a new user if any input is not provided', (done) => {
    const user = {
      email: 'jacl@gnem.com',
      password: 'password',
      first_name: '',
      last_name: 'low',
    };

    server
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        const { status, error } = res.body;

        expect(res.statusCode).to.be.equal(400);
        expect(status).to.be.equal('error');
        expect(error).to.be.an('array');
        done();
      });
  });
});
