const { Schema } = require('mongoose');
const app = express();

const UserSchema = new Schema({
    firstName: { type: String },
    LastName: { type: String },
    email: { type: String },
    password: { type: String }
});

