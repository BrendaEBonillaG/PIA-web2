-- Script para insertar datos de prueba en la base de datos Web2
-- Ejecuta esto en HeidiSQL para probar la aplicación

USE Web2;

-- Insertar usuario de prueba (ID 1)
INSERT INTO Usuario (Usuario, Nombre, Correo, Telefono, Password, Activo) VALUES 
('jorge_antonio', 'Jorge Antonio Sánchez Pérez', 'JASanchez@gmail.com', '84 236 2094', 'password_hash', 1);

-- Insertar algunos lugares de ejemplo
INSERT INTO Lugar (Nombre, Direccion, Info, Tipo, Activo) VALUES 
('InterContinental Presidente Monterrey', 'Av. Revolución 300, Centro, 64000 Monterrey, N.L.', 'Hotel de lujo en el centro de Monterrey con servicios de primera clase', 'Hospedaje', 1),
('Parque Fundidora', 'Av. Fundidora y Acero s/n, Obrera, 64010 Monterrey, N.L.', 'Gran parque urbano con áreas verdes, museo y actividades recreativas', 'turístico', 1),
('Cerro de la Silla', 'Guadalupe, N.L.', 'Montaña emblemática de Monterrey, ideal para senderismo y vistas panorámicas', 'turístico', 1);

-- Insertar algunas reseñas de ejemplo
INSERT INTO Resenas (Calificacion, Fecha, Texto, Ventajas, Recomendacion, LugarFK, UsuarioFK, Activo) VALUES 
(5, NOW(), 'Todo excelente en la habitación, muy cómoda y lujosa, el servicio de todo el personal es excelente. No me fue muy fácil controlar las luces y todos las funciones de las pantallas táctiles. De igual forma la tasa del baño considero es algo pequeña.', 'Sleep Quality, Location, Amenities, Connects you to the destination', 1, 1, 1, 1),
(4, DATE_SUB(NOW(), INTERVAL 15 DAY), 'Excelente parque para actividades familiares. Muy bien cuidado y con buenas instalaciones.', 'Amplios espacios verdes, seguridad, actividades para niños', 1, 2, 1, 1),
(5, DATE_SUB(NOW(), INTERVAL 30 DAY), 'Una experiencia única subir al Cerro de la Silla. Las vistas son espectaculares y vale mucho la pena el esfuerzo.', 'Vistas panorámicas, ejercicio, contacto con la naturaleza', 1, 3, 1, 1);

-- Insertar algunos favoritos
INSERT INTO Favoritos (UsuarioFK, LugarFK) VALUES 
(1, 1),
(1, 2);

-- Insertar algunos servicios
INSERT INTO Servicios (Nombre, Activo) VALUES 
('WiFi Gratis', 1),
('Estacionamiento', 1),
('Piscina', 1),
('Gimnasio', 1),
('Restaurant', 1),
('Aire Acondicionado', 1);

-- Asociar servicios con lugares
INSERT INTO Lugar_Servicio (IDLugar, IDServicio) VALUES 
(1, 1), -- Hotel tiene WiFi
(1, 2), -- Hotel tiene estacionamiento
(1, 3), -- Hotel tiene piscina
(1, 4), -- Hotel tiene gimnasio
(1, 5), -- Hotel tiene restaurant
(1, 6), -- Hotel tiene aire acondicionado
(2, 1), -- Parque tiene WiFi
(2, 2); -- Parque tiene estacionamiento

-- Verificar que los datos se insertaron correctamente
SELECT 'Usuarios insertados:' as Info;
SELECT * FROM Usuario;

SELECT 'Lugares insertados:' as Info;
SELECT * FROM Lugar;

SELECT 'Reseñas insertadas:' as Info;
SELECT * FROM Resenas;

SELECT 'Favoritos insertados:' as Info;
SELECT * FROM Favoritos;
