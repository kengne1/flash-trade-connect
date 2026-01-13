import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Save, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

interface ContactInfo {
  id: string;
  whatsapp_numbers: string[];
  phone_numbers: string[];
  location: string | null;
  email: string | null;
  auto_messages: Record<string, string>;
}

const AdminContact: React.FC = () => {
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchContact = async () => {
    const { data, error } = await supabase
      .from('contact_info')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error) {
      toast.error('Erreur lors du chargement');
      return;
    }
    
    if (data) {
      setContact({
        ...data,
        auto_messages: (data.auto_messages as Record<string, string>) || {}
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContact();
  }, []);

  const handleSave = async () => {
    if (!contact) return;
    setSaving(true);

    const { error } = await supabase
      .from('contact_info')
      .update(contact)
      .eq('id', contact.id);

    if (error) {
      toast.error('Erreur lors de la sauvegarde');
    } else {
      toast.success('Informations sauvegardées');
    }
    setSaving(false);
  };

  const addWhatsApp = () => {
    if (!contact) return;
    setContact({
      ...contact,
      whatsapp_numbers: [...contact.whatsapp_numbers, '']
    });
  };

  const removeWhatsApp = (index: number) => {
    if (!contact) return;
    setContact({
      ...contact,
      whatsapp_numbers: contact.whatsapp_numbers.filter((_, i) => i !== index)
    });
  };

  const updateWhatsApp = (index: number, value: string) => {
    if (!contact) return;
    const numbers = [...contact.whatsapp_numbers];
    numbers[index] = value;
    setContact({ ...contact, whatsapp_numbers: numbers });
  };

  const addPhone = () => {
    if (!contact) return;
    setContact({
      ...contact,
      phone_numbers: [...contact.phone_numbers, '']
    });
  };

  const removePhone = (index: number) => {
    if (!contact) return;
    setContact({
      ...contact,
      phone_numbers: contact.phone_numbers.filter((_, i) => i !== index)
    });
  };

  const updatePhone = (index: number, value: string) => {
    if (!contact) return;
    const numbers = [...contact.phone_numbers];
    numbers[index] = value;
    setContact({ ...contact, phone_numbers: numbers });
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

  if (!contact) {
    return (
      <AdminLayout>
        <div className="text-center py-8">
          <p>Informations de contact non trouvées</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Informations de contact</h1>
            <p className="text-muted-foreground">Gérez les coordonnées affichées sur le site</p>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Sauvegarder
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Numéros WhatsApp</CardTitle>
            <CardDescription>Numéros utilisés pour les boutons WhatsApp</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {contact.whatsapp_numbers.map((num, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={num}
                  onChange={(e) => updateWhatsApp(index, e.target.value)}
                  placeholder="+237 6XX XXX XXX"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeWhatsApp(index)}
                  disabled={contact.whatsapp_numbers.length <= 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addWhatsApp}>
              <Plus className="h-4 w-4 mr-2" /> Ajouter
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Numéros d'appel</CardTitle>
            <CardDescription>Numéros de téléphone classiques</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {contact.phone_numbers.map((num, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={num}
                  onChange={(e) => updatePhone(index, e.target.value)}
                  placeholder="+237 6XX XXX XXX"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removePhone(index)}
                  disabled={contact.phone_numbers.length <= 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addPhone}>
              <Plus className="h-4 w-4 mr-2" /> Ajouter
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Autres informations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Localisation</Label>
              <Input
                value={contact.location || ''}
                onChange={(e) => setContact({ ...contact, location: e.target.value })}
                placeholder="Douala, Cameroun"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={contact.email || ''}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                placeholder="contact@flashtrade.cm"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminContact;
