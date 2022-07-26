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
  - Ejecutamos en la terminal de nuestro proyecto:
    - Inicializamos el repos local: `git init`
    - Agreamos todos nuestros archivos al tracker de GIT: `git add .`
    - Guardamos los cambios: `git commit -m "Initial commit"`
    - Establecemos la rama a main: `git branch -M main`
    - Designamos la URL remota del repositorio en Github: `git remote add origin MI_URL`
    - Enviamos los cambios a Github: `git push -u origin main`
  - Abrimos `package.json` y agregamos:
  ```
  "homepage": "https://MI_USUARIO.github.io/MI_PROYECTO"
  ```
  - Ejecutamos: `npm run deploy`
  - Como estamos en un proyecto de Github, esto se ve en la URL pública como un _directorio_. Entonces, debemos establecer en `BrowserRouter` la _base_ de la página:
  ```
  <BrowserRouter basename={process.env.PUBLIC_URL}>
  ```
  - Al cambiar algo, debemos hacer siempre un `npm run deploy` para subir los cambios a producción en Github Pages.
  - Si se hace un _deploy_ se actualiza automáticamente la rama `gh-pages` del repos, pero *NO* se subió el código a `main`, debemos hacer un commit y un push manuales.

## Netlify (Web)

  - Crear una cuenta nueva en: https://www.netlify.com/
  - Agregar un nuevo sitio:
    - El sitio lo importamos, es decir, usamos la opción _import an existing project_.
    - Seleccionamos la importación desde Github.
    - Elegimos el repos adecuado y la rama (_branch_).
    - Damos click en _Deploy site_.
  - Si el _deploy_ falla, vamos a inspeccionar el log.
  - Notamos que los _warnings_ están siendo tratados como errores.
  - Vamos a _Site settings_ -> _Build & deploy_  -> _Build Settings_ -> _Edit_
  - Nos aseguramos de que en _Build command_ esté escrito:
  ```
  CI='' npm run build
  ```
  - Regresamos a _Deploys_ y buscamos el botón _Trigger deploy_ -> Deploy site_.