// Podemos utilizar SASS en un proyecto de
// React simplemente usando archivos con
// extensión «scss» e instalando en el
// proyecto el paquete sass:
//    npm install sass
import './App.scss';

import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './pages/Layout';
import E404 from './pages/E404';
import Home from './pages/Home';
import Login from './pages/Login';
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import Usuarios from './pages/Usuarios';

import AuthContext from './AuthContext';

function App() {
  // El contexto será compartido (accesible)
  // por todos los componentes hijos que se
  // encuentren dentro de la etiqueta
  // de proveedor de contexto.

  // Al usar el contexto en otros componentes
  // no disponemos de manera directa de un
  // medio para establecer un nuevo valor del
  // contexto mismo. Para lograrlo, hacemos
  // uso de las características de JS.
  // En este caso, utilizamos un estado para
  // guardar los valores que necesitamos y
  // los pasamos como "valores" al contexto.

  // En principio este "state" es únicamente
  // local a «App»
  const [authInfo, setAuthInfo] = useState();

  return (
    // El contexto, espera en su atributo
    // «value» un valor para él. Nada nos
    // impide establecer un arreglo.
    // En este caso el primer elemento del
    // arreglo es el "setter" de nuestro
    // "estado local a App", y el segundo
    // elemento del arreglo pasado como valor
    // al contexto es el "getter" de nuestro
    // "estado local a App".
    <AuthContext.Provider value={[authInfo, setAuthInfo]}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />

            <Route path='login' element={<Login />} />
            <Route path='productos' element={<Productos />} />
            <Route path='carrito' element={<Carrito />} />
            <Route path='usuarios' element={<Usuarios loggeado={false} />} />

            <Route path='*' element={<E404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
