"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: "🤖",
    title: "AI Assistant",
    description:
      "An AI assistant that understands the context of your work and provides smart suggestions to complete tasks more efficiently.",
    gradient: "from-purple-400 to-purple-600",
  },
  {
    icon: "📊",
    title: "Productivity Analytics",
    description:
      "An analytics dashboard that displays productivity metrics, work patterns, and recommendations for performance improvement.",
    gradient: "from-pink-400 to-red-500",
  },
  {
    icon: "⚡",
    title: "Smart Automation",
    description:
      "Automate repetitive tasks with AI workflows that learn from your work habits and save you valuable time.",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    icon: "🎯",
    title: "Task Management",
    description:
      "Manage projects and tasks with an intelligent priority system that helps you focus on what matters most.",
    gradient: "from-purple-400 to-purple-600",
  },
  {
    icon: "🔗",
    title: "Seamless Integrations",
    description:
      "Connect with 100+ of your favorite apps like Slack, Google Workspace, Notion, and many more.",
    gradient: "from-pink-400 to-red-500",
  },
  {
    icon: "🔒",
    title: "Enterprise-Grade Security",
    description:
      "End-to-end encryption and compliance with international security standards to keep your data protected.",
    gradient: "from-cyan-400 to-blue-500",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
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
      className="group relative p-8 bg-white rounded-3xl border-2 border-gray-100 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-transparent overflow-hidden"
    >
      {/* Gradient Background on Hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      ></div>

      {/* Content */}
      <div className="relative z-10">
        <span className="text-6xl block mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
          {feature.icon}
        </span>
        <h3 className="font-display text-2xl font-bold mb-3 text-dark group-hover:text-white transition-colors">
          {feature.title}
        </h3>
        <p className="text-gray-600 group-hover:text-white/90 transition-colors leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-4 text-dark">
            Key Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to boost your work and personal productivity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
