import axios from 'axios';
import { useEffect, useState } from 'react';
import endPoints from '@services/api';

import { useAuth } from '@hooks/useAuth';
import DashboardItems from '@components/DashboardItems';

const Categories = () => {
  const auth = useAuth();

  if (auth.user === null) {
    auth.autorization();
  }

  const [categories, setCategories] = useState([]);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    async function getCategories() {
      const { data: categoriesData } = await axios.get(endPoints.categories.getCategoriesList);
      setCategories(categoriesData);
    }
    try {
      getCategories();
    } catch (error) {
      console.log(error);
    }
  }, [alert]);

  return (
    <>
      {!auth.user ? null : (
        <>
          {/*<Alert alert={alert} handleClose={toggleAlert} />*/}
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">List of categories</h2>
            </div>
            <div className="mt-5 flex lg:mt-0 lg:ml-4">
              <span className="sm:ml-3">
                {/*
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setOpen(true)}
                >
                  <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Add category
                </button>
               */}
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
                        <th scope="col" className="px-30 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-10 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                        <th scope="col" className="px-10 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"></th>

                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Id
                        </th>
                        <th scope="col" className="px-12 py-3 text-rigth text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                        <th scope="col" className="px-12 py-3 text-rigth text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <DashboardItems products={categories} setAlert={setAlert}></DashboardItems>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/**
           * Modal para añadir productos
           */}
          {/*
        <Modal open={open} setOpen={setOpen}>
            <FormCategory setAlert={setAlert} setOpen={setOpen} />
          </Modal> 
         
         */}
        </>
      )}
    </>
  );
};

export default Categories;
