"use client";

import { useEffect, useRef } from "react";
import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onCancel={onClose}
      onClick={(e) => {
        // a click landing on the <dialog> element itself (not its content) is a backdrop click
        if (e.target === dialogRef.current) onClose();
      }}
      aria-label={title}
      className="m-auto w-full max-w-sm rounded-2xl border border-zinc-100 bg-white p-6 shadow-xl backdrop:bg-zinc-900/40 backdrop:backdrop-blur-sm"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-8 w-8 items-center justify-center rounded-full text-lg leading-none text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
        >
          &times;
        </button>
      </div>
      {children}
    </dialog>
  );
}
