import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import hero1 from '../assets/hero/hero1.jpg';
import hero2 from '../assets/hero/hero2.jpg';
import hero3 from '../assets/hero/hero3.jpg';
import hero5 from '../assets/hero/hero5.jpg';

const images = [hero1, hero2, hero3, hero5];

const Home = () => {
  const [current, setCurrent] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="w-full">
      <section className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden bg-gray-900">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out brightness-95 ${index === current ? "opacity-100" : "opacity-0"}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}

        <div className="relative z-10 h-full bg-gradient-to-br from-cream-white/25 via-gold-primary/35 via-30% to-emerald-primary/45 to-70% text-white flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-6xl mb-5 font-bold text-shadow-dark gradient-text-hero animate-fade-in-up">
            {t('home.welcome')}
          </h1>
          <p className="max-w-3xl text-lg md:text-xl leading-relaxed text-white text-shadow-light font-medium animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
            {t('home.tagline')}
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;
