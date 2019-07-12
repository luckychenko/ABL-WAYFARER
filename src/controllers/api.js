import { Router } from 'express';

// Database
// const db = require('../models');

const router = Router();

/* root path */
router.get('/', (req, res) => {
  // res.status(200).json(results.rows);
  res.json('WELCOME TO WAYFARER API ENDPOINTx');
});

/* user can signup api endpoint */
router.get('/user', (req, res) => {
  res.json('user can signup api endpointz');
});

export default router;
