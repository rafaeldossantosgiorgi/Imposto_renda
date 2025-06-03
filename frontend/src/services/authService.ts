import api from "./api";

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    userType: 'client' | 'accountant';
  };
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  userType: 'client' | 'accountant';
  document: string;
}

export const authService = {
  login: async (email: string, password: string, userType: 'client' | 'accountant'): Promise<LoginResponse> => {
    const response = await api.post('/users/login', { email, password, userType });
    return response.data;
  },

  register: async (data: RegisterData): Promise<LoginResponse> => {
    const response = await api.post('/users/register', data);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },
};