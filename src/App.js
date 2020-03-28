import React from "react";
import TodoList from "./components/TodoList";
import { Button, Dropdown, Input } from "semantic-ui-react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: {}, currentTask: "", options: [], currentOption: "" };
    this.handleTaskInputChange = this.handleTaskInputChange.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleGroupInputChange = this.handleGroupInputChange.bind(this);
    this.handleAddGroup = this.handleAddGroup.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleTaskInputChange = event => {
    this.setState({ currentTask: event.target.value });
  };

  handleAddTask = event => {
    if (!this.state.currentTask || !this.state.currentOption) {
      return;
    }
    const newTask = {
      id: new Date(),
      text: this.state.currentTask,
      active: true
    };
    this.setState(prevState => {
      const selectedGroup = this.state.currentOption;
      const allTasks = prevState.tasks;
      if (selectedGroup && !allTasks.hasOwnProperty(selectedGroup)) {
        allTasks[selectedGroup] = [];
      }
      allTasks[selectedGroup] = allTasks[selectedGroup].concat(newTask);
      return {
        tasks: allTasks,
        currentTask: "",
        currentOption: ""
      };
    });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.handleAddTask();
    }
  };

  handleGroupInputChange = (e, { value }) =>
    this.setState({ currentOption: value });

  handleAddGroup = (e, { value }) => {
    this.setState(prevState => ({
      options: [{ text: value, value }, ...prevState.options]
    }));
  };

  handleCheckItem = itemId => {
    const allTasks = this.state.tasks;
    for (let group of Object.keys(allTasks)) {
      allTasks[group] = allTasks[group].map(item => {
        if (item.id === itemId) {
          item.active = !item.active;
        }
        return item;
      });
    }
  };

  render() {
    console.log("rendering ", this.state);
    return (
      <div>
        <h2>Todo</h2>
        <div className="todo-container">
          <Input action>
            <input
              name="task-input"
              type="text"
              placeholder="Add new task"
              value={this.state.currentTask}
              onChange={this.handleTaskInputChange}
              onKeyPress={this.handleKeyPress}
              autoFocus
            ></input>
            <Dropdown
              placeholder="Add group"
              search
              selection
              allowAdditions
              value={this.state.currentOption}
              options={this.state.options}
              onAddItem={this.handleAddGroup}
              onChange={this.handleGroupInputChange}
            />
            <Button name="add-task" type="submit" onClick={this.handleAddTask}>
              Add
            </Button>
          </Input>
          <TodoList tasks={this.state.tasks} checkItem={this.handleCheckItem} />
        </div>
      </div>
    );
  }
}

export default App;
