import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { ImagePlus, Loader2, TriangleAlert, UploadCloud, X } from "lucide-react";
import { cn } from "../../utils/cn";
import { uploadImage } from "../api";

/* ---------------- Tombol ---------------- */

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-red text-white shadow-sm shadow-brand-red/20 hover:bg-[#9c0e03] active:scale-[0.98]",
  secondary:
    "border border-[#E5E7EB] bg-white text-[#111827] hover:border-brand-red/40 hover:text-brand-red active:scale-[0.98]",
  danger: "bg-red-50 text-red-600 hover:bg-red-100 active:scale-[0.98]",
  ghost: "text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827]",
};

export function Button({
  variant = "primary",
  className,
  loading,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  loading?: boolean;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60",
        buttonVariants[variant],
        className,
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}

/* ---------------- Form ---------------- */

export function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-[#111827]">
        {label}
        {required && <span className="ml-0.5 text-brand-red">*</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-[#9CA3AF]">{hint}</span>}
    </label>
  );
}

const inputClasses =
  "w-full rounded-xl border border-[#E5E7EB] bg-white px-3.5 py-2.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] transition-colors focus:border-brand-red/50 focus:outline-none focus:ring-2 focus:ring-brand-red/15 disabled:bg-[#F9FAFB]";

export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(inputClasses, className)} {...props} />;
}

export function TextArea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(inputClasses, "min-h-24 resize-y leading-relaxed", className)} {...props} />;
}

export function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 disabled:opacity-50",
        checked ? "bg-brand-red" : "bg-[#D1D5DB]",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200",
          checked ? "left-[22px]" : "left-0.5",
        )}
      />
    </button>
  );
}

/* ---------------- Modal & dialog konfirmasi ---------------- */

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "flex max-h-[90vh] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl",
          wide ? "max-w-2xl" : "max-w-lg",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#F3F4F6] px-6 py-4">
          <h2 className="font-display text-lg font-bold text-[#111827]">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7280] transition-colors hover:bg-[#F3F4F6] hover:text-[#111827]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
        {footer && (
          <div className="flex justify-end gap-3 border-t border-[#F3F4F6] bg-[#FAFAFA] px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Hapus",
  busy,
  onConfirm,
  onClose,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  busy?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={busy}>
            Batal
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={busy}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50">
          <TriangleAlert className="h-5 w-5 text-red-500" />
        </div>
        <p className="pt-1.5 text-sm leading-relaxed text-[#4B5563]">{message}</p>
      </div>
    </Modal>
  );
}

/* ---------------- Struktur halaman ---------------- */

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-[#111827]">
          {title}
        </h1>
        {description && <p className="mt-1 text-sm text-[#6B7280]">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E5E7EB] bg-white px-6 py-16 text-center">
      <ImagePlus className="h-10 w-10 text-[#D1D5DB]" />
      <h3 className="mt-4 font-display text-base font-semibold text-[#111827]">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-[#6B7280]">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Spinner({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center py-20", className)}>
      <Loader2 className="h-6 w-6 animate-spin text-brand-red" />
    </div>
  );
}

export function SetupNotice({ message }: { message: string }) {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-amber-200 bg-amber-50 p-6">
      <div className="flex items-start gap-3">
        <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
        <div>
          <h2 className="font-display font-bold text-[#111827]">Supabase belum terhubung</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-[#6B7280]">{message}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Pengunggah gambar ---------------- */

export function ImageUploader({
  value,
  onChange,
  folder,
  aspect = "aspect-[4/3]",
}: {
  value: string | null;
  onChange: (url: string | null) => void;
  folder: "products" | "gallery" | "testimonials";
  aspect?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) void handleFile(file);
        }}
      />
      <div
        role="button"
        tabIndex={0}
        aria-label="Pilih gambar"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
        className={cn(
          "group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[#E5E7EB] bg-[#F9FAFB] transition-colors hover:border-brand-red/50",
          aspect,
        )}
      >
        {value ? (
          <>
            <img src={value} alt="Pratinjau" className="h-full w-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="flex items-center gap-2 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-[#111827]">
                <UploadCloud className="h-4 w-4" /> Ganti gambar
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-[#9CA3AF]">
            <UploadCloud className="h-8 w-8" />
            <span className="text-sm font-medium">Klik untuk pilih gambar</span>
            <span className="text-xs">PNG/JPG — otomatis dikonversi ke WebP</span>
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          </div>
        )}
      </div>
    </div>
  );
}
