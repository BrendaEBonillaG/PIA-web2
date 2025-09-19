import type { Route } from "./+types/perfil";
import { Link } from "react-router";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Perfil de Usuario" },
    { name: "description", content: "Página de perfil de usuario" },
  ];
}

export default function Perfil() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // SIMULACIÓN DE DATOS - En el futuro esto vendría de la base de datos
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: "Jorge Antonio",
    lastName: "Sánchez Pérez",
    email: "JASanchez@gmail.com",
    phone: "84 236 2094",
    profileImage: null, // URL de la imagen o null
    joinDate: "2023-05-15",
    reviewsCount: 12,
    isVerified: true
  });

  // Estados para el formulario de edición
  const [editForm, setEditForm] = useState({
    name: currentUser.name,
    lastName: currentUser.lastName,
    email: currentUser.email,
    phone: currentUser.phone
  });

  // SIMULACIÓN - ID del usuario cuyo perfil estamos viendo
  // En el futuro esto vendría de los parámetros de la URL (params)
  const profileUserId = 1; // Cambiar este valor para simular ver otro perfil (ej: 2)
  
  // VALIDACIÓN PRINCIPAL - ¿Es el dueño del perfil?
  const isOwnerProfile = currentUser.id === profileUserId;

  const handleEditToggle = () => {
    if (isEditMode) {
      // Resetear formulario si cancelamos
      setEditForm({
        name: currentUser.name,
        lastName: currentUser.lastName,
        email: currentUser.email,
        phone: currentUser.phone
      });
    }
    setIsEditMode(!isEditMode);
  };

  const handleSaveProfile = () => {
    // Aquí iría la lógica para guardar en la base de datos
    setCurrentUser({
      ...currentUser,
      name: editForm.name,
      lastName: editForm.lastName,
      email: editForm.email,
      phone: editForm.phone
    });
    setIsEditMode(false);
    alert('¡Perfil actualizado exitosamente!');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Aquí iría la lógica para subir la imagen
      const imageUrl = URL.createObjectURL(file);
      setCurrentUser({ ...currentUser, profileImage: imageUrl });
      alert('Imagen cargada exitosamente!');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditForm({ ...editForm, [field]: value });
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
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
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
            {/* Profile Image with Upload functionality */}
            <div className="relative mb-4">
              <div className="w-32 h-32 bg-gray-400 rounded-full mx-auto flex items-center justify-center overflow-hidden relative">
                {currentUser.profileImage ? (
                  <img 
                    src={currentUser.profileImage} 
                    alt="Perfil" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <span className="text-4xl text-gray-600">👤</span>
                    {isOwnerProfile && isEditMode && (
                      <p className="text-xs text-gray-600 mt-1">Cargar Nueva<br/>Foto</p>
                    )}
                  </div>
                )}
                
                {/* Upload overlay for edit mode */}
                {isOwnerProfile && isEditMode && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      title="Cambiar foto de perfil"
                    />
                    <span className="text-white text-xs text-center pointer-events-none">
                      Cargar<br/>Nueva<br/>Foto
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Name Fields */}
            {isEditMode && isOwnerProfile ? (
              <div className="space-y-3 mb-4">
                <input 
                  type="text"
                  value={editForm.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 bg-white border-2 border-gray-300 rounded text-gray-800 text-center font-bold"
                  placeholder="Nombre"
                />
                <input 
                  type="text"
                  value={editForm.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 bg-white border-2 border-gray-300 rounded text-gray-800 text-center"
                  placeholder="Apellidos"
                />
              </div>
            ) : (
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-white mb-2">{currentUser.name}</h2>
                <h3 className="text-xl text-white">{currentUser.lastName}</h3>
              </div>
            )}
            
            {/* Contact Information */}
            {isOwnerProfile && (
              <div className="space-y-3 mb-6">
                {isEditMode ? (
                  <>
                    <input 
                      type="email"
                      value={editForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 bg-white border-2 border-gray-300 rounded text-gray-800 text-center text-sm"
                      placeholder="Correo electrónico"
                    />
                    <input 
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 bg-white border-2 border-gray-300 rounded text-gray-800 text-center"
                      placeholder="Teléfono"
                    />
                  </>
                ) : (
                  <>
                    <p className="text-blue-900 mb-2">
                      <a href={`mailto:${currentUser.email}`} className="underline hover:text-blue-700">
                        {currentUser.email}
                      </a>
                    </p>
                    <p className="text-blue-900">{currentUser.phone}</p>
                  </>
                )}
              </div>
            )}
            
            {/* Información pública para todos los usuarios */}
            {!isOwnerProfile && (
              <div className="mb-6">
                <p className="text-blue-900 text-sm mb-1">Miembro desde</p>
                <p className="text-white">{new Date(currentUser.joinDate).toLocaleDateString('es-ES', { 
                  year: 'numeric', 
                  month: 'long' 
                })}</p>
                <p className="text-blue-900 text-sm mt-2">{currentUser.reviewsCount} reseñas</p>
                {currentUser.isVerified && (
                  <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full mt-2">
                    ✓ Verificado
                  </span>
                )}
              </div>
            )}
            
            {/* Action Buttons */}
            {isOwnerProfile && (
              <div className="space-y-2">
                {isEditMode ? (
                  <div className="space-y-2">
                    <button 
                      onClick={handleSaveProfile}
                      className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors font-semibold"
                    >
                      Guardar
                    </button>
                    <button 
                      onClick={handleEditToggle}
                      className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={handleEditToggle}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Editar Perfil
                  </button>
                )}
              </div>
            )}
            
            {!isOwnerProfile && (
              <div className="space-y-2">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors">
                  💬 Enviar Mensaje
                </button>
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg transition-colors">
                  ⭐ Seguir Usuario
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sección Reseñas */}
        <div className="flex-1">
          <div className="rounded-lg p-8" style={{ backgroundColor: '#5682B1' }}>
            <h1 className="text-3xl font-bold text-white mb-2">
              Reseñas escritas por {currentUser.name}:
            </h1>
            <h2 className="text-xl text-gray-100 mb-6">
              InterContinental Presidente Monterrey
            </h2>

            <div className="mb-8 pb-6 border-b border-gray-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex text-yellow-400 mb-2">
                    {'★★★★★'.split('').map((star, i) => (
                      <span key={i} className="text-xl">{star}</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-200 mb-1">Feedback</p>
                  <p className="text-sm text-gray-200">hace 8 días</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-200 mb-2">Valor del producto</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-3 bg-gray-300 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-amber-500 rounded-full"></div>
                    </div>
                    <span className="text-lg font-semibold text-white">5.0</span>
                  </div>
                </div>
              </div>
              
              <p className="text-white mb-4">
                Todo excelente en la habitación, muy cómoda y lujosa, el servicio de todo el personal es excelente. No me fue muy fácil controlar las luces y todos las funciones de las pantallas táctiles. De igual forma la tasa del baño conidero es algo pequeña.
              </p>
              
              <p className="text-xs text-gray-300 mb-3">Traducir con Google</p>
              
              <div className="mb-3">
                <p className="text-sm text-gray-100"><span className="text-green-400">👍</span> <strong>Ventajas:</strong> Sleep Quality, Location, Amenities, Connects you to the destination</p>
              </div>
              
              <div className="mb-3">
                <p className="text-sm text-gray-100"><span className="text-green-400">●</span> Sí, Recomiendo este producto.</p>
              </div>
              
              <p className="text-sm text-gray-300">1 comentario</p>
            </div>

            <div>
              <div className="mb-4">
                <h3 className="font-semibold text-white mb-1">Americas</h3>
                <p className="text-sm text-gray-200 mb-3">hace 8 días</p>
                <p className="text-gray-100 mb-4">Estimado huésped,</p>
              </div>
              
              <p className="text-white mb-4">
                Muchas gracias por compartirnos su experiencia. Nos alegra saber que disfrutó de la comodidad y el lujo de la habitación, así como de la atención de nuestro equipo.
              </p>
              
              <p className="text-white mb-4">
                Agradecemos también sus observaciones ya que nos ayudan a identificar áreas de mejora para hacer cada estancia aún más confortable.
              </p>
              
              <p className="text-white">
                Será un placer darle nuevamente la bienvenida en su próxima visita a Monterrey.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </div>
  );
}
