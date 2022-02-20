import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  #modal-background {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(12, 9, 16, 0.7);
    z-index: 1001;
  }

  #modal-content {
    position: absolute;
    background-color: transparent;
    z-index: 1002;
  }
`

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
      setValue(modalRef.current);
    }, [])

    return (
      <>
        <ModalContext.Provider value={value}>
          {children}
        </ModalContext.Provider>
        <div ref={modalRef} />
      </>
    );
  }

  export function Modal({ onClose, children }) {
    const modalNode = useContext(ModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <ModalWrapper>
            <div id="modal-background" onClick={onClose} />
            <div id="modal-content">
              {children}
            </div>
        </ModalWrapper>,
      modalNode
    );
  }
