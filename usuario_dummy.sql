-- Script para agregar usuario dummy con ID 1
-- Ejecuta esto en HeidiSQL

USE Web2;

-- Primero, asegurarnos de que no existe un usuario con ID 1
DELETE FROM Usuario WHERE IDUsuario = 1;

-- Reiniciar el AUTO_INCREMENT para asegurar que el próximo ID sea 1
ALTER TABLE Usuario AUTO_INCREMENT = 1;

-- Insertar el usuario dummy con ID 1
INSERT INTO Usuario (Usuario, Nombre, Correo, Telefono, Password, Foto, Activo) VALUES 
('jorge_antonio', 'Jorge Antonio Sánchez Pérez', 'JASanchez@gmail.com', '84 236 2094', 'dummy_password_hash', NULL, 1);

-- Verificar que se insertó correctamente
SELECT 'Usuario insertado correctamente:' as Mensaje;
SELECT IDUsuario, Usuario, Nombre, Correo, Telefono, Activo FROM Usuario WHERE IDUsuario = 1;
