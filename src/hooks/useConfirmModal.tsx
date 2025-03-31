import { useState } from "react";
import ConfirmModal from "@/components/modal/ConfirmModal";

type ConfirmModalState = {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
};

export default function useConfirmModal() {
  const [modalState, setModalState] = useState<ConfirmModalState | null>(null);

  const confirm = ({
    title,
    message,
    onConfirm,
  }: {
    title: string;
    message: string;
    onConfirm: () => void;
  }) => {
    setModalState({ open: true, title, message, onConfirm });
  };

  const Modal = modalState ? (
    <ConfirmModal
      open={modalState.open}
      title={modalState.title}
      message={modalState.message}
      onConfirm={() => {
        modalState.onConfirm();
        setModalState(null);
      }}
      onCancel={() => setModalState(null)}
    />
  ) : null;

  return { confirm, Modal };
}
