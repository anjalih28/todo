import React from "react";
import TodoItem from "./TodoItem";
import { Button, Dropdown, Input, List } from "semantic-ui-react";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: {},
      latestTask: "",
      filterOption: "All"
    };
    this.filterConfig = [
      { key: "All", text: "All", value: "All" },
      { key: "Active", text: "Active", value: "Active" },
      { key: "Completed", text: "Completed", value: "Completed" }
    ];
  }
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
      if (!allTasks.hasOwnProperty(selectedList)) {
        allTasks[selectedList] = [];
      }
      allTasks[selectedList] = allTasks[selectedList].concat(newTask);
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

  handleFilterChange = (e, { value }) => {
    this.setState({ filterOption: value });
  };

  getTasks() {
    const allTasks = this.state.tasks;
    let displayList = [];
    for (let list of Object.keys(allTasks)) {
      if (list === this.props.selectedList) {
        displayList = allTasks[list];
      }
    }
    const filteredTasks = displayList.filter(item => {
      if (this.state.filterOption === "Active") {
        return item.active;
      }
      if (this.state.filterOption === "Completed") {
        return !item.active;
      }
      return item;
    });
    return filteredTasks.length > 0 ? (
      filteredTasks.map(item => {
        return (
          <TodoItem
            task={item}
            checkItem={this.handleCheckItem}
            deleteItem={this.handleDeleteItem}
            id={item.id}
            key={item.id}
          />
        );
      })
    ) : (
      <span style={{ fontStyle: "italic" }}>
        No{" "}
        {this.state.filterOption === "All" ? "" : this.state.filterOption + " "}
        tasks
      </span>
    );
  }

  render() {
    console.log("rendering from todo list ", this.state);
    return (
      <div className="task-container">
        <div className="task-inputs">
          <Input action className="new-task-input">
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
          <span>
            Show{" "}
            <Dropdown
              inline
              options={this.filterConfig}
              value={this.state.filterOption}
              onChange={this.handleFilterChange}
            />
            tasks
          </span>
        </div>
        {Object.keys(this.state.tasks).length > 0 ? (
          <List divided verticalAlign="middle">
            {this.getTasks()}
          </List>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default TodoList;
