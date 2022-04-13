import React, { useState, useContext, createContext } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import endPoints from '@services/api';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProviderAuth() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const signIn = async (email, password) => {
    const options = {
      headers: {
        accept: '*/*', //para que trabaje con todas las solicitudes
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data: access_token } = await axios.post(endPoints.auth.login, { email, password }, options); //axios retorna una propiedad data, mediante destructuracion añadimos el valor de esta propiedad a la variable access_token

      if (access_token) {
        const token = access_token.token; //con mi api
        const user = access_token.user;  //con mi api
        //const token = access_token.access_token;  /con el api del curso.
        Cookies.set('token', token, { expires: 5});

        axios.defaults.headers.Authorization = `Bearer ${token}`; // agregamos el token a la configuracion por defecto de axios en el header.
        //const { data: user } = await axios.get(endPoints.auth.profile); //hacemos una peticion al endpoint auth/prodifle y traemos la informacion del usuario
        //console.log(user);
        //setUser(user); / con la api del curso
        setUser(user); //con mi api
      }
    } catch (error) {
      const errorMesage = 'user invalid';
      throw  errorMesage
    }
  };

  const autorization = async() => {
    const token = Cookies.get('token');
    if(!token){
      router.push('/login');
    }else{
      try{
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const {data:user} = await axios.get(endPoints.auth.profile);
      setUser(user);
      }catch(error){
        console.log(error);
        router.push('/login');
      }
    };
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    delete axios.defaults.headers.Authorization;
    //window.location.href = '/login';
    router.push('/login');
  };

  return {
    user,
    signIn,
    autorization,
    logout,
  };
}
