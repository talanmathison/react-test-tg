# Instrucciones para hosting

## Firebase

  - Crear una cuenta en https://console.firebase.google.com/
  - Crear un nuevo proyecto en Firebase.
  - Instalar localmente: `npm install firebase-tools`
  - Ingresamos al servicio desde la CLI: `firebase login`
  - Inicializamos el servicio de hosting para nuestro proyecto: `firebase init hosting`
    - Podemos crear un proyecto nuevo o usar uno existente.
    - Si nuestro sitio fue creado `create-react-app`, entonces *NO* debemos establecer como directorio público a `public` sino a `build`.
    - Configuramos como SPA.
  - Construimos nuestro sitio para producción: `npm run build`
  - Enviamos el sitio de producción a Firebase: `firebase deploy`

## Github Pages

  - Instalamos las herramientas de linea de comandos de Github Pages: `npm install gh-pages`
  - Abrir `package.json` y agregar en la sección `scripts`:
  ```
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
  ```
  - Vamos a Github y creamos un nuevo repo.