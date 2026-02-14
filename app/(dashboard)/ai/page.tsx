"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function AIPage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("Silakan masukkan prompt terlebih dahulu");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
      } else {
        setResult(data.result);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleGenerate();
    }
  };

  const examplePrompts = [
    "Buatkan rencana liburan ke Bali selama 5 hari",
    "Susun jadwal belajar untuk ujian akhir semester",
    "Rencana bisnis untuk startup teknologi",
    "Menu diet sehat untuk seminggu",
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-secondary to-primary rounded-2xl mb-4 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            AI Planner
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Biarkan AI membantu Anda merencanakan apapun dengan cerdas dan
            efisien
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <div className="flex items-center mb-4">
                <svg
                  className="w-6 h-6 text-secondary mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                <h2 className="text-xl font-bold text-gray-900">
                  Tulis Prompt Anda
                </h2>
              </div>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Contoh: Buatkan rencana bisnis untuk café kekinian di Jakarta..."
                rows={8}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none text-gray-800"
              />

              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-gray-500">
                  💡 Tip: Tekan{" "}
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-semibold">
                    Ctrl
                  </kbd>{" "}
                  +{" "}
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-semibold">
                    Enter
                  </kbd>{" "}
                  untuk generate
                </p>
                <span className="text-sm text-gray-400">
                  {prompt.length} karakter
                </span>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                className="w-full mt-6 bg-secondary cursor-pointer text-white py-4 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
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
                    AI sedang berpikir...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <svg
                      className="w-6 h-6 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Generate dengan AI
                  </span>
                )}
              </button>
            </div>

            {/* Result Section */}
            {result && (
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <svg
                      className="w-6 h-6 text-secondary mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h2 className="text-xl font-bold text-gray-900">
                      Hasil Generate
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(result);
                      alert("Berhasil disalin ke clipboard!");
                    }}
                    className="text-secondary hover:text-secondary/80 font-medium text-sm flex items-center"
                  >
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Salin
                  </button>
                </div>
                <div className="prose prose-indigo max-w-none">
                  <pre className="whitespace-pre-wrap bg-gradient-to-br from-gray-50 to-indigo-50 p-6 rounded-xl text-gray-800 text-sm leading-relaxed border border-indigo-100">
                    {result}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Example Prompts */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 text-secondary mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                Contoh Prompt
              </h3>
              <div className="space-y-2">
                {examplePrompts.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(example)}
                    className="w-full text-left px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 rounded-lg text-sm text-gray-700 transition-all border border-indigo-100 hover:border-indigo-200"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-linear-to-br from-secondary to-primary rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                Tips Penggunaan
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">✨</span>
                  <span>Jelaskan kebutuhan Anda dengan spesifik</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🎯</span>
                  <span>
                    Sertakan detail seperti waktu, lokasi, atau budget
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📝</span>
                  <span>Gunakan bahasa yang jelas dan mudah dipahami</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🔄</span>
                  <span>Coba berbagai variasi prompt untuk hasil terbaik</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
