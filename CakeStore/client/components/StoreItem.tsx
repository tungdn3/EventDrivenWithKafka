import React from "react";
import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utils/formatCurrency";

type StoreItemProps = {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

export function StoreItem({ id, name, price, imageUrl }: StoreItemProps) {
    const { getItemQuantity, increase, decrease, removeFromCart } = useShoppingCart();
    const quantity = getItemQuantity ? getItemQuantity(id) : 0;

    return (
        <Card className="h-100">
            <Card.Img variant="top" src={imageUrl} height="200px" style={{ objectFit: "cover" }} />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between algin-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">{formatCurrency(price)}</span>
                </Card.Title>
                <div className="mt-auto">
                    {quantity === 0 ? (
                        <Button className="w-100" onClick={() => increase(id)}>+ Add To Cart</Button>
                    ) : (
                        <div className="d-flex flex-column align-items-center" style={{ gap: "0.5rem" }}>
                            <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                                <Button onClick={() => decrease(id)}>-</Button>
                                <span className="fs-3">{quantity}</span> in cart
                                <Button onClick={() => increase(id)}>+</Button>
                            </div>
                            <Button variant="danger" size="sm" onClick={() => removeFromCart(id)}>Remove</Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    )
}