import { useState } from "react";

const NumberPagination = ({number,index, handlePage, page, count}) => {

/*Establecemos un valor contador para incrementar los numeros a mostrar del rango de paginas,
una vez pasemos los primeros 50 productos.*/

    


    return(
    <>
        <a
            href="#"
            onClick={() => handlePage(number+count)}
            className={page === number + count ? "z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium" :
            "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            }
        >
            {index + 1 + count}
        </a>
    </>  
    );
};

export default NumberPagination;