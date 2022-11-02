import React from 'react';
import styles from './ActionBox.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
export interface ActionBoxProps {
  content: string;
  leftBtnName: string;
  rightBtnName: string;
  leftAction: () => void;
  rightAction: () => void;
}
const ActionBox: React.FC<ActionBoxProps> = ({
  content,
  leftBtnName,
  rightBtnName,
  leftAction,
  rightAction,
}: ActionBoxProps) => {
  return (
    <div className={cx('action-box')}>
      <div className={cx('content')}>{content}</div>
      <div className={cx('action')}>
        <button
          className={cx('btn', 'left-action')}
          onClick={() => leftAction()}
        >
          {leftBtnName}
        </button>
        <button
          className={cx('btn', 'right-action')}
          onClick={() => rightAction()}
        >
          {rightBtnName}
        </button>
      </div>
    </div>
  );
};

export default ActionBox;
