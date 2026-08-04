const express = require('express');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const { v4: uuid } = require('uuid');
const DB = require('./database');
const { peerProxy } = require('./peerProxy.js');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.post('/api/auth/register', async (req, res) => {
    const { username, password } = req.body;

    if (
        typeof username !== 'string' ||
        typeof password !== 'string' ||
        username.trim().length === 0 ||
        password.trim().length === 0
    ) {
        return res.status(400).json({
        message: 'Username and password are required',
        });
    }

    const cleanUsername = username.trim();
    const existingUser = await DB.getUser(cleanUsername);

    if (existingUser) {
        return res.status(409).json({
        message: 'Username already exists',
        });
    }

    const hash = await bcrypt.hash(password, 10);
    await DB.createUser(cleanUsername, hash);

    const token = uuid();
    await DB.updateUserToken(cleanUsername, token);

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24,
        path: '/',
    });

    res.json({
        message: 'Registered successfully',
        username: cleanUsername,
    });
});

app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;

    if (
        typeof username !== 'string' ||
        typeof password !== 'string' ||
        username.trim().length === 0 ||
        password.trim().length === 0
    ) {
        return res.status(400).json({
        message: 'Username and password are required',
        });
    }

    const cleanUsername = username.trim();
    const existingUser = await DB.getUser(cleanUsername);

    if (!existingUser) {
        return res.status(401).json({
        message: 'Incorrect username or password',
        });
    }

    const valid = await bcrypt.compare(password, existingUser.password);

    if (!valid) {
        return res.status(401).json({
        message: 'Incorrect username or password',
        });
    }

    const token = uuid();
    await DB.updateUserToken(existingUser.username, token);

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24,
        path: '/',
    });

    res.json({
        message: 'Login successful',
        username: existingUser.username,
    });
});

app.delete('/api/auth/logout', async (req, res) => {
    const token = req.cookies.token;

    if (token) {
        await DB.clearUserToken(token);
    }

    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
    });

    res.json({
        message: 'Logged out',
    });
});

async function auth(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await DB.getUserByToken(token);

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
}

app.get('/api/user', auth, (req, res) => {
    res.json({
        username: req.user.username,
    });
});


app.get('/api/game', auth, async (req, res) => {
    const game = await DB.getGame(req.user.username);
    res.json(game ? game.gameData : null);
});

app.post('/api/game', auth, async (req, res) => {
    await DB.saveGame(req.user.username, req.body);
    res.json({
        message: 'Game saved successfully',
    });
});


app.get('/api/sessions', auth, async (_req, res) => {
    const sessions = await DB.getSessions();
    res.json(sessions);
});

app.post('/api/sessions', auth, async (req, res) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ message: 'Session name is required' });
    }

    const cleanName = name.trim();
    const session = await DB.createSession(cleanName, req.user.username);

    res.json(session);
});


app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);