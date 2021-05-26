const errHandler = require('./../util/errHandler');

module.exports = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // console.log(err);

  if (err.code === 11000) {
    error = new errHandler(
      `${err.name} | Duplicate key found on ${JSON.stringify(
        err.keyValue
      )} field`,
      400
    );
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new errHandler(`${err.name} | ${message}`, 400);
  }

  // res.status(error.statusCode || 500).json({
  //   status: false,
  //   error: error.message || 'Opps...! Server error...',
  // });
  res.render('error', {
    message: error.message || 'Server error...',
  });
  next();
};
