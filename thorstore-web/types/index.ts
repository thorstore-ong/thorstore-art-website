//Auth
export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    email: string;
    role: string;
}

//Categoties
export interface Category {
    id: number;
    name: string;
}

// Products
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    ImageUrl: string;
    categoryName: string;
}

export interface CreateProductDto {
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    categoryId: number;
}

// Orders
export interface OrderItemDto {
    productId: number;
    quatity: number;
}

export interface CreateOrderDto {
    shippingAddress: string;
    items: OrderItemDto[];
}

export interface OrderItemResponse{
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    subTotal: number;
}

export interface Order{
    id: number;
    status: string;
    shippingAddress: string;
    shippingCost: number;
    total: number;
    createdAt: string;
    items: OrderItemResponse[];
}

// Cart - frontend only
export interface CartItem {
    productId: number;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
}

// Payments
export interface InitiatePaymentDto {
    orderId: number;
    succesUrl: string;
    cancelUrl: string;
}

export interface PaymentResponse {
    paymentUrl: string;
}