import {useState, useRef, useContext, useReducer} from 'react';

import axios from 'axios';
import FlashMsg from '../FlashMsg';

import AuthContext from '../AuthContext';

const Login = () => {
  const [usuario,setUsuario] = useState('');
  const [password,setPassword] = useState('');

  const [authToken, setAuthToken] = useState('');
  const [infoLogin, setInfoLogin] = useState({});

  const [authInfo,setAuthInfo] = useContext(AuthContext);

  // Ponemos valores por default para rellenar
  // los input de usuario contraseña con los
  // requeridos por el WS.
  // Estos se accesan a través de la propiedad
  // «current» de la referencia.
  const refUsuario = useRef('kminchelle');
  const refPassword = useRef('0lelplR');

  const hazLogin = () => {
    axios.post(
      'https://dummyjson.com/auth/login',
      JSON.stringify({
        username: refUsuario.current.value,
        password: refPassword.current.value
      }),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(
      (resp) => {
        console.log(`RESP: ${JSON.stringify(resp)}`);

        console.log(`JWT: ${resp.data.token}`);

        setAuthToken(resp.data.token);

        setInfoLogin(resp.data);
        setAuthInfo(resp.data);

        // Si el loggeo es correcto entonces
        // guardamos el token en el
        // «localStorage»
        localStorage.setItem('jwt', resp.data.token);

        // Como el «localStorage» solo lee
        // y escribe strings, hacemos uso
        // de «JSON.stringify()» y de
        // «JSON.parse()» para poder
        // escribir y leer datos
        // respectivamente.

        // Como ejemplo, guardemos los datos
        // del usuario loggeado, que sabemos,
        // es un objeto.
        localStorage.setItem(
          'uinfo',
          JSON.stringify(resp.data)
        );

        // Como simple ejemplo, leamos y
        // mostremos en la consola, lo que
        // se guardó en el «localStorage»
        let uinfo_string = localStorage.getItem('uinfo');
        console.log(`uinfo_string: ${uinfo_string}`);

        // Convertimos el string en un
        // objeto de JS
        let uinfo_obj = JSON.parse(uinfo_string);
        // Imprimimos el objeto
        console.log(`uinfo_obj: ${uinfo_obj}`);
        // Comprobando que podemos acceder
        // a los elementos del objeto, 
        // imprimos, por ejemplo el email
        console.log(`uinfo_obj_email: ${uinfo_obj.email}`);
      }
    )
    .catch(
      (error) => {
        console.log(`ERROR: ${error}`);

        setAuthToken('');
        setInfoLogin({});
        setAuthInfo();

        // Como ocurrió algún error de
        // loggeo, nos aseguramos de eliminar
        // el token del «localStorage»
        localStorage.removeItem('jwt');
      }
    )
  }

  const enviaForma = (evento) => {
    evento.preventDefault();

    console.log(`Usuario: *${refUsuario.current?.value}*\nContraseña: *${refPassword.current?.value}*`);

    hazLogin();
  }

  
  // Para utilizar el hook useReducer,
  // necesitamos un estado inicial y un
  // "reductor".

  // El reductor es una función que se
  // encargará de tomar un estado y a 
  // partir de una acción definida,
  // modificarlo acorde a los requerimientos.
  const redInitState = {
    altura: 300
  }

  // Es una función que toma el estado
  // actual y una acción como argumentos y
  // devuelve un estado actualizado
  // acorde a la acción solicitada.
  const redReducer = (state, action) => {
    console.log(`[REstadoAnterior]=*${JSON.stringify(state)}* ; [RAction]=*${JSON.stringify(action)}*`);

    switch(action.type) {
      case 'crecer': {
        // Si la acción solicitada es «crecer»
        // el nuevo tendrá una propiedad
        // «altura» que será igual al 110%
        // de la altura anterior.
        return {
          altura: state.altura * 1.10
        }
      }
      case 'reducir': {
        // Si deseamos reducir, el nuevo
        // valor de la altura será el
        // 90% de la anterior.
        return {
          altura: state.altura * 0.90
        }
      }
      case 'normal': {
        // Si deseamos que el tamaño sea
        // el "normal" (default), entonces
        // lo fijamos.
        return {
          altura: 300
        }
      }
      default: {
        // Si el tipo de acción es distinto
        // a "crecer", "reducir" o "normal",
        // dejamos el estado sin modificar.
        return state;
      }
    }
  }

  // Ya tenemos el estado inicial para
  // «useReducer» así como la función
  // reductora. Ahora:
  const [redState, redDispatch] = useReducer(redReducer, redInitState);
  // Donde «redDispatch» es una función
  // que sirve para actualizar el estado.

  return (
    <>      
      {
        authInfo == null
          ?
          <>
          <h3>Ingrese sus datos para continuar</h3>
          
          <FlashMsg tiempo={2500}>
            <h4>No está autenticado.</h4>
          </FlashMsg>

          <form onSubmit={enviaForma}>
            <label htmlFor="">
              Usuario:
              <input
                ref={refUsuario}
                defaultValue={refUsuario.current}
                type="text" />
            </label><br />

            <label htmlFor="">
              Contraseña:
              <input
                ref={refPassword}
                defaultValue={refPassword.current}
                type="password" />
            </label> <br />

            <input type="submit" value="Ingresar" />
          </form></>
        :
        <div>
          <h3>Usuario loggeado</h3>
          <button
            onClick={
              () => redDispatch(
                {type: 'crecer'}
              )
            }
          >
            Crecer imagen
          </button>

          <button
            onClick={
              () => redDispatch(
                {type: 'reducir'}
              )
            }
          >
            Reducir imagen
          </button>

          <button
            onClick={
              () => redDispatch(
                {type: 'normal'}
              )
            }
          >
            Imagen a tamaño default
          </button>

          <img 
            style={{height: redState.altura}}
            className='row' 
            src={authInfo.image} />

          <i>{authInfo.email}</i>
        </div>
      }
    </>
  )
}

export default Login;