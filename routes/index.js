var express = require('express');
var router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    date: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    date: new Date()
  }
];

const siteTitle = 'Mini Message Board';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: siteTitle, messages: messages });
});
router.get('/new', function(req, res, next) {
  res.render('form', { title: siteTitle });
});
router.post('/new', function(req, res, next){
  const userName = req.body.name;
  const userMessage = req.body.message;
  messages.push({ text: userMessage, user: userName, date: new Date() });
  res.redirect('/')
});

module.exports = router;
