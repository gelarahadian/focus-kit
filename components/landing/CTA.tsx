"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 bg-dark text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Siap Meningkatkan Produktivitas Anda?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
            Bergabunglah dengan ribuan profesional yang telah meningkatkan
            produktivitas mereka hingga 300% dengan FocusKit. Coba gratis selama
            14 hari, tanpa kartu kredit.
          </p>
          <Link
            href="#"
            className="inline-block bg-white text-primary px-10 py-5 rounded-full font-bold text-lg hover:bg-accent hover:text-dark transition-all hover:shadow-2xl hover:-translate-y-1"
          >
            Mulai Gratis Sekarang
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
