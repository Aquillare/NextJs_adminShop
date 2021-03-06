import { deleteProduct } from '@services/api/product';
import { XCircleIcon } from '@heroicons/react/solid';
import Link from 'next/link';

const DashboardItems = ({ products, setAlert }) => {
  const handleDelete = (id) => {
    deleteProduct(id).then(() => {
      setAlert({
        active: true,
        message: 'Delete product successfully',
        type: 'error',
        autoClose: true,
      });
    });
  };

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {products?.map((product) => (
        <tr key={`Product-item-${product.id}`}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10">
                <img className="h-10 w-10 rounded-full" src={product.image /*product.images[0]*/} alt="" />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">{product.name}</div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{product.category?.name}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{product.price}</span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
          {product.price ? (
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <Link href={`/dashboard/edit/${product.id}`}>
                <a className="text-blue-600 hover:text-blue-900">Edit</a>
              </Link>
            </td>
          ) : (
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <Link href={`/dashboard/edit-category/${product.id}`}>
                <a className="text-blue-600 hover:text-blue-900">Edit</a>
              </Link>
            </td>
          )}
          {product.price ? (
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <XCircleIcon className="flex-shrink-0 h-6 w-6 text-gray-400 cursor-pointer" aria-hidden="true" onClick={() => handleDelete(product.id)} />
            </td>
          ) : null}
        </tr>
      ))}
    </tbody>
  );
};

export default DashboardItems;
