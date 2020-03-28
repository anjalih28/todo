import React from "react";
import TodoItem from "./TodoItem";
import { List } from "semantic-ui-react";

class TodoListGroup extends React.Component {
  render() {
    const listItems = this.props.tasks.map(item => {
      return (
        <TodoItem
          task={item}
          checkItem={this.props.checkItem}
          deleteItem={this.props.deleteItem}
          id={item.id}
          key={item.id}
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
