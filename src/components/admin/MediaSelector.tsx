import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { Image as ImageIcon, Video, FileText, Music, X, Search, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Media {
  id: string;
  name: string;
  url: string;
  mime_type: string;
  media_type: string;
}

interface MediaSelectorProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
  accept?: ('image' | 'video' | 'document' | 'audio')[];
}

const getMediaTypeIcon = (type: string) => {
  switch (type) {
    case 'image':
      return <ImageIcon className="h-4 w-4" />;
    case 'video':
      return <Video className="h-4 w-4" />;
    case 'document':
      return <FileText className="h-4 w-4" />;
    case 'audio':
      return <Music className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const MediaSelector: React.FC<MediaSelectorProps> = ({
  value,
  onChange,
  label = "Image",
  placeholder = "URL de l'image ou sélectionner depuis la médiathèque",
  accept = ['image'],
}) => {
  const [open, setOpen] = useState(false);
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMedia = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('media')
        .select('id, name, url, mime_type, media_type')
        .order('created_at', { ascending: false });

      if (accept.length > 0 && accept.length < 4) {
        query = query.in('media_type', accept);
      }

      const { data, error } = await query;

      if (error) throw error;
      setMedia((data || []) as Media[]);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchMedia();
    }
  }, [open]);

  const filteredMedia = media.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (url: string) => {
    onChange(url);
    setOpen(false);
  };

  const clearValue = () => {
    onChange('');
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="pr-8"
          />
          {value && (
            <button
              type="button"
              onClick={clearValue}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" size="icon">
              <ImageIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Sélectionner un média</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredMedia.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Aucun média trouvé</p>
                  <p className="text-sm">
                    Ajoutez des médias depuis la page Médiathèque
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-[400px]">
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 p-1">
                    {filteredMedia.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelect(item.url)}
                        className={cn(
                          'relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:border-primary focus:border-primary focus:outline-none',
                          value === item.url ? 'border-primary ring-2 ring-primary/20' : 'border-transparent'
                        )}
                      >
                        {item.media_type === 'image' ? (
                          <img
                            src={item.url}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex flex-col items-center justify-center gap-2 p-2">
                            {getMediaTypeIcon(item.media_type)}
                            <span className="text-xs text-muted-foreground text-center truncate w-full">
                              {item.name}
                            </span>
                          </div>
                        )}
                        {value === item.url && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <div className="bg-primary text-primary-foreground rounded-full p-1">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {value && accept.includes('image') && (
        <div className="mt-2">
          <img
            src={value}
            alt="Aperçu"
            className="h-20 w-auto rounded border object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MediaSelector;
