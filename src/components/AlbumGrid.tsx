import { AlbumGridProps } from '../types/lastfm';
import { useRef, useState, useEffect } from 'react';

// Componente de esqueleto para carregamento
const LoadingSkeleton = () => (
  <div className="p-8">
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
    <p className="text-center text-gray-500 mt-4">Carregando álbuns...</p>
  </div>
);

const AlbumGrid = ({ albums, loading, error, gridSize }: AlbumGridProps) => {
  const [dimensions, setDimensions] = useState({ cols: 3, rows: 3 });
  const collageRef = useRef<HTMLDivElement>(null);
  const [exportStatus, setExportStatus] = useState<
    'idle' | 'exporting' | 'success' | 'error'
  >('idle');

  // Parse gridSize e atualiza dimensões
  useEffect(() => {
    if (gridSize) {
      const [cols, rows] = gridSize.split('x').map(Number);
      setDimensions({ cols, rows });
    }
  }, [gridSize]);

  // Limita o número de álbuns com base no tamanho da grade
  const limitedAlbums = albums.slice(0, dimensions.cols * dimensions.rows);

  // Função para exportar a collage como imagem
  const exportCollage = async () => {
    setExportStatus('exporting');

    // Cria um elemento canvas temporário
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Falha ao obter contexto 2D do canvas');
      setExportStatus('error');
      return;
    }

    // Define o tamanho do canvas baseado no número de álbuns
    const albumSize = 300; // Tamanho fixo para cada álbum
    canvas.width = dimensions.cols * albumSize;
    canvas.height = dimensions.rows * albumSize;

    // Preenche o fundo com preto
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    try {
      // Carrega e desenha cada imagem de álbum
      const promises = limitedAlbums.map((album, index) => {
        return new Promise<void>((resolve) => {
          const row = Math.floor(index / dimensions.cols);
          const col = index % dimensions.cols;
          const x = col * albumSize;
          const y = row * albumSize;

          const coverImage =
            album.image.find((img) => img.size === 'large') || album.image[0];
          const img = new Image();

          // Configura crossOrigin para evitar problemas de CORS
          img.crossOrigin = 'anonymous';

          img.onload = () => {
            ctx.drawImage(img, x, y, albumSize, albumSize);
            resolve();
          };

          img.onerror = () => {
            // Desenha um retângulo cinza para imagens que não carregam
            ctx.fillStyle = '#333333';
            ctx.fillRect(x, y, albumSize, albumSize);

            // Adiciona texto do nome do álbum
            ctx.fillStyle = '#ffffff';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(album.name, x + albumSize / 2, y + albumSize / 2);

            resolve();
          };

          img.src = coverImage?.['#text'] || '';
        });
      });

      // Aguarda todas as imagens carregarem
      await Promise.all(promises);

      // Converte para WEBP e faz download
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `lastfm-collage-${gridSize}.webp`;
            link.click();
            URL.revokeObjectURL(url);
            setExportStatus('success');
          } else {
            setExportStatus('error');
          }
        },
        'image/webp',
        0.9
      );
    } catch (err) {
      console.error('Erro ao gerar collage:', err);
      setExportStatus('error');
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
          <p className="text-red-700">Erro: {error}</p>
        </div>
        <p className="text-gray-600">
          Tente novamente com outro nome de usuário ou período.
        </p>
      </div>
    );
  }

  if (!albums.length) {
    return (
      <div className="p-6 text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
          <p className="text-yellow-700">
            Nenhum álbum encontrado para o período selecionado.
          </p>
        </div>
        <p className="text-gray-600">
          Tente outro período ou verifique o nome de usuário.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Exibir contagem de álbuns e tamanho da grid */}
      <div className="mb-6">
        <p className="text-center text-gray-400">
          <span className="font-medium text-purple-400">
            {limitedAlbums.length} álbuns
          </span>{' '}
          em formato {gridSize}
        </p>
      </div>

      {/* Container da collage */}
      <div className="bg-gray-900 p-2 rounded-md mb-6 mx-auto max-w-3xl shadow-lg overflow-hidden">
        <div
          ref={collageRef}
          className="bg-black"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${dimensions.cols}, 1fr)`,
            gap: '1px',
          }}
        >
          {limitedAlbums.map((album, index) => {
            const coverImage =
              album.image.find((img) => img.size === 'large') || album.image[0];

            return (
              <div
                key={`${album.name}-${index}`}
                style={{
                  aspectRatio: '1/1',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={coverImage?.['#text'] || '/placeholder-album.jpg'}
                  alt={`${album.name} por ${album.artist.name}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  title={`${album.name} - ${album.artist.name}`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Botão para exportar a collage */}
      <div className="flex justify-center">
        <button
          onClick={exportCollage}
          disabled={exportStatus === 'exporting'}
          className={`px-6 py-3 bg-[#10b981] text-white rounded-md hover:bg-[#059669] transition-colors shadow-md flex items-center ${
            exportStatus === 'exporting' ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {exportStatus === 'exporting' ? (
            <>
              <div className="h-5 w-5 mr-2 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
              Gerando...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Exportar Collage
            </>
          )}
        </button>
      </div>

      {exportStatus === 'error' && (
        <div className="mt-4 text-center text-red-500">
          Ocorreu um erro ao exportar a collage. Tente novamente.
        </div>
      )}

      {exportStatus === 'success' && (
        <div className="mt-4 text-center text-green-500">
          Collage exportada com sucesso!
        </div>
      )}
    </div>
  );
};

export default AlbumGrid;
