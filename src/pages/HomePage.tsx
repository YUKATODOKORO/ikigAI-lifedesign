// src/pages/HomePage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import topBanner from "../assets/header.png";
import ScrollingBanner from "../components/ScrollingBanner";
import bottomBanner from "../assets/footer.png";
import { theme } from "../theme";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: theme.background,
        textAlign: "center",
      }}
    >
      {/* Top Banner */}
      <ScrollingBanner src={topBanner} direction="left" />

      {/* Main Content */}
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "64px 16px",
        }}
      >
        {/* Title */}
        <h1
          style={{
            color: theme.text,
            fontSize: "2rem",
            fontWeight: 800,
            marginBottom: "24px",
          }}
        >
          Welcome to ikigAI
        </h1>

        {/* CTA Button */}
        <button
          type="button"
          onClick={() => navigate("/language")}
          style={{
            marginTop: "24px",
            padding: "16px 40px",
            borderRadius: "999px",
            border: "none",
            background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
            color: "#fff",
            fontSize: "1.1rem",
            fontWeight: 900,
            cursor: "pointer",
          }}
        >
          Start Vision Board
        </button>
      </div>

      {/* Bottom Banner */}
      <ScrollingBanner src={bottomBanner} direction="right" />
    </div>
  );
};

export default HomePage;
