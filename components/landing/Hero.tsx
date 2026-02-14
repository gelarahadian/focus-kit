"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-float -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl animate-float-reverse translate-y-1/2 -translate-x-1/4"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 text-gradient"
          >
            Produktivitas Maksimal dengan Kekuatan AI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl"
          >
            FocusKit menghadirkan toolkit produktivitas berbasis AI yang
            membantu Anda menyelesaikan lebih banyak pekerjaan dalam waktu lebih
            singkat. Otomasi cerdas, analisis mendalam, dan insight yang
            actionable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="#"
              className="bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-secondary transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 text-center"
            >
              Coba Gratis 14 Hari
            </Link>
            <Link
              href="#"
              className="border-2 border-dark text-dark px-8 py-4 rounded-full font-semibold text-lg hover:bg-dark hover:text-white transition-all hover:-translate-y-1 text-center"
            >
              Lihat Demo
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
