const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'randomwordsforsecret';
const app = express();

app.use(express.json());

const users = [];

function logger(req, res, next) {
    console.log(req.method + " request came");
    next();
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post('/signup', logger, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    })

    res.json({
        message: "You are logged in"
    })
    console.log(users);

});

app.post('/signin', logger, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let user = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            user = users[i];
        }
    }
    if (user) {
        const token = jwt.sign({
            username: user.username
        }, JWT_SECRET);
        user.token = token;
        res.json({
            token: token
        })
    } else {
        res.status(403).send({
            message: "Credentials Incorrect"
        })
    }
    console.log(users);

});

function auth(req, res, next) {
    const token = req.headers.token;
    if (token) {
        const decodedData = jwt.verify(token, JWT_SECRET);
        if (decodedData) {
            req.username = decodedData.username;
            next();
        } else {
            res.json({
                message: "You are not logged in"
            })
        }
    } else {
        console.error("No token found, You are not Logged in!!!");
    }
}

app.get('/me', auth, logger, (req, res) => {
    let decodedvalue = {
        username: req.username
    };
    if (decodedvalue) {
        let userData = null;
        for (let i = 0; i < users.length; i++) {
            if (decodedvalue.username === users[i].username)
                userData = users[i];
        }
        res.json({
            username: userData.username,
            password: userData.password
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