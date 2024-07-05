import axios, { AxiosError, AxiosResponse } from 'axios';
import { checkIsStringify } from './helper';
import { ServerConfig } from 'config/serverConfig';

const BASE_URL = ServerConfig.BASE_URL;

const Axios = axios.create({
  timeout: 10000,
  headers: {
    Accept: 'application/json,application/x-www-form-urlencoded,text/plain,*/*',
    'Content-Type': 'application/json;charset=utf-8',
  },
});

Axios.interceptors.request.use(async config => {
  config.baseURL = BASE_URL;
  //   const { headers } = config;
  //   if (token) {
  //     config.headers = {
  //       Authorization: token,
  //       ...headers,
  //     };
  //   }

  //   if (url) {
  //     config.baseURL = url;
  //   }
  return config;
});

Axios.interceptors.response.use(
  async (response: AxiosResponse) => {
    let result = null;

    if (await checkIsStringify(response.data)) {
      result = JSON.parse(response.data);
    } else {
      result = response.data;
    }

    response.data = result;
    return response;
  },
  function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const statusCode: number = error.response?.status ?? 400;
    if (
      statusCode === 401 ||
      statusCode >= 500 ||
      error.code === 'ECONNABORTED'
    ) {
      // setOpenAuthModal(true);
      return;
    }
    let err;
    if (error.response) {
      err = error.response.data;
    } else {
      err = { message: 'Something went wrong, please try again later' };
    }

    return Promise.reject(err);
  },
);

export default Axios;
