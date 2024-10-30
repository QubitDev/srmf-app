INSERT INTO especialidad (id_especialidad, nombre, descripcion) VALUES
(1, 'Cardiología', 'Especialidad en el tratamiento de enfermedades del corazón.'),
(2, 'Dermatología', 'Especialidad en el tratamiento de enfermedades de la piel.'),
(3, 'Neurología', 'Especialidad en el tratamiento de enfermedades del sistema nervioso.'),
(4, 'Pediatría', 'Especialidad en el tratamiento de niños.'),
(5, 'Gastroenterología', 'Especialidad en el tratamiento de enfermedades digestivas.'),
(6, 'Oftalmología', 'Especialidad en el tratamiento de enfermedades de los ojos.'),
(7, 'Ortopedia', 'Especialidad en el tratamiento de enfermedades óseas.'),
(8, 'Psiquiatría', 'Especialidad en salud mental.'),
(9, 'Neumología', 'Especialidad en enfermedades respiratorias.'),
(10, 'Endocrinología', 'Especialidad en enfermedades hormonales.');

INSERT INTO doctor (id_doctor, nombre, apellido, celular, fecha_de_contratacion, id_especialidad) VALUES
(1, 'Carlos', 'Pérez', '123456789', '2020-01-01', 1),
(2, 'Marta', 'García', '234567890', '2019-03-15', 2),
(3, 'Juan', 'Martínez', '345678901', '2018-07-23', 3),
(4, 'Ana', 'López', '456789012', '2021-05-10', 4),
(5, 'Luis', 'Gómez', '567890123', '2022-02-17', 5),
(6, 'Sofía', 'Hernández', '678901234', '2017-11-28', 6),
(7, 'José', 'Jiménez', '789012345', '2020-08-30', 7),
(8, 'Laura', 'Rodríguez', '890123456', '2016-04-21', 8),
(9, 'David', 'Fernández', '901234567', '2021-12-05', 9),
(10, 'Paula', 'Suárez', '012345678', '2019-06-14', 10);

INSERT INTO paciente (id_paciente, nombre, apellido, fecha_nacimiento, celular, direccion) VALUES
(1, 'José', 'Alvarez', '1990-03-15', '123456789', 'Calle Falsa 123'),
(2, 'Maria', 'Gómez', '1985-07-22', '234567890', 'Calle Luna 456'),
(3, 'Lucía', 'Martínez', '2000-11-10', '345678901', 'Av. Estrellas 789'),
(4, 'Jorge', 'Sánchez', '1975-09-12', '456789012', 'Calle Verde 321'),
(5, 'Ana', 'Fernández', '1982-02-20', '567890123', 'Calle Roja 654'),
(6, 'Carlos', 'Pérez', '1998-05-30', '678901234', 'Av. Amarilla 987'),
(7, 'Laura', 'Rodríguez', '1993-08-25', '789012345', 'Calle Azul 159'),
(8, 'David', 'López', '1988-12-15', '890123456', 'Calle Negra 753'),
(9, 'Sofía', 'Jiménez', '2003-03-07', '901234567', 'Calle Blanca 951'),
(10, 'Luis', 'Torres', '1995-06-18', '012345678', 'Av. Gris 258');

INSERT INTO consultorio (id_consultorio, nombre, ubicacion, id_doctor) VALUES
(1, 'Consultorio 1', 'Edificio A, Piso 1', 1),
(2, 'Consultorio 2', 'Edificio B, Piso 3', 2),
(3, 'Consultorio 3', 'Edificio C, Piso 2', 3),
(4, 'Consultorio 4', 'Edificio D, Piso 4', 4),
(5, 'Consultorio 5', 'Edificio E, Piso 5', 5),
(6, 'Consultorio 6', 'Edificio F, Piso 6', 6),
(7, 'Consultorio 7', 'Edificio G, Piso 7', 7),
(8, 'Consultorio 8', 'Edificio H, Piso 8', 8),
(9, 'Consultorio 9', 'Edificio I, Piso 9', 9),
(10, 'Consultorio 10', 'Edificio J, Piso 10', 10);

INSERT INTO disponibilidad_Doctor (id_disponibilidad, dia_semana, hora_inicio, hora_fin, id_doctor) VALUES
(1, 'Lunes', '09:00', '13:00', 1),
(2, 'Martes', '10:00', '14:00', 2),
(3, 'Miércoles', '11:00', '15:00', 3),
(4, 'Jueves', '09:00', '13:00', 4),
(5, 'Viernes', '10:00', '14:00', 5),
(6, 'Sábado', '11:00', '15:00', 6),
(7, 'Lunes', '09:00', '13:00', 7),
(8, 'Martes', '10:00', '14:00', 8),
(9, 'Miércoles', '11:00', '15:00', 9),
(10, 'Jueves', '09:00', '13:00', 10);

INSERT INTO cita (id_cita, id_paciente, id_doctor, fecha_cita, hora_inicio, hora_final, estado) VALUES
(1, 1, 1, '2024-10-20', '10:00', '11:00', 'Pendiente'),
(2, 2, 2, '2024-10-21', '11:00', '12:00', 'Pendiente'),
(3, 3, 3, '2024-10-22', '09:00', '10:00', 'Pendiente'),
(4, 4, 4, '2024-10-23', '13:00', '14:00', 'Pendiente'),
(5, 5, 5, '2024-10-24', '14:00', '15:00', 'Pendiente'),
(6, 6, 6, '2024-10-25', '10:00', '11:00', 'Pendiente'),
(7, 7, 7, '2024-10-26', '12:00', '13:00', 'Pendiente'),
(8, 8, 8, '2024-10-27', '15:00', '16:00', 'Pendiente'),
(9, 9, 9, '2024-10-28', '09:00', '10:00', 'Pendiente'),
(10, 10, 10, '2024-10-29', '11:00', '12:00', 'Pendiente');
