import { Router } from 'express';
import bcrypt from 'bcryptjs';

import { tokenService } from '../services/jwt_auth';
import model from '../models';

const router = Router();

// console.log('auth', model.pool.options.connectionString);
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
    const userExists = await model.findUserByEmail([body.email]);
    if (userExists.rows.length > 0) return res.status(401).json({status: 'error', error: 'User with this email address already registered'});

    // hash password
    const passwordHashed = bcrypt.hashSync(body.password, 10);

    // create new user
    const userresult = await model.createUser([
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


 /*
  Endpoint: POST /auth/signin
 User can Signin
  */

router.post('/signin', async (req, res) => {

    const { email, password } = req.body;
    if (email && password) {
      try {
        const user = await model.findUserByEmail([email]);

        if (!user.rows.length > 0) {
          return res.status(400).json({  status: 'error', error: 'User not found' });
        }

        if (bcrypt.compareSync(password, user.rows[0].password)) {
          const token = tokenService().issue({ id: user.id });

          return res.status(200).json({ status: 'success', data:{ user_id: user.rows[0].id, is_admin: user.rows[0].is_admin, token: token } });
        }

        return res.status(401).json({  status: 'error', error:  'Unauthorized : Invaid Password' });
      } catch (err) {
        console.log(err);
        return res.status(500).json({   status: 'error', error:  'Internal server error' });
      }
    }

    return res.status(400).json({  status: 'error', error:  'Bad Request: Enter Email and password' });


});


export default router;
