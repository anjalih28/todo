import React from "react";
import { Checkbox, Icon, List } from "semantic-ui-react";
import "./component.css";

class TodoItem extends React.Component {
  render() {
    const checkboxClass = this.props.task.active ? "" : "task-complete";
    const defaultChecked = this.props.task.active ? false : true;
    return (
      <List.Item>
        <List.Content floated="right">
          <Icon
            name="trash"
            onClick={() => this.props.deleteItem(this.props.task.id)}
          />
        </List.Content>
        <Checkbox
          label={this.props.task.text}
          className={checkboxClass}
          defaultChecked={defaultChecked}
          onChange={() => this.props.checkItem(this.props.task.id)}
        />
      </List.Item>
    );
  }
}

export default TodoItem;
