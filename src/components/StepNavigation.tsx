import React from "react";
import { theme } from "../theme";

type Props = {
  backLabel: string;
  nextLabel: string;
  onBack: () => void;
  nextDisabled?: boolean;
  nextType?: "button" | "submit";
  onNextClick?: () => void;
};

const commonButtonStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "180px",
  height: "54px",
  borderRadius: "14px",
  fontWeight: 800,
  fontSize: "1rem",
  cursor: "pointer",
  transition: "0.2s ease",
};

const StepNavigation: React.FC<Props> = ({
  backLabel,
  nextLabel,
  onBack,
  nextDisabled = false,
  nextType = "submit",
  onNextClick,
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "14px",
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: "34px",
      }}
    >
      <button
        type="button"
        onClick={onBack}
        style={{
          ...commonButtonStyle,
          border: `1.5px solid ${theme.primary}`,
          backgroundColor: theme.white,
          color: theme.primaryDark,
        }}
      >
        {backLabel}
      </button>

      <button
        type={nextType}
        onClick={onNextClick}
        disabled={nextDisabled}
        style={{
          ...commonButtonStyle,
          border: "none",
          background: nextDisabled
            ? "#BFE8E1"
            : "linear-gradient(135deg, #6EB6E8 0%, #47D3B1 100%)",
          color: "#fff",
          boxShadow: nextDisabled
            ? "none"
            : "0 6px 16px rgba(76, 190, 176, 0.22)",
          opacity: nextDisabled ? 0.8 : 1,
          cursor: nextDisabled ? "not-allowed" : "pointer",
        }}
      >
        {nextLabel}
      </button>
    </div>
  );
};

export default StepNavigation;
