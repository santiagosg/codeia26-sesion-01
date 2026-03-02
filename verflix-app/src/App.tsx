import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { AppProvider } from '@/context/AppContext';
import { HomePage } from '@/pages/HomePage';
import { MoviesPage } from '@/pages/MoviesPage';
import { TVShowsPage } from '@/pages/TVShowsPage';
import { SearchPage } from '@/pages/SearchPage';
import { MovieDetailPage } from '@/pages/MovieDetailPage';
import { TVDetailPage } from '@/pages/TVDetailPage';
import { Footer } from '@/components/layout/Footer';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-background">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/movies/:id" element={<MovieDetailPage />} />
              <Route path="/tv" element={<TVShowsPage />} />
              <Route path="/tv/:id" element={<TVDetailPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
