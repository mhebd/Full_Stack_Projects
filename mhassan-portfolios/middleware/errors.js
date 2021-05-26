const errHandler = require('./../util/errHandler');

module.exports = (err, req, res, next) => {
  console.log(err);

  res.status(404).json({
    status: false,
    err: err.message,
  });
};
