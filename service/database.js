const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${encodeURIComponent(config.password)}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const gameCollection = db.collection('game');
const leaderboardCollection = db.collection('leaderboard');
const sessionCollection = db.collection('session');

async function getUser(username) {
    return userCollection.findOne({ username: username });
}

async function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function createUser(username, passwordHash) {
    const user = {
        username,
        password: passwordHash,
        token: null,
    };
    await userCollection.insertOne(user);
    return user;
}

async function updateUserToken(username, token) {
    await userCollection.updateOne(
        { username: username },
        { $set: { token: token } }
    );
}

async function clearUserToken(token) {
    const result = await userCollection.updateOne(
        { token: token },
        { $set: { token: null } }
    );
    return result;
}

async function saveGame(username, gameData) {
    await gameCollection.updateOne(
        { username: username },
        { $set: { username, gameData } },
        { upsert: true }
    );
}

async function getGame(username) {
    return gameCollection.findOne({ username: username });
}



async function createSession(name, host) {
  const session = { name, host };
  await sessionCollection.updateOne(
    { name: name },
    { $set: session },
    { upsert: true }
  );
  return session;
}

async function getSessions() {
  return sessionCollection.find({}).toArray();
}

async function getSession(name) {
  return sessionCollection.findOne({ name: name });
}


module.exports = {
    getUser,
    getUserByToken,
    createUser,
    updateUserToken,
    clearUserToken,
    saveGame,
    getGame,
    createSession,
    getSessions,
    getSession,
};