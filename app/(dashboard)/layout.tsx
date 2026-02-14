"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if(user){
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        setUser(user);
        setProfile(profile);
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Gagal logout");
    } else {
      toast.success("Berhasil logout");
      router.push("/login");
    }
  };

  const navigation = [
    {
      name: "AI Generator",
      href: "/ai",
      icon: (
        <svg
          className="w-5 h-5"
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
      ),
    },
    {
      name: "Billing",
      href: "/billing",
      icon: (
        <svg
          className="w-5 h-5"
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
      ),
    },
    {
      name: "Pricing",
      href: "/pricing",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar untuk Desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-6 mb-6">
            <Link
              href="/dashboard"
              className="font-display text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              FocusKit
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all ${
                  isActive(item.href)
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30"
                    : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                }`}
              >
                <span
                  className={`mr-3 ${isActive(item.href) ? "text-white" : "text-gray-400 group-hover:text-primary"}`}
                >
                  {item.icon}
                </span>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className="flex-shrink-0 px-3 pb-4">
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center w-full px-3 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-100 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold mr-3">
                  U
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold">{profile?.full_name || "User"}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute bottom-full left-3 right-3 mb-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <Link
          href="/dashboard"
          className="font-display text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          FocusKit
        </Link>
        <div className="w-6" /> {/* Spacer */}
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-4">
              <button
                onClick={() => setSidebarOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full text-white hover:bg-white/10"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              {/* Logo */}
              <div className="flex items-center flex-shrink-0 px-6 mb-6">
                <Link
                  href="/dashboard"
                  className="font-display text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                >
                  FocusKit
                </Link>
              </div>

              {/* Navigation */}
              <nav className="px-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all ${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30"
                        : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                    }`}
                  >
                    <span
                      className={`mr-3 ${isActive(item.href) ? "text-white" : "text-gray-400 group-hover:text-primary"}`}
                    >
                      {item.icon}
                    </span>
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Mobile User Section */}
            <div className="flex-shrink-0 px-3 pb-4">
              <div className="flex items-center px-3 py-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold mr-3">
                  U
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    User Name
                  </p>
                  <p className="text-xs text-gray-500">user@email.com</p>
                </div>
              </div>
              <div className="mt-2 space-y-1 px-3">
                <Link
                  href="/dashboard/profile"
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="lg:pl-64">
        <main className="pt-16 lg:pt-0">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
