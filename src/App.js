import React, { Component } from 'react';

//List component
class TodoList extends Component {
  render() {
    return (
      <div>
      {this.props.todos.map((todo, i) => {
          return (
          <TodoItem 
            key={i} 
            index= {i}
            todo={todo}
            toggleCheck={this.props.toggleCheck}
         />)
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
      <li className={this.props.todo.done ? "is-done" : "not-done"} onClick={() => this.props.toggleCheck(this.props.index)}>
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
      <input 
        onChange={(event) => this.props.handleChange(event)}
        value={this.props.inputValue}
      />
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
handleChange = (event) => {
  console.log(event.target.value)
  this.setState({
      inputValue: event.target.value
  })
}
addNew = (event) => {
  console.log("todo added")
  if (this.state.inputValue === '') {
    alert("Empty todo")
  }
  else {
  const newTodo = {
    value: this.state.inputValue,
    done: false
  }
  const todos = this.state.todos; 
  todos.push(newTodo)
  this.setState({
    todos,
    inputValue: ''
  })
}
}
toggleCheck = (index) => {
  console.log("toggled", index)
  const todos = this.state.todos;
  todos[index].done = !todos[index].done;
  this.setState({ todos })
}
filterChecked = () => {
  var checkedTodos = this.state.todos.filter(function (checked) {
    return checked.done === false
  })
  console.log(checkedTodos)
  return checkedTodos;
}
  render() {
    let todos = this.filterChecked();
    return (
      <div className="App">
      <h2>TODO list</h2>
      <InputFields 
         inputValue = {this.state.inputValue} 
         handleChange={this.handleChange}
         addNew={this.addNew}
      />
      <p> { todos.length } remaining out {this.state.todos.length}</p>
      <TodoList 
        toggleCheck= {this.toggleCheck}
        todos= {this.state.todos}
      />
            <style> {`
            .is-done {
                text-decoration: line-through;
            }
            li {
              cursor: pointer;
            }
            .clear {
              margin-top: 25px;
            }
         `}
         </style>    
         </div>

    );
  }
}

export default App;
