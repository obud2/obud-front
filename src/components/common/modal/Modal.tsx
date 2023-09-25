import React, { useEffect, useRef } from 'react';
import reactDom from 'react-dom';

import { SModal } from './Modal.styled';
import { ModalProps } from './Modal.props';

/**
 *
 * @param {boolean} open : 모달 Open
 * @param {boolean} close : 모달 Close
 * @param {boolean} disableEnforceFocus : 모달 백 클릭
 * @returns 모달
 */
const Modal: React.FC<ModalProps> = ({ open, close, disableEnforceFocus, children }) => {
  const modalRef = useRef<any>('');

  useEffect(() => {
    bodyHiddenToggle(open);
  }, [open]);

  const bodyHiddenToggle = (toggle: boolean) => {
    const body: any = document.querySelector('body');

    if (toggle) {
      body.classList.add('modal-hidden');
    } else {
      body.classList.remove('modal-hidden');
    }
  };

  const onClickClose = (e: any) => {
    if (modalRef?.current !== e.target) return;

    if (!disableEnforceFocus) {
      close();
    }
  };

  return (
    open &&
    reactDom.createPortal(
      <SModal open={open}>
        <div className="modal-background" ref={modalRef} onClick={onClickClose}>
          <div className="modal-container">{children}</div>
        </div>
      </SModal>,
      document?.getElementById('__portal') as HTMLElement,
    )
  );
};

export default Modal;
