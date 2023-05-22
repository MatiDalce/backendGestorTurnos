const { body, validationResult } = require('express-validator');

const appointmentValidationPost = [
    body('day').notEmpty().withMessage('Day is required.').trim().escape(),
    body('patient').notEmpty().withMessage('Patient is required.').trim().escape(),
    body('note').notEmpty().withMessage('Note is required.').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        next();
    }
];

module.exports = { appointmentValidationPost };
