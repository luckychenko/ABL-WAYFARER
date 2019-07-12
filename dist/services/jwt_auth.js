"use strict";

var _jsonwebtoken = require("jsonwebtoken");

var secret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret';

var tokenService = function tokenService() {
  var issue = function issue(payload) {
    return (0, _jsonwebtoken.sign)(payload, secret, {
      expiresIn: 10800
    });
  };

  var authenticate = function authenticate(token, cb) {
    return (0, _jsonwebtoken.verify)(token, secret, {}, cb);
  };

  return {
    issue: issue,
    authenticate: authenticate
  };
};

var authService = function authService(req, res, next) {
  var tokenToVerify; // header format: "Authorization: Bearer [token]" or "token: [token]"

  if (req.header('Authorization')) {
    var parts = req.header('Authorization').split(' ');

    if (parts.length === 2) {
      var scheme = parts[0];
      var credentials = parts[1];

      if (/^Bearer$/.test(scheme)) {
        tokenToVerify = credentials;
      } else {
        return res.status(401).json({
          msg: 'Format for Authorization: Bearer [token]'
        });
      }
    } else {
      return res.status(401).json({
        msg: 'Format for Authorization: Bearer [token]'
      });
    }
  } else if (req.body.token) {
    tokenToVerify = req.body.token;
    delete req.query.token;
  } else {
    return res.status(401).json({
      msg: 'No Authorization was found'
    });
  }

  return tokenService().authenticate(tokenToVerify, function (err, thisToken) {
    if (err) return res.status(401).json({
      err: err
    });
    req.token = thisToken;
    return next();
  });
};

module.exports = {
  authService: authService,
  tokenService: tokenService
};