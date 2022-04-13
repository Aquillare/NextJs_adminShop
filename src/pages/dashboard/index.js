import useFetch from '@hooks/useFetch';
import endPoints from '@services/api';
import Pagination from '@components/Pagination';
import { Chart } from '@common/Chart';
import DashboardItems from '@components/DashboardItems';
import { useContext, useEffect, useState } from 'react';
import { useAuth } from '@hooks/useAuth';
import useAlert from '@hooks/useAlert';
import Alert from '@common/Alert';





export default function Dashboard() {
  const auth = useAuth();
  if(auth.user === null ){
    auth.autorization();
  }

  /*count sera usado por la paginacion para complementar calculos*/
  const [count, setCount] = useState(0);

  const { alert, setAlert, toggleAlert } = useAlert();
  /**
   *  page y set page hacen referencia a la pagina actual
   */
  const [page, setPage] = useState(1);
  /**
   * pagneFinal es el valor que usaremos para controlar las solicitudes a la api, solicitaremos 50 productos cada vez que
   * estando en a pagina 5 hagamos click en el boton de pagina siguiente, asi pageFinal cambia a true y activa la peticion
   * para traer 50 productos mas.
   */
  const [pageFinal, setPageFinal] =  useState(false)

   /**
   * pageLImit es el limite de elementos que mostraremos por pagina, este valor lo usaremos
   * en el componente  pagination para calcular el rango de paginas.
   */
    const pageLimit = 10;

    /**
   * PRODUCT_LIMIT es el valor que definiremos para el limit de la peticion.
   */
  const PRODUCT_LIMIT = 50;

  /**
   * PRODUCT_OFFSET es el valor que definimos para el offset de la peticion
   * usamos count * 10 , para que su valor sea 0 y nos traiga desde
   * el primer producto hasta el producto 50, luego el valor de count se incrementara de 5 en 5
   * para cada peticion
   */
  const PRODUCT_OFFSET = count * 10;
 
  /**
   * Peticion de los productos, mediante el customHook useFetch, usa el valor de pagoFinal para actualizarce
   */
  const products = useFetch(endPoints.products.getProducts(PRODUCT_LIMIT, PRODUCT_OFFSET),(pageFinal));
  /**
   * Traemos la propiedad de category de todos los porductos.
   */
  const categoryNames = products?.map((product) => product.category);
  /**
   * Traemos la propiead name de cada category, es decir el nombre de cada categoria
   */
  const categoryCount = categoryNames?.map((category) => category.name);

  /**
   * En esta funcion implementamos el metodo reduce para contar cuantas veces se repiten los elementos de un array.
   * retornara un objeto con cada categoria como porpiedades y el valor de la cantidad de veces que se repite
   */
  const countOcurrences = (arr) => arr.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {});

  const data = {
    datasets: [
      {
        label: 'Categories',
        data: countOcurrences(categoryCount),
        borderWidth: 2,
        backgroundColor: ['#ffbb11', '"c0c0c0', '#50AF95', 'f3ba2f', '#2a71d0'],
      },
    ],
  };

  return (
    <>
    {!auth.user ? null :

      <>
        <Chart className="mb-8 mt-2" chartData={data} />
        <Alert alert={alert} handleClose={toggleAlert} />
          <div className="flex flex-col">
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
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Delete</span>
                        </th>
                      </tr>
                    </thead>
                    <DashboardItems products={products?.filter((product,index) => index >= ((page -count) -1) * pageLimit && index < (page - count) * pageLimit )} setAlert={setAlert}/>
                  </table>
                </div>
              </div>
            </div>
          </div>
            <Pagination 
              products={ products }
              pageLimit={pageLimit}
              page={page}
              setPage={setPage}
              pageFinal={pageFinal}
              setPageFinal={setPageFinal}
              count={count}
              setCount={setCount}
             /> 
        </>
     }
    </>    
  );
};
