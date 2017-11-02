const mongoose = require('mongoose');


// make a Schema
const msgSchema = mongoose.Schema({
    //   userName: {
    //     type: String,
    //     required: true
    // },
    text: {
        type: String,
        required: true
    },
    userID:{
      type: String,
      required: true,
      required: true
    },

      userName:{
        type: String
    },
    createAt:{
      type: Date,
      required: false,
      default: Date.now()
    },
    count:{
      type: Number,
      required: false,
      default: 0
    },
    reply:{
      type: [],
      required: false,
      default: []


    }

});

module.exports = mongoose.model('messages', msgSchema);
