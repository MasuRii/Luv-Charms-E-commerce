"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define CartItem type
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Define CartContextType
export interface CartContextType {
  cartItems: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  showCart: boolean;
  setShowCart: (show: boolean) => void;
  onAdd: (product: Omit<CartItem, 'quantity'>, quantity: number) => void;
  onRemove: (productId: string) => void;
  toggleCartItemQuantity: (productId: string, action: 'inc' | 'dec') => void;
  clearCart: () => void;
}

// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider Component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle hydration - only run on client
  useEffect(() => {
    setMounted(true);
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, mounted]);

  // Calculate total quantity
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Add product to cart
  const onAdd = (product: Omit<CartItem, 'quantity'>, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);

      if (existingItemIndex !== -1) {
        // Product exists, increment quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return updatedItems;
      } else {
        // New product, add to cart
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Remove product from cart
  const onRemove = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // Toggle cart item quantity (increment or decrement)
  const toggleCartItemQuantity = (productId: string, action: 'inc' | 'dec') => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.id === productId) {
            if (action === 'inc') {
              return { ...item, quantity: item.quantity + 1 };
            } else if (action === 'dec') {
              // Prevent quantity from going below 1
              if (item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
              } else {
                // If quantity is 1 and user decrements, remove item
                return null;
              }
            }
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalQuantity,
        totalPrice,
        showCart,
        setShowCart,
        onAdd,
        onRemove,
        toggleCartItemQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};