import { Fragment } from 'react';
import classes from './Modal.module.css'
import { createPortal } from 'react-dom';

const Backdrop = (props) => {
  return <div onClick={props.closeModal} className={classes.backdrop} />
}

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  )
}

const portalElement = document.getElementById('overlays')

const Modal = (props) => {
  return (
    <Fragment>
      {createPortal(<Backdrop closeModal={props.closeModal} />, portalElement)}
      {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
  )
}

export default Modal;