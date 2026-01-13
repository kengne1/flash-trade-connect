import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Tag, GraduationCap, Megaphone, Clock } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

interface Stats {
  opportunities: number;
  promotions: number;
  formations: number;
  announcements: number;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({
    opportunities: 0,
    promotions: 0,
    formations: 0,
    announcements: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [opps, promos, forms, anns] = await Promise.all([
          supabase.from('opportunities').select('id', { count: 'exact', head: true }).eq('is_active', true),
          supabase.from('promotions').select('id', { count: 'exact', head: true }).eq('is_active', true),
          supabase.from('formations').select('id', { count: 'exact', head: true }).eq('is_active', true),
          supabase.from('announcements').select('id', { count: 'exact', head: true }).eq('is_active', true),
        ]);

        setStats({
          opportunities: opps.count || 0,
          promotions: promos.count || 0,
          formations: forms.count || 0,
          announcements: anns.count || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Opportunités actives', value: stats.opportunities, icon: Package, color: 'text-blue-600' },
    { title: 'Promotions actives', value: stats.promotions, icon: Tag, color: 'text-green-600' },
    { title: 'Formations publiées', value: stats.formations, icon: GraduationCap, color: 'text-purple-600' },
    { title: 'Annonces actives', value: stats.announcements, icon: Megaphone, color: 'text-orange-600' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
          <p className="text-muted-foreground mt-1">
            Bienvenue, {user?.email}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? '...' : stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Actions rapides
            </CardTitle>
            <CardDescription>
              Accédez rapidement aux fonctionnalités principales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              <QuickAction href="/admin/opportunities" title="Gérer les opportunités" description="Ajouter ou modifier les produits" />
              <QuickAction href="/admin/promotions" title="Gérer les promotions" description="Créer des offres spéciales" />
              <QuickAction href="/admin/formations" title="Gérer les formations" description="Publier des formations" />
              <QuickAction href="/admin/announcements" title="Barre d'annonces" description="Configurer le slider promotionnel" />
              <QuickAction href="/admin/chatbot" title="Paramètres NaYa" description="Configurer le chatbot" />
              <QuickAction href="/admin/contact" title="Informations contact" description="Modifier les coordonnées" />
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

const QuickAction: React.FC<{ href: string; title: string; description: string }> = ({
  href,
  title,
  description,
}) => (
  <a
    href={href}
    className="block p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
  >
    <h3 className="font-medium text-foreground">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </a>
);

export default AdminDashboard;
