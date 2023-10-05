const express = require('express');
const path = require('path');
const app = express();


var cons = require('consolidate');

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');



// // Middleware to check if it's working hours
app.use((req, res, next) => {
  const date = new Date();
  console.log(date)
  const day = date.getDay();
  console.log(day)
  const hour = date.getHours();
  console.log(hour)
  if (day >= 1 && day <= 5 && hour >= 11 && hour <= 17) {
    next();
  } else {
    res.send('Sorry, the website is only available during working hours (Monday to Friday, from 9 to 17)');
  }
});


// Home page
app.get('/', (req, res) => {
    res.render(__dirname + "/views");
});

// Our Services page
app.get('/services', (req, res) => {
  res.render(__dirname + "/views/services.html");
});

// Contact Us page
app.get('/contact', (req, res) => {
  res.render(__dirname + "/views/contact.html");
});





// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});