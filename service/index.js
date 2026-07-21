const express = require("express");

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

const users = [];

app.post("/api/auth/register", (req, res) => {
    const { username, password } = req.body;
    const existingUser = users.find(user => user.username === username);

    if (existingUser) {
        return res.status(409).json({
            message: "Username already exists"
        });
    }

    users.push(user = {
        username,
        password,
    });
    
    res.json({message: "Registered successfully"});
});

app.post("/api/auth/login", (req, res) => {
    const { username, password } = req.body;
    const existingUser = users.find(user => 
        user.username === username && 
        user.password === password);

    if (!existingUser) {
        return res.status(401).json({
            message: "Incorrect username or password"
        });
    }
    res.json({message: "Login successful"});
});