import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../i18n/configs";
import "../styles.css";
import topBanner from "../assets/header.png";
import ScrollingBanner from "../components/ScrollingBanner";
import bottomBanner from "../assets/footer.png";
import GrowingTreeLoading from "../components/GrowingTreeLoading";
import { postToGas } from "../config";

const STORAGE_KEY = "visionBoardFormData";
const RESULT_IMAGE_KEY = "visionBoardGeneratedImageUrl";
const RESULT_DRIVE_URL_KEY = "visionBoardDrivePageUrl";

type AnyObject = Record<string, any>;

const removeEmptyFields = (obj: AnyObject): AnyObject => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => {
      if (value === null || value === undefined) return false;
      if (typeof value === "string" && value.trim() === "") return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    })
  );
};

const LoadingPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "ja";

    i18n.changeLanguage(savedLanguage);
    document.documentElement.lang = savedLanguage;
    document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
  }, [i18n]);

  useEffect(() => {
    const messages = t("loadingPage.messages", {
      returnObjects: true,
    }) as string[];

    const interval = setInterval(() => {
      setLoadingTextIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [t, i18n.language]);

  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const run = async () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      const selectedLanguage = localStorage.getItem("selectedLanguage") || "ja";

      if (!saved) {
        alert(t("loadingPage.errors.missingData"));
        navigate("/form/step1");
        return;
      }

      try {
        const formData = JSON.parse(saved);

        // 回答データをそのまま新バックエンド(GAS)へ送る。
        // 指示文の組み立て・Drive保存・スプレッドシート記録はすべてGAS側で行う。
        const payload = removeEmptyFields({
          ...formData,
          lang: selectedLanguage,
        });

        const data = await postToGas(payload);

        if (data.status !== "success" || !data.imageUrl) {
          throw new Error(
            data.message || t("loadingPage.errors.imageGenerationFailed")
          );
        }

        const imageUrl = data.imageUrl;
        const driveUrl = data.drivePageUrl ?? "";

        try {
          localStorage.setItem(RESULT_IMAGE_KEY, imageUrl);
          localStorage.setItem(RESULT_DRIVE_URL_KEY, driveUrl);
        } catch (e) {
          console.warn("localStorage save skipped:", e);
        }

        navigate("/result");
      } catch (error) {
        console.error(error);
        hasStartedRef.current = false;
        alert(t("loadingPage.errors.generationFailed"));
        navigate("/form/step1");
      }
    };

    run();
  }, [navigate, t]);

  const messages = t("loadingPage.messages", {
    returnObjects: true,
  }) as string[];

  return (
    <div style={{ textAlign: "center" }}>
      <ScrollingBanner src={topBanner} direction="left" />

      <h2>{t("loadingPage.title")}</h2>
      <GrowingTreeLoading lang={i18n.language} />

      <p>{messages[loadingTextIndex]}</p>

      <ScrollingBanner src={bottomBanner} direction="right" />
    </div>
  );
};

export default LoadingPage;
