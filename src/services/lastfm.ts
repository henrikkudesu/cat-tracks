import axios from 'axios';
import { LastfmAlbum } from '../types/lastfm';

const API_KEY = import.meta.env.VITE_LASTFM_API_KEY || 'LASTFM_API_KEY';
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

export const getTopAlbums = async (
  user: string,
  period: string = '7day',
  signal?: AbortSignal
): Promise<LastfmAlbum[]> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        method: 'user.gettopalbums',
        user,
        api_key: API_KEY,
        format: 'json',
        period,
      },
      signal,
    });
    return response.data.topalbums.album;
  } catch (error) {
    console.error('Erro ao buscar os álbuns:', error);
    throw error;
  }
};
