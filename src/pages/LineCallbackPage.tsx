import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LineCallbackPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const state = params.get("state");
        const error = params.get("error");
        const errorDescription = params.get("error_description");

        if (error) {
          throw new Error(errorDescription || error);
        }

        const savedState = localStorage.getItem("line_login_state");

        if (!code || !state || !savedState || state !== savedState) {
          throw new Error("LINEログインの認証情報が不正です。");
        }

        const response = await fetch("/api/line-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        const data = await response.json();

        if (!response.ok || data.status !== "success") {
          throw new Error(data.message || "LINEログインに失敗しました。");
        }

        localStorage.setItem("isLineLoggedIn", "true");
        localStorage.setItem("lineProfile", JSON.stringify(data.profile));
        localStorage.setItem("lineUserId", data.profile.userId || "");

        localStorage.removeItem("line_login_state");
        localStorage.removeItem("line_login_nonce");

        localStorage.removeItem("selectedLanguage");
        localStorage.removeItem("selectedLanguageOriginal");

        navigate("/language", { replace: true });
      } catch (err) {
        console.error(err);
        alert(
          err instanceof Error
            ? err.message
            : "LINEログインに失敗しました。"
        );
        navigate("/line-login", { replace: true });
      }
    };

    run();
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        boxSizing: "border-box",
        textAlign: "center",
      }}
    >
      <div>
        <h2 style={{ color: "rgb(90, 108, 209)", marginBottom: "12px" }}>
          LINEログイン中...
        </h2>
        <p style={{ color: "#555" }}>しばらくお待ちください。</p>
      </div>
    </div>
  );
};

export default LineCallbackPage;
