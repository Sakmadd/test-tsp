import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { CONFIG } from '../config/config';
import {
  HistoryForm,
  LoginDataType,
  RegisterDataType,
} from '../types/formType';
import { UserType } from '../types/userType';
import { OrderType } from '../types/orderType';
import { OrderCreateType } from '../types/orderCreateType';
import { HistoryType } from '../types/historyType';
import { OrderEditForm } from '../types/orderEditType';

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
  async GET_OPERATORS(): Promise<UserType[]> {
    try {
      const response = await apiClient.get('/users/operators', {
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
  async CREATE_ORDER(data: OrderCreateType): Promise<OrderType> {
    try {
      const response = await apiClient.post('/orders', data, {
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
  async GET_ORDERS(): Promise<OrderType[]> {
    try {
      const response = await apiClient.get('/orders', {
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
  async GET_TASKS(): Promise<OrderType[]> {
    try {
      const response = await apiClient.get('/orders/task', {
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
  async GET_ORDER(id: string): Promise<OrderType> {
    try {
      const response = await apiClient.get('/orders/' + id, {
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
  async EDIT_ORDER(data: OrderEditForm) {
    try {
      const response = await apiClient.put('/orders', data, {
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
  async ADD_HISTORY(data: HistoryForm) {
    try {
      const response = await apiClient.post('/orders/history', data, {
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
  async GET_HISTORIES(id: string): Promise<HistoryType[]> {
    try {
      const response = await apiClient.get(`/orders/${id}/history`, {
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
  async CHANGE_QUANTITY(orderId: string, quantity: number): Promise<void> {
    try {
      await apiClient.put(
        `/orders/quantity`,
        { orderId, quantity },
        {
          headers: {
            Authorization: `${this.GET_TOKEN()}`,
          },
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }
}

export default new API();
