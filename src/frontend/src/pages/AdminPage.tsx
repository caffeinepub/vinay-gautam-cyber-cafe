import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  LogIn,
  LogOut,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Appointment, News, Scheme, Service } from "../backend.d";
import { AppointmentStatus, ServiceCategory } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAddNews,
  useAddScheme,
  useAddService,
  useAllAppointments,
  useAllNews,
  useAllSchemes,
  useAllServices,
  useDeleteNews,
  useDeleteScheme,
  useDeleteService,
  useIsAdmin,
  useSeedData,
  useUpdateAppointmentStatus,
  useUpdateNews,
  useUpdateScheme,
  useUpdateService,
} from "../hooks/useQueries";

interface Props {
  onBack: () => void;
}

function StatusBadge({ status }: { status: AppointmentStatus }) {
  const map: Record<AppointmentStatus, string> = {
    [AppointmentStatus.pending]: "bg-yellow-100 text-yellow-800",
    [AppointmentStatus.confirmed]: "bg-blue-100 text-blue-800",
    [AppointmentStatus.completed]: "bg-green-100 text-green-800",
    [AppointmentStatus.cancelled]: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full font-semibold ${map[status] ?? ""}`}
    >
      {status}
    </span>
  );
}

export default function AdminPage({ onBack }: Props) {
  const { login, clear, isLoggingIn, identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();

  if (!identity) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center px-4">
        <div className="bg-card rounded-2xl shadow-card p-10 max-w-sm w-full text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-5">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Admin Login
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Sign in with Internet Identity to access the admin panel.
          </p>
          <Button
            onClick={login}
            disabled={isLoggingIn}
            className="w-full bg-primary text-white font-bold"
            data-ocid="admin.primary_button"
          >
            {isLoggingIn ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <LogIn className="w-4 h-4 mr-2" />
            )}
            Login with Internet Identity
          </Button>
          <button
            type="button"
            onClick={onBack}
            className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Website
          </button>
        </div>
      </div>
    );
  }

  if (adminLoading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center px-4">
        <div className="bg-card rounded-2xl shadow-card p-10 max-w-sm w-full text-center">
          <h2 className="text-xl font-bold text-destructive mb-2">
            Access Denied
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Your account does not have admin privileges.
          </p>
          <Button onClick={clear} variant="outline" className="w-full mb-2">
            Logout
          </Button>
          <Button onClick={onBack} variant="ghost" className="w-full">
            Back to Website
          </Button>
        </div>
      </div>
    );
  }

  return <AdminDashboard onBack={onBack} onLogout={clear} />;
}

function AdminDashboard({
  onBack,
  onLogout,
}: { onBack: () => void; onLogout: () => void }) {
  const seedMutation = useSeedData();

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-primary text-white sticky top-0 z-40 shadow">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="hover:opacity-70 transition-opacity"
              data-ocid="admin.link"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="font-bold text-base">Admin Dashboard</span>
            <span className="text-xs text-white/60">
              Vinay Gautam Cyber Cafe
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="text-white border-white/30 hover:bg-white/10 text-xs"
              onClick={async () => {
                try {
                  await seedMutation.mutateAsync();
                  toast.success("Sample data seeded!");
                } catch {
                  toast.error("Seed failed");
                }
              }}
              disabled={seedMutation.isPending}
              data-ocid="admin.secondary_button"
            >
              {seedMutation.isPending ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <RefreshCw className="w-3 h-3" />
              )}
              &nbsp;Seed Data
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/10"
              onClick={onLogout}
              data-ocid="admin.button"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="services" data-ocid="admin.tab">
          <TabsList className="mb-6">
            <TabsTrigger value="services" data-ocid="admin.tab">
              Services
            </TabsTrigger>
            <TabsTrigger value="schemes" data-ocid="admin.tab">
              Schemes
            </TabsTrigger>
            <TabsTrigger value="news" data-ocid="admin.tab">
              Updates
            </TabsTrigger>
            <TabsTrigger value="appointments" data-ocid="admin.tab">
              Appointments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="services">
            <ServicesTab />
          </TabsContent>
          <TabsContent value="schemes">
            <SchemesTab />
          </TabsContent>
          <TabsContent value="news">
            <NewsTab />
          </TabsContent>
          <TabsContent value="appointments">
            <AppointmentsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// ─── Services Tab ──────────────────────────────────────────────────────────────
function ServicesTab() {
  const { data: services = [], isLoading } = useAllServices();
  const addMut = useAddService();
  const updateMut = useUpdateService();
  const deleteMut = useDeleteService();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    iconName: "Globe",
    category: ServiceCategory.government,
  });

  const openAdd = () => {
    setEditing(null);
    setForm({
      title: "",
      description: "",
      iconName: "Globe",
      category: ServiceCategory.government,
    });
    setOpen(true);
  };
  const openEdit = (s: Service) => {
    setEditing(s);
    setForm({
      title: s.title,
      description: s.description,
      iconName: s.iconName,
      category: s.category,
    });
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editing) {
        await updateMut.mutateAsync({
          id: editing.id,
          service: { ...editing, ...form },
        });
        toast.success("Service updated");
      } else {
        await addMut.mutateAsync({ id: BigInt(0), ...form });
        toast.success("Service added");
      }
      setOpen(false);
    } catch {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id: bigint) => {
    if (!confirm("Delete this service?")) return;
    try {
      await deleteMut.mutateAsync(id);
      toast.success("Deleted");
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">Services</h3>
        <Button
          size="sm"
          className="bg-accent text-white"
          onClick={openAdd}
          data-ocid="services.open_modal_button"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Service
        </Button>
      </div>

      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Table data-ocid="services.table">
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground py-8"
                  data-ocid="services.empty_state"
                >
                  No services yet. Add one above.
                </TableCell>
              </TableRow>
            ) : (
              services.map((s, i) => (
                <TableRow
                  key={String(s.id)}
                  data-ocid={`services.row.${i + 1}`}
                >
                  <TableCell className="font-medium">{s.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{String(s.category)}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-muted-foreground text-sm">
                    {s.description}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => openEdit(s)}
                        data-ocid={`services.edit_button.${i + 1}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => handleDelete(s.id)}
                        data-ocid={`services.delete_button.${i + 1}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent data-ocid="services.dialog">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Service" : "Add Service"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                data-ocid="services.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                data-ocid="services.textarea"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Icon Name</Label>
                <Input
                  value={form.iconName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, iconName: e.target.value }))
                  }
                  placeholder="Globe"
                  data-ocid="services.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) =>
                    setForm((p) => ({ ...p, category: v as ServiceCategory }))
                  }
                >
                  <SelectTrigger data-ocid="services.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(ServiceCategory).map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              data-ocid="services.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={addMut.isPending || updateMut.isPending}
              className="bg-primary text-white"
              data-ocid="services.confirm_button"
            >
              {addMut.isPending || updateMut.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
              &nbsp;Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Schemes Tab ───────────────────────────────────────────────────────────────
function SchemesTab() {
  const { data: schemes = [], isLoading } = useAllSchemes();
  const addMut = useAddScheme();
  const updateMut = useUpdateScheme();
  const deleteMut = useDeleteScheme();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Scheme | null>(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    eligibility: "",
    documentsRequired: "",
    officialLink: "",
  });

  const openAdd = () => {
    setEditing(null);
    setForm({
      name: "",
      category: "",
      description: "",
      eligibility: "",
      documentsRequired: "",
      officialLink: "",
    });
    setOpen(true);
  };
  const openEdit = (s: Scheme) => {
    setEditing(s);
    setForm({
      name: s.name,
      category: s.category,
      description: s.description,
      eligibility: s.eligibility,
      documentsRequired: s.documentsRequired.join(", "),
      officialLink: s.officialLink,
    });
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      const docs = form.documentsRequired
        .split(",")
        .map((d) => d.trim())
        .filter(Boolean);
      if (editing) {
        await updateMut.mutateAsync({
          id: editing.id,
          scheme: { ...editing, ...form, documentsRequired: docs },
        });
        toast.success("Scheme updated");
      } else {
        await addMut.mutateAsync({
          id: BigInt(0),
          ...form,
          documentsRequired: docs,
        });
        toast.success("Scheme added");
      }
      setOpen(false);
    } catch {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id: bigint) => {
    if (!confirm("Delete this scheme?")) return;
    try {
      await deleteMut.mutateAsync(id);
      toast.success("Deleted");
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">Government Schemes</h3>
        <Button
          size="sm"
          className="bg-accent text-white"
          onClick={openAdd}
          data-ocid="schemes.open_modal_button"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Scheme
        </Button>
      </div>

      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Table data-ocid="schemes.table">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Official Link</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schemes.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground py-8"
                  data-ocid="schemes.empty_state"
                >
                  No schemes yet.
                </TableCell>
              </TableRow>
            ) : (
              schemes.map((s, i) => (
                <TableRow key={String(s.id)} data-ocid={`schemes.row.${i + 1}`}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{s.category}</Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground truncate max-w-xs">
                    {s.officialLink}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => openEdit(s)}
                        data-ocid={`schemes.edit_button.${i + 1}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => handleDelete(s.id)}
                        data-ocid={`schemes.delete_button.${i + 1}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg" data-ocid="schemes.dialog">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Scheme" : "Add Scheme"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  data-ocid="schemes.input"
                />
              </div>
              <div className="space-y-1">
                <Label>Category</Label>
                <Input
                  value={form.category}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, category: e.target.value }))
                  }
                  data-ocid="schemes.input"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                data-ocid="schemes.textarea"
              />
            </div>
            <div className="space-y-1">
              <Label>Eligibility</Label>
              <Textarea
                value={form.eligibility}
                onChange={(e) =>
                  setForm((p) => ({ ...p, eligibility: e.target.value }))
                }
                rows={2}
                data-ocid="schemes.textarea"
              />
            </div>
            <div className="space-y-1">
              <Label>Documents Required (comma-separated)</Label>
              <Input
                value={form.documentsRequired}
                onChange={(e) =>
                  setForm((p) => ({ ...p, documentsRequired: e.target.value }))
                }
                data-ocid="schemes.input"
              />
            </div>
            <div className="space-y-1">
              <Label>Official Link</Label>
              <Input
                value={form.officialLink}
                onChange={(e) =>
                  setForm((p) => ({ ...p, officialLink: e.target.value }))
                }
                placeholder="https://"
                data-ocid="schemes.input"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              data-ocid="schemes.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={addMut.isPending || updateMut.isPending}
              className="bg-primary text-white"
              data-ocid="schemes.confirm_button"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── News Tab ──────────────────────────────────────────────────────────────────
function NewsTab() {
  const { data: newsList = [], isLoading } = useAllNews();
  const addMut = useAddNews();
  const updateMut = useUpdateNews();
  const deleteMut = useDeleteNews();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<News | null>(null);
  const [form, setForm] = useState({ title: "", content: "", category: "" });

  const openAdd = () => {
    setEditing(null);
    setForm({ title: "", content: "", category: "" });
    setOpen(true);
  };
  const openEdit = (n: News) => {
    setEditing(n);
    setForm({ title: n.title, content: n.content, category: n.category });
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      const now = BigInt(Date.now()) * BigInt(1_000_000);
      if (editing) {
        await updateMut.mutateAsync({
          id: editing.id,
          news: { ...editing, ...form },
        });
        toast.success("Update saved");
      } else {
        await addMut.mutateAsync({ id: BigInt(0), ...form, date: now });
        toast.success("Update added");
      }
      setOpen(false);
    } catch {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id: bigint) => {
    if (!confirm("Delete this update?")) return;
    try {
      await deleteMut.mutateAsync(id);
      toast.success("Deleted");
    } catch {
      toast.error("Failed");
    }
  };

  const formatDate = (ns: bigint) =>
    new Date(Number(ns) / 1_000_000).toLocaleDateString("en-IN");

  return (
    <div className="bg-card rounded-xl shadow-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">News & Updates</h3>
        <Button
          size="sm"
          className="bg-accent text-white"
          onClick={openAdd}
          data-ocid="news.open_modal_button"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Update
        </Button>
      </div>

      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Table data-ocid="news.table">
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {newsList.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground py-8"
                  data-ocid="news.empty_state"
                >
                  No updates yet.
                </TableCell>
              </TableRow>
            ) : (
              newsList.map((n, i) => (
                <TableRow key={String(n.id)} data-ocid={`news.row.${i + 1}`}>
                  <TableCell className="font-medium max-w-xs truncate">
                    {n.title}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{n.category}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(n.date)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => openEdit(n)}
                        data-ocid={`news.edit_button.${i + 1}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => handleDelete(n.id)}
                        data-ocid={`news.delete_button.${i + 1}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent data-ocid="news.dialog">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Update" : "Add Update"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1">
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                data-ocid="news.input"
              />
            </div>
            <div className="space-y-1">
              <Label>Category</Label>
              <Input
                value={form.category}
                onChange={(e) =>
                  setForm((p) => ({ ...p, category: e.target.value }))
                }
                data-ocid="news.input"
              />
            </div>
            <div className="space-y-1">
              <Label>Content</Label>
              <Textarea
                value={form.content}
                onChange={(e) =>
                  setForm((p) => ({ ...p, content: e.target.value }))
                }
                rows={5}
                data-ocid="news.textarea"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              data-ocid="news.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={addMut.isPending || updateMut.isPending}
              className="bg-primary text-white"
              data-ocid="news.confirm_button"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Appointments Tab ─────────────────────────────────────────────────────────
function AppointmentsTab() {
  const { data: appointments = [], isLoading } = useAllAppointments();
  const updateStatusMut = useUpdateAppointmentStatus();

  const formatDate = (ns: bigint) =>
    new Date(Number(ns) / 1_000_000).toLocaleDateString("en-IN");

  const handleStatus = async (id: bigint, status: AppointmentStatus) => {
    try {
      await updateStatusMut.mutateAsync({ id, status });
      toast.success(`Status updated to ${status}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-card p-6">
      <h3 className="font-bold text-lg mb-4">Appointments</h3>
      {isLoading ? (
        <Loader2
          className="animate-spin"
          data-ocid="appointments.loading_state"
        />
      ) : (
        <Table data-ocid="appointments.table">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Preferred Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Update Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground py-8"
                  data-ocid="appointments.empty_state"
                >
                  No appointments yet.
                </TableCell>
              </TableRow>
            ) : (
              appointments.map((apt: Appointment, i) => (
                <TableRow
                  key={String(apt.id)}
                  data-ocid={`appointments.row.${i + 1}`}
                >
                  <TableCell className="font-medium">{apt.name}</TableCell>
                  <TableCell className="text-sm">{apt.phone}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {String(apt.serviceId)}
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(apt.preferredDate)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={apt.status} />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={apt.status}
                      onValueChange={(v) =>
                        handleStatus(apt.id, v as AppointmentStatus)
                      }
                    >
                      <SelectTrigger
                        className="w-32 h-7 text-xs"
                        data-ocid={`appointments.select.${i + 1}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(AppointmentStatus).map((s) => (
                          <SelectItem key={s} value={s} className="text-xs">
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
