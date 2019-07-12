"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _express = require("express");

// Database
// const db = require('../models');
var router = (0, _express.Router)();
/* root path */

router.get('/', function (req, res) {
  // res.status(200).json(results.rows);
  res.json('WELCOME TO WAYFARER API ENDPOINTx');
});
/* user can signup api endpoint */

router.get('/user', function (req, res) {
  res.json('user can signup api endpointz');
});
var _default = router;
exports["default"] = _default;