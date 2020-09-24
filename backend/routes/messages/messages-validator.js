const validator = require('validator');

const messageValidator = () => {
  const verifyCreateMessage = (req, res, next) => {
    const payload = req.body;

    if (!payload || typeof payload.name !== 'string' || !validator.isLength(payload.name, { min: 1, max: 256 })) {
      return res.status(400).send({ isSuccessful: false, message: 'Invalid name!' });
    }

    if (!payload || typeof payload.email !== 'string' || !validator.isLength(payload.email, { min: 1, max: 256 })) {
      return res.status(400).send({ isSuccessful: false, message: 'Invalid name!' });
    }

    if (!payload || typeof payload.phone !== 'string' || !validator.isLength(payload.phone, { min: 1, max: 256 })) {
      return res.status(400).send({ isSuccessful: false, message: 'Invalid name!' });
    }

    if (!payload || typeof payload.message !== 'string' || !validator.isLength(payload.message, { min: 1, max: 256 })) {
      return res.status(400).send({ isSuccessful: false, message: 'Invalid name!' });
    }
    return next();
  };
  const verifyDeleteMessage = (req, res, next) => {
    const payload = req.body;

    if (!payload || !payload.hasOwnProperty('_id') || typeof payload._id !== 'string' || !validator.isLength(payload._id, { min: 35, max: 37 })) {
      return res.status(400).send({ isSuccessful: false, message: 'Provide a correct portfolio ID!' });
    }

    if (!payload || typeof payload.deleted !== 'boolean') {
      return res.status(400).send({ isSuccessful: false, message: 'Invalid deleted type!' });
    }

    return next();
  };

  return {
    verifyCreateMessage,
    verifyDeleteMessage
  };
};

module.exports = messageValidator;
