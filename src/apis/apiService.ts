import { axiosAuthInstance, axiosNoAuthInstance } from './axiosInstance';

// Định nghĩa kiểu dữ liệu cho API Response
// export interface T {
//   code: number;
//   message: string;
//   result: T;
// }

// ✅ GET request
export const apiGet = async <T>(
  url: string,
  auth: boolean = true,
  params?: Record<string, any>
): Promise<T> => {
  try {
    const config = {
      params,
    };
    const response = auth
      ? await axiosAuthInstance.get<T>(url, config)
      : await axiosNoAuthInstance.get<T>(url, config);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

// ✅ POST request
export const apiPost = async <T>(
  url: string,
  data: any,
  auth: boolean = true,
  params?: Record<string, any>
): Promise<T> => {
  try {
    const config = {
      params,
      headers: {},
    };
    if (data instanceof FormData) {
      config.headers = {
        'Content-Type': 'multipart/form-data',
      };
    }

    console.log('apiPost data', data);
    const response = auth
      ? await axiosAuthInstance.post<T>(url, data, config)
      : await axiosNoAuthInstance.post<T>(url, data, config);
    console.log('apiPost response', response);
    return response?.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

// ✅ PUT request
export const apiPut = async <T>(
  url: string,
  data: any,
  auth: boolean = true,
  params?: Record<string, any>
): Promise<T> => {
  try {
    const config = {
      params,
    };
    const response = auth
      ? await axiosAuthInstance.put<T>(url, data, config)
      : await axiosNoAuthInstance.put<T>(url, data, config);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

// ✅ PATCH request
export const apiPatch = async <T>(
  url: string,
  data: any,
  auth: boolean = true
): Promise<T> => {
  try {
    const response = auth
      ? await axiosAuthInstance.patch<T>(url, data)
      : await axiosNoAuthInstance.patch<T>(url, data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

// ✅ DELETE request
export const apiDelete = async <T>(url: string, auth: boolean = true): Promise<T> => {
  try {
    const response = auth
      ? await axiosAuthInstance.delete<T>(url)
      : await axiosNoAuthInstance.delete<T>(url);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};
