import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

// Base URL của API
const BASE_URL = 'https://chainkingdom.jasperisme.io.vn';

const getToken = () => {
  const token = localStorage.getItem('token');

  return token;
};

// ✅ Tạo instance Axios có token
const axiosAuthInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Tạo instance Axios không có token
const axiosNoAuthInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create a map to track ongoing requests
const pendingRequests = new Map<string, AbortController>();

// Generate a unique key for each request
const generateRequestKey = (config: AxiosRequestConfig): string => {
  return `${config?.method}:${config?.url}:${JSON.stringify(
    config?.params
  )}:${JSON.stringify(config?.data)}`;
};

// Add a request to the map
const addRequest = (config: AxiosRequestConfig): void => {
  const requestKey = generateRequestKey(config);

  if (pendingRequests.has(requestKey)) {
    const controller = pendingRequests.get(requestKey);
    controller?.abort();
  }

  const controller = new AbortController();
  config.signal = controller.signal;
  pendingRequests.set(requestKey, controller);
};

const removeRequest = (config: AxiosRequestConfig): void => {
  const requestKey = generateRequestKey(config);
  pendingRequests.delete(requestKey);
};

// 🛠 Thêm Interceptor để tự động thêm token vào request
axiosAuthInstance.interceptors.request.use(
  async (config) => {
    const token = getToken();
    // const deviceId = await getDevice();

    if (token) {
      config.headers.Authorization = `tma ${token}`;
    }
    // if (deviceId) {
    //   config.headers['Device-id'] = deviceId;
    // }
    addRequest(config);
    return config;
  },
  (error) => {
    console.log('🚀 ~ error:', error);
    if (axios.isCancel(error)) {
      return Promise.resolve(null);
    }
    return Promise.reject(error);
  }
);

axiosAuthInstance.interceptors.response.use(
  (response) => {
    removeRequest(response.config);
    return response;
  },
  (error) => {
    removeRequest(error.config || {});
    console.log('🚀 ~ error:', error);
    if (error?.response?.data) {
      // showMessage(error?.response?.data);
    }
    if (error?.status === 401 || error?.status === 403) {
      // const { setToken } = useAuth.getState();
      // setToken('');
      // removeDataStorage(StorageKey.ACCESS_TOKEN);
      // Toast.show({ text1: error?.response?.data?.message ?? error?.message });
    }
    return Promise.reject(error);
  }
);

axiosNoAuthInstance.interceptors.request.use(
  async (config) => {
    console.log('🚀 ~ config', config);
    return config;
  },
  (error) => {
    console.log('🚀 ~ error:', error);
    if (error?.status === 401 || error?.status === 403) {
      // const { setToken } = useAuth.getState();
      // setToken('');
      // removeDataStorage(StorageKey.ACCESS_TOKEN);
      // Toast.show({
      //   type: 'error',
      //   text1: error?.response?.data?.message ?? error?.message,
      // });
    }
    return Promise.reject(error);
  }
);

axiosNoAuthInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response.data) {
      // showMessage(error?.response.data);
    }

    return Promise.reject(error);
  }
);

export { axiosAuthInstance, axiosNoAuthInstance };

