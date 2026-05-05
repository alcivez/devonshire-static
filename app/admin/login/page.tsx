"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/auth';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div
        className="page-header"
        style={{
          backgroundImage: "url(/wp-content/uploads/2014/12/Fotolia_95249632_Subscription_Monthly_M.jpg)",
        }}
      >
        <div className="container page-header-content">
          <h1>Admin Login</h1>
        </div>
      </div>

      <main className="container" style={{ padding: "60px 0" }}>
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
          {error && (
            <div style={{
              backgroundColor: "#fee2e2",
              borderLeft: "4px solid #ef4444",
              padding: "16px",
              borderRadius: "0 8px 8px 0",
              marginBottom: "24px"
            }}>
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <svg
                  className="w-5 h-5 text-red-400 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  style={{ width: "20px", height: "20px", marginRight: "12px" }}
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p style={{ color: "#991b1b", fontSize: "14px", fontWeight: "500", margin: 0 }}>
                  {error}
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <label
                htmlFor="username"
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "700",
                  marginBottom: "8px",
                  color: "#555",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  fontFamily: "Raleway, sans-serif"
                }}
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontFamily: "Lato, sans-serif",
                  boxSizing: "border-box"
                }}
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "700",
                  marginBottom: "8px",
                  color: "#555",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  fontFamily: "Raleway, sans-serif"
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    paddingRight: "40px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontFamily: "Lato, sans-serif",
                    boxSizing: "border-box"
                  }}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      style={{ width: "20px", height: "20px", color: "#6b7280" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      style={{ width: "20px", height: "20px", color: "#6b7280" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "16px 40px",
                backgroundColor: "#f38131",
                color: "white",
                border: "2px solid #f38131",
                borderRadius: "4px",
                fontSize: "17px",
                fontWeight: "700",
                fontFamily: "Raleway, sans-serif",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.5 : 1,
                transition: "all 0.2s"
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = "#d46b1a";
                  e.currentTarget.style.borderColor = "#d46b1a";
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#f38131";
                e.currentTarget.style.borderColor = "#f38131";
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div style={{ textAlign: "center", paddingTop: "8px" }}>
              <a
                href="/"
                style={{
                  color: "#f38131",
                  fontSize: "14px",
                  textDecoration: "none",
                  fontFamily: "Lato, sans-serif"
                }}
              >
                ← Return to Main Site
              </a>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}