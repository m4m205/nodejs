const express    = require('express');
const path    = require('path');
const router = express.Router();


router.get('/*', function(req, res){
  console.log(path.join(__dirname, '../public', 'index.html'));
res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = router;
