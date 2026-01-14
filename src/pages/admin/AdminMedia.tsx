import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import {
  Upload,
  Image as ImageIcon,
  Video,
  FileText,
  Music,
  Trash2,
  Copy,
  Eye,
  Loader2,
  Search,
  Filter,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface Media {
  id: string;
  name: string;
  file_path: string;
  url: string;
  mime_type: string;
  size: number;
  media_type: 'image' | 'video' | 'document' | 'audio';
  created_at: string;
}

const ALLOWED_TYPES = {
  'image/jpeg': 'image',
  'image/png': 'image',
  'image/webp': 'image',
  'video/mp4': 'video',
  'application/pdf': 'document',
  'audio/mpeg': 'audio',
} as const;

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getMediaTypeIcon = (type: string) => {
  switch (type) {
    case 'image':
      return <ImageIcon className="h-5 w-5" />;
    case 'video':
      return <Video className="h-5 w-5" />;
    case 'document':
      return <FileText className="h-5 w-5" />;
    case 'audio':
      return <Music className="h-5 w-5" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

const getMediaTypeColor = (type: string) => {
  switch (type) {
    case 'image':
      return 'bg-green-100 text-green-800';
    case 'video':
      return 'bg-purple-100 text-purple-800';
    case 'document':
      return 'bg-blue-100 text-blue-800';
    case 'audio':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const AdminMedia: React.FC = () => {
  const { user } = useAuth();
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMedia((data || []) as Media[]);
    } catch (error) {
      console.error('Error fetching media:', error);
      toast.error('Erreur lors du chargement des médias');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const mimeType = file.type as keyof typeof ALLOWED_TYPES;
    if (!ALLOWED_TYPES[mimeType]) {
      toast.error('Type de fichier non autorisé. Formats acceptés: JPG, PNG, WEBP, MP4, PDF, MP3');
      return;
    }

    // Validate file size (50MB max)
    if (file.size > 52428800) {
      toast.error('Le fichier est trop volumineux. Taille maximale: 50MB');
      return;
    }

    setUploading(true);

    try {
      // Generate unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const mediaType = ALLOWED_TYPES[mimeType];
      const filePath = `${mediaType}s/${fileName}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      // Save to database
      const { error: dbError } = await supabase.from('media').insert({
        name: file.name,
        file_path: filePath,
        url: publicUrl,
        mime_type: file.type,
        size: file.size,
        media_type: mediaType,
        uploaded_by: user?.id,
      });

      if (dbError) throw dbError;

      toast.success('Média téléversé avec succès');
      fetchMedia();
    } catch (error) {
      console.error('Error uploading media:', error);
      toast.error('Erreur lors du téléversement');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = async (mediaItem: Media) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce média ?')) return;

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('media')
        .remove([mediaItem.file_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('media')
        .delete()
        .eq('id', mediaItem.id);

      if (dbError) throw dbError;

      toast.success('Média supprimé avec succès');
      fetchMedia();
    } catch (error) {
      console.error('Error deleting media:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copiée dans le presse-papier');
  };

  const openPreview = (mediaItem: Media) => {
    setSelectedMedia(mediaItem);
    setPreviewOpen(true);
  };

  const filteredMedia = media.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.media_type === filterType;
    return matchesSearch && matchesType;
  });

  const renderPreview = (mediaItem: Media, className?: string) => {
    switch (mediaItem.media_type) {
      case 'image':
        return (
          <img
            src={mediaItem.url}
            alt={mediaItem.name}
            className={cn('object-cover', className)}
          />
        );
      case 'video':
        return (
          <video
            src={mediaItem.url}
            controls
            className={cn('object-cover', className)}
          />
        );
      case 'audio':
        return (
          <div className={cn('flex items-center justify-center bg-muted', className)}>
            <audio src={mediaItem.url} controls className="w-full max-w-md" />
          </div>
        );
      case 'document':
        return (
          <div className={cn('flex items-center justify-center bg-muted', className)}>
            <div className="text-center p-4">
              <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Document PDF</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => window.open(mediaItem.url, '_blank')}
              >
                Ouvrir le PDF
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Médiathèque</h1>
            <p className="text-muted-foreground">
              Gérez vos images, vidéos, documents et fichiers audio
            </p>
          </div>
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".jpg,.jpeg,.png,.webp,.mp4,.pdf,.mp3"
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Téléversement...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Téléverser un média
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un média..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full sm:w-48">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filtrer par type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="image">Images</SelectItem>
                    <SelectItem value="video">Vidéos</SelectItem>
                    <SelectItem value="document">Documents</SelectItem>
                    <SelectItem value="audio">Audios</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Media Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredMedia.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-muted-foreground">
                <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Aucun média trouvé</p>
                <p className="text-sm">
                  {searchTerm || filterType !== 'all'
                    ? 'Essayez de modifier vos filtres'
                    : 'Commencez par téléverser un média'}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredMedia.map((item) => (
              <Card key={item.id} className="overflow-hidden group">
                <div className="aspect-video relative bg-muted">
                  {item.media_type === 'image' ? (
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {getMediaTypeIcon(item.media_type)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => openPreview(item)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => copyUrl(item.url)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDelete(item)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-3">
                  <p className="text-sm font-medium truncate" title={item.name}>
                    {item.name}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge className={cn('text-xs', getMediaTypeColor(item.media_type))}>
                      {item.media_type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatFileSize(item.size)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Preview Dialog */}
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedMedia?.name}</DialogTitle>
              <DialogDescription>
                {selectedMedia && (
                  <div className="flex items-center gap-4 mt-2">
                    <Badge className={getMediaTypeColor(selectedMedia.media_type)}>
                      {selectedMedia.media_type}
                    </Badge>
                    <span>{formatFileSize(selectedMedia.size)}</span>
                    <span>{new Date(selectedMedia.created_at).toLocaleDateString('fr-FR')}</span>
                  </div>
                )}
              </DialogDescription>
            </DialogHeader>
            {selectedMedia && (
              <div className="mt-4">
                {renderPreview(selectedMedia, 'w-full max-h-[60vh] rounded-lg')}
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <Label className="text-xs text-muted-foreground">URL du média</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      value={selectedMedia.url}
                      readOnly
                      className="text-sm"
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => copyUrl(selectedMedia.url)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminMedia;
