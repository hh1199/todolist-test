import React, { useEffect } from 'react';
import { getScrollbarWidth } from '../../../helpers';
import styles from './Modal.module.scss';
import Overlay from '../Overlay';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
export interface ModalProps {
  show: boolean;
  onHide: () => void;
  children: React.ReactNode;
}

const Modal: React.FunctionComponent<ModalProps> = ({
  show,
  onHide,
  children,
}: ModalProps) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (show) {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${getScrollbarWidth()}px`;
      } else {
        document.body.style.overflow = 'unset';
        document.body.style.paddingRight = 'unset';
      }
    }
  }, [show]);
  if (!show) return null;
  return (
    <Overlay show={show} onEscPressed={onHide}>
      <div className={cx('backdrop')} onClick={onHide} />
      <div className={cx('modal-content')}>{children}</div>
    </Overlay>
  );
};

export default Modal;
