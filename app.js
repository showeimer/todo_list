// My data
const todos = ['Wash the car'];
const completed = [];

// Loading required packages
const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');

// Making my app
const app = express();

// Telling express to load statics files in the public folder
app.use(express.static('public'));

// Telling express to use mustache
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

// Setting up bodyparser, false = strings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// On home page load, render index.mustache and load todos and completed array
app.get('/', function(request, response) {
  response.render('index', { todos: todos, completed: completed})
});

// When the form submits, push the todo content to the todos array, reload the page
app.post("/", function(request, response) {
  todos.push(request.body.todo);
  response.redirect('/');
})

// When my todo complete buttons submit, compare the value of the input with my todos array, if they are the same, push that index to my completed array and then remove it from todos.
app.post('/complete', function(request, response) {
  console.log(request.body);
  for (let i = 0; i < todos.length; i++) {
    if (request.body.completed === todos[i]) {
      completed.push(todos[i]);
      todos.splice(i,1);
      console.log(completed);
    }
  }
  response.redirect('/');
})

app.listen(3000);
