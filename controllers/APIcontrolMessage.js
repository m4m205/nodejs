const express    = require('express');
const psotMessage = require('../models/msgModel');
const {check, validationResult} = require('express-validator/check');
const router = express.Router();



router.get('/loggedIn', function(req, res){

   psotMessage.find({}).then(item=>{
    res.json(item);
    res.end();
  })
  .catch(err=>{
    res.end('there is an error');
  })

})






//// Add A message
router.post('/makeMessage', function(req, res){

  let newMsg = new psotMessage (req.body) ;

  newMsg.save().then(newMsg=>{

    res.send(newMsg);
  })
  .catch(err=>{
    res.end('You have error!!!')
  })
  })




  // add reply to a msg

  router.post('/addReply', function(req, res){

    let newReply = {
        replyText: req.body.replyText ,
        userName: req.body.userName ,
        createAt: Date.now()

    }

    psotMessage.findByIdAndUpdate(req.body.messageID ,{ $push: { reply: newReply } })
     .then(newMsg=>{


      res.send(newMsg);
    })
    .catch(err=>{
      res.end('You have error in reply !!!')
    })
    })

//  refresh small relpy

  router.post('/refresh' , function(req, res){

      psotMessage.findById(req.body.id).then(result =>{ res.send(result); })

      .catch(err=>{

        res.end('You have error refresh reply !!!')
      })

  })


// delet a message
router.post('/delete', function(req, res){

    psotMessage.findByIdAndRemove(req.body.id).then(function(result){
      res.status(200)
      
    }).catch(err=>{
      res.status(422)
      res.end('You have error in deleting the message')
    })

})

  module.exports = router;
