import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { checkIsStringify } from './helper';
import { ServerConfig } from 'config/serverConfig';
import { getToken } from 'config/storage';
import store from 'redux/store';
import { setOpenErrorModal } from 'redux/features/auth/authSlice';

const BASE_URL = ServerConfig.BASE_URL;

interface ErrorResponse {
  message: string;
}

const Axios = axios.create({
  timeout: 10000,
  headers: {
    Accept: 'application/json,application/x-www-form-urlencoded,text/plain,*/*',
    'Content-Type': 'application/json;charset=utf-8',
  },
});

Axios.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  config.baseURL = BASE_URL;
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

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

    if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
      const params = {
        errorModal: true,
        errorTitle: 'Network Error',
        errorMessage: 'Please check your internet connection',
        buttonText: 'OK',
        errorCode: error.code,
      };
      store.dispatch(setOpenErrorModal(params));
      return;
    }

    let err: ErrorResponse;
    if (error.response) {
      err = error.response.data as ErrorResponse;
    } else {
      err = { message: 'Something went wrong, please try again later' };
    }
    if (statusCode === 401) {
      const params = {
        errorModal: true,
        errorTitle: 'Your session has expired',
        errorMessage: 'Please login again',
        buttonText: 'Login',
        errorCode: statusCode,
      };
      store.dispatch(setOpenErrorModal(params));
      return;
    }

    if (
      statusCode >= 500 ||
      err.message === 'Something went wrong, please try again later'
    ) {
      const params = {
        errorModal: true,
        errorTitle: 'Something went wrong',
        errorMessage: 'Please try again later',
        buttonText: 'OK',
        errorCode: statusCode,
      };
      store.dispatch(setOpenErrorModal(params));
      return;
    }

    return Promise.reject(err);
  },
);

export default Axios;
