const mongoose = require('mongoose');


const user = new mongoose.Schema({ 
    fName: String,
    lName: String, 
    email: String,
    password: String
})
const User = mongoose.model('User', user);
module.exports = User;