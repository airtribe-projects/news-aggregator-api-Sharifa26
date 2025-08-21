const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const { getPreferences, updatePreferences } = require('../controllers/preferenceController');

router.get('/', auth, getPreferences);
router.put('/', auth, updatePreferences);

module.exports = router;
