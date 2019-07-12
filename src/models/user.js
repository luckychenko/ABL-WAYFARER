pool.query('SELECT * FROM public."User"', (error, results) => {
  if (error) {
    throw error;
  }
  res.status(200).json(results.rows);
});
