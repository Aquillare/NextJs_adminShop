import { useState, useEffect } from 'react';
import DashboardItems from '@components/DashboardItems';
import Modal from '@common/Modal';
import { CheckIcon } from '@heroicons/react/solid';
import FormProduct from '@components/FormProduct';
import axios from 'axios';
import endPoints from '@services/api';
import useAlert from '@hooks/useAlert';
import Alert from '@common/Alert';
import { useAuth } from '@hooks/useAuth';

export default function Products() {
  const auth = useAuth();

  if (auth.user === null) {
    auth.autorization();
  }

  /**
   * Estado y funcion modificadora para el modal.
   */
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const { alert, setAlert, toggleAlert } = useAlert();

  useEffect(() => {
    async function getProducts() {
      const response = await axios.get(endPoints.products.allProducts);
      setProducts(response.data);
    }
    try {
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }, [alert]);

  return (
    <>
      {!auth.user ? null : (
        <>
          <Alert alert={alert} handleClose={toggleAlert} />
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">List of products</h2>
            </div>
            <div className="mt-5 flex lg:mt-0 lg:ml-4">
              <span className="sm:ml-3">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setOpen(true)}
                >
                  <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Add Product
                </button>
              </span>
            </div>
          </div>
          <div className="flex flex-col mt-10">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Id
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                        <th scope="col" className="relative px-6 py-3"></th>
                      </tr>
                    </thead>
                    <DashboardItems products={products} setAlert={setAlert}></DashboardItems>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/**
           * Modal para añadir productos
           */}
          <Modal open={open} setOpen={setOpen}>
            <FormProduct setAlert={setAlert} setOpen={setOpen} />
          </Modal>
        </>
      )}
    </>
  );
}
