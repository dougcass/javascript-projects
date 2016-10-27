

import Backbone from 'backbone';
import bbTodoModel from '../models/bb_todoModel';
import bbTodoView from '../views/bb_todoView';
var Controller = Backbone.View.extend({
  // defines main view element el is the raw document node (todo container), creates jquery object for reference ($el)
  model: new bbTodoModel(),
  initialize: function(){
    var that = this;
    // fetch will call render when done
    this.model.fetch(function() {
      that.render();
    });
  },
  render: function(){
    var todos = this.model.get('todos');
    if (this.view !== undefined){
      this.view.removeHandlers();
    }
    this.view = new bbTodoView(todos, this);
  },
  addTodo: function(newTitle){
      this.model.addTodo(newTitle);
      this.render();
  },
  addKeyPress: function(event, newTitle) {
    if (event.which === 13) {
      this.addTodo(newTitle);
    }
  },
  removeTodo: function(id){
    if (id >= 0) {
      this.model.removeTodo(id);
      this.render();
    }
  },
  editTodo: function(id, newTitle){
    if (id >= 0) {
      this.model.editTodo(id, newTitle);
      this.render();
    }
  },
  changeComplete: function(id){
     if (id >= 0) {
      this.model.completeTodo(id);
      this.render();
    }
  }
});

module.exports = Controller;