import classNames from 'classnames/bind';
import React from 'react';
import { TodoTask } from '../../containers/HomePage/HomePage';
import TodoForm from '../TodoForm';
import styles from './TodoItem.module.scss';

const cx = classNames.bind(styles);
export interface TodoItemProps {
  todoTask: TodoTask;
  expandId?: string;
  onHide: () => void;
  onClick: (todoTask: TodoTask) => void;
  onSubmit: (task: TodoTask) => void;
  removeTask: (id: string) => void;
  viewTaskDetail: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todoTask,
  expandId,
  onHide,
  onClick,
  onSubmit,
  removeTask,
  viewTaskDetail,
}: TodoItemProps) => {
  return (
    <>
      <div className={cx('todo-item')}>
        <div className={cx('block-left')}>
          <input
            onClick={() => onClick(todoTask)}
            type="checkbox"
            name="checkbox-item"
            id={todoTask.id}
            className={cx('checkbox')}
          />
          <div
            className={cx('task-name', `${todoTask.isDone ? 'done-task' : ''}`)}
          >
            {todoTask.title}
          </div>
        </div>
        <div className={cx('block-right')}>
          <button
            className={cx('btn', 'btn-detail')}
            onClick={() => viewTaskDetail(todoTask.id)}
          >
            Detail
          </button>
          <button
            className={cx('btn', 'btn-remove')}
            onClick={() => removeTask(todoTask.id)}
          >
            Remove
          </button>
        </div>
      </div>
      {expandId === todoTask.id && (
        <TodoForm
          onHide={onHide}
          todoTask={todoTask}
          onSubmit={onSubmit}
          action="Update"
        />
      )}
    </>
  );
};

export default TodoItem;
