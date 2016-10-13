
// // base framework
import $ from 'jquery';

// legacy loading for bootstrap javascript
window.$ = window.jQuery = $;
require('bootstrap');

// import our styles
import './stylesheets/base.scss';
import _ from 'underscore';
import navbar from './components/navbar';
import todoController from './pages/todo';
import svgController from './pages/svg_example';
import threeController from './pages/three';
import resumeController from './pages/resume';
import bbTodoController from './pages/bb_todo';
//import multimediaController from '.pages/multimedia';
// on document load
$(function(){
  //Kick off the app
  console.log('%c App Started', 'color:green');

  // set default template settings
  _.templateSettings = {
    evaluate:    /{{([\s\S]+?)}}/g,
    interpolate: /{{-([\s\S]+?)}}/g,
    escape:      /{{=([\s\S]+?)}}/g
  };

  // launch navbar
  navbar.init();


// My First Router; Which page are we on???
switch(window.location.pathname){
case '/pages/todo.html':
  todoController.init();
  break;
case '/pages/bb_todo.html':
  new bbTodoController();
  break;
case '/pages/multimedia.html':
  console.log('multimedia page started');
  break;
case '/pages/svg_example.html':
  svgController.init();
  break;
case '/pages/three.html':
  threeController.init();
  break;
case '/pages/resume.html':
  resumeController.init();
  break;

}

// original router syntax

// if (window.location.pathname === '/pages/todo.html') {
//   todoController.init();
// } else if (window.location.pathname === '/pages/multimedia.html') {
//   console.log('multimedia page started');


console.log('====================================');
console.log('Yo! Hire Me!! casserleighd@gmail.com');
console.log('====================================');




// todo.init(); ??
});
