import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../i18n/configs";
import "../styles.css";
import topBanner from "../assets/header.png";
import ScrollingBanner from "../components/ScrollingBanner";
import bottomBanner from "../assets/footer.png";
import { theme } from "../theme";
import { postToGas } from "../config";

const RESULT_IMAGE_KEY = "visionBoardGeneratedImageUrl";
const RESULT_DRIVE_URL_KEY = "visionBoardDrivePageUrl";
const FORM_DATA_KEY = "visionBoardFormData";

const surveyOptions = [
  { value: 5, face: "😊", labelKey: "result.feedback.options.verySatisfied" },
  { value: 4, face: "🙂", labelKey: "result.feedback.options.satisfied" },
  { value: 3, face: "😐", labelKey: "result.feedback.options.neutral" },
  { value: 2, face: "🙁", labelKey: "result.feedback.options.unsatisfied" },
  { value: 1, face: "😔", labelKey: "result.feedback.options.veryUnsatisfied" },
];

type StoredFormData = {
  fullName?: string;
  email?: string;
};

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
    <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.4L2.8 2h6.4l4.4 5.9L18.9 2Zm-1.1 17.9h1.7L8.3 4H6.5l11.3 15.9Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="27" height="27" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
  </svg>
);

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" width="27" height="27" fill="none">
    <path
      d="M10.5 13.5 13.5 10.5M9 8.5l1.2-1.2a4 4 0 0 1 5.7 5.7l-1.2 1.2M15 15.5l-1.2 1.2a4 4 0 0 1-5.7-5.7l1.2-1.2"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ResultPage: React.FC = () => {
  const { i18n, t } = useTranslation();

  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [satisfactionReason, setSatisfactionReason] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");
  const [drivePageUrl, setDrivePageUrl] = useState("");
  const [formData, setFormData] = useState<StoredFormData>({});
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);

  useEffect(() => {
  const savedLanguage = localStorage.getItem("selectedLanguage") || "ja";

  i18n.changeLanguage(savedLanguage);
  document.documentElement.lang = savedLanguage;
  document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
  }, [i18n]);

  useEffect(() => {
    setGeneratedImageUrl(localStorage.getItem(RESULT_IMAGE_KEY) || "");
    setDrivePageUrl(localStorage.getItem(RESULT_DRIVE_URL_KEY) || "");

    const savedFormData = localStorage.getItem(FORM_DATA_KEY);
    if (savedFormData) {
      try {
        setFormData(JSON.parse(savedFormData));
      } catch (error) {
        console.error("Form data parse error:", error);
      }
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const hasImage = generatedImageUrl !== "";

  const handleDownloadImage = async () => {
    if (!generatedImageUrl) return;

    try {
      const response = await fetch(generatedImageUrl);
      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = "AI_VisionBoard.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error("Download error:", error);
      alert(t("result.share.downloadFailed"));
    }
  };

  const handleCopyLink = async () => {
    const shareUrl = drivePageUrl || window.location.href;

    try {
      await navigator.clipboard.writeText(shareUrl);
      alert(t("result.share.linkCopied"));
    } catch (error) {
      console.error("Copy link error:", error);
      alert(t("result.share.copyFailed"));
    }
  };

  const handleShareX = () => {
    const shareUrl = drivePageUrl || window.location.href;
    const text = t("result.share.text");
    const hashtags = t("result.share.hashtags");

    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent(
      hashtags
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleInstagram = async () => {
    if (drivePageUrl) {
      try {
        await navigator.clipboard.writeText(drivePageUrl);
        alert(t("result.share.linkCopiedForInstagram"));
      } catch (error) {
        console.error("Instagram copy error:", error);
      }
    }

    window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
  };

  const handleSubmitFeedback = async () => {
    if (isSubmitting || isFeedbackSubmitted) return;

    if (selectedRating === null) {
      alert(t("result.feedback.selectRatingAlert"));
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await postToGas({
        action: "feedback",
        rating: Number(selectedRating),
        reason: satisfactionReason.trim(),
        lang: localStorage.getItem("selectedLanguage") || "ja",
        email: formData.email ?? "",
        drivePageUrl: drivePageUrl || generatedImageUrl || "",
      });

      if (data.status !== "success") {
        console.error("Feedback save error:", data.message);
        alert(t("result.feedback.submitFailed", { message: data.message || "" }));
        return;
      }

      setIsFeedbackSubmitted(true);
    } catch (error) {
      console.error("Unexpected submit error:", error);

      const message = error instanceof Error ? error.message : "Unknown error";
      alert(t("result.feedback.submitFailed", { message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const getActionCircleStyle = (
    type: "theme" | "x" | "instagram"
  ): React.CSSProperties => {
    const base: React.CSSProperties = {
      width: isMobile ? "60px" : "70px",
      height: isMobile ? "60px" : "70px",
      borderRadius: "50%",
      color: "#fff",
      border: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: "1.5rem",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    };

    if (type === "x") {
      return {
        ...base,
        background: "#000000",
        boxShadow: "0 8px 22px rgba(0,0,0,0.28)",
      };
    }

    if (type === "instagram") {
      return {
        ...base,
        background:
          "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 42%, #d6249f 60%, #285AEB 90%)",
        boxShadow: "0 8px 22px rgba(214,36,159,0.32)",
      };
    }

    return {
      ...base,
      background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
      boxShadow: "0 8px 20px rgba(52, 150, 135, 0.28)",
    };
  };

  const actionItems = [
    {
      key: "save",
      label: t("result.actions.save"),
      icon: "⬇",
      onClick: handleDownloadImage,
      type: "theme" as const,
    },
    {
      key: "link",
      label: t("result.actions.link"),
      icon: <LinkIcon />,
      onClick: handleCopyLink,
      type: "theme" as const,
    },
    {
      key: "x",
      label: t("result.actions.x"),
      icon: <XIcon />,
      onClick: handleShareX,
      type: "x" as const,
    },
    {
      key: "instagram",
      label: t("result.actions.instagram"),
      icon: <InstagramIcon />,
      onClick: handleInstagram,
      type: "instagram" as const,
    },
  ];

  return (
    <>
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
        <ScrollingBanner src={topBanner} direction="left" />

        <div
          style={{
            width: "100%",
            maxWidth: "720px",
            padding: "24px 16px 48px",
            boxSizing: "border-box",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: theme.primaryDark,
              fontWeight: 800,
              marginBottom: "8px",
              letterSpacing: "0.08em",
            }}
          >
            {t("result.label")}
          </p>

          <h1 style={{ color: theme.text }}>{t("result.title")}</h1>

          {hasImage ? (
            <>
              <img
                src={generatedImageUrl}
                alt={t("result.generatedImageAlt")}
                onClick={() => setIsImageModalOpen(true)}
                style={{
                  width: "100%",
                  maxWidth: "280px",
                  maxHeight: "500px",
                  objectFit: "contain",
                  display: "block",
                  margin: "20px auto 0",
                  cursor: "zoom-in",
                  borderRadius: "18px",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                  backgroundColor: "#fff",
                }}
              />

              <div
                style={{
                  marginTop: "28px",
                  display: "flex",
                  justifyContent: "center",
                  gap: isMobile ? "16px" : "24px",
                  flexWrap: "wrap",
                }}
              >
                {actionItems.map((item) => (
                  <div
                    key={item.key}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      minWidth: isMobile ? "68px" : "86px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={item.onClick}
                      style={getActionCircleStyle(item.type)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(-2px) scale(1.04)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(0) scale(1)";
                      }}
                    >
                      {item.icon}
                    </button>

                    <div
                      style={{
                        marginTop: "9px",
                        fontSize: isMobile ? "0.82rem" : "0.92rem",
                        color: theme.text,
                        fontWeight: 800,
                      }}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: "42px",
                  padding: "28px 18px",
                  backgroundColor: "#ffffff",
                  borderRadius: "22px",
                  border: `1.5px solid ${theme.border}`,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                }}
              >
                {isFeedbackSubmitted ? (
                  <>
                    <p
                      style={{
                        fontSize: "1.35rem",
                        fontWeight: 900,
                        color: theme.text,
                        marginBottom: "10px",
                      }}
                    >
                      {t("result.feedback.thankYou")}
                    </p>

                    <p
                      style={{
                        color: theme.subText,
                        lineHeight: 1.8,
                        marginBottom: 0,
                      }}
                    >
                      {t("result.feedback.saved")}
                    </p>
                  </>
                ) : (
                  <>
                    <p
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 800,
                        color: theme.text,
                        marginBottom: "22px",
                      }}
                    >
                      {t("result.feedback.satisfaction")}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: isMobile ? "10px" : "16px",
                        flexWrap: "wrap",
                        marginBottom: "24px",
                      }}
                    >
                      {surveyOptions.map((option) => {
                        const isSelected = selectedRating === option.value;
                        const isHovered = hoveredRating === option.value;
                        const showLabel = isMobile || isHovered || isSelected;

                        return (
                          <div
                            key={option.value}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              minWidth: isMobile ? "54px" : "70px",
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => setSelectedRating(option.value)}
                              onMouseEnter={() => setHoveredRating(option.value)}
                              onMouseLeave={() => setHoveredRating(null)}
                              style={{
                                width: isMobile ? "54px" : "64px",
                                height: isMobile ? "54px" : "64px",
                                borderRadius: "50%",
                                border: `3px solid ${theme.primary}`,
                                backgroundColor: isSelected
                                  ? theme.primary
                                  : "#ffffff",
                                color: isSelected ? "#ffffff" : theme.primaryDark,
                                fontSize: isMobile ? "1.35rem" : "1.85rem",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "0.2s ease",
                                transform:
                                  !isMobile && isHovered
                                    ? "scale(1.12)"
                                    : "scale(1)",
                              }}
                            >
                              {option.face}
                            </button>

                            <div
                              style={{
                                marginTop: "8px",
                                minHeight: "34px",
                                fontSize: isMobile ? "0.72rem" : "0.86rem",
                                fontWeight: 800,
                                color: theme.primaryDark,
                                opacity: showLabel ? 1 : 0,
                                transition: "opacity 0.2s ease",
                                lineHeight: 1.35,
                              }}
                            >
                              {t(option.labelKey)}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <label
                      style={{
                        display: "block",
                        textAlign: "left",
                        color: theme.text,
                        fontWeight: 800,
                        marginBottom: "8px",
                      }}
                    >
                      {t("result.feedback.reasonLabel")}
                    </label>

                    <textarea
                      value={satisfactionReason}
                      onChange={(e) => setSatisfactionReason(e.target.value)}
                      placeholder={t("result.feedback.reasonPlaceholder")}
                      style={{
                        width: "100%",
                        minHeight: "120px",
                        boxSizing: "border-box",
                        borderRadius: "16px",
                        border: `1.5px solid ${theme.border}`,
                        padding: "14px 16px",
                        fontSize: "1rem",
                        lineHeight: 1.7,
                        resize: "vertical",
                        outlineColor: theme.primary,
                      }}
                    />

                    <button
                      type="button"
                      onClick={handleSubmitFeedback}
                      disabled={isSubmitting}
                      style={{
                        width: "100%",
                        marginTop: "22px",
                        padding: "15px 18px",
                        borderRadius: "999px",
                        border: "none",
                        background: isSubmitting
                          ? "#aacfc7"
                          : `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
                        color: "#ffffff",
                        fontSize: "1.05rem",
                        fontWeight: 900,
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                        boxShadow: "0 8px 20px rgba(52, 150, 135, 0.22)",
                      }}
                    >
                      {isSubmitting
                        ? t("result.feedback.submitting")
                        : t("result.feedback.submit")}
                    </button>
                  </>
                )}
              </div>
            </>
          ) : (
            <p style={{ color: theme.subText, marginTop: "24px" }}>
              {t("result.noImage")}
            </p>
          )}
        </div>

        <ScrollingBanner src={bottomBanner} direction="right" />
      </div>

      {isImageModalOpen && hasImage && (
        <div
          onClick={() => setIsImageModalOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.72)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "520px",
            }}
          >
            <button
              type="button"
              onClick={() => setIsImageModalOpen(false)}
              aria-label={t("result.closeModal")}
              style={{
                position: "absolute",
                top: "-12px",
                right: "-4px",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "none",
                backgroundColor: "#fff",
                color: "#222",
                fontSize: "1.4rem",
                cursor: "pointer",
              }}
            >
              ×
            </button>

            <img
              src={generatedImageUrl}
              alt={t("result.expandedImageAlt")}
              style={{
                width: "100%",
                maxHeight: "85vh",
                objectFit: "contain",
                borderRadius: "14px",
                backgroundColor: "#fff",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ResultPage;
