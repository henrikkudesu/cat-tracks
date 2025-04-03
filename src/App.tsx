import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-tr from-[#121212] to-[#2a2a2a] flex flex-col text-gray-100">
        <header className="py-5">
          <div className="container mx-auto">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center">
                <img
                  src="/assets/cat-guitar.png"
                  alt="Cat with guitar"
                  className="h-20 mr-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-transform duration-300 cursor-pointer hover:scale-110"
                />
                <div>
                  <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9d50bb] to-[#6e48aa]">
                    Cat Tracks
                  </h1>
                  <p className="text-sm mt-1 text-purple-300">
                    Last.fm Collage Generator
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto py-8 px-4 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 py-4 text-center text-sm border-t border-gray-700">
          <div className="container mx-auto">
            <div className="flex items-center justify-center mt-2">
              <p className="text-gray-400">Criado por Leonardo Nascimento</p>
              <a
                href="https://github.com/henrikkudesu"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-gray-400 hover:text-purple-300 transition-colors"
                aria-label="GitHub do Leonardo Nascimento"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
