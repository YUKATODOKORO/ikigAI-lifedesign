import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const brandColor = "#5A6CD1";
const lineGreen = "#00C300";

const galleryImages = [
  "/gallery/gallery-01.webp",
  "/gallery/gallery-02.webp",
  "/gallery/gallery-03.webp",
  "/gallery/gallery-04.webp",
  "/gallery/gallery-05.webp",
  "/gallery/gallery-06.webp",
  "/gallery/gallery-07.webp",
  "/gallery/gallery-08.webp",
  "/gallery/gallery-09.webp",
  "/gallery/gallery-10.webp",
  "/gallery/gallery-11.webp",
  "/gallery/gallery-12.webp",
];

const TopGalleryPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLineLogin = () => {
    localStorage.setItem("isLineLoggedIn", "true");
    navigate("/language");
  };

  const handleGoogleLogin = () => {
    alert("Googleログインは準備中です。");
  };

  const handleEmailLogin = () => {
    alert("メールログインは準備中です。");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        padding: "24px 16px 48px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1120px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          <p
            style={{
              color: brandColor,
              fontWeight: 700,
              fontSize: "0.95rem",
              letterSpacing: "0.08em",
              marginBottom: "12px",
            }}
          >
            AI VISION BOARD
          </p>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.4rem)",
              lineHeight: 1.25,
              color: "#222",
              margin: "0 0 16px",
              fontWeight: 800,
            }}
          >
            未来を描けば、
            <br />
            行動が変わる。
          </h1>

          <p
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              color: "#555",
              fontSize: "1rem",
              lineHeight: 1.9,
            }}
          >
            あなたの価値観や理想の暮らしをもとに、
            <br />
            AIがあなただけのビジョンボードをつくります。
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "12px",
            marginBottom: "36px",
          }}
        >
          {galleryImages.map((src, index) => (
            <div
              key={src}
              style={{
                borderRadius: "14px",
                overflow: "hidden",
                backgroundColor: "#f7f7f7",
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                aspectRatio: "9 / 16",
              }}
            >
              <img
                src={src}
                alt={`Vision Board sample ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: "520px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <button
            type="button"
            onClick={handleLineLogin}
            style={{
              width: "100%",
              height: "66px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: lineGreen,
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              overflow: "hidden",
              padding: 0,
              boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
            }}
          >
            <div
              style={{
                width: "66px",
                height: "66px",
                backgroundColor: "#00B900",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRight: "1px solid rgba(255,255,255,0.15)",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  color: lineGreen,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "1rem",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                LINE
              </div>
            </div>

            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.9rem",
                fontWeight: 800,
                letterSpacing: "0.02em",
              }}
            >
              LINEでログイン
            </div>
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            style={{
              width: "100%",
              height: "54px",
              borderRadius: "10px",
              border: "1px solid #DADCE0",
              backgroundColor: "#fff",
              color: "#333",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Googleでログイン
          </button>

          <button
            type="button"
            onClick={handleEmailLogin}
            style={{
              width: "100%",
              height: "54px",
              borderRadius: "10px",
              border: "1px solid #DADCE0",
              backgroundColor: "#fff",
              color: "#333",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            メールアドレスでログイン
          </button>

          <p
            style={{
              marginTop: "8px",
              color: "#777",
              fontSize: "0.92rem",
              lineHeight: 1.8,
              textAlign: "center",
            }}
          >
            ログイン後、質問に答えるだけで
            <br />
            あなただけのビジョンボードを生成できます。
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopGalleryPage;
