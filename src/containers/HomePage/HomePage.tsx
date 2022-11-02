import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ActionBox from '../../components/ActionBox';
import TodoForm from '../../components/TodoForm';
import { Priority } from '../../components/TodoForm/TodoForm';
import TodoItem from '../../components/TodoItem';
import Modal from '../../components/UI/Modal';
import styles from './HomePage.module.scss';

const cx = classNames.bind(styles);

export type Action = 'MarkDone' | 'Remove';
export interface TodoTask {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: Priority;
  isDone: boolean;
}

const HomePage: React.FC = () => {
  const [show, setShow] = useState(false);
  const [expandId, setExpandId] = useState('');
  const [todoTask, setTodoTask] = useState<TodoTask>();
  const [todoList, setTodoList] = useState<Array<TodoTask>>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [todoSearchList, setTodoSearchList] = useState<Array<TodoTask>>([]);
  const [showActionBox, setShowActionBox] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<Array<TodoTask>>([]);
  const [titleActionBox, setTitleActionBox] = useState('');
  const [action, setAction] = useState<Action | undefined>();

  const handleCloseActionBox = (): void => setShowActionBox(false);
  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);
  // handle add/update task
  const onSubmit = (tempTask: TodoTask) => {
    let newTodoList: Array<TodoTask> = [];
    let id;
    if (tempTask && tempTask.title) {
      if (tempTask.id) {
        newTodoList = todoList.filter(
          (task: TodoTask) => task.id !== tempTask.id,
        );

        newTodoList.push(tempTask);
      } else {
        id = uuidv4();
        const isDone = false;
        newTodoList = todoList;
        newTodoList.push({ ...tempTask, id, isDone });
      }
      newTodoList.sort(
        (taskA: TodoTask, taskB: TodoTask) =>
          new Date(taskA.dueDate).valueOf() - new Date(taskB.dueDate).valueOf(),
      );
      setTodoList(newTodoList);
      updateTodoList(newTodoList);
      setTodoTask(undefined);
      setExpandId('');
    }
  };
  const onClickTask = (todoTask: TodoTask) => {
    let selectedTask = selectedTasks.find(
      (task: TodoTask) => task.id === todoTask.id,
    );
    if (selectedTask) {
      setSelectedTasks(
        selectedTasks.filter((task: TodoTask) => task.id !== todoTask.id),
      );
    } else {
      setSelectedTasks([...selectedTasks, ...[todoTask]]);
    }
  };

  const updateTodoList = (todoList: Array<TodoTask>) => {
    setTodoSearchList(todoList);
    localStorage.setItem('todoList', JSON.stringify(todoList));
  };

  const handleShowActionBox = (title: string) => {
    if (!!selectedTasks.length) {
      setTitleActionBox(title);
      setShowActionBox(true);
    }
  };

  // Remove all selected tasks
  const onRemoveSelectedTasks = () => {
    let newTodoList = Array.from(todoList);
    selectedTasks.forEach((selectedTask: TodoTask) => {
      newTodoList = newTodoList.filter(
        (task: TodoTask) => task.id !== selectedTask.id,
      );
    });
    setTodoList(newTodoList);
    setSelectedTasks([]);
    setShowActionBox(false);
  };
  // mark done all selected tasks
  const onMarkAsDoneTask = () => {
    let newTodoList = Array.from(todoList);
    selectedTasks.forEach((selectedTask: TodoTask) => {
      newTodoList = newTodoList.filter(
        (task: TodoTask) => task.id !== selectedTask.id,
      );
      const newTask = { ...selectedTask, isDone: true };
      newTodoList.push(newTask);
    });
    newTodoList.sort(
      (taskA: TodoTask, taskB: TodoTask) =>
        new Date(taskA.dueDate).valueOf() - new Date(taskB.dueDate).valueOf(),
    );
    setTodoList(newTodoList);
    setShowActionBox(false);
  };
  // view detail one task
  const onViewDetail = (id: string) => {
    setExpandId(expandId === id ? '' : id);
  };
  // remove one task
  const onRemoveItem = (id: string) => {
    setTodoList(todoList.filter((task: TodoTask) => task.id !== id));
    setSelectedTasks(selectedTasks.filter((task: TodoTask) => task.id !== id));
  };
  useEffect(() => {
    if (typeof window !== undefined) {
      const localTodoList = localStorage.getItem('todoList');
      if (localTodoList) {
        setTodoList(JSON.parse(localTodoList));
        setTodoSearchList(JSON.parse(localTodoList));
      }
    }
  }, []);

  useEffect(() => {
    if (searchKeyword.trim() !== '') {
      setTodoSearchList(
        todoList.filter((task: TodoTask) =>
          task.title.includes(searchKeyword.trim()),
        ),
      );
    } else {
      setTodoSearchList(todoList);
    }
  }, [searchKeyword, todoList]);

  useEffect(() => {
    updateTodoList(todoList);
  }, [todoList]);

  return (
    <>
      <div className={cx('home-page')}>
        <div className={cx('display-area')}>
          <h2 className={cx('title')}>To Do List</h2>
          <div className={cx('top-feature')}>
            <button
              className={cx('btn', 'add-new-task')}
              onClick={() => handleShow()}
            >
              Add New Task
            </button>
            <div className={cx('btn-block-right')}>
              <button
                className={cx('btn','btn-mark-done')}
                onClick={() => {
                  setAction('MarkDone');
                  handleShowActionBox('Mark all selected tasks as done?');
                }}
              >
                Mark As Done
              </button>
              <button
                className={cx('btn', 'btn-remove')}
                onClick={() => {
                  setAction('Remove');
                  handleShowActionBox('Delete all selected tasks?');
                }}
              >
                Remove
              </button>
            </div>
          </div>

          <div className={cx('search')}>
            <input
              className={cx('input-search')}
              placeholder="Search..."
              value={searchKeyword}
              onChange={(event) => setSearchKeyword(event.target.value)}
              maxLength={255}
            ></input>
          </div>
          <div className={cx('task-list')}>
            {!!todoSearchList.length ? (
              todoSearchList.map((task: TodoTask) => (
                <TodoItem
                  onSubmit={onSubmit}
                  onHide={handleClose}
                  key={task.id}
                  expandId={expandId}
                  onClick={onClickTask}
                  todoTask={task}
                  viewTaskDetail={onViewDetail}
                  removeTask={onRemoveItem}
                >
                  {task.title} - {task.id} - {task.dueDate}
                </TodoItem>
              ))
            ) : (
              <div className={cx('status-empty')}>Your task not found</div>
            )}
          </div>
        </div>
        {showActionBox && (
          <ActionBox
            content={titleActionBox}
            leftBtnName={action === 'MarkDone' ? 'Done' : 'Remove'}
            rightBtnName="Cancel"
            leftAction={
              action === 'MarkDone' ? onMarkAsDoneTask : onRemoveSelectedTasks
            }
            rightAction={handleCloseActionBox}
          />
        )}
      </div>
      <Modal show={show} onHide={handleClose}>
        <TodoForm
          onHide={handleClose}
          todoTask={todoTask}
          onSubmit={onSubmit}
          action="Add"
        />
      </Modal>
    </>
  );
};

export default HomePage;
