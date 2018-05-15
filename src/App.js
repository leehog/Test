import React, { Component } from 'react';

//List component
class TodoList extends Component {
  render() {
    return (
      <div>
      {this.props.todos.map((todo, i) => {
          return (
          <TodoItem key={i} index= {i} todo={todo} toggleCheck={this.props.toggleCheck} />
        )
      })
      }
      </div>
    );
  }
}
//Single component
class TodoItem extends Component {
  render() {
    return (
      <div>
      <li className={this.props.todo.isChecked ? "is-done" : "not-done"} onClick={() => this.props.toggleCheck(this.props.index)}>
         {this.props.todo.value}
      </li>
      </div>
    );
  }
}

//Input component
class InputFields extends Component {
  render() {
    return (
      <div>
      <input onChange={(event) => this.props.handleChange(event)} value={this.props.inputValue} />
      <button onClick={(event) => this.props.addNew(event)}>Add</button>
      </div>
    );
  }
}

//App
class App extends Component {
state = {
    inputValue: '',
    todos: []
}
//Set state equal to the value given in the input
handleChange = (event) => {
  this.setState({
    inputValue: event.target.value
  })
}
//Add new todoitem to the array
addNew = (event) => {
  console.log("todo added:", this.state.inputValue)
  //Alert if empty
  if (this.state.inputValue === '') {
    alert("Empty todo")
  }
  //Create new todo if not empty
  else {
  const newTodo = {
    value: this.state.inputValue,
    isChecked: false
  }
  const todos = this.state.todos; 
  //Push new new to array
  todos.push(newTodo)
  this.setState({
    todos,
    inputValue: ''
  })
}
}
//Toggle the value of the clicked object
toggleCheck = (index) => {
  console.log("toggled")
  const todos = this.state.todos;
  todos[index].isChecked = !todos[index].isChecked;
  this.setState({ todos })
}
//Function for checking which todos are remaining
filterChecked = () => {
  var checkedTodos = this.state.todos.filter(function (checked) {
    return checked.isChecked === false
  })
  //console.log(checkedTodos)
  return checkedTodos;
}
  render() {
    let todos = this.filterChecked();
    return (
      <div className="App">
      <h2>TODO list</h2>
      <InputFields inputValue = {this.state.inputValue} handleChange={this.handleChange} addNew={this.addNew} />
      <p> { todos.length } remaining out {this.state.todos.length}</p>
      <TodoList toggleCheck= {this.toggleCheck} todos= {this.state.todos} />
            <style> {`
            .is-done {
                text-decoration: line-through;
            }
            li {
              cursor: pointer;
            }
         `}
         </style>    
         </div>

    );
  }
}

export default App;
