"use client";

import { plans } from "@/lib/plans";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { User } from "@supabase/supabase-js";

export default function PricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleUpgrade = async () => {
    setLoading(true);

    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Error creating checkout");
    }

    setLoading(false);
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pilih Paket yang Tepat untuk Anda
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tingkatkan pengalaman Anda dengan fitur-fitur premium yang dirancang
            untuk kebutuhan Anda
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                plan.id === "pro" ? "ring-2 ring-purple-500 scale-105" : ""
              }`}
            >
              {/* Popular Badge */}
              {plan.id === "pro" && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
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
                        ? "bg-gradient-to-br from-purple-500 to-blue-600"
                        : "bg-gradient-to-br from-blue-500 to-purple-600"
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h2>

                {/* Price */}
                <div className="mb-6">
                  {plan.price === 0 ? (
                    <div className="text-4xl font-bold text-gray-900">
                      Gratis
                    </div>
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
                    disabled={loading}
                    onClick={() => handleUpgrade()}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                      plan.id === "pro"
                        ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:from-purple-600 hover:to-blue-700 shadow-lg hover:shadow-xl"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Memproses...
                      </span>
                    ) : (
                      "Upgrade Sekarang"
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ada pertanyaan?
          </h3>
          <p className="text-gray-600 mb-6">
            Hubungi tim kami untuk informasi lebih lanjut tentang paket yang
            tersedia
          </p>
          <a
            href="/contact"
            className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700"
          >
            Hubungi Kami
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}