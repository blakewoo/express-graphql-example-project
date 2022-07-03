var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/test',function (req,res,next) {
  let result = req.body.data
  res.send(result)
})

module.exports = router;
