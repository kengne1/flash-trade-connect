import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Opportunity {
  id: string;
  name: string;
  image_url: string | null;
  moq: string;
  price_range: string;
  transport_mode: string;
  category: string;
  description: string | null;
  groupage_estimate: string | null;
  is_active: boolean;
}

const AdminOpportunities: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Opportunity>>({
    name: '',
    image_url: '',
    moq: '100 unités',
    price_range: '',
    transport_mode: 'maritime',
    category: 'Général',
    description: '',
    groupage_estimate: '',
    is_active: true,
  });

  const fetchOpportunities = async () => {
    const { data, error } = await supabase
      .from('opportunities')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Erreur lors du chargement');
      return;
    }
    setOpportunities(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      const { error } = await supabase
        .from('opportunities')
        .update(formData)
        .eq('id', editingId);

      if (error) {
        toast.error('Erreur lors de la modification');
        return;
      }
      toast.success('Opportunité modifiée');
    } else {
      const { error } = await supabase
        .from('opportunities')
        .insert([{ ...formData, name: formData.name!, price_range: formData.price_range! }]);
      if (error) {
        toast.error('Erreur lors de la création');
        return;
      }
      toast.success('Opportunité créée');
    }

    setDialogOpen(false);
    setEditingId(null);
    resetForm();
    fetchOpportunities();
  };

  const handleEdit = (opp: Opportunity) => {
    setEditingId(opp.id);
    setFormData(opp);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette opportunité ?')) return;
    
    const { error } = await supabase
      .from('opportunities')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Erreur lors de la suppression');
      return;
    }
    toast.success('Opportunité supprimée');
    fetchOpportunities();
  };

  const toggleActive = async (id: string, currentValue: boolean) => {
    const { error } = await supabase
      .from('opportunities')
      .update({ is_active: !currentValue })
      .eq('id', id);

    if (error) {
      toast.error('Erreur');
      return;
    }
    fetchOpportunities();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      image_url: '',
      moq: '100 unités',
      price_range: '',
      transport_mode: 'maritime',
      category: 'Général',
      description: '',
      groupage_estimate: '',
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
            <h1 className="text-3xl font-bold">Opportunités d'importation</h1>
            <p className="text-muted-foreground">Gérez les produits proposés à l'importation</p>
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
                <DialogTitle>{editingId ? 'Modifier' : 'Ajouter'} une opportunité</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nom du produit *</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Catégorie</Label>
                    <Input
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>URL de l'image</Label>
                  <Input
                    value={formData.image_url || ''}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>MOQ *</Label>
                    <Input
                      value={formData.moq}
                      onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Prix indicatif *</Label>
                    <Input
                      value={formData.price_range}
                      onChange={(e) => setFormData({ ...formData, price_range: e.target.value })}
                      placeholder="5 000 - 15 000 FCFA"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Mode de transport</Label>
                    <Input
                      value={formData.transport_mode}
                      onChange={(e) => setFormData({ ...formData, transport_mode: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Estimation groupage</Label>
                    <Input
                      value={formData.groupage_estimate || ''}
                      onChange={(e) => setFormData({ ...formData, groupage_estimate: e.target.value })}
                      placeholder="À partir de 50 000 FCFA"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
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
                  <TableHead>Produit</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Transport</TableHead>
                  <TableHead>Actif</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {opportunities.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Aucune opportunité. Cliquez sur "Ajouter" pour en créer une.
                    </TableCell>
                  </TableRow>
                ) : (
                  opportunities.map((opp) => (
                    <TableRow key={opp.id}>
                      <TableCell className="font-medium">{opp.name}</TableCell>
                      <TableCell>{opp.category}</TableCell>
                      <TableCell>{opp.price_range}</TableCell>
                      <TableCell>{opp.transport_mode}</TableCell>
                      <TableCell>
                        <Switch
                          checked={opp.is_active}
                          onCheckedChange={() => toggleActive(opp.id, opp.is_active)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" onClick={() => handleEdit(opp)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => handleDelete(opp.id)}>
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

export default AdminOpportunities;
