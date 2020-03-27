import React from "react";
import TodoItem from "./TodoItem";

class TodoList extends React.Component {
  render() {
    const listItems = this.props.items.map(item => {
      return <TodoItem key={item.id} task={item.task} id={item.id} />;
    });
    return <div className="ui large aligned divided list">{listItems}</div>;
  }
}

export default TodoList;
