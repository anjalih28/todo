import React from "react";
import TodoList from "./TodoList";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], value: "" };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleInputChange = event => {
    this.setState({ value: event.target.value });
  };

  handleAddItem = event => {
    if (!this.state.value) {
      return;
    }
    const newItem = {
      task: this.state.value,
      id: new Date()
    };
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      value: ""
    }));
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.handleAddItem();
    }
  };

  render() {
    console.log("rendering ", this.state);
    return (
      <div>
        <h2>Todo</h2>
        <div className="todo-container">
          <div className="ui action input todo-input">
            <input
              type="text"
              name="task-input"
              value={this.state.value}
              placeholder="Add new task..."
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
            ></input>
            <button
              name="add-task"
              className="ui button"
              onClick={this.handleAddItem}
            >
              Add
            </button>
          </div>
          <TodoList items={this.state.items} />
        </div>
      </div>
    );
  }
}

export default App;
