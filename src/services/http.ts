import axios, { AxiosResponse } from 'axios';
import { toast } from './dialog';
import { apikey } from '../state/state';

class HttpService {
  private http = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 5000,
  });

  async get<T = any>(url: string): Promise<AxiosResponse<T>> {
    console.log("apikey", apikey.value);
    const options = { headers: { Authorization: `Bearer ${apikey.value}` } };
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
  
  async delete<T = any>(url: string): Promise<AxiosResponse<T>> {
    const options = { headers: { Authorization: `Bearer ${apikey.value}` } };
    return this.http.delete<T>(url, options);
  }

  async auth<T = any>(_apikey: string): Promise<AxiosResponse<T>> {
    const options = { headers: { Authorization: `Bearer ${_apikey}` } };
    return this.http.get<T>('/auth', options);
  }
}

export default new HttpService();