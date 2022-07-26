import {useEffect, useState} from 'react';

const FlashMsg = (props) => {
  // Esta variable de estado servirá para
  // decirle al componente si debe mostrarse
  // o no.
  const [show, setShow] = useState(true);

  // Utilizamos «useEffect» para que se lance
  // una función después de que el componente
  // ha hecho su render.
  useEffect(() => {
    // Se espera en este caso un tiempo de
    // 5 segundos (especificado en
    // milisegundos) y pasado ese tiempo se
    // cambia el estado de la variable «show»
    // a «false», haciendo que el componente
    // ya no se visualice.
    // Es posible que el tiempo sea
    // personalizado usando los «props»
    setTimeout(() => {
      setShow(false);
    }, props.tiempo || 5000);
  }, []);

  return(
    // El <div> solamente se mostrará si la
    // variable «show» es verdadera. Esto se
    // hace usando short circuit evaluation.
    show &&
    <div>
      {/* 
        La «prop» llamada «children» contiene
        por default a todo lo que se encuentre
        entre las etiquetas que definen a este
        componente, siempre y cuando sea una
        de apertura y una de cierre, y no
        una única etiqueta que "cierra sola".
      */}
      {props.children}
    </div>
  );
} 

export default FlashMsg;