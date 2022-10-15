import React from "react";
import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utils/formatCurrency";
import cartItems from "../data/items.json";

type CartItemProps = {
    id: number;
    quantity: number;
    removeAllowed: boolean;
}

export function CartItem({ id, quantity, removeAllowed }: CartItemProps) {
    const { removeFromCart } = useShoppingCart();
    const item = cartItems.find(x => x.id === id);
    if (!item) {
        return null;
    }

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img
                src={item.imageUrl}
                style={{ width: "125px", height: "125px", objectFit: "cover" }}
            />
            <div className="me-auto">
                <div>
                    {item.name} <span className="text-muted" style={{ fontSize: "0.75rem" }}>x{quantity}</span>
                </div>
                <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                    {formatCurrency(item.price)}
                </div>
            </div>
            <div>{formatCurrency(item.price * quantity)}</div>
            <Button disabled={!removeAllowed} variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>&times;</Button>
        </Stack>
    )
}