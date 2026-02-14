"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-50/90 backdrop-blur-lg border-b border-black/5"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-3xl font-bold text-gradient-primary"
          >
            FocusKit
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-dark hover:text-primary transition-colors relative group"
            >
              Fitur
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="#pricing"
              className="text-dark hover:text-primary transition-colors relative group"
            >
              Harga
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="#about"
              className="text-dark hover:text-primary transition-colors relative group"
            >
              Tentang
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="#contact"
              className="text-dark hover:text-primary transition-colors relative group"
            >
              Kontak
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/register"
              className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-secondary hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
            >
              Mulai Gratis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-dark text-2xl"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 space-y-4"
          >
            <Link
              href="#features"
              className="block text-dark hover:text-primary transition-colors"
            >
              Fitur
            </Link>
            <Link
              href="#pricing"
              className="block text-dark hover:text-primary transition-colors"
            >
              Harga
            </Link>
            <Link
              href="#about"
              className="block text-dark hover:text-primary transition-colors"
            >
              Tentang
            </Link>
            <Link
              href="#contact"
              className="block text-dark hover:text-primary transition-colors"
            >
              Kontak
            </Link>
            <Link
              href="/register"
              className="block text-center bg-primary text-white px-6 py-3 rounded-full font-semibold"
            >
              Mulai Gratis
            </Link>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
