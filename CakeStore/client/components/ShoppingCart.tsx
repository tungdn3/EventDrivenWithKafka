import React, { useState } from "react";
import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utils/formatCurrency";
import { CartItem } from "./CartItem";
import storeItems from "../data/items.json";
import axios from "axios";
import { useRouter } from 'next/router'

const baseURL = "https://localhost:7069/";

type ShoppingCartProps = {
    isOpen: boolean;
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
    const router = useRouter();
    const { closeCart, items, clearAll } = useShoppingCart();
    const [submitted, setSubmitted] = useState(false);
    const total = items.reduce((total, item) => {
        const storeItem = storeItems.find(x => x.id === item.id);
        total += (storeItem?.price || 0) * item.quantity;
        return total;
    }, 0);

    const submitOrder = () => {
        setSubmitted(true);
        const selectedCakes = items.map(item => {
            const storeItem = storeItems.find(x => x.id === item.id);
            return { ...storeItem, quantity: item.quantity };
        });
        axios
            .post(`${baseURL}Orders`, {
                cakes: selectedCakes,
            })
            .then(() => {
                clearAll();
                router.push("/thank-you");
            })
            .finally(() => {
                setSubmitted(false);
            });
    }

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {items.map(x => (
                        <CartItem key={x.id} {...x} removeAllowed={!submitted} />
                    ))}
                    <div className="ms-auto fw-bold fs-5">
                        Total: {formatCurrency(total)}
                    </div>
                    <Button onClick={submitOrder} disabled={submitted}>Order</Button>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}