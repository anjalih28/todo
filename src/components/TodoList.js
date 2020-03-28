import React from "react";
import TodoItem from "./TodoItem";
import { Button, Input, List } from "semantic-ui-react";

class TodoList extends React.Component {
  state = {
    tasks: {
      React: [
        { id: new Date(), text: "Make a todo app", active: true },
        { id: new Date(), text: "Read the docs", active: true },
        { id: new Date(), text: "Do the course", active: true }
      ]
    },
    latestTask: ""
  };
  handleTaskInputChange = event => {
    this.setState({ latestTask: event.target.value });
  };

  handleAddTask = event => {
    if (!this.state.latestTask) {
      return;
    }
    const newTask = {
      id: new Date(),
      text: this.state.latestTask,
      active: true
    };
    this.setState(prevState => {
      const selectedList = this.props.selectedList;
      const allTasks = prevState.tasks;
      console.log(allTasks);
      if (!allTasks.hasOwnProperty(selectedList)) {
        allTasks[selectedList] = [];
      }
      allTasks[selectedList] = allTasks[selectedList].concat(newTask);
      console.log(allTasks);
      return {
        tasks: allTasks,
        latestTask: ""
      };
    });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.handleAddTask();
    }
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
    this.setState({ tasks: allTasks });
  };

  handleDeleteItem = itemId => {
    const allTasks = this.state.tasks;
    for (let group of Object.keys(allTasks)) {
      allTasks[group] = allTasks[group].filter(item => {
        if (item.id !== itemId) {
          return true;
        }
        return false;
      });
    }
    this.setState({ tasks: allTasks });
  };

  render() {
    console.log("rendering from todo list ", this.state);
    const allTasks = this.state.tasks;
    let displayTasks = [];
    for (let list of Object.keys(allTasks)) {
      if (list === this.props.selectedList) {
        displayTasks = allTasks[list];
      }
    }

    const listItems = displayTasks.map(item => {
      return (
        <TodoItem
          task={item}
          checkItem={this.handleCheckItem}
          deleteItem={this.handleDeleteItem}
          id={item.id}
          key={item.id}
        />
      );
    });

    return (
      <div className="task-container">
        <Input action fluid>
          <input
            name="task-input"
            type="text"
            placeholder="Add new task"
            value={this.state.latestTask}
            onChange={this.handleTaskInputChange}
            onKeyPress={this.handleKeyPress}
            autoFocus
          ></input>
          <Button name="add-task" type="submit" onClick={this.handleAddTask}>
            Add
          </Button>
        </Input>
        {Object.keys(allTasks).length > 0 ? (
          <List divided verticalAlign="middle">
            {listItems}
          </List>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default TodoList;
