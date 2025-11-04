import React from "react";
import { FaWhatsapp, FaInstagram, FaEnvelope } from "react-icons/fa";
import studioImage from "../assets/studio.jpg";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-900/95 flex flex-col items-center justify-between px-4 py-16 md:py-20 text-white">
      {/* Book Session Button */}
      <a
        href="https://wa.me/250783555561"
        target="_blank"
        rel="noopener noreferrer"
        className="w-40 bg-soft-neon-blue/40 hover:bg-soft-neon-blue/60 transition-all duration-200 text-white text-center font-semibold py-2 rounded-lg shadow-md drop-shadow-neon mb-6"
      >
        Book Session
      </a>

      {/* Main Card */}
      <div className="max-w-5xl w-full bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-xl flex flex-col md:flex-row items-center md:items-start p-6 sm:p-8 gap-8 mt-4">
        {/* Left Side: Image */}
        <div className="w- h-100 md:w-1/2 flex justify-center">
          <img
            src={studioImage}
            alt="Studio"
            className="rounded-xl shadow-lg w-full max-w-md object-cover"
          />
        </div>

        {/* Right Side: Text Content */}
        <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
          <h2 className="text-3xl font-semibold text-sweet-white drop-shadow-sweet-white">
            Our Story ❤️
          </h2>
          <p className="text-gray-300 font-medium">
            Professional & Inspirational
          </p>
          <h3 className="text-xl font-semibold mt-4 text-sweet-white drop-shadow-sweet-white">
            Welcome to Global Vybz — Where Sound Meets Soul
          </h3>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            Since 2022, Global Vybz has been more than just a studio — it’s a
            creative movement founded by Popeiyeh, built on passion, precision,
            and pure love for music.
            <br />
            What began as a simple home setup has grown into a vibrant hub for
            producers, artists, and dreamers who believe in making music that
            speaks to the heart.
            <br />
            Here, every session is an experience — from crafting unique
            instrumentals to recording vocals that capture emotion and energy.
            <br />
            At Global Vybz, we don’t just make beats — we build vibes that
            connect people across the world.
            <br />
            Step into our world, where creativity never sleeps and every sound
            tells a story.
            <br />
            Welcome home — welcome to Global Vybz.
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-10 mb-4 flex flex-col items-center text-center space-y-3">
        <p className="text-sm text-gray-400">
          Connect with us on social media 🌐
        </p>
        <div className="flex space-x-6 text-2xl">
          <a
            href="https://wa.me/250783555561"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-colors"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://www.instagram.com/global_vybz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition-colors"
          >
            <FaInstagram />
          </a>
          <a
            href="mailto:julesjulesce@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-400 transition-colors"
          >
            <FaEnvelope />
          </a>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          © {new Date().getFullYear()} Global Vybz. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Contact;
