import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Nos permitira hacer peticiones a distintos endpoints
 * @enpoint {ruta a la cual queremos hacer la peticion}
 * @effectParametro { el parametro que evaluara useEffect para deicidir si se ejecuta nuevamente o no}
 *
 */

function useFetch(endpoint,effectParametro) {
  const [data, setData] = useState([]);

  /**
   * Hace la peticion get al endponit mediante axios,
   * establece el valor recibido en el valor de estado data
   */
  async function fecthData() {
    const response = await axios.get(endpoint);
    setData(response.data);
  }

  /**
   * Ejecuta fetchData despues del renderizado del sitio,
   * y obtener la informacion de la peticion.
   */
  useEffect(() => {
    try {
      fecthData();
    } catch (error) {
      console.log(error);
    }
  }, [effectParametro]);

  return data;
}

export default useFetch;
