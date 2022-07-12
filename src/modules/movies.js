import axios from 'axios';
const { NEXT_PUBLIC_BE_HOST } = process.env;

export const createMoviesAxios = (body, token) => {
   const URL = `${NEXT_PUBLIC_BE_HOST}/movies`;
   return axios.post(URL, body, {
      headers: {
         Authorization: `Bearer ${token}`,
         'Content-Type': 'multipart/form-data',
      },
   });
};

export const getMoviesHomeAxios = () => {
   const URL = `${NEXT_PUBLIC_BE_HOST}/movies?page=1&limit=5`;
   return axios.get(URL);
};

export const getNowShowingMoviesAxios = (name = '', sort = '', order = '', page = '1') => {
   const URL = `${NEXT_PUBLIC_BE_HOST}/movies/nowshow?name=${name}&sort=${sort}&order=${order}&page=${page}`;
   return axios.get(URL);
};

export const getUpcomingMoviesAxios = (name = '', month = '', sort = '', order = '', page = '1') => {
   const URL = `${NEXT_PUBLIC_BE_HOST}/movies/upcoming?name=${name}&month=${month}&sort=${sort}&order=${order}&page=${page}`;
   return axios.get(URL);
};

export const getMoviesDetailAxios = (id) => {
   const URL = `${NEXT_PUBLIC_BE_HOST}/movies/${id}`;
   return axios.get(URL);
};

export const getShowTimesAxios = (id = '', location = '', date = '', sort = '', order = '', page = '') => {
   const URL = `${NEXT_PUBLIC_BE_HOST}/showtimes/${id}?location=${location}&date=${date}&sort=${sort}&order=${order}&page=${page}`;
   return axios.get(URL);
};
export const getDashboard = (token, id) => {
   const URL = `${NEXT_PUBLIC_BE_HOST}/payments/dashboard?created_at=${created_at}&id=${id}`;
   return axios.get(URL, config(token));
 };
