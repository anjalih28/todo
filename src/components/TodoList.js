import React from "react";
import TodoListGroup from "./TodoListGroup";
import { List } from "semantic-ui-react";

class TodoList extends React.Component {
  render() {
    const allTasks = this.props.tasks;
    const listGroups = Object.keys(allTasks).map(group => {
      if (allTasks[group].length > 0) {
        return (
          <TodoListGroup
            tasks={allTasks[group]}
            group={group}
            checkItem={this.props.checkItem}
            deleteItem={this.props.deleteItem}
            key={group}
          />
        );
      }
      return false;
    });
    return <List as="ol">{listGroups}</List>;
  }
}

export default TodoList;
