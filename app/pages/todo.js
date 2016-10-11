
var $ = window.$;
import _ from 'underscore';
import model from '../models/todoModel';
import view from 'text!../views/todoItem.tpl';

var controller = {
  init: function(){
    model.init();
    // cache some selectors
    controller.addButton = $('.btn-add');
    //compile template
    controller.compiledTemplate = _.template(view);
    // render the todo item template
    controller.renderTemplates();
  },
    // do all the visual stuff
  render: function(compiledTodos){
    // remove all the event handlers
    controller.destroyEventHandlers();
    //compiled todos is an array
    // we are joining the elements together to make one long string
    //put the long string in to the html element with a class of 'todo list'
    $('.todo-list').html(compiledTodos.join(''));
    // now that all the todos have been added to the dom,
    // add all of the event handlers for the todo app
    controller.createEventHandlers();

  },
  renderTemplates: function(){
    [];
    // get the database
    // loop over each item in the database
    var compiledTodos = model.get().map(function(item, index){
      // creates an id for the item equal to the index + 1
      // the + 1 is to make it more human readable
      // id is required by our view --{{id}}
      item.id = index + 1;
      // handlebars, step 2
      // replace {{id}} with items id
      return controller.compiledTemplate(item);
     
    });// end of for each
    //pass list of todos to the render function
   controller.render(compiledTodos);
   // tell the model to save our data
    model.save();
  },
  //remove event handlers from app
  // get ready to re-render
  destroyEventHandlers: function(){
    controller.addButton.off();
    $('input[type="checkbox"]').off();
    $('.close').off();
    $('.edit').off();
  },
  //add the event handlers
  createEventHandlers: function(){
    controller.addButton.on('click', controller.addTodoHandler);
    $('.add-input').on('keypress', controller.addTodoKeyPress);
    $('input[type="checkbox"]').on('change', controller.checkedHandler);
    $('.close').on('click', controller.removeHandler);
    // edit button handler
    $('.edit').on('click', controller.editHandler);
  },
  editHandler: function(event){
    // which item to edit??
    var index = $(event.currentTarget).parent().parent().index();
    var $item = $('.todo').eq(index);
    // title text disappears
    $item.find(".todo-title").addClass('hidden');
    // text input appears
    $item.find(".todo-title-edit").removeClass('hidden');
    // edit button replaced by save button
    $item.find('.edit').addClass('hidden');
    $item.find('.save').removeClass('hidden');
    // make change when save is clicked
    $item.find('.save').on('click', controller.updateTitle);
    $item.find('.todo-title-edit input').on('keypress', controller.updateTitleKeyPress);
    

  },
  // handler to update title on hitting enter key
 updateTitleKeyPress: function(event){
    if (event.which === 13){
      controller.updateTitle(event);
    }

 },
 updateTitle: function(event){
  // which title??
    var index = $(event.currentTarget).parent().parent().index();
    var $item = $('.todo').eq(index);
    $item.find('.save').off();
    $item.find('.todo-title-edit input').off();

    var newTodoTitle = $item.find('.todo-title-edit input').val();
    // update the database
    model.get()[index].title = newTodoTitle;
    model.save();

    controller.renderTemplates();

 },
  // the event handler for the close x button
  // deletes the todo
  removeHandler: function(event){
    // which one was clicked
    var index = $(event.currentTarget).parent().parent().index();
    model.get().splice(index, 1);
    //update the view
    controller.renderTemplates();
  },
  // the event handler for the checkboxes
  checkedHandler: function(event){
    // which checkbox?
    var index = $(event.currentTarget).parent().parent().index();
    // update the database
    model.get()[index].completed = ! model.get()[index].completed;
    // view updates automatically, Yay HTML!
    model.save();
    controller.renderTemplates();

  },

  addTodoKeyPress: function(event){
    if (event.which === 13){
      controller.addTodoHandler(event);
    }
  },

  // event handler for the add button
  addTodoHandler: function(){
    // gets the value of the input box and sets it equal to a variable
    var newTitle = $('.add-input').val();
    // if input value is an empty string exit
    if (newTitle === '') return;
    // retrieve the database array and add new title and set completed to false
    model.get().push({
      title: newTitle,
      completed: false
    });
    // set input box to empty
    $('.add-input').val('');
    // refresh the template view with newly added todo ie updates the display
    controller.renderTemplates();
  }
};
//specifies what will be returned when this file is imported
module.exports = controller;

