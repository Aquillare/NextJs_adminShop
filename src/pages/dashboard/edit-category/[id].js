import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import endPoints from '@services/api';
import { useAuth } from '@hooks/useAuth';
import FormCategory from '@components/FormCategory';

export default function Edit() {
  const auth = useAuth();

  if (auth.user === null) {
    auth.autorization();
  }

  const [category, setCategory] = useState({});
  const router = useRouter();

  useEffect(() => {
    /**
     * con router.query, que viene de useRouter, podemos
     * traer el valor de la url, en este caso el id que recibimos
     * del enpoint dashboard/edit/id
     */
    const { id } = router.query;

    /*Si no esta presente el id no pasamos a la siguiente linea que es la peticion a la Api */
    if (!router.isReady) return;

    async function getCategory() {
      const response = await axios.get(endPoints.categories.getCategories(id));
      setCategory(response.data);
    }

    getCategory();
  }, [router?.isReady]);

  return <>{!auth.user ? null : <FormCategory category={category} />}</>;
}
