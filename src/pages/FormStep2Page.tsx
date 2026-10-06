import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../i18n/configs";
import "../styles.css";
import topBanner from "../assets/header.png";
import ScrollingBanner from "../components/ScrollingBanner";
import bottomBanner from "../assets/footer.png";
import RequiredBadge from "../components/RequiredBadge";
import StepNavigation from "../components/StepNavigation";
import { theme } from "../theme";

const STORAGE_KEY = "visionBoardFormData";

const imageStyleOptions = [
  { value: "水彩画風", labelKey: "form.step2.imageStyleOptions.watercolor" },
  { value: "グラレコ風", labelKey: "form.step2.imageStyleOptions.graphicRecording" },
  { value: "リアル風", labelKey: "form.step2.imageStyleOptions.realistic" },
  { value: "アート風", labelKey: "form.step2.imageStyleOptions.artistic" },
  { value: "漫画風", labelKey: "form.step2.imageStyleOptions.comic" },
  { value: "アニメ風", labelKey: "form.step2.imageStyleOptions.anime" },
];

type VisionBoardFormData = {
  fullName: string;
  email: string;
  age: string;
  gender: string;
  hairAppearance: string;
  charmPoints: string;
  favoriteColors: string;
  imageStyle: string;
  selfExpression: string;
  happyMoment: string;
  strengths: string;
  idealVision: string;
  learnWant: string;
  learnReason: string;
  learnWhenWhere: string;
  workStyle: string;
  workValues: string;
  workIdealIncomePlace: string;
  residencePlace: string;
  residenceEnvironment: string;
  marriageIdealRelation: string;
  marriageThoughts: string;
  childThoughts: string;
  childValues: string;
  oldAgeIdeal: string;
  oldAgePreparation: string;
  nextAction: string;
};

const defaultFormData: VisionBoardFormData = {
  fullName: "",
  email: "",
  age: "",
  gender: "",
  hairAppearance: "",
  charmPoints: "",
  favoriteColors: "",
  imageStyle: "",
  selfExpression: "",
  happyMoment: "",
  strengths: "",
  idealVision: "",
  learnWant: "",
  learnReason: "",
  learnWhenWhere: "",
  workStyle: "",
  workValues: "",
  workIdealIncomePlace: "",
  residencePlace: "",
  residenceEnvironment: "",
  marriageIdealRelation: "",
  marriageThoughts: "",
  childThoughts: "",
  childValues: "",
  oldAgeIdeal: "",
  oldAgePreparation: "",
  nextAction: "",
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  textAlign: "left",
  fontWeight: 800,
  color: theme.text,
  marginBottom: "8px",
  marginTop: "22px",
  fontSize: "1.15rem",
  gap: "0",
};

const FormStep2Page: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState<VisionBoardFormData>(defaultFormData);
  const [isDisabled, setIsDisabled] = useState(true);

  
  useEffect(() => {
  　const savedLanguage = localStorage.getItem("selectedLanguage") || "ja";

 　 i18n.changeLanguage(savedLanguage);
  　document.documentElement.lang = savedLanguage;
  　document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
　}, [i18n]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      setFormData((prev) => ({ ...prev, ...parsed }));
    } catch (error) {
      console.error("Failed to parse saved form data:", error);
    }
  }, []);

  useEffect(() => {
    const isComplete =
      formData.favoriteColors.trim() !== "" &&
      formData.imageStyle.trim() !== "";

    setIsDisabled(!isComplete);
  }, [formData]);

  const saveFormData = (data: VisionBoardFormData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      saveFormData(next);
      return next;
    });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDisabled) return;

    saveFormData(formData);
    navigate("/form/step3");
  };

  const handleBack = () => {
    saveFormData(formData);
    navigate("/form/step1");
  };

  return (
    <div
      style={{
        width: "100%",
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
        }}
      >
        <div
          style={{
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: theme.primaryDark,
              fontWeight: 700,
              marginBottom: "8px",
            }}
          >
            {t("form.step2.stepLabel")}
          </p>

          <h1
            style={{
              fontSize: "2rem",
              color: theme.text,
              marginBottom: "12px",
            }}
          >
            {t("form.step2.title")}
          </h1>

          <p
            style={{
              color: theme.subText,
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            {t("form.step2.description")}
          </p>
        </div>

        <div
          style={{
            width: "100%",
            height: "10px",
            backgroundColor: "#DDF4EF",
            borderRadius: "999px",
            overflow: "hidden",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "50%",
              height: "100%",
              background: "linear-gradient(135deg, #6EB6E8 0%, #47D3B1 100%)",
            }}
          />
        </div>

        <form onSubmit={handleNext}>
          <label style={labelStyle}>
            {t("form.step2.favoriteColors")}
            <RequiredBadge />
          </label>
          <input
            type="text"
            name="favoriteColors"
            value={formData.favoriteColors}
            onChange={handleInputChange}
            required
            placeholder={t("form.step2.favoriteColorsPlaceholder")}
          />

          <label style={labelStyle}>
            {t("form.step2.imageStyle")}
            <RequiredBadge />
          </label>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "24px",
            }}
          >
            {imageStyleOptions.map((option) => (
              <label
                key={option.value}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  cursor: "pointer",
                  border: `1.5px solid ${theme.border}`,
                  borderRadius: "14px",
                  padding: "14px 16px",
                  backgroundColor:
                    formData.imageStyle === option.value
                      ? theme.primaryLight
                      : theme.white,
                  marginTop: 0,
                  marginBottom: 0,
                  fontWeight: 700,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    minWidth: 0,
                    flex: 1,
                  }}
                >
                  <input
                    type="radio"
                    name="imageStyle"
                    value={option.value}
                    checked={formData.imageStyle === option.value}
                    onChange={handleInputChange}
                    required
                    style={{
                      marginRight: "10px",
                      width: "18px",
                      height: "18px",
                      minHeight: "18px",
                      marginBottom: 0,
                      flexShrink: 0,
                    }}
                  />
                  <span>{t(option.labelKey)}</span>
                </div>

                {option.value === "水彩画風" && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      whiteSpace: "nowrap",
                      padding: isMobileLike() ? "6px 10px" : "7px 12px",
                      borderRadius: "999px",
                      background: "linear-gradient(135deg, #6EB6E8 0%, #47D3B1 100%)",
                      color: "#fff",
                      fontSize: isMobileLike() ? "0.82rem" : "0.88rem",
                      fontWeight: 800,
                      lineHeight: 1,
                      flexShrink: 0,
                    }}
                  >
                    {t("form.step2.recommended")}
                  </span>
                )}
              </label>
            ))}
          </div>

          <StepNavigation
            backLabel={t("common.back")}
            nextLabel={t("common.next")}
            onBack={handleBack}
            nextDisabled={isDisabled}
          />
        </form>
      </div>

      <ScrollingBanner src={bottomBanner} direction="right" />
    </div>
  );
};

function isMobileLike() {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= 768;
}

export default FormStep2Page;
