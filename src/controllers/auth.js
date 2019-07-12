import { Router } from 'express';
import bcrypt from 'bcryptjs';

import { tokenService } from '../services/jwt_auth';
import db from '../models';

const router = Router();


  /*
  Endpoint: POST /auth/signup
  Create user account
  */

router.post('/signup', async (req, res) => {
  const { body } = req;
  const errors = [];

  // Body Input Validation
  if (!body.first_name) errors.push('Please enter your first name');
  if (!body.last_name) errors.push( 'Please enter your last name');
  if (!body.email) errors.push('Please enter your email');
  if (!body.password) errors.push('Please enter your password');

  // If errors, respond with errors array
  if (errors.length) return res.status(400).json({status: 'error', error: errors});

  try {
    // Check if user account exists
    const userExists = await db.findUserByEmail([body.email]);
    if (userExists.rows.length > 0) return res.status(400).json({status: 'error', error: 'User with this email address already registered'});

    // hash password
    const passwordHashed = bcrypt.hashSync(body.password, 10);

    // create new user
    const userresult = await db.createUser([
      body.email,
      body.first_name,
      body.last_name,
      passwordHashed,
    ]);

    const user = userresult.rows[0]; // get first row of result
    const token = tokenService().issue(user); // issue jwt token

    return res.status(200).json({ status: 'success', data:{ user_id: user.id, is_admin: user.is_admin, token: token } });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'error', error:  'Internal server error' });
  }

});



export default router;
