"use client";

import { useState, useRef } from 'react';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  accept?: string;
}

export default function ImageUpload({ value, onChange, label = "Featured Image", accept = "image/*" }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <label style={{
        display: "block",
        fontSize: "13px",
        fontWeight: "600",
        color: "#374151",
        fontFamily: "Lato, sans-serif"
      }}>
        {label}
      </label>

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: isDragging ? "2px dashed #f38131" : "2px dashed #d1d5db",
          borderRadius: "8px",
          padding: "32px",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: isDragging ? "#fff7ed" : "#f9fafb",
          transition: "all 0.2s"
        }}
      >
        {preview ? (
          <div style={{ position: "relative" }}>
            <img
              src={preview}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "300px",
                borderRadius: "4px",
                objectFit: "contain"
              }}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "8px 12px",
                cursor: "pointer",
                fontSize: "14px",
                fontFamily: "Lato, sans-serif"
              }}
            >
              Remove
            </button>
          </div>
        ) : (
          <div>
            <div style={{
              width: "48px",
              height: "48px",
              margin: "0 auto 16px",
              backgroundColor: "#f38131",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <svg
                style={{ width: "24px", height: "24px", color: "white" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p style={{
              fontSize: "14px",
              color: "#374151",
              marginBottom: "8px",
              fontFamily: "Lato, sans-serif",
              margin: "0 0 8px 0"
            }}>
              Click to upload or drag and drop
            </p>
            <p style={{
              fontSize: "12px",
              color: "#6b7280",
              fontFamily: "Lato, sans-serif",
              margin: 0
            }}>
              PNG, JPG, GIF, WEBP up to 10MB
            </p>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        style={{ display: "none" }}
      />

      {/* Image URL Input */}
      <div>
        <label style={{
          display: "block",
          fontSize: "12px",
          fontWeight: "500",
          color: "#6b7280",
          marginBottom: "4px",
          fontFamily: "Lato, sans-serif"
        }}>
          Or enter image URL:
        </label>
        <input
          type="url"
          value={preview || ''}
          onChange={(e) => {
            setPreview(e.target.value);
            onChange(e.target.value);
          }}
          placeholder="https://example.com/image.jpg"
          style={{
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "14px",
            fontFamily: "Lato, sans-serif",
            boxSizing: "border-box"
          }}
        />
      </div>
    </div>
  );
}