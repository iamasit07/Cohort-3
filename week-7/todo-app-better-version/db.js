const { prod_tt_sasportal } = require('googleapis/build/src/apis/prod_tt_sasportal');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
})

const Todos = new Schema({
    title: String,
    done: Boolean,
    userId: ObjectId
})

const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('todos', Todos);

module.exports = {
    UserModel: UserModel,
    TodoModel: TodoModel
}