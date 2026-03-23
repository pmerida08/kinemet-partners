import {
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  type FormEvent,
} from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  LogOut,
  Users,
  ChevronDown,
  AlertTriangle,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import {
  supabase,
  type Cliente,
  type Estado,
  type Prioridad,
} from "./lib/supabase";

// ─── Constants ──────────────────────────────────────────────────────────────

const ESTADOS: Estado[] = [
  "Nuevo",
  "Confirmado",
  "Contactado",
  "Reunión",
  "Finalizado",
];

const PRIORIDADES: Prioridad[] = ["Alta", "Media", "Baja"];

const estadoColors: Record<Estado, string> = {
  Nuevo: "bg-slate-100 text-slate-700",
  Confirmado: "bg-cyan-100 text-cyan-700",
  Contactado: "bg-blue-100 text-blue-700",
  Reunión: "bg-indigo-100 text-indigo-700",
  Finalizado: "bg-emerald-100 text-emerald-700",
};

const prioridadColors: Record<Prioridad, string> = {
  Alta: "bg-red-100 text-red-700 border border-red-200",
  Media: "bg-amber-100 text-amber-700 border border-amber-200",
  Baja: "bg-green-100 text-green-700 border border-green-200",
};

// ─── Empty form ──────────────────────────────────────────────────────────────

const emptyForm = (): Omit<Cliente, "id" | "created_at"> => ({
  nombre: "",
  empresa: "",
  telefono: "",
  email: "",
  descripcion: "",
  estado: "Nuevo",
  prioridad: "Media",
});

// ─── Modal ───────────────────────────────────────────────────────────────────

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ title, onClose, children }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,20,50,0.55)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 transition-colors rounded-lg p-1 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ─── Cliente Form ─────────────────────────────────────────────────────────────

interface ClienteFormProps {
  initial: Omit<Cliente, "id" | "created_at">;
  onSave: (data: Omit<Cliente, "id" | "created_at">) => Promise<void>;
  onClose: () => void;
  saving: boolean;
}

function ClienteForm({ initial, onSave, onClose, saving }: ClienteFormProps) {
  const [form, setForm] = useState(initial);

  const set = (key: keyof typeof form, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSave(form);
  };

  const inputCls =
    "w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-[#E63946] focus:border-[#E63946] outline-none transition-all text-sm";
  const labelCls =
    "block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className={labelCls}>Nombre *</label>
          <input
            required
            className={inputCls}
            value={form.nombre}
            onChange={(e) => set("nombre", e.target.value)}
            placeholder="Juan Pérez"
          />
        </div>
        <div className="col-span-2">
          <label className={labelCls}>Empresa</label>
          <input
            className={inputCls}
            value={form.empresa ?? ""}
            onChange={(e) => set("empresa", e.target.value)}
            placeholder="Acme Corp"
          />
        </div>
        <div>
          <label className={labelCls}>Teléfono</label>
          <input
            className={inputCls}
            value={form.telefono ?? ""}
            onChange={(e) => set("telefono", e.target.value)}
            placeholder="+34 600 000 000"
            type="tel"
          />
        </div>
        <div>
          <label className={labelCls}>Email</label>
          <input
            className={inputCls}
            value={form.email ?? ""}
            onChange={(e) => set("email", e.target.value)}
            placeholder="juan@empresa.com"
            type="email"
          />
        </div>
        <div className="col-span-2">
          <label className={labelCls}>Descripción / Propósito</label>
          <textarea
            className={inputCls + " resize-none"}
            rows={3}
            value={form.descripcion ?? ""}
            onChange={(e) => set("descripcion", e.target.value)}
            placeholder="Detalles sobre el cliente, objetivo o contexto..."
          />
        </div>
        <div>
          <label className={labelCls}>Estado</label>
          <div className="relative">
            <select
              className={inputCls + " appearance-none pr-10"}
              value={form.estado}
              onChange={(e) => set("estado", e.target.value as Estado)}
            >
              {ESTADOS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </div>
        <div>
          <label className={labelCls}>Prioridad</label>
          <div className="relative">
            <select
              className={inputCls + " appearance-none pr-10"}
              value={form.prioridad}
              onChange={(e) => set("prioridad", e.target.value as Prioridad)}
            >
              {PRIORIDADES.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex-1 px-4 py-3 rounded-xl bg-[#E63946] text-white font-bold text-sm hover:bg-[#c0303c] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {saving ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <CheckCircle2 size={16} />
          )}
          {saving ? "Guardando…" : "Guardar"}
        </button>
      </div>
    </form>
  );
}

// ─── Delete Confirm ──────────────────────────────────────────────────────────

interface DeleteConfirmProps {
  cliente: Cliente;
  onConfirm: () => Promise<void>;
  onClose: () => void;
  deleting: boolean;
}

function DeleteConfirm({
  cliente,
  onConfirm,
  onClose,
  deleting,
}: DeleteConfirmProps) {
  return (
    <Modal title="Eliminar cliente" onClose={onClose}>
      <div className="text-center space-y-5">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle size={32} className="text-red-500" />
        </div>
        <p className="text-slate-700 text-sm leading-relaxed">
          ¿Seguro que quieres eliminar a{" "}
          <span className="font-bold text-slate-900">{cliente.nombre}</span>
          {cliente.empresa ? ` de ${cliente.empresa}` : ""}? Esta acción no se
          puede deshacer.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {deleting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
            {deleting ? "Eliminando…" : "Eliminar"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Toast ───────────────────────────────────────────────────────────────────

interface ToastMsg {
  id: number;
  message: string;
  type: "success" | "error";
}

// ─── CRM Dashboard ───────────────────────────────────────────────────────────

interface CRMDashboardProps {
  onLogout: () => void;
}

export default function CRMDashboard({ onLogout }: CRMDashboardProps) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Cliente | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Cliente | null>(null);

  // Saving / deleting state
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [filterEstado, setFilterEstado] = useState<"" | Estado>("");
  const [filterPrioridad, setFilterPrioridad] = useState<"" | Prioridad>("");

  // Toasts
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  const toast = (message: string, type: "success" | "error" = "success") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  };

  // ── Fetch ──────────────────────────────────────────────────────────────────

  const fetchClientes = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("clientes")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast("Error al cargar los clientes", "error");
    } else {
      setClientes(data as Cliente[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  // ── CRUD ───────────────────────────────────────────────────────────────────

  const handleAdd = async (form: Omit<Cliente, "id" | "created_at">) => {
    setSaving(true);
    const { error } = await supabase.from("clientes").insert([form]);
    setSaving(false);
    if (error) {
      toast("Error al añadir el cliente", "error");
    } else {
      toast("Cliente añadido correctamente");
      setAddOpen(false);
      fetchClientes();
    }
  };

  const handleEdit = async (form: Omit<Cliente, "id" | "created_at">) => {
    if (!editTarget) return;
    setSaving(true);
    const { error } = await supabase
      .from("clientes")
      .update(form)
      .eq("id", editTarget.id);
    setSaving(false);
    if (error) {
      toast("Error al actualizar el cliente", "error");
    } else {
      toast("Cliente actualizado correctamente");
      setEditTarget(null);
      fetchClientes();
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const { error } = await supabase
      .from("clientes")
      .delete()
      .eq("id", deleteTarget.id);
    setDeleting(false);
    if (error) {
      toast("Error al eliminar el cliente", "error");
    } else {
      toast("Cliente eliminado");
      setDeleteTarget(null);
      fetchClientes();
    }
  };

  // ── Filter ─────────────────────────────────────────────────────────────────

  const filtered = clientes.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      c.nombre.toLowerCase().includes(q) ||
      (c.empresa?.toLowerCase() ?? "").includes(q) ||
      (c.email?.toLowerCase() ?? "").includes(q);
    const matchEstado = !filterEstado || c.estado === filterEstado;
    const matchPrioridad = !filterPrioridad || c.prioridad === filterPrioridad;
    return matchSearch && matchEstado && matchPrioridad;
  });

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
      }}
    >
      {/* Toast container */}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-3 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2 animate-[fadeIn_0.2s_ease] ${
              t.type === "success"
                ? "bg-emerald-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {t.type === "success" ? (
              <CheckCircle2 size={16} />
            ) : (
              <AlertTriangle size={16} />
            )}
            {t.message}
          </div>
        ))}
      </div>

      {/* ── Header ── */}
      <header
        className="sticky top-0 z-40 backdrop-blur-md border-b border-white/10"
        style={{ background: "rgba(15,23,42,0.85)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#E63946] rounded-lg flex items-center justify-center font-black text-white text-sm">
              KP
            </div>
            <span className="font-bold text-white text-sm tracking-tight">
              Kinemet Partners
            </span>
            <span className="hidden sm:inline-block bg-white/10 text-white/70 text-xs px-2.5 py-1 rounded-full font-medium">
              Panel Interno
            </span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-white/10"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </header>

      {/* ── Content ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Title + Add button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#E63946]/20 rounded-xl flex items-center justify-center">
              <Users size={20} className="text-[#E63946]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Clientes</h1>
              <p className="text-xs text-white/50 mt-0.5">
                {filtered.length} de {clientes.length} registros
              </p>
            </div>
          </div>
          <button
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-2 bg-[#E63946] hover:bg-[#c0303c] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-[#E63946]/20"
          >
            <Plus size={18} />
            Añadir Cliente
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
            />
            <input
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/8 border border-white/10 text-white placeholder:text-white/30 text-sm outline-none focus:border-[#E63946]/60 focus:bg-white/12 transition-all"
              placeholder="Buscar por nombre, empresa o email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ background: "rgba(255,255,255,0.06)" }}
            />
          </div>
          <div className="relative">
            <select
              className="pl-3 pr-8 py-2.5 rounded-xl border border-white/10 text-white text-sm outline-none appearance-none cursor-pointer focus:border-[#E63946]/60 transition-all"
              style={{ background: "rgba(255,255,255,0.06)" }}
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value as "" | Estado)}
            >
              <option value="" style={{ background: "#1e293b" }}>
                Todos los estados
              </option>
              {ESTADOS.map((s) => (
                <option key={s} value={s} style={{ background: "#1e293b" }}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
            />
          </div>
          <div className="relative">
            <select
              className="pl-3 pr-8 py-2.5 rounded-xl border border-white/10 text-white text-sm outline-none appearance-none cursor-pointer focus:border-[#E63946]/60 transition-all"
              style={{ background: "rgba(255,255,255,0.06)" }}
              value={filterPrioridad}
              onChange={(e) =>
                setFilterPrioridad(e.target.value as "" | Prioridad)
              }
            >
              <option value="" style={{ background: "#1e293b" }}>
                Todas las prioridades
              </option>
              {PRIORIDADES.map((p) => (
                <option key={p} value={p} style={{ background: "#1e293b" }}>
                  {p}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
            />
          </div>
        </div>

        {/* Table */}
        <div
          className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          {loading ? (
            <div className="flex items-center justify-center py-24 text-white/40 gap-3">
              <Loader2 size={24} className="animate-spin" />
              <span className="text-sm">Cargando clientes…</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-white/40 gap-4">
              <Users size={40} className="opacity-30" />
              <p className="text-sm">
                {clientes.length === 0
                  ? "No hay clientes registrados todavía."
                  : "Ningún cliente coincide con los filtros."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    {[
                      "Nombre",
                      "Empresa",
                      "Teléfono",
                      "Email",
                      "Descripción",
                      "Estado",
                      "Prioridad",
                      "Creado",
                      "",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-4 text-left text-xs font-bold text-white/40 uppercase tracking-wider whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => (
                    <tr
                      key={c.id}
                      className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                        i % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
                      }`}
                    >
                      <td className="px-4 py-4 font-semibold text-white whitespace-nowrap">
                        {c.nombre}
                      </td>
                      <td className="px-4 py-4 text-white/60 whitespace-nowrap">
                        {c.empresa ?? "—"}
                      </td>
                      <td className="px-4 py-4 text-white/60 whitespace-nowrap">
                        {c.telefono ?? "—"}
                      </td>
                      <td className="px-4 py-4 text-white/60 whitespace-nowrap max-w-[200px] truncate">
                        {c.email ?? "—"}
                      </td>
                      <td
                        className="px-4 py-4 text-white/60 whitespace-nowrap max-w-[200px] truncate"
                        title={c.descripcion ?? ""}
                      >
                        {c.descripcion ?? "—"}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${estadoColors[c.estado]}`}
                        >
                          {c.estado}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${prioridadColors[c.prioridad]}`}
                        >
                          {c.prioridad}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-white/40 whitespace-nowrap text-xs">
                        {new Date(c.created_at).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setEditTarget(c)}
                            title="Editar"
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(c)}
                            title="Eliminar"
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Stats footer */}
        <div className="mt-4 flex flex-wrap gap-3">
          {ESTADOS.map((e) => {
            const count = clientes.filter((c) => c.estado === e).length;
            if (!count) return null;
            return (
              <span
                key={e}
                className={`text-xs px-3 py-1.5 rounded-full font-medium ${estadoColors[e]}`}
              >
                {e}: {count}
              </span>
            );
          })}
        </div>
      </main>

      {/* ── Modals ── */}

      {addOpen && (
        <Modal title="Añadir nuevo cliente" onClose={() => setAddOpen(false)}>
          <ClienteForm
            initial={emptyForm()}
            onSave={handleAdd}
            onClose={() => setAddOpen(false)}
            saving={saving}
          />
        </Modal>
      )}

      {editTarget && (
        <Modal title="Editar cliente" onClose={() => setEditTarget(null)}>
          <ClienteForm
            initial={{
              nombre: editTarget.nombre,
              empresa: editTarget.empresa,
              telefono: editTarget.telefono,
              email: editTarget.email,
              descripcion: editTarget.descripcion,
              estado: editTarget.estado,
              prioridad: editTarget.prioridad,
            }}
            onSave={handleEdit}
            onClose={() => setEditTarget(null)}
            saving={saving}
          />
        </Modal>
      )}

      {deleteTarget && (
        <DeleteConfirm
          cliente={deleteTarget}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
          deleting={deleting}
        />
      )}
    </div>
  );
}
