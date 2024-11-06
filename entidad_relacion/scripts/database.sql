-- Database: srfm_db

-- DROP DATABASE IF EXISTS srfm_db;
CREATE DATABASE srfm_db
    WITH
    OWNER = encinas
    ENCODING = 'UTF8'
    LC_COLLATE = 'es_ES.UTF-8'
    LC_CTYPE = 'es_ES.UTF-8'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;


CREATE TABLE Paciente (
    id_paciente SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    celular VARCHAR(20),
    email TEXT,
    fecha_de_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Especialidad (
    id_especialidad SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

CREATE TABLE Doctor (
    id_doctor SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    celular VARCHAR(20),
    fecha_de_contratacion DATE NOT NULL,
    id_especialidad INT REFERENCES Especialidad(id_especialidad) ON DELETE SET NULL
);

CREATE TABLE Consultorio (
    id_consultorio SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ubicacion TEXT,
    id_doctor INT REFERENCES Doctor(id_doctor) ON DELETE CASCADE
);

CREATE TABLE Disponibilidad_Doctor (
    id_disponibilidad SERIAL PRIMARY KEY,
    dia_semana VARCHAR(20) NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    id_doctor INT REFERENCES Doctor(id_doctor) ON DELETE CASCADE
);

CREATE TABLE Cita (
    id_cita SERIAL PRIMARY KEY,
    id_paciente INT REFERENCES Paciente(id_paciente) ON DELETE CASCADE,
    id_doctor INT REFERENCES Doctor(id_doctor) ON DELETE CASCADE,
    fecha_cita DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_final TIME NOT NULL,
    estado VARCHAR(50) NOT NULL
);