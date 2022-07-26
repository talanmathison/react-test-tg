import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import axios from 'axios';

// Añadimos un interceptor de axios para
// agregar el token de JWT a cada petición.

// Usaremos los «interceptors» de axios para
// poder añadir el header de autenticación
// a las peticiones de axios, sin tener que
// hacerlo de manera individual.

// Como en este punto no estamos dentro de
// un componente de React, no tenemos acceso
// al Context, esto por la reglas de los hooks
// las cuales no nos permiten usarlos fuera
// de un componente de React.
// Solventaremos esto usando una funcionalidad
// de Javascript llamada «localStorage» que
// almacena información en "el navegador"
// a modo de "clave: valor".

// En caso de que queramos un almacenamiento
// "temporal", entonces usamos
// «sessionStorage» que funciona del mismo
// modo que «localStorage», pero que pierde
// u olvida los datos cuando se cierra
// el navegador.

// El método «getItem(key)» lee la
// información almacenada bajo la clave «key»
// como un string. En caso de que no la 
// encuentre, regresará «null»
// Tratamos de leer el token de
// autenticación guardado.

axios.interceptors.request.use(
  request => {
    // En este punto tenemos disponible
    // cualquier petición que se realice de
    // axios, para poder modificar su 
    // contenido, sin intervención del
    // método que la llamó inicialmente.
    console.log(`Petición de Axios iniciada: ${request.url}`);

    // Una manera de filtrar las peticiones,
    // es a través de la URL, por ejemplo
    if(request.url.includes('user')) {
      // En este caso podemos procesar aquí
      // de manera específica las peticiones
      // de Axios que contengan la palabra
      // "user" en algún lugar de la URL.
    }

    // Otro ejemplo es el procesar aparte
    // todas las peticiones de borrado
    // usando el verbo HTTP DELETE
    if(request.method.toLowerCase() == 'delete') {
      // Entonces hacemos algo con la
      // petición.
    }

    // Leemos el JWT del localStorage
    let jwt = localStorage.getItem('jwt');

    console.log(`Agregando localJWT a la petición Axios: ${jwt}`);

    // Modificamos los headers para incluir
    // el portador «bearer» de la autorizción,
    // es decir, el token JWT.
    request.headers['Authorization'] = `Bearer ${jwt}`;

    // Ya que se ha trabajado / modificado
    // el contenido de la petición, se
    // devuelve la misma para que continue su
    // proceso normal.
    return request;
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Ejercicio 01
//    Añadir un elemento «Usuarios» al menú
//    donde se listen los usuarios devueltos
//    por el WS. Cada uno de los usuarios
//    de la lista, debe tener 2 botones:
//      - Borrar usuario.
//      - Mostrar usuario (info extendida).
//    Además, la página «Usuarios» sólo
//    deberá ser accesible si se está
//    autenticado correctamente.
//    Para las peticiones que borran usuarios
//    debe contemplarse el uso de la 
//    autenticación mediante el token
//    correspondiente.

reportWebVitals(console.log);
