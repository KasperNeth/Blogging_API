const { validationResult } = require("express-validator");

const ErrorMsgFormatter = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.array().map((err) => ({field: err.data,
          message: err.msg}));
        return res.status(400).json({ success: false, code: 400, message: "Validation failed", error: error });
    }
    next();
};

module.exports = ErrorMsgFormatter;