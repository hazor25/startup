const express = require("express");

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get('/api/test', (req, res) => {
    res.send({ message: "Backend is working!" });
});