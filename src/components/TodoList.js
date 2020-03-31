import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, Input, List } from 'semantic-ui-react';
import TodoItem from './TodoItem';

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: {},
      latestTask: '',
      filterOption: 'All',
    };

    this.filterConfig = [
      { key: 'All', text: 'All', value: 'All' },
      { key: 'Active', text: 'Active', value: 'Active' },
      { key: 'Completed', text: 'Completed', value: 'Completed' },
    ];
  }

  handleTaskInputChange = (event) => {
    this.setState({ latestTask: event.target.value });
  };

  handleAddTask = () => {
    const { latestTask } = this.state;
    if (!latestTask) {
      return;
    }

    const newTask = {
      id: new Date(),
      text: latestTask,
      active: true,
    };

    this.setState((prevState) => {
      const { selectedList } = this.props;
      console.log(selectedList);
      const allTasks = prevState.tasks;

      if (!Object.prototype.hasOwnProperty.call(allTasks, selectedList)) {
        allTasks[selectedList] = [];
      }

      allTasks[selectedList] = allTasks[selectedList].concat(newTask);

      return {
        tasks: allTasks,
        latestTask: '',
      };
    });
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleAddTask();
    }
  };

  handleCheckItem = (itemId) => {
    const { tasks } = this.state;

    const allTasks = Object.keys(tasks).map((list) => ({
      [list]: tasks[list].map((item) => {
        const task = item;
        task.active = task.id === itemId ? !task.active : task.active;
        return task;
      }),
    }));

    this.setState({ tasks: Object.assign({}, ...allTasks) });
  };

  handleDeleteItem = (itemId) => {
    const { tasks } = this.state;

    const allTasks = Object.keys(tasks).map((list) => ({
      [list]: tasks[list].filter((item) => {
        return item.id !== itemId;
      }),
    }));

    this.setState({ tasks: Object.assign({}, ...allTasks) });
  };

  handleFilterChange = (e, { value }) => {
    this.setState({ filterOption: value });
  };

  fetchTasks() {
    const { tasks, filterOption } = this.state;
    const { selectedList } = this.props;

    const displayList = Object.entries(tasks).filter((arr) => {
      return arr[0] === selectedList;
    })[0][1];

    const filteredTasks = displayList.filter((item) => {
      if (filterOption === 'Active') {
        return item.active;
      }
      if (filterOption === 'Completed') {
        return !item.active;
      }
      return item;
    });

    return filteredTasks.length > 0 ? (
      filteredTasks.map((item) => {
        console.log(item);
        console.log(typeof item);
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
      <span style={{ fontStyle: 'italic' }}>
        No {filterOption === 'All' ? '' : `${filterOption} `}
        tasks
      </span>
    );
  }

  render() {
    const { latestTask, filterOption } = this.state;
    return (
      <div className="task-container">
        <div className="task-inputs">
          <Input action className="new-task-input">
            <input
              name="task-input"
              type="text"
              placeholder="Add new task"
              value={latestTask}
              onChange={this.handleTaskInputChange}
              onKeyPress={this.handleKeyPress}
            />
            <Button name="add-task" type="submit" onClick={this.handleAddTask}>
              Add
            </Button>
          </Input>
          <span>
            Show{' '}
            <Dropdown
              inline
              options={this.filterConfig}
              value={filterOption}
              onChange={this.handleFilterChange}
            />
            tasks
          </span>
        </div>
        <List divided verticalAlign="middle">
          {this.fetchTasks()}
        </List>
      </div>
    );
  }
}

TodoList.propTypes = {
  selectedList: PropTypes.string.isRequired,
};

export default TodoList;
