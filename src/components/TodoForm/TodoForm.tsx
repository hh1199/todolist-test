import React, { useState } from 'react';
import { TodoTask } from '../../containers/HomePage/HomePage';
import styles from './TodoForm.module.scss';
import CloseIcon from '../../assets/cancel.svg';
import { formatDate } from '../../helpers';
import classNames from 'classnames/bind';
export type Priority = 'Low' | 'Normal' | 'High';
export type ActionForm = 'Add' | 'Update';

const cx = classNames.bind(styles);
export interface TodoFormProps {
  todoTask?: TodoTask;
  action: ActionForm;
  onHide: () => void;
  onSubmit: (task: TodoTask) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({
  todoTask,
  onHide,
  action = 'Add',
  onSubmit,
}: TodoFormProps) => {
  const emptyTask = {
    id: null,
    description: '',
    title: '',
    dueDate: formatDate(new Date()),
    priority: 'Normal',
  };
  const [task, setTask] = useState<any>(todoTask?.title ? todoTask : emptyTask);
  const [error, setError] = useState('');

  const hideModal = () => {
    onHide();
    setTask(emptyTask);
  };

  return (
    <div className={cx('todo-form')}>
      {action === 'Add' && (
        <>
          <div className={cx('close-icon')}>
            <img src={CloseIcon} onClick={() => hideModal()} alt="close-icon" />
          </div>
          <h2 className={cx('form-title')}> New Task</h2>
        </>
      )}
      <div className={cx('form-content')}>
        <input
          className={cx('form-input')}
          placeholder="Add new task..."
          value={task?.title}
          onChange={(event) => {
            setTask({ ...task, title: event.target.value });
            setError('');
          }}
          maxLength={255}
        />
        <div className={cx('form-description-header')}>Descriptions</div>
        <textarea
          className={cx('form-description')}
          value={task?.description}
          onChange={(event) =>
            setTask({ ...task, description: event.target.value })
          }
          maxLength={1000}
        />
        <div className={cx('form-content-footer')}>
          <div className={cx('due-date')}>
            <div className={cx('due-date-label')}>Due Date</div>
            <input
              className={cx('select-date')}
              type="date"
              value={
                task?.dueDate
                  ? formatDate(new Date(task?.dueDate))
                  : formatDate(new Date())
              }
              min={formatDate(new Date())}
              onChange={(event) =>
                setTask({ ...task, dueDate: event.target.value })
              }
            />
          </div>
          <div className={cx('priority')}>
            <div className={cx('priority-label')}>Priority</div>
            <select
              className={cx('select-priority')}
              onChange={(event) =>
                setTask({
                  ...task,
                  priority: event.target.value as Priority,
                })
              }
              value={task?.priority}
            >
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        <div className={cx('error')}>{error}</div>
      </div>
      <button
        className={cx('btn-submit')}
        onClick={() => {
          if (task.title) {
            action === 'Add' && hideModal();
            onSubmit(task);
          } else {
            setError('You must enter task title!');
          }
        }}
      >
        {action}
      </button>
    </div>
  );
};

export default TodoForm;
