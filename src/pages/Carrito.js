// Para usar el contexto, importamos
import React, { useContext, useEffect, useState } from "react";

import {Navigate} from 'react-router-dom';

import axios from 'axios';

// Necesitamos el contexto a usar
import AuthContext from '../AuthContext';

const Carrito = () => {
  const [authInfo,setAuthInfo] = useContext(AuthContext);

  // Generamos una variable de estado para
  // los carritos de compra del usuario.
  const [carritos, setCarritos] = useState([]);

  const getCarritos = () => {
    if(authInfo == null) return;

    let uid = authInfo.id;
    let jwt = authInfo.token;

    axios.get(
      `https://dummyjson.com/users/${uid}/carts`,
      {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      }
    )
      .then(
        (resp) => {
          setCarritos(resp.data.carts);
        }
      )
      .catch(
        (error) => {
          console.log(`Error al cargar carritos: ${error}`);
        }
      );
  }

  useEffect(
    () => getCarritos(),
    []
  );

  if(authInfo == null) {
    return(
      <Navigate to="/login" />
    );
  }

  return(
    <>
    {
      carritos.length < 1
      ? <h3>
        El usuario no tiene carritos de compra
        </h3>
      :
        carritos.map(
          (cart) => {
            return(
              <React.Fragment key={cart.id}>
              <h4>ID del carrito: {cart.id}</h4>
              <i>Total: ${cart.total}</i>
              <br />
              <b>Con descuento: ${cart.discountedTotal}</b>
              <hr />
              </React.Fragment>
            );
          }
        )

    }
    </>
  );
}

export default Carrito;