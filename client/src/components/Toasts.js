import React, { useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function Toasts({ show, onHide }) {
  useEffect(() => {
    let timer;
    if (show) {
      timer = setTimeout(() => {
        onHide(true);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [show, onHide]);

  return (
    <ToastContainer position={'top-center'}>
      <Toast show={show}>
        <Toast.Body className="text-center">Successfull added</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default Toasts;