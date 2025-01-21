import { useState, useCallback } from "react";
import Modal from "@/components/modal/Modal";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return { isOpen, openModal, closeModal, Modal };
};
