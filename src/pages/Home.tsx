import { useState, FormEvent } from 'react';
import AlbumGrid from '../components/AlbumGrid';
import { useTopAlbums } from '../hooks/useTopAlbums';

const Home = () => {
  const [username, setUsername] = useState('');
  const [activeUser, setActiveUser] = useState('');
  const [period, setPeriod] = useState('7day');
  const [gridSize, setGridSize] = useState('3x3');

  // Só buscar álbuns quando o usuário for definido
  const { albums, loading, error } = useTopAlbums(activeUser, period);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setActiveUser(username);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Cartão principal */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8 border border-gray-700">
        <h2 className="text-xl font-semibold text-purple-300 mb-4 text-center">
          Gere sua collage de álbuns do Last.fm
        </h2>

        {/* Formulário de busca */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Input de usuário */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Nome de usuário:
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu nome de usuário do Last.fm"
                className="w-full px-4 py-2 bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-[#9d50bb] to-[#6e48aa] text-white font-medium rounded-md hover:opacity-90 transition-opacity shadow-sm"
              >
                Buscar
              </button>
            </div>
          </div>

          {/* Seleção de período e tamanho */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="period"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Período:
              </label>
              <select
                id="period"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none transition-all"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem',
                }}
              >
                <option value="7day">Últimos 7 dias</option>
                <option value="1month">Últimos 30 dias</option>
                <option value="3month">Últimos 90 dias</option>
                <option value="6month">Últimos 180 dias</option>
                <option value="12month">Últimos 365 dias</option>
                <option value="overall">Todo o tempo</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="gridSize"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Tamanho da Collage:
              </label>
              <select
                id="gridSize"
                value={gridSize}
                onChange={(e) => setGridSize(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none transition-all"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem',
                }}
              >
                <option value="3x3">3x3 (9 álbuns)</option>
                <option value="4x4">4x4 (16 álbuns)</option>
                <option value="5x5">5x5 (25 álbuns)</option>
                <option value="10x10">10x10 (100 álbuns)</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      {/* Área de resultados */}
      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700">
        {!activeUser && !loading && (
          <div className="p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-gray-500 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
            <p className="text-gray-400">
              Digite seu nome de usuário do Last.fm para visualizar seus álbuns
              mais ouvidos
            </p>
          </div>
        )}

        {activeUser && (
          <AlbumGrid
            albums={albums}
            loading={loading}
            error={error}
            gridSize={gridSize}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
