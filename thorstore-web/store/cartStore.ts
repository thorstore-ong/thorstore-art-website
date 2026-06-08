import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {CartItem} from '../types';

interface CartStore {
    items: CartItem[]; // Array to hold items in the cart
    addItem: (item: CartItem) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    totalItems: () => number;
    totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            // Initial state of the cart is empty
            items: [], 
        addItem: (item) => {
            const existing = get().items.find(i => i.productId === item.productId);
            if (existing) {
                set({
                    // If the item already exists in the cart, update its quantity
                    items: get().items.map(i => 
                        i.productId === item.productId 
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i // Keep other items unchanged
                    )
                });
            } else {
                set({ items: [...get().items, item] }); // Add new item to the cart
            }       
        },
        
        removeItem: (productId) => {
            // Remove the item with the specified productId from the cart
            set({ items: get().items.filter(i => i.productId !== productId) }); // Remove item from the cart
        },

        updateQuantity: (productId, quantity) => {

            if (quantity <= 0) {
                get().removeItem(productId); 
                return;
            }
            // Update the quantity of the specified item in the cart
            set({
                items: get().items.map(i =>
                    i.productId === productId ? {...i, quantity } : i
                ),
            });
        },

        clearCart: () => set({ items: [] }), // Clear all items from the cart

        // Calculate the total number of all items in the cart
        totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0), 

        // Calculate the total price of all items in the cart
        totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0)
        }),
        {
            name: 'cart-storage', // Name of the localStorage key to persist the cart state
        }
    )
);