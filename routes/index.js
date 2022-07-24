var express = require('express');
var router = express.Router();
var {graphqlHTTP} = require('express-graphql');
var { buildSchema } = require('graphql');
var schema = require('../schema/user')

// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

var root = { hello: () => 'Hello world!' };

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/test',function (req,res,next) {
  let result = req.body.data
  res.send(result)
})

router.use('/graph',graphqlHTTP({
  schema: schema,
  // rootValue: root,
  graphiql: true,
}))

module.exports = router;
