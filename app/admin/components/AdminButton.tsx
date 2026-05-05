import React from 'react';

interface AdminButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function AdminButton({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}: AdminButtonProps) {
  const baseStyles = {
    fontFamily: "Raleway, sans-serif",
    fontWeight: "700",
    borderRadius: "4px",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s",
    border: "2px solid",
    opacity: disabled ? 0.5 : 1,
  };

  const variantStyles = {
    primary: {
      backgroundColor: "#f38131",
      color: "white",
      borderColor: "#f38131",
    },
    secondary: {
      backgroundColor: "transparent",
      color: "#f38131",
      borderColor: "#f38131",
    },
    danger: {
      backgroundColor: "#ef4444",
      color: "white",
      borderColor: "#ef4444",
    },
  };

  const sizeStyles = {
    sm: {
      padding: "8px 16px",
      fontSize: "14px",
    },
    md: {
      padding: "12px 24px",
      fontSize: "15px",
    },
    lg: {
      padding: "16px 32px",
      fontSize: "17px",
    },
  };

  const currentVariant = variantStyles[variant];
  const currentSize = sizeStyles[size];

  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (variant === 'primary') {
      e.currentTarget.style.backgroundColor = "#d46b1a";
      e.currentTarget.style.borderColor = "#d46b1a";
    } else if (variant === 'secondary') {
      e.currentTarget.style.backgroundColor = "#f38131";
      e.currentTarget.style.color = "white";
    } else if (variant === 'danger') {
      e.currentTarget.style.backgroundColor = "#dc2626";
      e.currentTarget.style.borderColor = "#dc2626";
    }
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = currentVariant.backgroundColor;
    e.currentTarget.style.borderColor = currentVariant.borderColor;
    if (variant === 'secondary') {
      e.currentTarget.style.color = currentVariant.color;
    }
  };

  return (
    <button
      style={{
        ...baseStyles,
        ...currentVariant,
        ...currentSize,
      }}
      className={className}
      disabled={disabled}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      {...props}
    >
      {children}
    </button>
  );
}