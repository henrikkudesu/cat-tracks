import { useEffect, useState } from 'react';
import { getTopAlbums } from '../services/lastfm';
import { LastfmAlbum } from '../types/lastfm';

export const useTopAlbums = (user: string, period: string) => {
  const [albums, setAlbums] = useState<LastfmAlbum[]>([]);
  const [loading, setLoading] = useState(false); // Iniciar como false
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Não fazer nada se o usuário estiver vazio
    if (!user) {
      setAlbums([]);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();

    const fetchAlbums = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getTopAlbums(user, period, controller.signal);
        setAlbums(data);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message || 'Erro ao buscar álbuns');
          console.error('Erro no hook useTopAlbums:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();

    return () => {
      controller.abort();
    };
  }, [user, period]);

  return { albums, loading, error };
};
