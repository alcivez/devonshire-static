"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { isAuthenticated, getCurrentAuthUser } from "@/lib/auth";

export default function Header({ transparent = false }: { transparent?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  useEffect(() => {
    // Check authentication status
    setAuthenticated(isAuthenticated());
    setUser(getCurrentAuthUser());
  }, []);

  const headerClass = [
    "site-header",
    transparent ? "transparent" : "",
    transparent && scrolled ? "scrolled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClass}>
      <div className="container">
        <div className="header-inner">
          <Link href="/" className="logo-wrap">
            <Image
              src="/wp-content/uploads/2016/04/devonshire-header-logo.png"
              alt="Devonshire Recruiting & Consulting Partners"
              width={216}
              height={58}
              style={{ height: 58, width: "auto" }}
              priority
            />
            <span className="logo-tagline">Hiring Made Simple.</span>
          </Link>

          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`main-nav${mobileOpen ? " open" : ""}`}>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/jobs">Jobs</Link>
              </li>
              <li>
                <Link href="/about-devonshire">About</Link>
                <ul className="dropdown">
                  <li>
                    <Link href="/about-devonshire">Expertise</Link>
                  </li>
                  <li>
                    <Link href="/#companiesPage">Companies We've Helped</Link>
                  </li>
                  <li>
                    <Link href="/category/press-room">Press Room</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/core-focus">Core Focus</Link>
                <ul className="dropdown">
                  <li>
                    <Link href="/core-focus#focusTech">Tech Recruitment</Link>
                  </li>
                  <li>
                    <Link href="/core-focus#focusScientific">
                      Scientific Recruitment
                    </Link>
                  </li>
                  <li>
                    <Link href="/core-focus#focusFinance">
                      Finance Recruitment
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/#contactsPage">Contact</Link>
              </li>
              <li className="auth">
                {authenticated ? (
                  <Link href="/admin/dashboard" className="admin-link">
                    Dashboard
                  </Link>
                ) : (
                  <Link href="/admin/login" className="admin-link">
                    Admin Login
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
