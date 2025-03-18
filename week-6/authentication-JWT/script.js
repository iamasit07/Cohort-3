const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'randomwordsforsecret';
const app = express();

app.use(express.json());

const users = [];


app.post('/signup', (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    users.push({
        userName: userName,
        password: password
    })

    res.json({
        message: "You are logged in"
    })
    console.log(users);

});

app.post('/signin', (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    const user = users.find(user => user.userName == userName && user.password == password);

    if (user) {
        const token = jwt.sign({
            userName: userName
        }, JWT_SECRET);
        user.token = token;
        res.send({
            token
        })
    } else {
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
    console.log(users);

});

app.get('/me', (req, res) => {
    const token = req.headers.token;
    const decodedvalue = jwt.verify(token, JWT_SECRET);
    console.log("reached /me route");
    console.log(users);

    if (!token) {
        return res.status(400).send({ message: "Token is required" });
    }

    let tokenUser = decodedvalue.userName;

    if (tokenUser) {
        res.json({
            userName: tokenUser
        })
    } else {
        res.status(401).json({
            message: "Unauthorized"
        })
    }
});

app.listen(3000, () => {
    console.log("The server is listening on port 3000")
});