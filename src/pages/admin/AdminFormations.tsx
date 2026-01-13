import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Formation {
  id: string;
  title: string;
  description: string | null;
  program: string[];
  image_url: string | null;
  certificate_images: string[];
  start_date: string | null;
  end_date: string | null;
  price: string | null;
  location: string | null;
  status: string;
  is_active: boolean;
}

const AdminFormations: React.FC = () => {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [programText, setProgramText] = useState('');
  const [certificateText, setCertificateText] = useState('');
  const [formData, setFormData] = useState<Partial<Formation>>({
    title: '',
    description: '',
    program: [],
    image_url: '',
    certificate_images: [],
    start_date: '',
    end_date: '',
    price: '',
    location: '',
    status: 'open',
    is_active: true,
  });

  const fetchFormations = async () => {
    const { data, error } = await supabase
      .from('formations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Erreur lors du chargement');
      return;
    }
    setFormations(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchFormations();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const program = programText.split('\n').filter(p => p.trim());
    const certificate_images = certificateText.split('\n').filter(c => c.trim());
    const dataToSave = { ...formData, program, certificate_images };
    
    if (editingId) {
      const { error } = await supabase
        .from('formations')
        .update(dataToSave)
        .eq('id', editingId);

      if (error) {
        toast.error('Erreur lors de la modification');
        return;
      }
      toast.success('Formation modifiée');
    } else {
      const { error } = await supabase
        .from('formations')
        .insert([{ ...dataToSave, title: formData.title! }]);
      if (error) {
        toast.error('Erreur lors de la création');
        return;
      }
      toast.success('Formation créée');
    }

    setDialogOpen(false);
    setEditingId(null);
    resetForm();
    fetchFormations();
  };

  const handleEdit = (form: Formation) => {
    setEditingId(form.id);
    setFormData(form);
    setProgramText((form.program || []).join('\n'));
    setCertificateText((form.certificate_images || []).join('\n'));
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette formation ?')) return;
    
    const { error } = await supabase
      .from('formations')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Erreur lors de la suppression');
      return;
    }
    toast.success('Formation supprimée');
    fetchFormations();
  };

  const toggleActive = async (id: string, currentValue: boolean) => {
    const { error } = await supabase
      .from('formations')
      .update({ is_active: !currentValue })
      .eq('id', id);

    if (error) {
      toast.error('Erreur');
      return;
    }
    fetchFormations();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      program: [],
      image_url: '',
      certificate_images: [],
      start_date: '',
      end_date: '',
      price: '',
      location: '',
      status: 'open',
      is_active: true,
    });
    setProgramText('');
    setCertificateText('');
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open': return 'Ouverte';
      case 'closed': return 'Fermée';
      case 'coming_soon': return 'À venir';
      default: return status;
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Formations</h1>
            <p className="text-muted-foreground">Gérez les formations proposées</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) {
              setEditingId(null);
              resetForm();
            }
          }}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" /> Ajouter</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingId ? 'Modifier' : 'Ajouter'} une formation</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Titre *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>URL de l'image principale</Label>
                  <Input
                    value={formData.image_url || ''}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Programme (un élément par ligne)</Label>
                  <Textarea
                    value={programText}
                    onChange={(e) => setProgramText(e.target.value)}
                    rows={4}
                    placeholder="Introduction à l'importation&#10;Sourcing fournisseurs&#10;Négociation&#10;Logistique"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date de début</Label>
                    <Input
                      type="datetime-local"
                      value={formData.start_date ? formData.start_date.slice(0, 16) : ''}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Date de fin</Label>
                    <Input
                      type="datetime-local"
                      value={formData.end_date ? formData.end_date.slice(0, 16) : ''}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Prix</Label>
                    <Input
                      value={formData.price || ''}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="50 000 FCFA"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Lieu</Label>
                    <Input
                      value={formData.location || ''}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Douala, Cameroun"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>URLs des images d'attestations (une par ligne)</Label>
                  <Textarea
                    value={certificateText}
                    onChange={(e) => setCertificateText(e.target.value)}
                    rows={2}
                    placeholder="https://...&#10;https://..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Statut</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Ouverte</SelectItem>
                        <SelectItem value="closed">Fermée</SelectItem>
                        <SelectItem value="coming_soon">À venir</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2 pt-8">
                    <Switch
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                    <Label>Actif</Label>
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit">
                    {editingId ? 'Modifier' : 'Créer'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Lieu</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actif</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Aucune formation. Cliquez sur "Ajouter" pour en créer une.
                    </TableCell>
                  </TableRow>
                ) : (
                  formations.map((form) => (
                    <TableRow key={form.id}>
                      <TableCell className="font-medium">{form.title}</TableCell>
                      <TableCell>{form.price || '-'}</TableCell>
                      <TableCell>{form.location || '-'}</TableCell>
                      <TableCell>{getStatusLabel(form.status)}</TableCell>
                      <TableCell>
                        <Switch
                          checked={form.is_active}
                          onCheckedChange={() => toggleActive(form.id, form.is_active)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" onClick={() => handleEdit(form)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => handleDelete(form.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminFormations;
