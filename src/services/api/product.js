import axios from 'axios';
import endPoints from '@services/api';

/**
 *
 * @body cuerpo del la peticon
 * @config posee un objeto con la configucarcion de los header
 * de la peticion.
 */
const addProduct = async (body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(endPoints.products.addProduct, body, config);
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(endPoints.products.deleteProduct(id));
  return response.data;
};

const updateProduct = async (id, body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.patch(endPoints.products.updateProduct(id), body, config);
  return response.data;
};

export { addProduct, deleteProduct, updateProduct };
