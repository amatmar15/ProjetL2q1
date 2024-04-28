"use client"

import React, { createContext, useEffect, useMemo, useState } from 'react';
import { Product } from '../types/product';

// Define the initial state of the provider
interface CartContext {
    cartProducts: Product[] | null
    cartItems: number | undefined;
    total: number | undefined;
    deliveryCost: string;
    discount: number;
    addToCart: (product: Product) => void;
    removeFromCart: (product: Product) => void;
}

const initialState: CartContext = {
    cartProducts: [],
    cartItems: 0,
    total: 0,
    deliveryCost: "Free",
    discount: 0,
    addToCart: (product: Product) => { },
    removeFromCart: (product: Product) => { }
};

export const CartContext = createContext<CartContext>(initialState);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartProducts, setCartItems] = useState<Array<any> | null>(null)

    useEffect(() => {
        const data = localStorage?.getItem('cart') ? JSON.parse(localStorage?.getItem('cart')!) : [];
        setCartItems(data);
    }, [])
    const addToCart = (product: any) => {
        if (cartProducts?.some((cartProduct) => cartProduct?.id === product.id && cartProduct?.color === product.color)) {
            setCartItems((cartProducts: any) => {
                const newCartProducts = cartProducts?.map((cartProduct: any) => {
                    if (cartProduct.id === product.id && cartProduct.color === product.color) {
                        return { ...cartProduct, quantity: cartProduct.quantity + product.quantity }
                    }
                    return cartProduct;
                })
                localStorage.setItem('cart', JSON.stringify(newCartProducts));
                return newCartProducts;
            })
            return;
        }
        localStorage.setItem('cart', JSON.stringify([...cartProducts ?? [], product]));
        setCartItems([...cartProducts ?? [], product]);
    }

    const removeFromCart = (product: any) => {
        setCartItems((cartProducts) => {
            const newCartProducts = cartProducts?.filter((cartProduct) => {
                if (cartProduct.id === product.id) {
                    if (cartProduct.color === product.color) {
                        return false;
                    }
                }
                return true;
            }) || [];
            localStorage.setItem('cart', JSON.stringify(newCartProducts));
            return newCartProducts;
        })
    }
    const countTotal = () => {
        return cartProducts?.reduce((acc, product) => {
            if (product) {
                if (product.priceDiscounted) {
                    return acc + product.priceDiscounted * product.quantity;
                } else {
                    return acc + product.price * product.quantity;
                }
            }
            return acc;
        }, 0) || []
    }

    const cart = useMemo(() => {
        return {
            cartProducts,
            cartItems: cartProducts?.length,
            total: countTotal(),
            deliveryCost: "Free",
            discount: 0,
            addToCart,
            removeFromCart
        }
    }, [cartProducts])

    return (
        <CartContext.Provider value={cart}>
            {children}
        </CartContext.Provider>
    );
};



export const useCart = () => {
    const context = React.useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}