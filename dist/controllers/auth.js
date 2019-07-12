"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _express = require("express");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jwt_auth = require("../services/jwt_auth");

var _models = _interopRequireDefault(require("../models"));

var router = (0, _express.Router)();
/*
Endpoint: POST /auth/signup
Create user account
*/

router.post('/signup',
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var body, errors, userExists, passwordHashed, userresult, user, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            body = req.body;
            errors = []; // Body Input Validation

            if (!body.first_name) errors.push('Please enter your first name');
            if (!body.last_name) errors.push('Please enter your last name');
            if (!body.email) errors.push('Please enter your email');
            if (!body.password) errors.push('Please enter your password'); // If errors, respond with errors array

            if (!errors.length) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              status: 'error',
              error: errors
            }));

          case 8:
            _context.prev = 8;
            _context.next = 11;
            return _models["default"].findUserByEmail([body.email]);

          case 11:
            userExists = _context.sent;

            if (!(userExists.rows.length > 0)) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              status: 'error',
              error: 'User with this email address already registered'
            }));

          case 14:
            // hash password
            passwordHashed = _bcryptjs["default"].hashSync(body.password, 10); // create new user

            _context.next = 17;
            return _models["default"].createUser([body.email, body.first_name, body.last_name, passwordHashed]);

          case 17:
            userresult = _context.sent;
            user = userresult.rows[0]; // get first row of result

            token = (0, _jwt_auth.tokenService)().issue(user); // issue jwt token

            return _context.abrupt("return", res.status(200).json({
              status: 'success',
              data: {
                user_id: user.id,
                is_admin: user.is_admin,
                token: token
              }
            }));

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](8);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(500).json({
              status: 'error',
              error: 'Internal server error'
            }));

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 23]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
/*
  Endpoint: POST /auth/signin
  user can signin
*/

router.get('/signin',
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            res.send('user can signup api endpoint');

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;