import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { CONFIG } from '../config/config';
import { LoginDataType, RegisterDataType } from '../types/formType';
import { UserType } from '../types/userType';

const apiClient: AxiosInstance = axios.create({
  baseURL: CONFIG.API_URL,
});

class API {
  SET_TOKEN(payload: string): void {
    localStorage.setItem('token', payload);
  }
  GET_TOKEN(): string | null {
    return localStorage.getItem('token');
  }
  async GET_LOGGED_USER(): Promise<UserType> {
    try {
      const response: AxiosResponse = await apiClient.get(`/auth/me`, {
        headers: {
          Authorization: `${this.GET_TOKEN()}`,
        },
      });

      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }

      throw error;
    }
  }

  async REGISTER(data: RegisterDataType): Promise<AxiosResponse> {
    console.log(data);

    try {
      return await apiClient.post(`/auth/register`, {
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }
  async LOGIN(data: LoginDataType): Promise<string> {
    try {
      const response: AxiosResponse = await apiClient.post(`/auth/login`, {
        email: data.email,
        password: data.password,
      });
      if (response.data.error) {
        throw new Error(response.data.message);
      }

      console.log(response.data.data);

      const token: string = response.data.data.token;
      this.SET_TOKEN(token);

      return token;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }
}

export default new API();
