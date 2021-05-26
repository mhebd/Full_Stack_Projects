const errHandler = require('./../util/errHandler');

module.exports = (err, req, res, next) => {
  if (err.code === 11000) {
    err.message = new errHandler(
      `Database error..! | Duplicate key found on ${JSON.stringify(
        err.keyValue
      )} field. Please try another text.`,
      400
    );
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    err.message = new errHandler(`${err.name} | ${message}`, 400);
  }

  if (err) {
    console.log(err.message);
    res.render('error', { message: err.message });
    return;
  }
  next();
};
