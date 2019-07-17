import { Router } from 'express';
import { authService, tokenService } from '../services/jwt_auth';
import model from '../models';

const router = Router();

router.post('/trips', authService, async (req, res) => {
  const { body, token } = req;
  const errors = [];

  // Body Input Validation
  // if (!token) errors.push('Please enter your first name');
  if (!body.bus_id) errors.push('Please specify trip bus');
  if (!body.origin) errors.push('Please enter trip origin');
  if (!body.destination) errors.push('Please enter trip destination');
  if (!body.trip_date) errors.push('Please enter trip date');
  if (!body.fare) errors.push('Please enter trip fare');

  // If errors, respond with errors array
  if (errors.length) return res.status(400).json({ status: 'error', error: errors });

  try {
    // Check if user is admin
    const userExists = await model.checkIfAdmin([token.id]);
    if (userExists.rows.length === 0) return res.status(400).json({ status: 'error', error: 'Unauthorized user' });

    // Check if  bus exists
    const busExists = await model.findBus([body.bus_id]);
    if (busExists.rows.length === 0) return res.status(400).json({ status: 'error', error: 'Specified bus is not available' });

    // create trip
    const restrip = await model.createTrip([
      body.bus_id,
      body.origin,
      body.destination,
      body.fare,
      body.trip_date,
    ]);

    const trip = restrip.rows[0]; // get first row of result

    return res.status(200).json({
      status: 'success',
      data: {
        trip_id: trip.id,
        bus_id: trip.bus_id,
        origin: trip.origin,
        destination: trip.destination,
        trip_date: trip.trip_date,
        fare: trip.fare,
      },
    });
  } catch (err) {
    return res.status(500).json({ status: 'error', error: 'Internal server error' });
  }
});

/* manually validate user token */
const validate = (req, res) => {
  const { token } = req.body;

  tokenService().verify(token, (err) => {
    if (err) {
      return res.status(401).json({ isvalid: false, err: 'Invalid Token!' });
    }

    return res.status(200).json({ isvalid: true });
  });
};


export default router;
