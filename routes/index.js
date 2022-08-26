let express = require('express');
let router = express.Router();
let {graphqlHTTP} = require('express-graphql');
let testSchema = require('../schema/test')
let userSchema = require('../schema/user')
let loginSchema = require('../schema/login')
let paymentSchema = require('../schema/paymentPlan')
let verifySession = require("../module/authorization")
var multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
var upload = multer({ dest: 'uploads/' })

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.isLogin) {
    res.render('index', { title: 'Express' });
  }
  else {
    res.redirect("/login")
  }
});

router.get('/login', function(req, res, next) {
  if(req.session.isLogin) {
    res.redirect("/")
  }
  else {
    res.render('login');
  }

});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.get('/logout', function(req, res, next) {
  req.session.isLogin = null
  res.send(true)
});

router.post("/fileUpload",upload.single('uploadFile'),function (req,res,next) {
  console.log(req.file);
  res.send(true)
})

router.use('/loginuser',graphqlHTTP({
  schema: loginSchema,
  graphiql: false,
}))

router.use('/user',verifySession.sessionVerify,graphqlHTTP({
  schema: userSchema,
  graphiql: false,
}))

router.use('/paymentPlan',verifySession.sessionVerify,graphqlHTTP({
  schema: paymentSchema,
  graphiql: false,
}))

router.use('/test',verifySession.sessionVerify,graphqlHTTP({
  schema: testSchema,
  graphiql: false,
}))

router.use('/graph',graphqlHTTP({
  schema: testSchema,
  // rootValue: root,
  graphiql: true,
}))

module.exports = router;
