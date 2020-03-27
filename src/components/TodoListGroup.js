import React from "react";
import TodoItem from "./TodoItem";
import { List } from "semantic-ui-react";

class TodoListGroup extends React.Component {
  render() {
    console.log("props ", this.props);
    console.log("props.tasks ", this.props.tasks);
    const listItems = this.props.tasks.map(task => {
      console.log(task);
      return <TodoItem text={task.text} key={task.id} />;
    });
    return (
      <List.Item as="li">
        {this.props.group}
        <List divided verticalAlign="middle" big>
          {listItems}
        </List>
      </List.Item>
    );
  }
}

export default TodoListGroup;
