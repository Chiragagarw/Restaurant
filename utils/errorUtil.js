class CustomError extends Error {
    constructor(message, status, details = null) {
        super(message); // Call the parent class constructor with the message
        this.status = status;
        this.details = details;

        // Maintain proper stack trace in V8 (Node.js) environments
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

const createError = (message, status, details = null) => {
    return new CustomError(message, status, details);
};

module.exports = { createError, CustomError };
