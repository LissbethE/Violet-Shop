import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';

import { useOutsideClick } from '../hooks/useOutsideClick';
import BtnHover from './BtnHover';

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="overlay">
      <div ref={ref} className="modal">
        <BtnHover onClick={close} modal="modal">
          <svg className="btnHover__icon products__icon">
            <use xlinkHref="/img/sprite.svg#icon-cross"></use>
          </svg>
        </BtnHover>

        {cloneElement(children, { onCloseModal: close })}
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export function useClose() {
  const { close } = useContext(ModalContext);

  return close;
}

export default Modal;
