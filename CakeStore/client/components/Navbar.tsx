import Image from "next/image";
import React from "react";
import { Button, Container } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";

export default function Navbar() {
    const { quantity, openCart } = useShoppingCart();

    return (
        <>
            <Container className="d-flex justify-content-between mt-1">
                <nav className="navbar navbar-expand-sm navbar-light bg-white">
                    <a className="navbar-brand" href="#">Sweet Teeth</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {/* <li className="nav-item active">
                                <a className="nav-link" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/store">Store</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/about">About</a>
                            </li> */}
                        </ul>
                    </div>
                </nav>
                <Button
                    variant="outline-primary"
                    className="rounded-circle"
                    style={{ width: "3rem", height: "3rem", position: "relative" }}
                    onClick={() => openCart()}
                >
                    <Image src="/cart.svg" alt="cart" width={25} height={25} />
                    {quantity > 0 && (
                        <div
                            style={{ position: "absolute", bottom: 0, right: 0, color: "white", width: "1.5rem", height: "1.5rem", transform: "translate(25%, 25%)" }}
                            className="bg-danger rounded-circle d-flex justify-content-center align-items-center"
                        >
                            {quantity}
                        </div>
                    )}
                </Button>
            </Container>
        </>
    )
}