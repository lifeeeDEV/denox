import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-neutral-700">
      <div className="container mx-auto text-center">
        <p className="text-foregroundMuted mb-6">&copy; 2024 Deniz Kaya. Alle Rechte vorbehlten.</p>
        <div className="flex justify-center space-x-8">
          <a
            href="https://www.tiktok.com/@deniz.sk07"
            className="text-foregroundMuted hover:text-foreground transition-transform transform hover:scale-110"
          >
            <FaTiktok size={28} />
          </a>
          <a
            href="https://www.youtube.com/channel/UCET7SLUDY3Auhdb79ZddiIQ"
            className="text-foregroundMuted hover:text-foreground transition-transform transform hover:scale-110"
          >
            <FaYoutube size={28} />
          </a>
          <a
            href="https://www.instagram.com/deniz.sk07?igsh=MW1wb2loeDl5dWFlOQ%3D%3D"
            className="text-foregroundMuted hover:text-foreground transition-transform transform hover:scale-110"
          >
            <FaInstagram size={28} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
