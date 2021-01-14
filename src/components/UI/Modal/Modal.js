import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Backdrop from "./Backdrop/Backdrop";

const WrappedModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: ${({ opened }) =>
    opened ? "translate(-50%, -50%)" : "translate(-50%, -100%)"};
  width: 100%;
  max-width: 50rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 3rem;
  box-shadow: 0 0.5rem 3.5rem var(--shadow);
  border-radius: 1rem;
  background-color: var(--color-mainLighter);
  opacity: ${({ opened }) => (opened ? "1" : "0")};
  visibility: ${({ opened }) => (opened ? "visible" : "hidden")};
  transition: all 0.1s;
  z-index: 100;
`;

const Modal = ({ opened, close, children }) => {
  return ReactDOM.createPortal(
    <>
      <Backdrop close={close} opened={opened} />
      <WrappedModal opened={opened}>{children}</WrappedModal>
    </>,
    document.getElementById("root-modal")
  );
};
export default Modal;
