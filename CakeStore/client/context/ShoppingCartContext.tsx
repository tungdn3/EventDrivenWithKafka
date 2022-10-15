import React, { createContext, ReactNode, useContext, useState } from "react"
import { ShoppingCart } from "../components/ShoppingCart";

type ShoppingCartProviderProps = {
    children: ReactNode;
}

type ShoppingCartContextProps = {
    getItemQuantity: (id: number) => number;
    increase: (id: number) => void;
    decrease: (id: number) => void;
    removeFromCart: (id: number) => void;
    clearAll: () => void;
    closeCart: () => void;
    openCart: () => void;
    items: CartItem[];
    quantity: number;
}

type CartItem = {
    id: number;
    quantity: number;
}

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const quantity = cartItems.reduce((quantity, item) => quantity += item.quantity, 0);

    function getItemQuantity(id: number) {
        const item = cartItems.find(x => x.id === id);
        return item?.quantity || 0;
    }

    function increase(id: number) {
        const item = cartItems.find(x => x.id === id);
        if (item) {
            setCartItems(cartItems.map(x => {
                if (x === item) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return x;
            }))
        } else {
            setCartItems([...cartItems, { id: id, quantity: 1 }])
        }
    }

    function decrease(id: number) {
        const item = cartItems.find(x => x.id === id);
        if (!item) {
            return;
        }
        if (item.quantity === 1) {
            setCartItems(cartItems.filter(x => x !== item));
        } else {
            setCartItems(cartItems.map(x => {
                if (x === item) {
                    return { ...x, quantity: x.quantity - 1 };
                }
                return x;
            }));
        }
    }

    function removeFromCart(id: number) {
        setCartItems(cartItems.filter(x => x.id !== id));
    }

    function clearAll() {
        setCartItems([]);
    }

    function closeCart() {
        setIsOpen(false);
    }

    function openCart() {
        setIsOpen(true);
    }

    return (
        <>
            <ShoppingCartContext.Provider value={{
                getItemQuantity,
                increase,
                decrease,
                removeFromCart,
                items: cartItems,
                quantity,
                closeCart,
                openCart,
                clearAll,
            }}>
                {children}
                <ShoppingCart isOpen={isOpen} />
            </ShoppingCartContext.Provider>
        </>
    )
}