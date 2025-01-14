import React from "react";

const FloatingLabelBox = ({ label, text }) => {
  return (
    <div
      style={{
        position: "relative",
        marginBottom: "20px",
        padding: "10px",
        border: "1px solid gray",
        borderRadius: "5px",
        width: "100%",
        backgroundColor: "transparent",
      }}
    >
      {/* Floating Label */}
      <label
        style={{
          position: "absolute",
          left: "10px",
          top: "1px",
          fontSize: text ? "12px" : "16px",
          color: "#fff",
          pointerEvents: "none",
          transform: text ? "translateY(-50%)" : "translateY(0)",
          transition: "all 0.2s ease-in-out",
          background: "#2B2A38", // Match background color for a seamless look
          padding: "0 5px", // Add padding to prevent overlap with the border
        }}
      >
        {label}
      </label>

      {/* Text Display */}
      <div
        style={{
          padding: "10px",
          fontSize: "16px",
          color: "#fff",
          minHeight: "40px", // Ensure space for empty box
        }}
      >
        {text || <span style={{ color: "gray" }}>No data available</span>}
      </div>
    </div>
  );
};

export default FloatingLabelBox;
