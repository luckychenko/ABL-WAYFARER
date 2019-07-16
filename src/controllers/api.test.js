
import { expect } from 'chai';
import request from 'supertest';
import server from '../bin/www';
import { delUser } from '../models';
const port = (process.env.NODE_ENV === 'test' ? process.env.TEST_APP_PORT : process.env.APP_PORT) || process.env.PORT || '3000';
//const server = request.agent(`http://localhost:${port}`);

console.log(port);
describe('API root json ok test', () => {
  it('responds with json', (done) => {
    request(server)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});


describe('Users Can Signup', () => {
  it('should not create a new user if any input is not provided', (done) => {
    const user = {
      email: '',
      password: 'password',
      first_name: 'john',
      last_name: 'low',
    };

    request(server)
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

  it('should create a new user with valid data', done => {
    const user = {
      email: 'johndoe@gmail.com',
      password: 'password',
      first_name: 'john',
      last_name: 'low',
    };


    request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end( (err, res) => {
        const { status, error, data } = res.body;

        expect(res.statusCode).to.be.equal(200);
        expect(status).to.be.equal('success');
        expect(data).to.be.an('object');
        expect(data).to.have.property('user_id');
        expect(data).to.have.property('is_admin');
        expect(data).to.have.property('token');
       // expect(data.name).to.be.equal(user.name);
        delUser([data.user_id]);

        done();
      });
  });

});

