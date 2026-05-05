import React from 'react';

interface AdminCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function AdminCard({ children, className = '', title, subtitle }: AdminCardProps) {
  return (
    <div
      className={className}
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e5e7eb",
      }}
    >
      {(title || subtitle) && (
        <div style={{
          padding: "20px 24px",
          borderBottom: "1px solid #e5e7eb"
        }}>
          {title && (
            <h3 style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#323232",
              fontFamily: "Raleway, sans-serif",
              margin: subtitle ? "0 0 4px 0" : "0"
            }}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p style={{
              fontSize: "14px",
              color: "#6b7280",
              fontFamily: "Lato, sans-serif",
              margin: 0
            }}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div style={{ padding: "24px" }}>
        {children}
      </div>
    </div>
  );
}