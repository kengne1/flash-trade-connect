import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';

interface SiteSettings {
  company_name: string;
  legal_mentions: { text: string };
  price_disclaimer: string;
  sections_enabled: {
    opportunities: boolean;
    promotions: boolean;
    formations: boolean;
    chatbot: boolean;
  };
}

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    company_name: '',
    legal_mentions: { text: '' },
    price_disclaimer: '',
    sections_enabled: {
      opportunities: true,
      promotions: true,
      formations: true,
      chatbot: true,
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*');

    if (error) {
      toast.error('Erreur lors du chargement');
      setLoading(false);
      return;
    }

    const settingsMap: Record<string, unknown> = {};
    (data || []).forEach(item => {
      settingsMap[item.key] = item.value;
    });

    setSettings({
      company_name: (settingsMap.company_name as string) || '',
      legal_mentions: (settingsMap.legal_mentions as { text: string }) || { text: '' },
      price_disclaimer: (settingsMap.price_disclaimer as string) || '',
      sections_enabled: (settingsMap.sections_enabled as SiteSettings['sections_enabled']) || {
        opportunities: true,
        promotions: true,
        formations: true,
        chatbot: true,
      },
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);

    const updates = [
      { key: 'company_name', value: settings.company_name },
      { key: 'legal_mentions', value: settings.legal_mentions },
      { key: 'price_disclaimer', value: settings.price_disclaimer },
      { key: 'sections_enabled', value: settings.sections_enabled },
    ];

    for (const update of updates) {
      const { error } = await supabase
        .from('site_settings')
        .update({ value: update.value })
        .eq('key', update.key);

      if (error) {
        toast.error(`Erreur lors de la sauvegarde de ${update.key}`);
        setSaving(false);
        return;
      }
    }

    toast.success('Paramètres sauvegardés');
    setSaving(false);
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
            <h1 className="text-3xl font-bold">Paramètres généraux</h1>
            <p className="text-muted-foreground">Configuration globale du site</p>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Sauvegarder
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informations de l'entreprise</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Nom de l'entreprise</Label>
              <Input
                value={settings.company_name}
                onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Textes légaux</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Mentions légales</Label>
              <Textarea
                value={settings.legal_mentions.text}
                onChange={(e) => setSettings({ 
                  ...settings, 
                  legal_mentions: { text: e.target.value } 
                })}
                rows={6}
              />
            </div>
            <div className="space-y-2">
              <Label>Avertissement prix indicatifs</Label>
              <Textarea
                value={settings.price_disclaimer}
                onChange={(e) => setSettings({ ...settings, price_disclaimer: e.target.value })}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sections du site</CardTitle>
            <CardDescription>Activer ou désactiver des fonctionnalités</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Opportunités d'importation</Label>
                <p className="text-sm text-muted-foreground">Catalogue de produits</p>
              </div>
              <Switch
                checked={settings.sections_enabled.opportunities}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  sections_enabled: { ...settings.sections_enabled, opportunities: checked }
                })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Promotions</Label>
                <p className="text-sm text-muted-foreground">Offres spéciales</p>
              </div>
              <Switch
                checked={settings.sections_enabled.promotions}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  sections_enabled: { ...settings.sections_enabled, promotions: checked }
                })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Formations</Label>
                <p className="text-sm text-muted-foreground">Sessions de formation</p>
              </div>
              <Switch
                checked={settings.sections_enabled.formations}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  sections_enabled: { ...settings.sections_enabled, formations: checked }
                })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Chatbot NaYa</Label>
                <p className="text-sm text-muted-foreground">Assistant virtuel</p>
              </div>
              <Switch
                checked={settings.sections_enabled.chatbot}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  sections_enabled: { ...settings.sections_enabled, chatbot: checked }
                })}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
