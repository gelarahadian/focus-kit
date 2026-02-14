import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0e27] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h4 className="font-display text-2xl font-bold mb-4">FocusKit</h4>
            <p className="text-white/70 leading-relaxed">
              Toolkit produktivitas AI untuk profesional modern. Tingkatkan
              efisiensi, capai lebih banyak.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-display text-xl font-semibold mb-4">Produk</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Fitur
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Harga
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Integrasi
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  API
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display text-xl font-semibold mb-4">
              Perusahaan
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Karir
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-display text-xl font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 text-center text-white/60">
          <p>&copy; 2026 FocusKit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
