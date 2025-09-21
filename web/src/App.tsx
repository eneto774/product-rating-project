import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { ThemeToggle } from './components/theme-toggle'
import { ProductsPage } from './pages/ProductsPage'
import { ProductDetailsPage } from './pages/ProductDetailsPage'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <div className="min-h-screen bg-background">
          <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold">Sistema de Produtos e Avaliações</h1>
              <ThemeToggle />
            </div>
          </header>

          <main>
            <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailsPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
