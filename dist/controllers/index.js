"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _auth = _interopRequireDefault(require("./auth"));

var _api = _interopRequireDefault(require("./api"));

module.exports = {
  auth: _auth["default"],
  secured: _api["default"]
};