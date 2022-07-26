import { useContext } from "react";
import AuthContext from "../AuthContext";

const Home = () => {
  const [authInfo, setAuthInfo] = useContext(AuthContext);

  // Si «authInfo» no está inicializado
  // o es nulo, obtendremos un error dado
  // que queremos leer algunas propiedades
  // que asumimos deben estar en él.
  // Para evitarlo usamos «?» que es el
  // el operador llamado «optional chaining»

  // Para evitar que aparezca el hola y
  // unos paréntesis vacíos, podemos hacer
  // un render condicional.

  return(
    <>
    <h2>Bienvenido a la página</h2>
    {
      authInfo != null &&
      <p>
        Hola {authInfo?.firstName} {authInfo?.lastName} (<i>{authInfo?.email}</i>)
      </p>
    }
    </>
  );
}

export default Home;