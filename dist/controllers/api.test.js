"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _chai = require("chai");

var _supertest = _interopRequireDefault(require("supertest"));

var server = _supertest["default"].agent('http://localhost:4400');

describe('API root json ok test', function () {
  it('responds with json', function (done) {
    server.get('/').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done);
  });
});
describe('Users Can Signup', function () {
  it('should signup user', function (done) {
    server.get('/api/v1/auth/signup').end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.be.equal(200);
      (0, _chai.expect)(res.body.data).to.be.an('array');
      (0, _chai.expect)(res.body.data).to.have.lengthOf(0);
      done();
    });
  });
  it('should not create a new user if name is not provided', function (done) {
    var user = {
      noname: 'Jane Doe'
    };
    server.post('/api/v1/auth/signup').send(user).end(function (err, res) {
      var _res$body$error = res.body.error,
          code = _res$body$error.code,
          message = _res$body$error.message,
          details = _res$body$error.details;
      (0, _chai.expect)(res.statusCode).to.be.equal(400);
      (0, _chai.expect)(code).to.be.equal(400);
      (0, _chai.expect)(message).to.be.equal('Bad Request');
      (0, _chai.expect)(details).to.be.an('array');
      (0, _chai.expect)(details[0]).to.have.property('message');
      (0, _chai.expect)(details[0]).to.have.property('param', 'name');
      done();
    });
  });
});