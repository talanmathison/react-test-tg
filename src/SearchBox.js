// Modificamos el componente para que reciba
// «props» y entre ellos vendrá el
// «callback» que nos permitirá interactuar
// con los elementos del componente
// que "nos llama".

const SearchBox = (props) => {
  // Definimos una función que será llamada
  // al disparse el evento «onChange» del
  // cuadro de búsqueda.
  // Internamente manda llamar a la función
  // que le fue pasada en «props» y le da
  // como argumento el contenido de
  // la caja de texto, es decir, el término
  // de búsqueda que el usuario ingresó.
  // El proceso «real» de búsqueda es
  // realizado en el otro componente, ya que
  // contiene todos los elementos que son
  // usados para ella.
  const busca = (ev) => {
    props.callback(ev.target.value);
  }

  return(
    <input
      onChange={busca}
      type="text"
      placeholder="Buscar" />
  );
}

export default SearchBox;