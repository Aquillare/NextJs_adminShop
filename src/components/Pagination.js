/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import NumberPagination from '@components/NumberPagination';

function Pagination({ products, pageLimit, page, setPage, pageFinal, setPageFinal, count, setCount }) {
  /* establecemos un rango de paginas para nuestra paginacion*/
  const totalPages = Math.ceil(products.length / pageLimit);

  const rangeOfPages = (totalPages) => {
    const pages = [];
    let count = 1;

    while (pages.length < totalPages) {
      pages.push(count);
      count += 1;
    }
    return pages;
  };

  const pages = rangeOfPages(totalPages);

  /* funcion para el boton nextPage
  
  */
  const handleNextPage = () => {
    Math.ceil(page / (count + totalPages)) < totalPages ? setPage(page + 1) : null;
    page % 5 == 0 ? setPageFinal(!pageFinal) : null;
    page % 5 == 0 ? setCount(count + 5) : null;
    console.log(page, pageFinal);
  };
  /*funcion para el boton previous page */
  const handlePreviousPage = () => {
    page > 1 ? setPage(page - 1) : null;
    (page - 1) % 5 == 0 && page != 1 ? setPageFinal(!pageFinal) : null;
    (page - 1) % 5 == 0 && page != 1 ? setCount(count - 5) : null;
    console.log(page, pageFinal);
  };

  /*funcion para verificar si la pagina a redireccionar es la misma en la que estamos o no */
  const handlePage = (pageNumber) => {
    page != pageNumber ? setPage(pageNumber) : null;
  };

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Previous
        </a>
        <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{page}</span> to <span className="font-medium">{pageLimit}</span> of <span className="font-medium">{products.length}</span> products
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon onClick={() => handlePreviousPage()} className="h-5 w-5" aria-hidden="true" />
            </a>

            {pages.map((number, index, pages) => (
              <NumberPagination number={number} index={index} pages={pages} handlePage={handlePage} page={page} count={count} key={`id-${number}`} />
            ))}

            <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Next</span>
              <ChevronRightIcon onClick={() => handleNextPage()} className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
