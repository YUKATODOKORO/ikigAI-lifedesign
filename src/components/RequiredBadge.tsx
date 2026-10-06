import React from "react";

const RequiredBadge: React.FC = () => {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: "38px",
        minWidth: "78px",
        padding: "0 14px",
        marginLeft: "10px",
        borderRadius: "8px",
        background: "linear-gradient(135deg, #67B9E8 0%, #49D3B2 100%)",
        color: "#fff",
        fontSize: "1rem",
        fontWeight: 800,
        lineHeight: 1,
        verticalAlign: "middle",
        boxSizing: "border-box",
      }}
    >
      必須
    </span>
  );
};

export default RequiredBadge;
