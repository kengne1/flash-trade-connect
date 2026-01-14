import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import MediaSelector from '@/components/admin/MediaSelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Loader2, GripVertical } from 'lucide-react';
import { toast } from 'sonner';

interface Announcement {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string | null;
  link: string;
  link_text: string;
  display_order: number;
  is_active: boolean;
}

const AdminAnnouncements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Announcement>>({
    title: '',
    subtitle: '',
    image_url: '',
    link: '/',
    link_text: 'En savoir plus',
    display_order: 0,
    is_active: true,
  });

  const fetchAnnouncements = async () => {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      toast.error('Erreur lors du chargement');
      return;
    }
    setAnnouncements(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      const { error } = await supabase
        .from('announcements')
        .update(formData)
        .eq('id', editingId);

      if (error) {
        toast.error('Erreur lors de la modification');
        return;
      }
      toast.success('Annonce modifiée');
    } else {
      const maxOrder = Math.max(...announcements.map(a => a.display_order), -1);
      const { error } = await supabase
        .from('announcements')
        .insert([{ ...formData, title: formData.title!, display_order: maxOrder + 1 }]);

      if (error) {
        toast.error('Erreur lors de la création');
        return;
      }
      toast.success('Annonce créée');
    }

    setDialogOpen(false);
    setEditingId(null);
    resetForm();
    fetchAnnouncements();
  };

  const handleEdit = (ann: Announcement) => {
    setEditingId(ann.id);
    setFormData(ann);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette annonce ?')) return;
    
    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Erreur lors de la suppression');
      return;
    }
    toast.success('Annonce supprimée');
    fetchAnnouncements();
  };

  const toggleActive = async (id: string, currentValue: boolean) => {
    const { error } = await supabase
      .from('announcements')
      .update({ is_active: !currentValue })
      .eq('id', id);

    if (error) {
      toast.error('Erreur');
      return;
    }
    fetchAnnouncements();
  };

  const moveOrder = async (id: string, direction: 'up' | 'down') => {
    const index = announcements.findIndex(a => a.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === announcements.length - 1)
    ) return;

    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    const current = announcements[index];
    const swap = announcements[swapIndex];

    await Promise.all([
      supabase.from('announcements').update({ display_order: swap.display_order }).eq('id', current.id),
      supabase.from('announcements').update({ display_order: current.display_order }).eq('id', swap.id),
    ]);

    fetchAnnouncements();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      image_url: '',
      link: '/',
      link_text: 'En savoir plus',
      display_order: 0,
      is_active: true,
    });
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
            <h1 className="text-3xl font-bold">Barre d'annonces</h1>
            <p className="text-muted-foreground">Gérez le slider promotionnel en haut du site</p>
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
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingId ? 'Modifier' : 'Ajouter'} une annonce</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Titre *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    placeholder="Promo du mois !"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Sous-titre</Label>
                  <Input
                    value={formData.subtitle || ''}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Profitez de -20% sur tout le catalogue"
                  />
                </div>
                <MediaSelector
                  value={formData.image_url || ''}
                  onChange={(url) => setFormData({ ...formData, image_url: url })}
                  label="Image de fond"
                  accept={['image']}
                />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Lien</Label>
                    <Input
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      placeholder="/promotions"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Texte du bouton</Label>
                    <Input
                      value={formData.link_text}
                      onChange={(e) => setFormData({ ...formData, link_text: e.target.value })}
                      placeholder="En savoir plus"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label>Actif</Label>
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
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Titre</TableHead>
                  <TableHead>Sous-titre</TableHead>
                  <TableHead>Lien</TableHead>
                  <TableHead>Actif</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {announcements.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Aucune annonce. Cliquez sur "Ajouter" pour en créer une.
                    </TableCell>
                  </TableRow>
                ) : (
                  announcements.map((ann, index) => (
                    <TableRow key={ann.id}>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6"
                            disabled={index === 0}
                            onClick={() => moveOrder(ann.id, 'up')}
                          >
                            ▲
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6"
                            disabled={index === announcements.length - 1}
                            onClick={() => moveOrder(ann.id, 'down')}
                          >
                            ▼
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{ann.title}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{ann.subtitle || '-'}</TableCell>
                      <TableCell>{ann.link}</TableCell>
                      <TableCell>
                        <Switch
                          checked={ann.is_active}
                          onCheckedChange={() => toggleActive(ann.id, ann.is_active)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" onClick={() => handleEdit(ann)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => handleDelete(ann.id)}>
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

export default AdminAnnouncements;
