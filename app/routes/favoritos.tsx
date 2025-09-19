import type { Route } from "./+types/favoritos";
import { Link } from "react-router";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Favoritos - Jorge Antonio" },
    { name: "description", content: "Lista de lugares favoritos" },
  ];
}

export default function Favoritos() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // SIMULACIÓN DE DATOS - Favoritos del usuario
  const currentUser = {
    id: 1,
    name: "Jorge Antonio",
    lastName: "Sánchez Pérez",
    email: "JASanchez@gmail.com",
    phone: "84 236 2094"
  };

  // Lista de favoritos (datos dummy)
  const favoritesList = [
    {
      id: 1,
      title: "InterContinental Presidente Monterrey",
      type: "Hotel",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
      location: "Monterrey, NL",
      rating: 4.5,
      isFavorite: true
    },
    {
      id: 2,
      title: "Parque Fundidora",
      type: "Lugar turístico",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      location: "Monterrey, NL",
      rating: 4.8,
      isFavorite: true
    },
    {
      id: 3,
      title: "Cerro de la Silla",
      type: "Lugar turístico",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      location: "Monterrey, NL",
      rating: 4.6,
      isFavorite: true
    },
    {
      id: 4,
      title: "Hotel Gran Plaza",
      type: "Hotel",
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop",
      location: "Monterrey, NL",
      rating: 4.3,
      isFavorite: true
    }
  ];

  const handleRemoveFavorite = (id: number) => {
    // Aquí iría la lógica para remover de favoritos
    alert(`Removido de favoritos: ${favoritesList.find(f => f.id === id)?.title}`);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFE8DB' }}>
      {/* Header */}
      <header className="p-4 flex items-center justify-between" style={{ backgroundColor: '#000000' }}>
        {/* Logo (Home button) */}
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <div className="w-12 h-12 bg-white rounded border-2 border-gray-300 flex items-center justify-center">
            <span className="text-black text-xs font-bold">★★★</span>
          </div>
        </Link>
        
        {/* Centered Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="flex justify-center">
            <input 
              type="text" 
              className="w-full max-w-lg px-4 py-2 rounded-lg border-none" 
              placeholder="Buscar..."
            />
            <button className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg ml-2">
              🔍
            </button>
          </div>
        </div>
        
        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
            <span className="text-white">👤</span>
          </div>
          
          {/* Dropdown Menu */}
          <div className="relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <div className="w-8 h-8 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-white"></div>
                <div className="w-full h-0.5 bg-white"></div>
                <div className="w-full h-0.5 bg-white"></div>
              </div>
            </button>
            
            {/* Dropdown Menu Items */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                <Link 
                  to="/perfil" 
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  👤 Perfil
                </Link>
                <Link 
                  to="/favoritos" 
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ❤️ Favoritos
                </Link>
                <hr className="my-1" />
                <button 
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors"
                  onClick={() => {
                    setIsMenuOpen(false);
                    alert('Cerrando sesión...');
                  }}
                >
                  🚪 Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex p-6 space-x-8">
        {/* Left Sidebar - User Profile */}
        <div className="w-1/4">
          <div className="rounded-lg p-6 text-center" style={{ backgroundColor: '#739EC9' }}>
            <div className="w-32 h-32 bg-gray-400 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-6xl text-gray-600">👤</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{currentUser.name}</h2>
            <h3 className="text-xl text-white mb-4">{currentUser.lastName}</h3>
            <p className="text-blue-900 mb-2">
              <a href={`mailto:${currentUser.email}`} className="underline hover:text-blue-700">
                {currentUser.email}
              </a>
            </p>
            <p className="text-blue-900 mb-6">{currentUser.phone}</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
              Editar
            </button>
          </div>
        </div>

        {/* Right Content - Favorites */}
        <div className="flex-1">
          <div className="rounded-lg p-8" style={{ backgroundColor: '#5682B1' }}>
            <h1 className="text-3xl font-bold text-white mb-8">
              Favoritos de {currentUser.name}:
            </h1>

            {/* Favorites Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {favoritesList.map((favorite) => (
                <div key={favorite.id} className="relative">
                  {/* Favorite Card */}
                  <div 
                    className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                    style={{ backgroundColor: '#4A6FA5' }}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={favorite.image} 
                        alt={favorite.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-white leading-tight">
                          {favorite.title}
                        </h3>
                        <span className="text-sm text-gray-200 bg-black bg-opacity-20 px-2 py-1 rounded">
                          ({favorite.type})
                        </span>
                      </div>
                      
                      <p className="text-gray-200 text-sm mb-3">📍 {favorite.location}</p>
                      
                      {/* Rating */}
                      <div className="flex items-center mb-3">
                        <div className="flex text-yellow-400 mr-2">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span key={i} className={i < Math.floor(favorite.rating) ? 'text-yellow-400' : 'text-gray-400'}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-white text-sm">{favorite.rating}</span>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <Link
                          to={`/lugar/${favorite.id}`}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded transition-colors text-sm"
                        >
                          Ver Detalles
                        </Link>
                        <button
                          onClick={() => handleRemoveFavorite(favorite.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition-colors"
                          title="Remover de favoritos"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Favorite Heart Icon */}
                  <button 
                    onClick={() => handleRemoveFavorite(favorite.id)}
                    className="absolute top-3 right-3 w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors shadow-lg z-10"
                    title="Remover de favoritos"
                  >
                    <span className="text-white text-lg">❤️</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {favoritesList.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">💔</div>
                <h2 className="text-2xl text-white mb-2">No tienes favoritos aún</h2>
                <p className="text-gray-200 mb-6">
                  Explora lugares increíbles y agrégatelos a tus favoritos
                </p>
                <Link 
                  to="/buscar"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Explorar Lugares
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Navigation Link */}
      <div className="p-6">
        <Link 
          to="/" 
          className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 font-semibold transition-colors shadow-md"
        >
          ← Volver al Inicio
        </Link>
      </div>
      
      {/* Click outside to close menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </div>
  );
}
