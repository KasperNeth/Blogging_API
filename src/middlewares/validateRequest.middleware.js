const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.array().map((err) => err.msg);
        return res.status(400).json({ success: false, message: error });
    }
    next();
};

module.exports = validateRequest;
