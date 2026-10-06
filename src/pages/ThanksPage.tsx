import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../i18n/configs";
import topBanner from "../assets/header.png";
import bottomBanner from "../assets/footer.png";
import { theme } from "../theme";

const ThanksPage: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    const actualLanguage = savedLanguage === "en" ? "en" : "ja";
    i18n.changeLanguage(actualLanguage);
  }, [i18n]);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: theme.background,
      }}
    >
      <img src={topBanner} alt="トップバナー" style={{ maxWidth: "100%" }} />

      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          padding: "48px 16px 56px",
          boxSizing: "border-box",
          textAlign: "center",
        }}
      >
        <div
          style={{
            margin: "0 auto 18px",
            width: "82px",
            height: "82px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6EB6E8 0%, #47D3B1 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            color: "#fff",
            boxShadow: "0 10px 24px rgba(71, 211, 177, 0.22)",
          }}
        >
          📨
        </div>

        <h1
          style={{
            color: theme.text,
            marginBottom: "14px",
          }}
        >
          {i18n.language === "en"
            ? "Thank you for your response."
            : "ご回答ありがとうございました"}
        </h1>

        <p
          style={{
            color: theme.subText,
            fontSize: "1rem",
            lineHeight: 1.9,
            marginBottom: "30px",
          }}
        >
          {i18n.language === "en"
            ? "We appreciate your feedback. It will help us improve the experience."
            : "ご感想をお寄せいただきありがとうございます。今後の改善に活用させていただきます。"}
        </p>

        <button
          type="button"
          onClick={() => navigate("/")}
          style={{
            minWidth: "220px",
            height: "54px",
            borderRadius: "999px",
            border: "none",
            background: "linear-gradient(135deg, #6EB6E8 0%, #47D3B1 100%)",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: "0 8px 18px rgba(71, 211, 177, 0.22)",
            padding: "0 28px",
          }}
        >
          {i18n.language === "en" ? "Back to Home" : "トップへ戻る"}
        </button>
      </div>

      <img
        src={bottomBanner}
        alt="ボトムバナー"
        style={{ maxWidth: "100%", paddingTop: "20px" }}
      />
    </div>
  );
};

export default ThanksPage;
