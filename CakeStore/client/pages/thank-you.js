import Link from "next/link";
import { Container } from "react-bootstrap";

export default function ThankYou() {
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center">
            <img src="/images/thank-you.jfif" alt="Thank you" />
            <h1 style={{ color: "rgb(123, 57, 9)" }}>Your order has been placed</h1>
            <Link href="/">
                <a style={{ fontStyle: "italic", color: "rgb(123, 57, 9)", textDecorationLine: "underline" }}>Back to home page</a>
            </Link>
        </Container>
    )
}