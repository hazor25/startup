const express = require("express");

const bcrypt = require("bcryptjs");

const cookieParser = require("cookie-parser");
const { v4: uuid } = require("uuid");

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

const users = [];
const authTokens = [];

app.post("/api/auth/register", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    const existingUser = users.find(user => user.username === username);

    if (existingUser) {
        return res.status(409).json({
            message: "Username already exists"
        });
    }

    const hash = await bcrypt.hash(password, 10);
    users.push({
        username,
        password: hash,
    });

    const token = uuid();
    authTokens.push({
        token, 
        username
    });

    res.cookie("token", token, {
        httpOnly: true,
    });

    res.json({message: "Registered successfully",
        username
    });
});

app.post("/api/auth/login", async (req, res) => {
    const { username, password } = req.body;
    const existingUser = users.find(user => user.username === username);

    if (!existingUser) {
        return res.status(401).json({
            message: "Incorrect username or password"
        });
    }

    const valid = await bcrypt.compare(password, existingUser.password);
    if (!valid) {
        return res.status(401).json({
            message: "Incorrect username or password"
        });
    }

    const token = uuid();
    authTokens.push({
        token, 
        username: existingUser.username
    });

    res.cookie("token", token, {
        httpOnly: true,
    });

    res.json({message: "Login successful",
        username: existingUser.username
    });
});

app.delete("/api/auth/logout", (req, res) => {
    const token = req.cookies.token;
    const index = authTokens.findIndex(t => t.token === token);
    if (index >= 0) {
        authTokens.splice(index, 1);
    }

    res.clearCookie("token");
    res.json({
        message: "Logged out"
    });
});


function auth(req, res, next) {
    const token = req.cookies.token;

    const user = authTokens.find(t => t.token === token);

    if (!user) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    req.user = user;

    next();
}

app.get("/api/user", auth, (req, res) => {
    res.json({
        username: req.user.username
    });
});