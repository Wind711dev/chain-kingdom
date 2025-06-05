import { axiosAuthInstance, axiosNoAuthInstance } from './axiosInstance';

// Định nghĩa kiểu dữ liệu cho API Response
export interface ApiResponse<T> {
  code: number;
  message: string;
  result: T;
}

// ✅ GET request
export const apiGet = async <T>(
  url: string,
  auth: boolean = true,
  params?: Record<string, any>
): Promise<ApiResponse<T>> => {
  try {
    const config = {
      params,
    };
    const response = auth
      ? await axiosAuthInstance.get<ApiResponse<T>>(url, config)
      : await axiosNoAuthInstance.get<ApiResponse<T>>(url, config);
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
): Promise<ApiResponse<T>> => {
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
      ? await axiosAuthInstance.post<ApiResponse<T>>(url, data, config)
      : await axiosNoAuthInstance.post<ApiResponse<T>>(url, data, config);
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
): Promise<ApiResponse<T>> => {
  try {
    const config = {
      params,
    };
    const response = auth
      ? await axiosAuthInstance.put<ApiResponse<T>>(url, data, config)
      : await axiosNoAuthInstance.put<ApiResponse<T>>(url, data, config);
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
): Promise<ApiResponse<T>> => {
  try {
    const response = auth
      ? await axiosAuthInstance.patch<ApiResponse<T>>(url, data)
      : await axiosNoAuthInstance.patch<ApiResponse<T>>(url, data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

// ✅ DELETE request
export const apiDelete = async <T>(url: string, auth: boolean = true): Promise<ApiResponse<T>> => {
  try {
    const response = auth
      ? await axiosAuthInstance.delete<ApiResponse<T>>(url)
      : await axiosNoAuthInstance.delete<ApiResponse<T>>(url);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};
