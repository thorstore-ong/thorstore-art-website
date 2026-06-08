import api from '../axios';
import { Product, Category, CreateProductDto } from '@/types';

export const getProducts = async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/api/Products');
    return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`/api/Products/${id}`);
    return response.data;
}

export const getCategories = async (): Promise<Category[]> => {
    const response = await api.get<Category[]>('/api/Categories');
    return response.data;
};

export const getProductsByCategory = async (name: string): Promise<Product[]> => {
    const response = await api.get<Product[]>(`/api/Categories/${name}/products`);
    return response.data;
};

export const createProduct = async (dto: CreateProductDto): Promise<Product> => {
    const response = await api.post<Product>('/api/Products', dto);
    return response.data;
};

export const updateProduct = async (id: number, dto: CreateProductDto): Promise<Product> => {
    const response = await api.put<Product>(`/api/Products/${id}`, dto);
    return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
    await api.delete(`/api/Products/${id}`);
};