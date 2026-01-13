import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';

interface ChatbotSettings {
  id: string;
  is_enabled: boolean;
  welcome_message: string;
  student_message: string | null;
  merchant_message: string | null;
  entrepreneur_message: string | null;
  groupage_explanation: string | null;
  motivation_message: string | null;
  quote_template: string | null;
}

const AdminChatbot: React.FC = () => {
  const [settings, setSettings] = useState<ChatbotSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('chatbot_settings')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error) {
      toast.error('Erreur lors du chargement');
      return;
    }
    setSettings(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);

    const { error } = await supabase
      .from('chatbot_settings')
      .update(settings)
      .eq('id', settings.id);

    if (error) {
      toast.error('Erreur lors de la sauvegarde');
    } else {
      toast.success('Paramètres sauvegardés');
    }
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

  if (!settings) {
    return (
      <AdminLayout>
        <div className="text-center py-8">
          <p>Paramètres du chatbot non trouvés</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Chatbot NaYa</h1>
            <p className="text-muted-foreground">Configurez les messages du chatbot</p>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Sauvegarder
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Activation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Switch
                checked={settings.is_enabled}
                onCheckedChange={(checked) => setSettings({ ...settings, is_enabled: checked })}
              />
              <Label>Activer le chatbot NaYa</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Message d'accueil</CardTitle>
            <CardDescription>Premier message affiché aux visiteurs</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={settings.welcome_message}
              onChange={(e) => setSettings({ ...settings, welcome_message: e.target.value })}
              rows={3}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Messages par profil</CardTitle>
            <CardDescription>Messages adaptés selon le type de visiteur</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Message pour les étudiants</Label>
              <Textarea
                value={settings.student_message || ''}
                onChange={(e) => setSettings({ ...settings, student_message: e.target.value })}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label>Message pour les commerçants</Label>
              <Textarea
                value={settings.merchant_message || ''}
                onChange={(e) => setSettings({ ...settings, merchant_message: e.target.value })}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label>Message pour les entrepreneurs</Label>
              <Textarea
                value={settings.entrepreneur_message || ''}
                onChange={(e) => setSettings({ ...settings, entrepreneur_message: e.target.value })}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Explications et motivation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Explication du groupage</Label>
              <Textarea
                value={settings.groupage_explanation || ''}
                onChange={(e) => setSettings({ ...settings, groupage_explanation: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Message de motivation à l'action</Label>
              <Textarea
                value={settings.motivation_message || ''}
                onChange={(e) => setSettings({ ...settings, motivation_message: e.target.value })}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Template de devis</CardTitle>
            <CardDescription>Modèle pour les devis estimatifs générés</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={settings.quote_template || ''}
              onChange={(e) => setSettings({ ...settings, quote_template: e.target.value })}
              rows={4}
              placeholder="Devis estimatif pour {product}&#10;Quantité: {quantity}&#10;Estimation: {price}"
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminChatbot;
