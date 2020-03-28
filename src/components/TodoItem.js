import React from "react";
import { Checkbox, Icon, List } from "semantic-ui-react";
import "./component.css";

class TodoItem extends React.Component {
  render() {
    return (
      <List.Item>
        <List.Content floated="right">
          <Icon name="trash" />
        </List.Content>
        <Checkbox
          label={this.props.text}
          onChange={() => this.props.checkItem(this.props.id)}
        />
      </List.Item>
    );
  }
}

export default TodoItem;
