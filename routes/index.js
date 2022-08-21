let express = require('express');
let router = express.Router();
let {graphqlHTTP} = require('express-graphql');
let testSchema = require('../schema/test')
let userSchema = require('../schema/user')
let loginSchema = require('../schema/login')
let paymentSchema = require('../schema/paymentPlan')
let verifySession = require("../module/authorization")

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
