import { useEffect, useState } from "react";
import "../styles/home.css";

const images = [
  "https://images.unsplash.com/photo-1593693397690-362cb9666fc2", // Kerala backwaters
  "https://plus.unsplash.com/premium_photo-1697730304904-2bdf66da8f2b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Houseboat
  "https://images.unsplash.com/photo-1668070924650-d73bcafb539c?q=80&w=1051&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Kathakali
  "https://unsplash.com/photos/a-couple-of-elephants-standing-next-to-each-other-0tuzOfs-T3s", // Kerala village
  "https://images.unsplash.com/photo-1679303439170-b71f9bba3b71?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  // Coconut trees
];

const Home = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000); // 🔥 slower (4 sec)

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="home">
      <section className="hero">
        {images.map((img, index) => (
          <div
            key={index}
            className={`slide ${index === current ? "active" : ""}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}

        <div className="hero-content">
          <h1>Welcome to Kerala Samajam Vasai East</h1>
          <p>
            A vibrant community celebrating Kerala’s culture, traditions,
            unity, and heritage across generations.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;
