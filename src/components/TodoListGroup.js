import React from "react";
import TodoItem from "./TodoItem";
import { List } from "semantic-ui-react";

class TodoListGroup extends React.Component {
  render() {
    const listItems = this.props.tasks.map(task => {
      return (
        <TodoItem
          text={task.text}
          key={task.id}
          checkItem={this.props.checkItem}
          id={task.id}
        />
      );
    });
    return (
      <List.Item as="li">
        {this.props.group}
        <List divided verticalAlign="middle">
          {listItems}
        </List>
      </List.Item>
    );
  }
}

export default TodoListGroup;
