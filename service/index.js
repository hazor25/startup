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
    const user = {
        username,
        password,
    };

    users.push(user);
    res.json({message: "Registered successfully"});
});