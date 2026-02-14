"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { plans } from "@/lib/plans";

const pricingPlans = [
  {
    name: "Starter",
    price: "$9",
    period: "/bulan",
    features: [
      "AI Assistant Basic",
      "Hingga 100 tugas/bulan",
      "Analisis produktivitas dasar",
      "5 integrasi aplikasi",
      "1 GB penyimpanan",
      "Email support",
    ],
    cta: "Pilih Starter",
    featured: false,
  },
  {
    name: "Professional",
    price: "$29",
    period: "/bulan",
    badge: "Paling Populer",
    features: [
      "AI Assistant Advanced",
      "Unlimited tugas",
      "Analisis produktivitas lengkap",
      "Unlimited integrasi",
      "50 GB penyimpanan",
      "Otomasi workflow",
      "Priority support",
    ],
    cta: "Pilih Professional",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: [
      "Semua fitur Professional",
      "Custom AI training",
      "Dedicated account manager",
      "Unlimited penyimpanan",
      "Advanced security",
      "SLA 99.9% uptime",
      "24/7 support",
    ],
    cta: "Hubungi Kami",
    featured: false,
  },
];

function PricingCard({
  plan,
  index,
}: {
  plan: (typeof plans)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
        plan.id === "pro" ? "ring-2 ring-secondary scale-105" : ""
      }`}
    >
      {plan.id === "pro" && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-linear-to-r from-secondary to-primary text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
            Paling Populer
          </span>
        </div>
      )}

      <div className="p-8">
        {/* Plan Icon */}
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${
            plan.id === "free"
              ? "bg-gray-100"
              : plan.id === "pro"
                ? "bg-gradient-to-br from-secondary to-primary"
                : "bg-gradient-to-br from-primary to-secondary"
          }`}
        >
          <svg
            className={`w-7 h-7 ${plan.id === "free" ? "text-gray-600" : "text-white"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {plan.id === "free" ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            ) : plan.id === "pro" ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            )}
          </svg>
        </div>

        {/* Plan Name */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h2>

        {/* Price */}
        <div className="mb-6">
          {plan.price === 0 ? (
            <div className="text-4xl font-bold text-gray-900">Gratis</div>
          ) : (
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-gray-900">
                ${plan.price}
              </span>
              <span className="text-gray-600 ml-2">/bulan</span>
            </div>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-4 mb-8">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start">
              <svg
                className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        {plan.id === "free" ? (
          <button
            disabled
            className="w-full py-3 px-6 rounded-lg font-semibold bg-gray-100 text-gray-500 cursor-not-allowed"
          >
            Paket Saat Ini
          </button>
        ) : (
          <button
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
              plan.id === "pro"
                ? "bg-linear-to-r from-secondary to-primary text-white hover:from-primary hover:to-secondary shadow-lg hover:shadow-xl"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            Upgrade Sekarang
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="pricing"
      className="py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-4 text-dark">
            Pilih Paket Anda
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Harga yang fleksibel untuk individu dan tim dengan segala ukuran
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
