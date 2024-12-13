const ErrorHandler = (err, req, res, next) => {
  console.error(`Error ${err.message}`);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong!",
  });

};

module.exports = ErrorHandler;
