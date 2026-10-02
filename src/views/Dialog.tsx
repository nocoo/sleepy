import { X } from "lucide-preact";
import type { ComponentChildren } from "preact";
import { useLayoutEffect, useRef } from "preact/hooks";

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
  useLayoutEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement;
    document.body.classList.add("dialog-open");
    dialog?.showModal();
    return () => {
      dialog?.close();
      document.body.classList.remove("dialog-open");
      if (previous instanceof HTMLElement && previous.isConnected)
        previous.focus({ preventScroll: true });
    };
  }, []);

  useLayoutEffect(() => {
    if (!title) return;
    const dialog = ref.current;
    const first =
      dialog?.querySelector<HTMLElement>("[data-initial-focus]") ||
      dialog?.querySelector<HTMLElement>("button");
    first?.focus();
  }, [title]);

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
        if (event.key === "Tab") {
          const controls = [
            ...event.currentTarget.querySelectorAll<HTMLElement>(
              'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), summary, [tabindex]:not([tabindex="-1"])',
            ),
          ].filter((element) => element.getClientRects().length > 0);
          if (controls.length) {
            event.preventDefault();
            const focused = document.activeElement;
            const active =
              focused instanceof HTMLElement ? controls.indexOf(focused) : -1;
            const next = event.shiftKey
              ? active <= 0
                ? controls.length - 1
                : active - 1
              : (active + 1) % controls.length;
            controls[next]?.focus();
          }
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
