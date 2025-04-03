export interface LastfmAlbumImage {
  size: 'small' | 'medium' | 'large' | 'extralarge';
  '#text': string; // URL da imagem
}

export interface LastfmAlbum {
  name: string;
  artist: {
    name: string;
    url: string;
  };
  url: string;
  image: LastfmAlbumImage[];
  playcount: number;
  mbid?: string; // MusicBrainz ID (opcional)
}

export interface AlbumGridProps {
  albums: LastfmAlbum[];
  loading: boolean;
  error: string | null;
  gridSize: string; // Tamanho da grade (ex: "3x3", "4x4", etc.)
}
