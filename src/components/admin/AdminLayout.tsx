import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  Package,
  Tag,
  GraduationCap,
  Megaphone,
  MessageSquare,
  Phone,
  Settings,
  Users,
  FileText,
  LogOut,
  Menu,
  X,
  Image,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Tableau de bord', href: '/admin/dashboard' },
  { icon: Image, label: 'Médiathèque', href: '/admin/media' },
  { icon: Package, label: 'Opportunités', href: '/admin/opportunities' },
  { icon: Tag, label: 'Promotions', href: '/admin/promotions' },
  { icon: GraduationCap, label: 'Formations', href: '/admin/formations' },
  { icon: Megaphone, label: 'Annonces', href: '/admin/announcements' },
  { icon: FileText, label: 'Pages', href: '/admin/pages' },
  { icon: MessageSquare, label: 'Chatbot NaYa', href: '/admin/chatbot' },
  { icon: Phone, label: 'Contact', href: '/admin/contact' },
  { icon: Users, label: 'Utilisateurs', href: '/admin/users', adminOnly: true },
  { icon: Settings, label: 'Paramètres', href: '/admin/settings', adminOnly: true },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin');
  };

  const filteredMenuItems = menuItems.filter(
    (item) => !item.adminOnly || isAdmin
  );

  return (
    <div className="min-h-screen bg-muted">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background border-b z-50 flex items-center justify-between px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
        <span className="font-bold text-navy">Flash Trade Admin</span>
        <Button variant="ghost" size="icon" onClick={handleSignOut}>
          <LogOut className="h-5 w-5" />
        </Button>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-background border-r z-50 transform transition-transform duration-200',
          'lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-16 flex items-center justify-center border-b">
          <Link to="/admin/dashboard" className="font-bold text-xl text-navy">
            Flash Trade
          </Link>
        </div>
        
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <nav className="p-4 space-y-1">
            {filteredMenuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  location.pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </ScrollArea>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background">
          <div className="text-sm text-muted-foreground mb-2 truncate">
            {user?.email}
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
