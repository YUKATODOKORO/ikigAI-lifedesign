import React from "react";

const brandColor = "rgb(90, 108, 209)";
const lineColor = "#06C755";

const LineLoginPage: React.FC = () => {
  const handleLineLogin = () => {
    const channelId = process.env.REACT_APP_LINE_CHANNEL_ID;

    if (!channelId) {
      alert("LINE Channel ID が設定されていません。");
      return;
    }

    const redirectUri = `${window.location.origin}/auth/line/callback`;
    const state = crypto.randomUUID();
    const nonce = crypto.randomUUID();

    localStorage.setItem("line_login_state", state);
    localStorage.setItem("line_login_nonce", nonce);

    const authUrl =
      "https://access.line.me/oauth2/v2.1/authorize" +
      `?response_type=code` +
      `&client_id=${encodeURIComponent(channelId)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&state=${encodeURIComponent(state)}` +
      `&scope=${encodeURIComponent("profile openid email")}` +
      `&nonce=${encodeURIComponent(nonce)}`;

    window.location.href = authUrl;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: brandColor,
        padding: "0 16px",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ marginBottom: "12px" }}>LINEでログイン</h1>

      <p
        style={{
          maxWidth: "420px",
          lineHeight: 1.8,
          marginBottom: "28px",
          color: "#444",
        }}
      >
        LINEでログインして、AI VisionBoard を利用します。
        <br />
        今後、ジャーナルや生成画像の案内をLINEで受け取れるようにするための準備にもなります。
      </p>

      <button
        type="button"
        onClick={handleLineLogin}
        style={{
          width: "100%",
          maxWidth: "320px",
          padding: "14px 20px",
          fontSize: "1rem",
          fontWeight: 700,
          cursor: "pointer",
          backgroundColor: lineColor,
          color: "white",
          border: "none",
          borderRadius: "10px",
          boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
        }}
      >
        LINEでログイン
      </button>
    </div>
  );
};

export default LineLoginPage;