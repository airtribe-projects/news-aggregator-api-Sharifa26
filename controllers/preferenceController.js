const User = require('../models/users');
const sendResponse = require('../middlewares/responseMiddleware');

const getPreferences = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        sendResponse(res, 200, 'Preferences fetched', user.preferences);
    } catch (err) {
        sendResponse(res, 500, err.message, null);
    }
};

const updatePreferences = async (req, res) => {
    try {
        const { preferences } = req.body;
        await User.findByIdAndUpdate(req.user.userId, { preferences });
        sendResponse(res, 200, 'Preferences updated', null);
    } catch (err) {
        sendResponse(res, 500, err.message, null);
    }
};

module.exports = { getPreferences, updatePreferences };
