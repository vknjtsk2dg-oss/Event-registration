const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const users = [];

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (users.find(u => u.username === username)) {
        return res.json({ success: false, message: "User already exists!" });
    }
    users.push({ username, password });
    res.json({ success: true, message: "Registration successful!" });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        return res.json({ success: true, message: "Login successful!" });
    }
    return res.json({ success: false, message: "Invalid username or password!" });
});

app.listen(3000, () => {
    console.log('Backend running on: http://localhost:3000');
});