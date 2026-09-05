import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";
import {
  Button,
  ConfirmDialog,
  EmptyState,
  ImageUploader,
  Modal,
  PageHeader,
  Spinner,
  TextArea,
  TextInput,
  Toggle,
} from "./ui";
import {
  deleteImage,
  deleteRow,
  insertRow,
  listRows,
  swapSortOrder,
  updateRow,
} from "../api";
import { cn } from "../../utils/cn";

/* Baris tabel konten minimal: urut & aktif. Kolom lain bebas. */
interface SortableRow {
  id: string;
  sort_order: number;
  is_active: boolean;
}

type FormState = Record<string, string | null>;

export interface CrudFieldDef {
  /** Nama kolom di Supabase sekaligus kunci form. */
  key: string;
  label: string;
  type: "text" | "textarea" | "image" | "datalist";
  required?: boolean;
  placeholder?: string;
  hint?: string;
  /** Untuk type "datalist": saran pilihan dari baris yang sudah ada. */
  options?: (rows: unknown[]) => string[];
  /** Untuk type "image": rasio pratinjau. */
  aspect?: string;
}

type UploadFolder = "products" | "gallery" | "testimonials";

interface CrudPageProps<T extends SortableRow> {
  table: string;
  entityLabel: string;
  title: string;
  description: string;
  /** Folder Storage untuk field bertipe image; wajib hanya bila ada field image. */
  folder?: UploadFolder;
  fields: CrudFieldDef[];
  rowTitle: (row: T) => string;
  rowSubtitle?: (row: T) => string | null | undefined;
  rowImage?: (row: T) => string | null | undefined;
}

const iconButton =
  "flex h-8 w-8 items-center justify-center rounded-lg text-[#9CA3AF] transition-colors hover:bg-[#F3F4F6] hover:text-[#111827] disabled:cursor-not-allowed disabled:opacity-30";

function errMessage(err: unknown): string {
  return err instanceof Error ? err.message : "Terjadi kesalahan tak terduga.";
}

export default function CrudPage<T extends SortableRow>({
  table,
  entityLabel,
  title,
  description,
  folder,
  fields,
  rowTitle,
  rowSubtitle,
  rowImage,
}: CrudPageProps<T>) {
  const [rows, setRows] = useState<T[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<T | null>(null);
  const [form, setForm] = useState<FormState>({});
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<T | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [rowBusy, setRowBusy] = useState<string | null>(null);

  const imageKey = fields.find((f) => f.type === "image")?.key;

  const load = useCallback(async () => {
    try {
      const data = await listRows<T>(table);
      setRows(data);
      setLoadError(null);
    } catch (err) {
      setLoadError(errMessage(err));
      setRows([]);
    }
  }, [table]);

  useEffect(() => {
    void load();
  }, [load]);

  function openCreate() {
    setEditing(null);
    const initial: FormState = {};
    for (const f of fields) initial[f.key] = f.type === "image" ? null : "";
    setForm(initial);
    setModalOpen(true);
  }

  function openEdit(row: T) {
    setEditing(row);
    const initial: FormState = {};
    const record = row as unknown as Record<string, unknown>;
    for (const f of fields) initial[f.key] = (record[f.key] as string | null) ?? null;
    setForm(initial);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditing(null);
  }

  async function handleSave() {
    for (const f of fields) {
      if (f.required && !form[f.key]?.trim()) {
        toast.error(`"${f.label}" wajib diisi.`);
        return;
      }
    }
    setSaving(true);
    try {
      if (editing) {
        await updateRow(table, editing.id, form);
        const oldImage = rowImage?.(editing);
        if (imageKey && oldImage && oldImage !== form[imageKey]) {
          void deleteImage(oldImage);
        }
        toast.success(`${entityLabel} diperbarui.`);
      } else {
        await insertRow(table, {
          ...form,
          sort_order: rows?.length ?? 0,
          is_active: true,
        });
        toast.success(`${entityLabel} ditambahkan.`);
      }
      closeModal();
      await load();
    } catch (err) {
      toast.error(errMessage(err));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleting) return;
    setDeleteBusy(true);
    try {
      await deleteRow(table, deleting.id);
      if (imageKey) void deleteImage(rowImage?.(deleting));
      toast.success(`${entityLabel} dihapus.`);
      setDeleting(null);
      await load();
    } catch (err) {
      toast.error(errMessage(err));
    } finally {
      setDeleteBusy(false);
    }
  }

  async function handleMove(index: number, dir: -1 | 1) {
    if (!rows) return;
    const neighbor = rows[index + dir];
    if (!neighbor) return;
    const row = rows[index];
    const next = [...rows];
    next[index] = neighbor;
    next[index + dir] = row;
    setRows(next);
    setRowBusy(row.id);
    try {
      await swapSortOrder(table, row, neighbor);
    } catch (err) {
      toast.error(errMessage(err));
      await load();
    } finally {
      setRowBusy(null);
    }
  }

  async function handleToggle(row: T, next: boolean) {
    setRows((cur) =>
      cur ? cur.map((r) => (r.id === row.id ? { ...r, is_active: next } : r)) : cur,
    );
    setRowBusy(row.id);
    try {
      await updateRow(table, row.id, { is_active: next });
      toast.success(next ? "Ditampilkan di website." : "Disembunyikan dari website.");
    } catch (err) {
      toast.error(errMessage(err));
      await load();
    } finally {
      setRowBusy(null);
    }
  }

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        action={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" /> Tambah {entityLabel}
          </Button>
        }
      />

      {rows === null ? (
        <Spinner />
      ) : loadError ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-[#7a4d05]">
          Gagal memuat data: {loadError}
        </div>
      ) : rows.length === 0 ? (
        <EmptyState
          title={`Belum ada ${entityLabel.toLowerCase()}`}
          description={`Tambahkan ${entityLabel.toLowerCase()} pertama — akan langsung tampil di website.`}
          action={
            <Button onClick={openCreate}>
              <Plus className="h-4 w-4" /> Tambah {entityLabel}
            </Button>
          }
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#F3F4F6] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          <ul className="divide-y divide-[#F3F4F6]">
            {rows.map((row, i) => (
              <li key={row.id} className="flex items-center gap-4 px-5 py-4">
                {rowImage && (
                  <img
                    src={rowImage(row) ?? ""}
                    alt=""
                    className="h-14 w-20 shrink-0 rounded-lg border border-[#F3F4F6] bg-[#F9FAFB] object-cover"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#111827]">
                    {rowTitle(row)}
                  </p>
                  {rowSubtitle && (
                    <p className="mt-0.5 line-clamp-1 text-xs leading-relaxed text-[#6B7280]">
                      {rowSubtitle(row)}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <button
                    className={iconButton}
                    aria-label="Naikkan posisi"
                    disabled={i === 0 || rowBusy === row.id}
                    onClick={() => handleMove(i, -1)}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    className={iconButton}
                    aria-label="Turunkan posisi"
                    disabled={i === rows.length - 1 || rowBusy === row.id}
                    onClick={() => handleMove(i, 1)}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <span className="mx-1 hidden sm:block">
                    <Toggle
                      checked={row.is_active}
                      disabled={rowBusy === row.id}
                      onChange={(next) => handleToggle(row, next)}
                    />
                  </span>
                  <button
                    className={iconButton}
                    aria-label="Ubah"
                    onClick={() => openEdit(row)}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    className={cn(iconButton, "hover:bg-red-50 hover:text-red-600")}
                    aria-label="Hapus"
                    onClick={() => setDeleting(row)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? `Ubah ${entityLabel}` : `Tambah ${entityLabel}`}
        wide
        footer={
          <>
            <Button variant="secondary" onClick={closeModal} disabled={saving}>
              Batal
            </Button>
            <Button onClick={handleSave} loading={saving}>
              Simpan
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          {fields.map((f) => {
            const value = form[f.key] ?? "";
            const setValue = (v: string | null) =>
              setForm((cur) => ({ ...cur, [f.key]: v }));
            const listId = `datalist-${f.key}`;
            return (
              <div key={f.key}>
                {f.type === "image" ? (
                  <>
                    <span className="mb-1.5 block text-sm font-medium text-[#111827]">
                      {f.label}
                      {f.required && <span className="ml-0.5 text-brand-red">*</span>}
                    </span>
                    <ImageUploader
                      value={form[f.key] ?? null}
                      onChange={setValue}
                      folder={folder ?? "products"}
                      aspect={f.aspect ?? "aspect-[4/3]"}
                    />
                  </>
                ) : (
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-[#111827]">
                      {f.label}
                      {f.required && <span className="ml-0.5 text-brand-red">*</span>}
                    </span>
                    {f.type === "textarea" ? (
                      <TextArea
                        required={f.required}
                        value={value}
                        placeholder={f.placeholder}
                        onChange={(e) => setValue(e.target.value)}
                      />
                    ) : (
                      <>
                        <TextInput
                          required={f.required}
                          value={value}
                          placeholder={f.placeholder}
                          list={f.type === "datalist" ? listId : undefined}
                          onChange={(e) => setValue(e.target.value)}
                        />
                        {f.type === "datalist" && rows && (
                          <datalist id={listId}>
                            {[...new Set(f.options?.(rows) ?? [])].map((opt) => (
                              <option key={opt} value={opt} />
                            ))}
                          </datalist>
                        )}
                      </>
                    )}
                    {f.hint && (
                      <span className="mt-1 block text-xs text-[#9CA3AF]">{f.hint}</span>
                    )}
                  </label>
                )}
              </div>
            );
          })}
        </div>
      </Modal>

      <ConfirmDialog
        open={deleting !== null}
        title={`Hapus ${entityLabel.toLowerCase()}?`}
        message={
          deleting
            ? `"${rowTitle(deleting)}" akan dihapus permanen dari website. Tindakan ini tidak bisa dibatalkan.`
            : ""
        }
        busy={deleteBusy}
        onConfirm={handleDelete}
        onClose={() => setDeleting(null)}
      />
    </div>
  );
}
