import React from "react";

class TodoItem extends React.Component {
  render() {
    return (
      <div className="item" id={this.props.id}>
        <div className="right floated content">
          <i className="trash icon"></i>
        </div>
        <div className="ui checkbox">
          <input type="checkbox" name="example" />
          <label>{this.props.task}</label>
        </div>
      </div>
    );
  }
}

export default TodoItem;
