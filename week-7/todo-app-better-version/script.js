const express = require("express");
const jwt = require('jsonwebtoken');
const { UserModel, TodoModel } = require('./db');
const mongoose = require("mongoose");
const JWT_SECRET = 'JSONWEBSECRET';
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());
mongoose.connect("mongodb+srv://asitupadhyay793:vJcu1tyKqEAoM7fB@testcluster.jpwnd.mongodb.net/todo-app-database");

app.post('/signup', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(password, 5);

        await UserModel.create({
            name: name,
            email: email,
            password: hashedPassword
        })
    } catch (e) {
        res.status(403).json({
            message: 'User Already Exists   '
        });
    }

    res.send({
        message: 'You are logged in!!!'
    })
});

app.post('/signin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email: email
    })

    await bcrypt.compare(password, response.password)

    const user = await UserModel.findOne({
        email: email,
    });

    if (response) {
        const token = jwt.sign({
            _id: user._id.toString()
        }, JWT_SECRET);
        res.json({
            token: token
        })

    } else {
        res.json({
            message: "Invalid Credentials"
        })
    }
});

function auth(req, res, next) {
    const token = req.headers.authorization;
    const response = jwt.verify(token, JWT_SECRET);

    if (response) {
        req.userId = token.userId;
        next();
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
}
app.post('/todos', auth, (req, res) => {

});

app.get('/todos', auth, (req, res) => {

});

app.listen(3000, () => {
    console.log("The page is live at 3000 port");
});