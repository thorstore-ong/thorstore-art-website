import { useMutation } from '@tanstack/react-query'
import { login, register } from '../api/auth'
import { useAuthStore } from '@/store/authStore'
import { LoginDto, RegisterDto } from '@/types'

export const useLogin = () => {
    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation({
        mutationFn: (dto: LoginDto) => login(dto),
        onSuccess: (data) => {
            setAuth({email: data.email, role: data.role }, data.token);
        },
    });
}; 

export const useRegister = () => {
    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation({
        mutationFn: (dto: RegisterDto) => register(dto),
        onSuccess: (data) => {
            setAuth({email: data.email, role: data.role }, data.token);
        },
    });
};