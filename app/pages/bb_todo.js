

import Backbone from 'backbone';
import bbTodoModel from '../models/bb_todoModel';
import bbTodoItemView from '../views/bb_todoItemView';

var ControllerView = Backbone.View.extend({
  el: '.todo-container',
  events: {
    'click .btn-add': 'addTodo',
    'keypress .add-input': 'addKeyPress'
  },
  model: new bbTodoModel(),
  initialize: function(){
    this.model.fetch();
    this.render();
  },
  render: function(){
    //alert('you have ' + this.model.get('todos').length + ' todos!');
    var todos = this.model.get('todos');
    // render each item
    var renderedTodos = todos.map(function(item, index){
      item.id = index;
      var view = new bbTodoItemView(item);
      return view.$el;
    });
    // put all the todo items in to the dom
    this.$el.find('.todo-list').html(renderedTodos);
  },
  addTodo: function(){
    var newTitle = this.$el.find('.add-input').val();
      this.model.addTodo(newTitle);
      this.$el.find('.add-input').val('');
      this.render();
  },
  addKeyPress: function(event) {
    if (event.which === 13) {
      this.addTodo();
    }
  }
});

module.exports = ControllerView;