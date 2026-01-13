import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';

interface PageContent {
  id?: string;
  page_slug: string;
  title: string | null;
  content: Record<string, string>;
}

const defaultPages = [
  { slug: 'home', label: 'Accueil' },
  { slug: 'services', label: 'Services' },
  { slug: 'groupages', label: 'Groupages' },
  { slug: 'importer', label: 'Importer un produit' },
  { slug: 'pourquoi-nous', label: 'Pourquoi Flash Trade' },
];

const AdminPages: React.FC = () => {
  const [pages, setPages] = useState<Record<string, PageContent>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const fetchPages = async () => {
    const { data, error } = await supabase
      .from('page_contents')
      .select('*');

    if (error) {
      console.error('Error fetching pages:', error);
    }

    const pagesMap: Record<string, PageContent> = {};
    
    // Initialize with defaults
    defaultPages.forEach(page => {
      pagesMap[page.slug] = {
        page_slug: page.slug,
        title: '',
        content: {
          hero_title: '',
          hero_subtitle: '',
          section1_title: '',
          section1_content: '',
        }
      };
    });

    // Override with existing data
    (data || []).forEach(page => {
      pagesMap[page.page_slug] = {
        id: page.id,
        page_slug: page.page_slug,
        title: page.title,
        content: (page.content as Record<string, string>) || {}
      };
    });

    setPages(pagesMap);
    setLoading(false);
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const page = pages[activeTab];

    if (page.id) {
      const { error } = await supabase
        .from('page_contents')
        .update({ title: page.title, content: page.content })
        .eq('id', page.id);

      if (error) {
        toast.error('Erreur lors de la sauvegarde');
        setSaving(false);
        return;
      }
    } else {
      const { error } = await supabase
        .from('page_contents')
        .insert([{
          page_slug: page.page_slug,
          title: page.title,
          content: page.content
        }]);

      if (error) {
        toast.error('Erreur lors de la sauvegarde');
        setSaving(false);
        return;
      }
    }

    toast.success('Page sauvegardée');
    fetchPages();
    setSaving(false);
  };

  const updatePageContent = (field: string, value: string) => {
    setPages(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        content: {
          ...prev[activeTab].content,
          [field]: value
        }
      }
    }));
  };

  const updatePageTitle = (value: string) => {
    setPages(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        title: value
      }
    }));
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

  const currentPage = pages[activeTab];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Gestion des pages</h1>
            <p className="text-muted-foreground">Modifiez les textes des pages principales</p>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Sauvegarder
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex-wrap h-auto">
            {defaultPages.map(page => (
              <TabsTrigger key={page.slug} value={page.slug}>
                {page.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {defaultPages.map(page => (
            <TabsContent key={page.slug} value={page.slug} className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Page {page.label}</CardTitle>
                  <CardDescription>
                    Modifiez les textes affichés sur cette page
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Titre de la page (SEO)</Label>
                    <Input
                      value={currentPage?.title || ''}
                      onChange={(e) => updatePageTitle(e.target.value)}
                      placeholder="Titre pour les moteurs de recherche"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Titre principal (Hero)</Label>
                    <Input
                      value={currentPage?.content.hero_title || ''}
                      onChange={(e) => updatePageContent('hero_title', e.target.value)}
                      placeholder="Titre affiché en grand"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Sous-titre (Hero)</Label>
                    <Textarea
                      value={currentPage?.content.hero_subtitle || ''}
                      onChange={(e) => updatePageContent('hero_subtitle', e.target.value)}
                      rows={2}
                      placeholder="Description sous le titre principal"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Titre section 1</Label>
                    <Input
                      value={currentPage?.content.section1_title || ''}
                      onChange={(e) => updatePageContent('section1_title', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Contenu section 1</Label>
                    <Textarea
                      value={currentPage?.content.section1_content || ''}
                      onChange={(e) => updatePageContent('section1_content', e.target.value)}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminPages;
