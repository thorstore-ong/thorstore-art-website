import api from '../axios';
import { LoginDto, RegisterDto, AuthResponse } from '@/types';

export const login = async (dto: LoginDto): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/api/Auth/login', dto);
    return response.data;
};

export const register = async (dto: RegisterDto): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/api/Auth/register', dto);
    return response.data;
};