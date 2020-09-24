const validator = require('validator');

const messageValidator = () => {
  const verifyCreateSubCategory = (req, res, next) => {
    const payload = req.body;

    // if (!payload || typeof payload.text !== 'string' || !validator.isLength(payload.text, { min: 1, max: 256 })) {
    //   return res.status(400).send({ isSuccessful: false, message: 'Invalid text!' });
    // }

    // if (!payload || typeof payload.deleted !== 'boolean') {
    //   return res.status(400).send({ isSuccessful: false, message: 'Invalid deleted type!' });
    // }

    return next();
  };
  const verifyEditSubCategory = (req, res, next) => {
    const payload = req.body;

    // if (!payload || !payload.hasOwnProperty('_id') || typeof payload._id !== 'string' || !validator.isLength(payload._id, { min: 35, max: 37 })) {
    //   return res.status(400).send({ isSuccessful: false, message: 'Provide a correct portfolio ID!' });
    // }

    // if (!payload || typeof payload.text !== 'string' || !validator.isLength(payload.text, { min: 1, max: 256 })) {
    //   return res.status(400).send({ isSuccessful: false, message: 'Invalid text!' });
    // }

    // if (!payload || typeof payload.deleted !== 'boolean') {
    //   return res.status(400).send({ isSuccessful: false, message: 'Invalid deleted type!' });
    // }

    return next();
  };
  const verifyDeleteSubCategory = (req, res, next) => {
    const payload = req.body;

    // if (!payload || !payload.hasOwnProperty('_id') || typeof payload._id !== 'string' || !validator.isLength(payload._id, { min: 35, max: 37 })) {
    //   return res.status(400).send({ isSuccessful: false, message: 'Provide a correct portfolio ID!' });
    // }

    // if (!payload || typeof payload.deleted !== 'boolean') {
    //   return res.status(400).send({ isSuccessful: false, message: 'Invalid deleted type!' });
    // }

    return next();
  };

  return {
    verifyCreateSubCategory,
    verifyEditSubCategory,
    verifyDeleteSubCategory
  };
};

module.exports = messageValidator;
