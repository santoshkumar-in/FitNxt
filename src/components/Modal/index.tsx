"use client";
import Modal from "react-modal";

Modal.setAppElement(document.body);
interface ModalProps {
  children: React.ReactNode;
  modalIsOpen: boolean;
}

const FitNxtModal = ({ children, modalIsOpen }: ModalProps) => {
  return (
    <Modal
      portalClassName="fitnxt-modal-container"
      className="w-full max-w-142.5 rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark md:px-17.5 md:py-15"
      overlayClassName="fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 block"
      isOpen={modalIsOpen}
      contentLabel="Example Modal"
    >
      {children}
    </Modal>
  );
};

export default FitNxtModal;
