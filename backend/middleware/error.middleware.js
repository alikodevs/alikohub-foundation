function errorHandler(err, req, res, next) {
  console.error('Unhandled error:', err.message);
  if (res.headersSent) return next(err);
  const status = err.status || err.statusCode || 500;
  return res.status(status).json({
    message: err.message || 'Internal server error',
  });
}

module.exports = errorHandler;
