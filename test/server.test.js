const tap = require('tap');
const supertest = require('supertest');
const mongoose = require('mongoose');
const connectDB = require('../db/connections');
const app = require('../app');
const server = supertest(app);

const mockUser = {
    name: 'Clark Kent',
    email: `clark${Date.now()}@test.com`,
    password: 'Krypt()n8',
    preferences: ['movies', 'comics']
};
const testArticleUrl = 'https://example.com/test-article';

let token;

tap.before(async () => {
    await connectDB();
});

// Test registering user
tap.test('POST /users/auth/register - success', async (t) => {
    const response = await server.post('/users/auth/register').send(mockUser);
    t.equal(response.status, 201, 'Register successful');
    t.ok(response.body.data, 'Data present');
    t.ok(response.body.data._id, 'User id present');
    t.end();
});

// Test registering user with missing email
tap.test('POST /users/auth/register - fail (missing email)', async (t) => {
    const badUser = {
        name: 'Bruce Wayne',
        password: 'IamBatman123',
        preferences: ['gadgets']
    };

    const response = await server.post('/users/auth/register').send(badUser);

    t.equal(response.status, 400, 'Should return 400 when email is missing');
    t.same(response.body, { message: 'Email is required' }, 'Error message should match');
    t.end();
});

// Test login with invalid email
tap.test('POST /users/auth/login - fail (invalid email)', async (t) => {
    const response = await server.post('/users/auth/login').send({
        email: 'notfound@test.com',
        password: 'whatever'
    });

    t.equal(response.status, 401, 'Should return 401 for invalid email');
    t.same(response.body, { message: 'Invalid email' });
    t.end();
});

// Test login with valid email
tap.test('POST /users/auth/login - success', async (t) => {
    const response = await server.post('/users/auth/login').send({
        email: mockUser.email,
        password: mockUser.password
    });
    t.equal(response.status, 200, 'Should return 200 for valid login');
    t.equal(response.body.status, 'success', 'Status should be success');
    t.equal(response.body.message, 'Login successful');
    t.equal(response.body.total, 1, 'Total should be 1');
    t.type(response.body.data.token, 'string', 'Token should be a string');
    token = response.body.data.token;
    t.end();
});

// Test updating preferences
tap.test('PUT /users/preferences - update preferences success', async (t) => {
    const newPrefs = ['tech', 'science'];

    const updateRes = await server.put('/users/preferences').set('Authorization', `Bearer ${token}`).send({ preferences: newPrefs });

    t.equal(updateRes.status, 200, 'Update preferences status 200');
    t.equal(updateRes.body.status, 'success', 'Update response status success');

    // Verify preferences updated by fetching them again
    const getRes = await server.get('/users/preferences').set('Authorization', `Bearer ${token}`);

    t.same(getRes.body.data, newPrefs, 'Preferences updated correctly');
    t.end();
});

// Test unauthorized access
tap.test('GET /users/preferences without token - unauthorized', async (t) => {
    const response = await server.get('/users/preferences');
    t.equal(response.status, 401, 'Should return 401 Unauthorized without token');
    t.end();
});

tap.test('GET /users/news - fetch news by preferences', async (t) => {
    const res = await server.get('/users/news').set('Authorization', `Bearer ${token}`);

    t.equal(res.status, 200, 'Fetch news status 200');
    t.equal(res.body.status, 'success', 'Fetch news status success');
    t.ok(Array.isArray(res.body.data), 'Data should be array of articles');
    t.end();
});

// Test marking article as read
tap.test('POST /users/news/read - mark article as read', async (t) => {
    const res = await server.post('/users/news/read')
        .set('Authorization', `Bearer ${token}`)
        .send({ url: testArticleUrl });

    t.equal(res.status, 200, 'Mark read status 200');
    t.equal(res.body.status, 'success', 'Mark read status success');
    t.end();
});

// Test getting read articles
tap.test('GET /users/news/read - get read articles', async (t) => {
    const res = await server.get('/users/news/read')
        .set('Authorization', `Bearer ${token}`);

    t.equal(res.status, 200, 'Get read articles status 200');
    t.equal(res.body.status, 'success', 'Get read articles status success');
    t.ok(Array.isArray(res.body.data), 'Read articles data should be array');
    t.ok(res.body.data.includes(testArticleUrl), 'Previously marked article URL present');
    t.end();
});


tap.teardown(async () => {
    await mongoose.disconnect();
});
