import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import MediaSelector from '@/components/admin/MediaSelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Promotion {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  original_price: string | null;
  promo_price: string | null;
  end_date: string | null;
  features: string[];
  display_in_banner: boolean;
  display_in_page: boolean;
  is_active: boolean;
  whatsapp_message: string | null;
}

const AdminPromotions: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [featuresText, setFeaturesText] = useState('');
  const [formData, setFormData] = useState<Partial<Promotion>>({
    title: '',
    description: '',
    image_url: '',
    original_price: '',
    promo_price: '',
    end_date: '',
    features: [],
    display_in_banner: false,
    display_in_page: true,
    is_active: true,
    whatsapp_message: '',
  });

  const fetchPromotions = async () => {
    const { data, error } = await supabase
      .from('promotions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Erreur lors du chargement');
      return;
    }
    setPromotions(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const features = featuresText.split('\n').filter(f => f.trim());
    const dataToSave = { ...formData, features };
    
    if (editingId) {
      const { error } = await supabase
        .from('promotions')
        .update(dataToSave)
        .eq('id', editingId);

      if (error) {
        toast.error('Erreur lors de la modification');
        return;
      }
      toast.success('Promotion modifiée');
    } else {
      const { error } = await supabase
        .from('promotions')
        .insert([{ ...dataToSave, title: formData.title! }]);
      if (error) {
        toast.error('Erreur lors de la création');
        return;
      }
      toast.success('Promotion créée');
    }

    setDialogOpen(false);
    setEditingId(null);
    resetForm();
    fetchPromotions();
  };

  const handleEdit = (promo: Promotion) => {
    setEditingId(promo.id);
    setFormData(promo);
    setFeaturesText((promo.features || []).join('\n'));
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette promotion ?')) return;
    
    const { error } = await supabase
      .from('promotions')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Erreur lors de la suppression');
      return;
    }
    toast.success('Promotion supprimée');
    fetchPromotions();
  };

  const toggleActive = async (id: string, currentValue: boolean) => {
    const { error } = await supabase
      .from('promotions')
      .update({ is_active: !currentValue })
      .eq('id', id);

    if (error) {
      toast.error('Erreur');
      return;
    }
    fetchPromotions();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      original_price: '',
      promo_price: '',
      end_date: '',
      features: [],
      display_in_banner: false,
      display_in_page: true,
      is_active: true,
      whatsapp_message: '',
    });
    setFeaturesText('');
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
            <h1 className="text-3xl font-bold">Promotions</h1>
            <p className="text-muted-foreground">Gérez les offres spéciales</p>
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
                <DialogTitle>{editingId ? 'Modifier' : 'Ajouter'} une promotion</DialogTitle>
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
                    rows={2}
                  />
                </div>
                <MediaSelector
                  value={formData.image_url || ''}
                  onChange={(url) => setFormData({ ...formData, image_url: url })}
                  label="Image de la promotion"
                  accept={['image']}
                />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Prix original</Label>
                    <Input
                      value={formData.original_price || ''}
                      onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                      placeholder="100 000 FCFA"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Prix promo</Label>
                    <Input
                      value={formData.promo_price || ''}
                      onChange={(e) => setFormData({ ...formData, promo_price: e.target.value })}
                      placeholder="75 000 FCFA"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Date de fin</Label>
                  <Input
                    type="datetime-local"
                    value={formData.end_date ? formData.end_date.slice(0, 16) : ''}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Avantages (un par ligne)</Label>
                  <Textarea
                    value={featuresText}
                    onChange={(e) => setFeaturesText(e.target.value)}
                    rows={3}
                    placeholder="Livraison gratuite&#10;Support 24/7&#10;Garantie 1 an"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Message WhatsApp</Label>
                  <Textarea
                    value={formData.whatsapp_message || ''}
                    onChange={(e) => setFormData({ ...formData, whatsapp_message: e.target.value })}
                    rows={2}
                    placeholder="Bonjour, je suis intéressé par la promotion..."
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={formData.display_in_banner}
                      onCheckedChange={(checked) => setFormData({ ...formData, display_in_banner: checked })}
                    />
                    <Label>Afficher dans la barre d'annonces</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={formData.display_in_page}
                      onCheckedChange={(checked) => setFormData({ ...formData, display_in_page: checked })}
                    />
                    <Label>Afficher dans la page promotions</Label>
                  </div>
                  <div className="flex items-center gap-2">
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
                  <TableHead>Fin</TableHead>
                  <TableHead>Bannière</TableHead>
                  <TableHead>Actif</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {promotions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Aucune promotion. Cliquez sur "Ajouter" pour en créer une.
                    </TableCell>
                  </TableRow>
                ) : (
                  promotions.map((promo) => (
                    <TableRow key={promo.id}>
                      <TableCell className="font-medium">{promo.title}</TableCell>
                      <TableCell>{promo.promo_price || '-'}</TableCell>
                      <TableCell>
                        {promo.end_date ? new Date(promo.end_date).toLocaleDateString('fr-FR') : '-'}
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={promo.display_in_banner}
                          onCheckedChange={async () => {
                            await supabase.from('promotions').update({ display_in_banner: !promo.display_in_banner }).eq('id', promo.id);
                            fetchPromotions();
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={promo.is_active}
                          onCheckedChange={() => toggleActive(promo.id, promo.is_active)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" onClick={() => handleEdit(promo)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => handleDelete(promo.id)}>
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

export default AdminPromotions;
