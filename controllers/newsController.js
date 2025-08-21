const User = require('../models/users');
const sendResponse = require('../middlewares/responseMiddleware');
const axios = require('axios');

// Helper function to fetch news from NewsAPI
const fetchNews = async (preferences) => {
    const params = {
        apiKey: process.env.NEWS_API_KEY,
        q: preferences.join(' OR '),
        language: 'en'
    };
    const res = await axios.get('https://newsapi.org/v2/everything', { params });
    return res.data.articles;
};


// Helper function to search news with a keyword
const searchNewsApi = async (keyword) => {
    const params = {
        apiKey: process.env.NEWS_API_KEY,
        q: keyword,
        language: 'en'
    };
    const res = await axios.get('https://newsapi.org/v2/everything', { params });
    return res.data.articles;
};

// Helper function to add article url to user list
const addArticleUrlToUserList = async (userId, url, listName) => {
    if (!['readArticles', 'favoriteArticles'].includes(listName)) {
        throw new Error('Invalid list name');
    }
    await User.findByIdAndUpdate(
        userId,
        { $addToSet: { [listName]: url } }
    );
};

// Get all news by user preferences
const getNews = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const articles = await fetchNews(user.preferences);
        sendResponse(res, 200, `Fetched news articles on ${user.preferences}`, articles);
    } catch (err) {
        sendResponse(res, 500, err.message, null);
    }
};

//searchNews by keyword
const searchNews = async (req, res) => {
    try {
        const { keyword } = req.params;
        const articles = await searchNewsApi(keyword);
        sendResponse(res, 200, `Search results for ${keyword}`, articles);
    } catch (err) {
        sendResponse(res, 500, err.message, null);
    }
};

// Mark article as read
const markRead = async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ message: 'URL required' });

        await addArticleUrlToUserList(req.user.userId, url, 'readArticles');
        sendResponse(res, 200, 'Marked as read', null);
    } catch (err) {
        sendResponse(res, 500, err.message, null);
    }
};

// Mark article as favorite
const markFavorite = async (req, res) => {
    try {
        const { url } = req.body;  // changed to body for consistency
        if (!url) return res.status(400).json({ message: 'URL required' });

        await addArticleUrlToUserList(req.user.userId, url, 'favoriteArticles');
        sendResponse(res, 200, 'Marked as favorite', null);
    } catch (err) {
        sendResponse(res, 500, err.message, null);
    }
};


// Get all read articles by user
const getRead = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        sendResponse(res, 200, 'Read articles fetched', user.readArticles);
    } catch (err) {
        sendResponse(res, 500, err.message, null);
    }
};

// Get all favorite articles by user
const getFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        sendResponse(res, 200, 'Favorite articles fetched', user.favoriteArticles);
    } catch (err) {
        sendResponse(res, 500, err.message, null);
    }
};

module.exports = { getNews, searchNews, markRead, markFavorite, getRead, getFavorites};
