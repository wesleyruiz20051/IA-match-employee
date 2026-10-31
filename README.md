# Jev · Estudiantes y oportunidades

Vistas sencillas en React, creadas a partir de los datos de `Jev testing.zip`.

## Incluye

- Oportunidades: búsqueda por puesto, empresa, ciudad o habilidad; filtros de área y modalidad; orden por afinidad, remuneración o nombre.
- Estudiantes: búsqueda por nombre, universidad, experiencia y habilidades; filtro por área y detalle de perfil.
- Matching: oportunidades ordenadas para el estudiante seleccionado, con sus proyectos y habilidades como contexto.
- Guardados: selección de oportunidades durante la sesión.
- Detalles en un modal: requisitos, habilidades compartidas, habilidades por desarrollar y aspectos pendientes de revisar.
- Selector de estudiante, navegación y diseño adaptable a móvil.

## Alcance

Solo frontend con datos JSON del ZIP original. Sin login, servidor, API, base de datos ni llamadas a modelos. Los cambios viven en el estado de React y se pierden al recargar. No se incluyen las credenciales `.env`, el servidor ni los scripts originales de pruebas.

El porcentaje es **ilustrativo**, calculado localmente para dar contexto a las vistas: habilidades requeridas (55%), área (25%), modalidad (10%) y disponibilidad (10%). La experiencia se presenta como evidencia textual; no se analiza automáticamente. Carrera, año, ubicación e idiomas se muestran para revisión y no representan elegibilidad validada. La interfaz no realiza postulaciones.

## Uso local

Requiere Node.js 20.19+ o 22.12+ y npm.

```sh
npm install
npm run dev
```

Compilación disponible si posteriormente se necesita:

```sh
npm run build
```

Se instalaron dependencias y se abrió la aplicación únicamente para capturar las pantallas solicitadas. No se ejecutaron pruebas automatizadas ni compilación de producción.

## Estructura

- `src/App.jsx`: navegación y estado compartido.
- `src/components/`: navegación, tarjetas, modal, iconos y elementos reutilizables.
- `src/pages/`: oportunidades, estudiantes y matching. Guardados reutiliza oportunidades.
- `src/data/`: datos de ejemplo originales y cálculo ilustrativo de afinidad.
- `src/styles.css`: estilos y adaptación a móvil.

Los textos y datos de estudiantes y vacantes se mantienen tal como se recibieron en el ZIP. No hace falta ningún archivo `.env` para utilizar estas vistas.

## Actualización visual

Interfaz en azules y blancos con navegación lateral, cabecera personalizada, oportunidad destacada a partir del perfil activo, filtros rápidos por área, tarjetas con indicador de afinidad y acciones de guardado. Perfiles, matching, modales y estados vacíos comparten el mismo sistema visual. Incluye navegación inferior en móvil, adaptación a áreas seguras, foco de teclado y preferencia de movimiento reducido. Sin fuentes externas ni nuevas dependencias.

Las capturas de la actualización visual están en `screenshots/`. Se ejecutó únicamente la vista previa necesaria para obtenerlas; no se ejecutaron pruebas automatizadas ni compilación de producción.
