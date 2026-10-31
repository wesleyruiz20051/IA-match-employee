# MatchJob · Estudiantes y oportunidades

Vistas sencillas en React, creadas a partir de los datos de `Jev testing.zip`.

## Incluye

- Oportunidades: búsqueda por puesto, empresa, ciudad o habilidad; filtros de área y modalidad; orden por afinidad, remuneración o nombre.
- Estudiantes: búsqueda por nombre, universidad, experiencia y habilidades; filtro por área y detalle de perfil.
- Matching: oportunidades ordenadas para el estudiante seleccionado, con sus proyectos y habilidades como contexto.
- Guardados: selección de oportunidades durante la sesión.
- Detalles en un modal: requisitos, habilidades compartidas, habilidades por desarrollar y aspectos pendientes de revisar.
- Selector de estudiante, navegación y diseño adaptable a móvil.

## Alcance

Interfaz en React. Estudiantes, oportunidades y guardados viven en un solo archivo, `sqlite.db`, en la raíz del proyecto. La primera vez que arranca el servidor, ese archivo se crea y se llena con los JSON de ejemplo. No hay login, llamadas a modelos ni otra base de datos. No se incluyen las credenciales `.env` ni los scripts originales de pruebas.

El porcentaje es **ilustrativo**, calculado localmente para dar contexto a las vistas: habilidades requeridas (55%), área (25%), modalidad (10%) y disponibilidad (10%). La experiencia se presenta como evidencia textual; no se analiza automáticamente. Carrera, año, ubicación e idiomas se muestran para revisión y no representan elegibilidad validada. La interfaz no realiza postulaciones.

## Uso local

Requiere Node.js 20.19+ o 22.12+ y npm.

```sh
npm install
npm run dev
```

`npm run dev` abre la interfaz y el servidor que lee `sqlite.db`. La afinidad se calcula en el navegador con esos datos.

Compilación disponible si posteriormente se necesita:

```sh
npm run build
```

Se instalaron dependencias y se abrió la aplicación únicamente para capturar las pantallas solicitadas. No se ejecutaron pruebas automatizadas ni compilación de producción.

## Estructura

- `src/App.jsx`: navegación y estado compartido.
- `src/components/`: navegación, tarjetas, modal, iconos y elementos reutilizables.
- `src/pages/`: oportunidades, estudiantes y matching. Guardados reutiliza oportunidades.
- `src/data/`: etiquetas, cálculo ilustrativo de afinidad y JSON usados solo para crear `sqlite.db` la primera vez.
- `server/index.js`: API local sobre ese único archivo.
- `src/styles.css`: estilos y adaptación a móvil.

Los textos y datos de estudiantes y vacantes se mantienen tal como se recibieron en el ZIP. No hace falta ningún archivo `.env` para utilizar estas vistas.

## Actualización visual

Interfaz en azules y blancos con navegación lateral, cabecera personalizada, oportunidad destacada a partir del perfil activo, filtros rápidos por área, tarjetas con indicador de afinidad y acciones de guardado. Perfiles, matching, modales y estados vacíos comparten el mismo sistema visual. Incluye navegación inferior en móvil, adaptación a áreas seguras, foco de teclado y preferencia de movimiento reducido. Sin fuentes externas ni nuevas dependencias.

Las capturas de la actualización visual están en `screenshots/`. Se ejecutó únicamente la vista previa necesaria para obtenerlas; no se ejecutaron pruebas automatizadas ni compilación de producción.
