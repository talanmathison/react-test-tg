import axios from 'axios';
import React, { useContext, useEffect, useState } from "react";
import {Navigate} from 'react-router-dom';

import AuthContext from '../AuthContext';

const Usuarios = (props) => {
  const [authInfo,setAuthInfo] = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([]);

  console.log(`El prop de loggeo es: ${props.loggeado}`);

  const getUsuarios = () => {
    if(authInfo == null) return;

    axios.get(
      `https://dummyjson.com/users`
      // ,
      // {
      //   headers: {
      //     'Authorization': `Bearer ${authInfo.token}`
      //   }
      // }
    )
    .then(
      (resp) => {
        setUsuarios(resp.data.users);
      }
    )
    .catch(
      (error) => {
        console.log(`Error en usuarios: ${error}`);
      }
    );

  }

  const borraUsuario = (uid) => {
    axios.delete(
      `https://dummyjson.com/users/${uid}`,
      {
        headers: {
          'Authorization': `Bearer ${authInfo.token}`
        }
      }
    )
    .then(
      (resp) => {
        console.log(`Usuario borrado: ${JSON.stringify(resp.data)}`);
      }
    )
    .catch(
      (error) => {
        console.log(`Error borrando: ${error}`);
      }
    )
  }

  useEffect(
    () => getUsuarios(),
    []
  );

  if(authInfo == null) {
    return(
      <Navigate to='/login' />
    );
  }

  return(
    <>
    <h3>Módulo de usuarios del sistema</h3>
    {
      usuarios == null || usuarios.length < 1 
      ? <h4>No hay usuarios :(</h4>
      :
      <ul>
        {
          usuarios.map(
            (u,idx) => {{
             return(
              <div key={idx} className="user">
                <span>{u.email}</span>
                <button 
                  onClick={() => borraUsuario(u.id)}>
                  Borrar
                </button>
                <button>Mostrar</button>
              </div>
             );
            }}
          )
        }
      </ul>
    }
    </>
  );
}

export default Usuarios;