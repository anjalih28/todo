import React from "react";
import TodoList from "./components/TodoList";
import { Divider, Dropdown } from "semantic-ui-react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [{ text: "React", value: "React" }],
      currentOption: "React"
    };
  }

  handleGroupInputChange = (e, { value }) =>
    this.setState({ currentOption: value });

  handleAddGroup = (e, { value }) => {
    this.setState(prevState => ({
      options: [{ text: value, value }, ...prevState.options]
    }));
  };

  render() {
    console.log("rendering from app ", this.state);
    return (
      <div className="todo-container">
        <h2>Todo</h2>
        <div className="list-container">
          <Dropdown
            placeholder="Add or Search List"
            search
            selection
            allowAdditions
            value={this.state.currentOption}
            options={this.state.options}
            onAddItem={this.handleAddGroup}
            onChange={this.handleGroupInputChange}
          />
          <Divider />
          {this.state.currentOption ? (
            <TodoList
              lists={this.state.options}
              selectedList={this.state.currentOption}
            />
          ) : (
            <span style={{ fontStyle: "italic" }}>
              Add or search a list to add your tasks
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default App;
