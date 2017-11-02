const express    = require('express');
const User = require('../models/userModel');
const {check, validationResult} = require('express-validator/check');
const router = express.Router();


var validateRegister = () => {
    return [
            check('userName', 'Please enter your full name.').not().isEmpty(),
            check('userName', 'Your name can not incloud numbers.').not().isInt(),
            check('email', 'Your email is not valid').isEmail(),
            check('email', 'Your email is already exist, try another one.')
                  .custom(value => User.findOne({email: value}).then(user => !user)),
            check('password', 'Your password should be between 6 and 16 chars.')
                  .isLength({ min: 6, max: 16 }),
            check('conf_password', 'Your password not matched.')
                  .custom( (value, {req}) => value === req.body.password)
        ];
};

var validateLogin = () => {
    return [
            check('email', 'Your email is not valid').isEmail(),
            check('email', 'Your email is not exist, please register.')
                  .custom(value => User.findOne({email: value}).then(user => user)),
            check('password', 'Your password should be between 6 and 16 chars.')
                  .isLength({ min: 6, max: 16 })
        ];
};





//// Add new user
router.put('/register', validateRegister() , function(req,res){
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
  }

  const newUser= new User({
    userName:   req.body.userName,
    email:     req.body.email,
    password: req.body.password
  });

  newUser.save()
   .then(item=>{

    res.json(item);
  })
  .catch(err=> res.status(422).json({ error: err.message }) );

  })


//// login
router.post('/register', validateLogin() ,function(req,res){
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.mapped()});
  }

  User.findOne({email: req.body.email})
  .then(function (obj){
          if  (req.body.password == obj.password){

              req.session.user = obj._id;

              res.json(obj);
          } else {
              return res.status(422).json({
                errors: {
                  "password":{
                    msg: 'your password is not currect'
                  }
                }
              });
          }
        }).catch( err => res.status(422).json({ error: err.message }) );

      })





////  confirm  after logged
router.get('/loggedIn', function(req, res){
  if( req.session.user ){
    User.findById( req.session.user )
        .then( user => { return user ? res.json(user) : res.status(422).json({msg: 'The authentication failed.'}) })
        .catch( err => console.log(err));
  }
  else {

    res.status(422).json({msg: 'The authentication failed'})
  }
})








//// Add A message
router.post('/loggedIn', function(req, res){

  const newMsg= new psotMessage(req.body);

  newMsg.save()
   .then(newMsg=>{
    res.send(newMsg);
  })
  .catch(err=>{
    res.end('You have error!!!')
  })
  })





// signOut
router.get('/logout' , function (req, res) {
        req.session.destroy();
        res.json({logout: true});
    });




//////////////////////////////////////////////////////////////////////////////////

  router.put('/views/:id', function(req,res){
  User.findById(req.params.id, function(err, item) {
    if (!item)
      return next(new Error('Could not load Document'));
    else {
      // do your updates here
      item.nameUser = req.body.nameUser;
      item.message = req.body.message;

      item.save().then(item => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
})

///////////////////////////////////////////////////////////////////////////////

router.delete('/deletor/:id', function(req, res){
    User.findByIdAndRemove({_id: req.params.id},
      function(err, item){
       if(err) res.json(err);
       else res.json('Successfully removed');
    });
});



module.exports = router;
