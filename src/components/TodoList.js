import React from "react";
import TodoListGroup from "./TodoListGroup";
import { List } from "semantic-ui-react";

class TodoList extends React.Component {
  render() {
    const allTasks = this.props.tasks;
    const listGroups = Object.keys(allTasks).map(key => {
      return <TodoListGroup tasks={allTasks[key]} group={key} />;
    });
    return <List as="ol">{listGroups}</List>;
  }
}

export default TodoList;

// this.state.tasks = {
//   react: [{id, task}, {id, task}]

// }
