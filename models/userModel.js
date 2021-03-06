const mongoose = require('mongoose');


// make a Schema
const userSchema = mongoose.Schema({
      userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
      type: String,
      required: true
    },
    createAt:{
      type: Date,
      required: false,
      default: Date.now()
    }

});

module.exports = mongoose.model('users', userSchema);
