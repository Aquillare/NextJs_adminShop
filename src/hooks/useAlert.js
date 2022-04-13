import { useState } from 'react';

const useAlert = (options) => {
  /**
   * Definimos un objeto con las opciones por defecto
   */
  const defaultOPtions = {
    active: false,
    message: '',
    type: '',
    autoClose: true,
  };

  /**
   * Definimos un estado y un actualizador para este Hook en el cual,
   * su estado inicial es la destructuracion de defaultOptions y options,
   * si recibe options, estas rescriben a las defaultOptions.
   */
  const [alert, setAlert] = useState({
    ...defaultOPtions,
    ...options,
  });

  /**
   * Definimos un una funcion toggle alert para
   * manejar la apertura y cierre.
   */
  const toggleAlert = () => {
    setAlert(!alert.active);
  };

  return {
    alert,
    setAlert,
    toggleAlert,
  };
};

export default useAlert;
