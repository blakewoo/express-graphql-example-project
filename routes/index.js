var express = require('express');
var router = express.Router();
var {graphqlHTTP} = require('express-graphql');
var { buildSchema } = require('graphql');
var testSchema = require('../schema/test')
var userSchema = require('../schema/user')
var paymentSchema = require('../schema/paymentPlan')

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

router.use('/user',graphqlHTTP({
  schema: userSchema,
  graphiql: false,
}))

router.use('/paymentPlan',graphqlHTTP({
  schema: paymentSchema,
  graphiql: false,
}))

router.use('/test',graphqlHTTP({
  schema: testSchema,
  graphiql: false,
}))

router.use('/graph',graphqlHTTP({
  schema: testSchema,
  // rootValue: root,
  graphiql: true,
}))

module.exports = router;
