import FormProduct from '@components/FormProduct';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import endPoints from '@services/api';
import { useAuth } from '@hooks/useAuth';

export default function Edit() {
  const auth = useAuth();

  if (auth.user === null) {
    auth.autorization();
  }

  const [product, setProduct] = useState({});
  const router = useRouter();

  useEffect(() => {
    /**
     * con router.query, que viene de useRouter, podemos
     * traer el valor de la url, en este caso el id que recibimos
     * del enpoint dashboard/edit/id
     */
    const { id } = router.query;

    /*Si no esta presente el id no pasamos a la siguiente line que es la peticion a la Api */
    if (!router.isReady) return;

    async function getProduct() {
      const response = await axios.get(endPoints.products.getProduct(id));
      setProduct(response.data);
    }

    getProduct();
  }, [router?.isReady]);

  return <>{!auth.user ? null : <FormProduct product={product} />}</>;
}
