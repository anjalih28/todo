import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Icon, List } from 'semantic-ui-react';
import './component.css';

const TodoItem = (prop) => {
  const { task, checkItem, deleteItem } = prop;
  const checkboxClass = task.active ? '' : 'task-complete';
  const defaultChecked = !task.active;
  return (
    <List.Item>
      <List.Content floated="right">
        <Icon name="trash" onClick={() => deleteItem(task.id)} />
      </List.Content>
      <Checkbox
        label={task.text}
        className={checkboxClass}
        defaultChecked={defaultChecked}
        onChange={() => checkItem(task.id)}
      />
    </List.Item>
  );
};

TodoItem.propTypes = {
  task: PropTypes.shape({
    text: PropTypes.string,
    active: PropTypes.bool,
    id: PropTypes.instanceOf(Date),
  }).isRequired,
  checkItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default TodoItem;
