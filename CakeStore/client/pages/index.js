import axios from 'axios';
import Head from 'next/head'
import { useState } from 'react';
import { useRouter } from 'next/router'

const baseURL = "https://localhost:7069/";

export default function Home() {
  const router = useRouter();
  const [cakes, setCakes] = useState([
    { id: 1, name: "Aesthetic Blue", imageUrl: "/images/aesthetic blue.jpg", count: 0 },
    { id: 2, name: "Bundt", imageUrl: "/images/bundt.jpg", count: 0 },
    { id: 3, name: "Chocolate", imageUrl: "/images/chocolate.jfif", count: 0 },
    { id: 4, name: "Naked", imageUrl: "/images/naked.jfif", count: 0 },
    { id: 5, name: "Pineapple", imageUrl: "/images/pineapple.jpg", count: 0 },
    { id: 6, name: "Berry", imageUrl: "/images/R.jfif", count: 0 },
  ]);

  const add = (cake) => {
    setCakes(cakes.map(x => {
      if (x === cake) {
        return { ...x, count: x.count + 1 };
      }
      return x;
    }));
  }

  const submitOrder = (e) => {
    const selectedCakes = cakes.filter(x => x.count > 0);
    axios
      .post(`${baseURL}Orders`, {
        cakes: selectedCakes,
      })
      .then(() => {
        router.push("/thank-you");
      });
  }

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Sweetie" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="banner">Sweet Teeth</div>
      <div className="menu">
        {cakes.map(cake => (
          <div key={cake.name} className="menu-item">
            <img src={cake.imageUrl} alt={cake.name} />
            <div>{cake.name}</div>
            <button onClick={() => add(cake)}>Add</button>
            <div className="counter">
              <label>Count: </label>
              <label>{cake.count}</label>
            </div>
          </div>
        ))}
      </div>
      <button className="order-btn" onClick={submitOrder}>Order</button>
    </div>
  )
}
