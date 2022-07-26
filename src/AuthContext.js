// Para generar un "estado compartido" entre
// diferentes componentes de nuestra
// aplicación, podemos utilizar los contextos.
// Esto se hará a través de un hook.
import {createContext} from 'react';

// Generamos el contexto
const AuthContext = createContext();

export default AuthContext;