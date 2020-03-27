import React from "react";
import { Checkbox, Icon, List } from "semantic-ui-react";

class TodoItem extends React.Component {
  render() {
    console.log(this.props.taskDetails);
    return (
      <List.Item>
        <List.Content floated="right">
          <Icon name="trash" />
        </List.Content>
        <Checkbox label={this.props.text} />
      </List.Item>
    );
  }
}

export default TodoItem;
