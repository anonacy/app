import axios, { AxiosResponse } from 'axios';
import { apikey } from '../state/state';

const URL = import.meta.env.VITE_API_URL + (import.meta.env.VITE_API_PORT ? `: ${import.meta.env.VITE_API_PORT}` : '');

class HttpService {
  private http = axios.create({
    baseURL: URL,
    timeout: 30000,
  });

  async get<T = any>(url: string, data?: any): Promise<AxiosResponse<T>> {
    const options = { 
      headers: { Authorization: `Bearer ${apikey.value}` },
      params: data
    };
    return this.http.get<T>(url, options);
  }
  
  async post<T = any>(url: string, data?: any): Promise<AxiosResponse<T>> {
    const options = { headers: { Authorization: `Bearer ${apikey.value}` } };
    return this.http.post<T>(url, data, options);
  }
  
  async put<T = any>(url: string, data?: any): Promise<AxiosResponse<T>> {
    const options = { headers: { Authorization: `Bearer ${apikey.value}` } };
    return this.http.put<T>(url, data, options);
  }
  
  async delete<T = any>(url: string, data?: any): Promise<AxiosResponse<T>> {
    const options = {
      headers: { Authorization: `Bearer ${apikey.value}`},
      params: data
    };
    return this.http.delete<T>(url, options);
  }

  async auth<T = any>(_apikey: string): Promise<AxiosResponse<T>> {
    const options = { headers: { Authorization: `Bearer ${_apikey}` } };
    return this.http.get<T>('/auth', options);
  }
}

export default new HttpService();