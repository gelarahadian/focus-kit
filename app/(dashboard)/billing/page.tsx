import { createClient } from "@/lib/supabase/server";
import ManageBillingButton from "./ManageBillingButton";

export default async function BillingPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <svg
            className="w-16 h-16 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Unauthorized
          </h2>
          <p className="text-gray-600">Please login to access this page</p>
        </div>
      </div>
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const { data: payments } = await supabase
    .from("payments")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const isPro = profile?.plan !== "free";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Billing & Subscription
              </h1>
              <p className="text-gray-600">
                Kelola langganan dan riwayat pembayaran Anda
              </p>
            </div>
            <div className="hidden md:block">
              <svg
                className="w-16 h-16 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Current Plan Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div
            className={`p-6 ${
              isPro ? "bg-linear-to-r from-secondary to-primary" : "bg-gray-800"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium mb-1">
                  Paket Saat Ini
                </p>
                <h2 className="text-3xl font-bold text-white capitalize">
                  {profile?.plan || "Free"}
                </h2>
              </div>
              <div
                className={`px-4 py-2 rounded-full ${
                  subscription?.status === "active"
                    ? "bg-green-500"
                    : "bg-gray-700"
                }`}
              >
                <span className="text-white font-semibold text-sm">
                  {subscription?.status === "active" ? "Active" : "Free Plan"}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <ManageBillingButton profile={profile} />

              {profile?.plan === "free" && (
                <a href="/pricing" className="flex-1">
                  <button className="w-full bg-linear-to-r from-primary to-secondary text-white py-3 px-6 rounded-lg font-semibold hover:from-primary/80 hover:to-secondary/80 transition-all shadow-lg hover:shadow-xl">
                    <span className="flex items-center justify-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                      Upgrade ke Pro
                    </span>
                  </button>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">
              Riwayat Pembayaran
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Lihat semua transaksi pembayaran Anda
            </p>
          </div>

          {payments && payments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Jumlah
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {payments.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <svg
                            className="w-5 h-5 text-gray-400 mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm font-medium text-gray-900">
                            {new Date(p.created_at).toLocaleDateString(
                              "id-ID",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900">
                          ${(p.amount / 100).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            p.status === "paid"
                              ? "bg-green-100 text-green-800"
                              : p.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {p.status === "paid" && (
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                          {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Belum Ada Riwayat Pembayaran
              </h3>
              <p className="text-gray-600">
                Pembayaran Anda akan muncul di sini
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
