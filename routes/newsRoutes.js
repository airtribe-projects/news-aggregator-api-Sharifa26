const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const { getNews, searchNews, markRead, markFavorite, getRead, getFavorites } = require('../controllers/newsController');

router.get('/', auth, getNews);
router.get('/search/:keyword', auth, searchNews);
router.post('/read', auth, markRead);
router.post('/favorites', auth, markFavorite);
router.get('/read', auth, getRead);
router.get('/favorites', auth, getFavorites);

module.exports = router;
