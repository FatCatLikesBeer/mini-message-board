var express = require('express');
var router = express.Router();
const fs = require('fs');

// const messages = [
//   {
//     text: "Hi there!",
//     user: "Amando",
//     date: new Date(),
//     id: 0
//   },
//   {
//     text: "Hello World!",
//     user: "Charles",
//     date: new Date(),
//     id: 1
//   }
// ];

const filePath = "messages.json";
const messages = [];

fs.readFile(filePath, 'utf8', (err, data) => {
  console.log("Messages are empty");
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  messages.push(...JSON.parse(data));
  console.log("Messages have been loaded");
})

const siteTitle = 'Mini Message Board';
const arrayLength = messages.length;

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
  messages.push({
    text: userMessage,
    user: userName,
    date: new Date(),
    id: messages.length
  });
  fs.writeFile('messages.json', JSON.stringify(messages), (err) => {
    if (err) {
      console.error("Error writing JSON file", err);
      return;
    }
    console.log("Messages saved successfully");
  })

  res.redirect('/')
});

module.exports = router;
