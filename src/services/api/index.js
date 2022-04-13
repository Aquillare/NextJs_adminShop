const API = process.env.NEXT_PUBLIC_API_URL;
//const API = process.env.NEXT_PUBLIC_API_DEV;
//const API = process.env.NEXT_PUBLIC_API;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const endPoints = {
  auth: {
    login: `${API}/api/${VERSION}/auth/login`,
    profile: `${API}/api/${VERSION}/auth/profile`,
  },
  products: {
    getProducts: (limit, offset) => `${API}/api/${VERSION}/products?limit=${limit}&offset=${offset}`,
    allProducts: `${API}/api/${VERSION}/products`,
    getProduct: (id) => `${API}/api/${VERSION}/products/${id}`,
    addProduct: `${API}/api/${VERSION}/products`,
    updateProduct: (id) => `${API}/api/${VERSION}/products/${id}`,
    deleteProduct: (id) => `${API}/api/${VERSION}/products/${id}`,
  },
  categories: {
    getCategories: (id) => `${API}/api/${VERSION}/categories/${id}`,
    getCategoriesList: `${API}/api/${VERSION}/categories`,
    addCategory: `${API}/api/${VERSION}/categories`,
    getCategoryItems: (id, limit, offset) => `${API}/api/${VERSION}/categories/${id}/products?limit=${limit}&offset=${offset}}`,
    updateCategory: (id) => `${API}/api/${VERSION}/categories/${id}`,
    deteleCategory: (id) => `${API}/api/${VERSION}/categories/${id}`,
  },
  files: {
    addImage: `${API}/api/${VERSION}/files/upload`,
  },
};


export default endPoints;
