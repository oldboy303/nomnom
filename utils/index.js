const jwt = require('jsonwebtoken');
require('dotenv').load();

module.exports = {

  validateRequest(req, res, next) {
    if (req.body.token) {
      jwt.verify(req.body.token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) req.validatedID = null
        else req.validatedID = decoded
      });
    }
    else if (req.query.token) {
      jwt.verify(req.query.token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) req.validatedID = null
        else req.validatedID = decoded
      });
    }
    else req.validatedID = null
    next();
  },

  loginRequired(req, res, next) {
    if (req.validatedID) next()
    else res.status(401).json({ error: 'Unathorized' })
  }

};
