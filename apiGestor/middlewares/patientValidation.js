const { body, validationResult } = require('express-validator');

const validatePatientFields = [
  body('name').notEmpty().withMessage('Name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('dni').notEmpty().withMessage('DNI is required'),
  body('gender').notEmpty().withMessage('Gender is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(400).json({
      errors: extractedErrors,
    });
  },
];

module.exports = { validatePatientFields };
