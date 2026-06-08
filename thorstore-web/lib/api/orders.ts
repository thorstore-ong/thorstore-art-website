import api from '../axios';
import { CreateOrderDto, Order, PaymentResponse, InitiatePaymentDto } from '@/types';

export const placeOrder = async (dto: CreateOrderDto): Promise<Order> => {
    const response = await api.post<Order>('api/Orders', dto);
    return response.data;
};

export const getMyOrders = async (): Promise<Order[]> => {
    const response = await api.get<Order[]>('api/Orders/my');
    return response.data;
};

export const getAllOrders = async (): Promise<Order[]> => {
    const response = await api.get<Order[]>('api/Orders');
    return response.data;
};

export const updateOrderStatus = async (id: number, status: string): Promise<Order> => {
    const response = await api.put<Order>(`api/Orders/${id}/status`, JSON.stringify(status));
    return response.data;
};

export const initiatePayment = async (dto: InitiatePaymentDto): Promise<PaymentResponse> => {
    const response = await api.post<PaymentResponse>('api/Payments/initiate', dto);
    return response.data;
};