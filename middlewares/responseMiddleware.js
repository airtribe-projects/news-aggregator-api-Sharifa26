// Response middleware
const sendResponse = (res, statusCode, message, data) => {
    res.status(statusCode).json({
        status: statusCode < 400 ? 'success' : 'error',
        message,
        total: Array.isArray(data) ? data.length : (data ? 1 : 0),
        data
    });
};

module.exports = sendResponse;
