import { X } from "lucide-preact";
import type { ComponentChildren } from "preact";
import { useEffect, useRef } from "preact/hooks";

interface DialogProps {
  title: string;
  eyebrow: string;
  onClose: () => void;
  children: ComponentChildren;
  className?: string;
}

export function Dialog({
  title,
  eyebrow,
  onClose,
  children,
  className = "",
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement;
    document.body.classList.add("dialog-open");
    dialog?.showModal();
    dialog?.querySelector<HTMLElement>("[data-initial-focus]")?.focus();
    return () => {
      dialog?.close();
      document.body.classList.remove("dialog-open");
      if (previous instanceof HTMLElement && previous.isConnected)
        previous.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog
      ref={ref}
      className={`sheet ${className}`}
      aria-labelledby="sheet-title"
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          onClose();
        }
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          onClose();
      }}
    >
      <div className="sheet-header">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2 id="sheet-title">{title}</h2>
        </div>
        <button
          type="button"
          className="icon-button close-button"
          aria-label="关闭"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>
      <div className="sheet-content">{children}</div>
    </dialog>
  );
}
