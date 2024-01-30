exports.validateAPIKey = async (req, res, next) => {
  if (!req.headers.apikey) {
    next(new Error('API key Required.'));
  }

  if (req.headers.apikey === process.env.API_KEY) {
    return next();
  } else next(new Error('Invalid API key.'));
};
