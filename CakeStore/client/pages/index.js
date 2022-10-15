import Head from 'next/head'
import { Col, Container, Row } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import storeItems from '../data/items.json';
import { StoreItem } from '../components/StoreItem';
import { ShoppingCartProvider } from '../context/ShoppingCartContext';

export default function Home() {

  return (
    <>
      <ShoppingCartProvider>
        <Navbar></Navbar>
        <Container>
          <Head>
            <title>Sweet Teeth</title>
            <meta name="description" content="Sweetie" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Row md={2} xs={1} lg={3} className="g-3">
            {storeItems.map(item => (
              <Col key={item.id}>
                <StoreItem {...item} />
              </Col>
            ))}
          </Row>
        </Container>
      </ShoppingCartProvider>
    </>
  )
}
