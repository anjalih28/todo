import React from 'react';
import { Divider, Dropdown } from 'semantic-ui-react';
import TodoList from './components/TodoList';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      currentOption: '',
    };
  }

  handleGroupInputChange = (e, { value }) =>
    this.setState({ currentOption: value });

  handleAddGroup = (e, { value }) => {
    this.setState((prevState) => ({
      options: [{ text: value, value }, ...prevState.options],
    }));
  };

  render() {
    const { options, currentOption } = this.state;
    return (
      <div className="todo-container">
        <h2>Todo</h2>
        <div className="list-container">
          <Dropdown
            placeholder="Add or Search List"
            search
            selection
            allowAdditions
            value={currentOption}
            options={options}
            onAddItem={this.handleAddGroup}
            onChange={this.handleGroupInputChange}
          />
          <Divider />
          {currentOption ? (
            <TodoList selectedList={currentOption} />
          ) : (
            <span style={{ fontStyle: 'italic' }}>
              Add or search a list to add your tasks
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default App;
