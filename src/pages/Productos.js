import {useState, useEffect} from 'react';

import axios from "axios";

import SearchBox from '../SearchBox';

const Productos = () => {
  // Lista original descargada.
  const [productos,setProductos] = useState([]);

  // Agreguemos una nueva variable de estado
  // para guardar los resultados de la
  // búsqueda sin perder los registros que
  // ya se habían descargado del servidor.
  const [tmpProds, setTmpProds] = useState([]);

  const getProductos = async () => {
    let resp;

    try {
      resp = await axios.get('https://dummyjson.com/products');
    } catch(error) {
      console.log(`getProdError: ${error}`);
      return;
    }

    //console.log(`***RESP: ${JSON.stringify(resp)}`);

    setProductos(resp.data.products);

    // Cuando se descarga la lista del
    // servidor, también establecemos 
    // "el resultado de la búsqueda" a TODOS
    // los elementos descargados.
    setTmpProds(resp.data.products);
  }

  const hazBusqueda = (ev) => {
    //let val = ev.target.value.toLowerCase();
    
    // Ahora «ev» es en realidad el término
    // de búsqueda que es proporcionado por
    // el componente «SearchBox».
    let val = ev;

    console.log(`Buscar: ${val}`);

    // El «filter» se hace sobre la lista
    // completa de productos descargados para
    // tener una búsqueda sobre todos 
    // los datos.
    let res = productos.filter(
      (prod) => {
        let titulo = prod.title.toLowerCase();

        return titulo.search(val) >= 0;
      }
    );

    console.log(`Resultado búsqueda: ${JSON.stringify(res)}`);

    // Establecemos la variable de estado
    // «productos» para que se refleje
    // el resultado de la búsqueda en la UI
    // Esto sobreescribe la lista original
    // completa.
    //setProductos(res);

    // El resultado de la búsqueda lo
    // guardamos en la nueva variable de
    // estado.
    setTmpProds(res);
  }

  useEffect(() => {
    getProductos();
  }, []);

  return(
    <>
    <h3>Productos disponibles</h3>
    <button onClick={getProductos}>
      Obtener productos
    </button>

    <br />
    {/* 
      Los elementos sobre los cuales se
      realiza la búsqueda, están ligados
      fuertemente a la estructura de
      «Productos». Por ello sería complicado
      extraerlos del módulo de búsqueda.

      La manera de conectar la funcionalidad
      de la caja de búsqueda con los elementos
      propios de este componente es a través
      de «callbacks».
    */}
    <SearchBox callback={hazBusqueda} />
    
    {/* 
      Vamos a extraer el componente de
      búsqueda a un módulo externo a
      «Productos». Será necesaria una manera
      de comunicarse entre ambos...

    <input 
      onChange={hazBusqueda}
      type="text"
      placeholder="Buscar" />
    */}

    {/* 
      Ejercicio 01:
        Incorporar las descripciones, las
        imágenes y el precio a la lista de 
        productos disponibles que se obtuvo 
        del WS.
    */}

    <ul className='row'>
      {
        // Al considerar la búsqueda y la
        // nueva variable, debemos cambiar
        // las condiciones para el render.
        tmpProds == null || tmpProds.length < 1
        ? <h3>No hay productos :(</h3>
        : tmpProds.map(
          (prod) => {
            return(
              <li
                className='col-12 col-lg-4'
                key={prod.id}>
                <img src={prod.thumbnail} />
                <h4>{prod.title}</h4>
                <p>
                  {prod.description}
                </p>
                <p>
                  <i>${prod.price}</i>
                </p>

                <hr />
              </li>
            );
          }
        )
      }
    </ul>
    </>
  );
}

export default Productos;