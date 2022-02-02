const error = (err, _req, res, _next) => {
  if (err.status) {
    console.log('middleware error', err.status);
    const { status, message } = err;

    return res.status(status).json({ message });
  }
  console.log(err);
  // return res.status(500).json({ message: 'Internal Error' });
  return res.status(500).json({ message: err.message });
};

module.exports = error;