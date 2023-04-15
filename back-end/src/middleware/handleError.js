const showError = (err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Some thing went wrong!";

  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });

  next();
};

module.exports = showError;
