var express = require('express');
var router = express.Router();



router.get('/', (req, res) => {
   res.render('index.ejs'); 
});

router.get('/user/add-info', (req, res) => {
   res.render('user/add-info.ejs'); 
});


module.exports = router;



