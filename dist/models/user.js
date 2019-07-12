"use strict";

pool.query('SELECT * FROM public."User"', function (error, results) {
  if (error) {
    throw error;
  }

  res.status(200).json(results.rows);
});