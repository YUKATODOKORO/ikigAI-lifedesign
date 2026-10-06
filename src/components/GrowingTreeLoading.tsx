import React, { useEffect, useState } from "react";
import sprout from "../assets/sprout.webp";
import midTree from "../assets/mid_tree.webp";
import fullTree from "../assets/full_tree.webp";

type Props = {
  lang?: "ja" | "en";
};

const GrowingTreeLoading: React.FC<Props> = ({ lang = "ja" }) => {
  const [phase, setPhase] = useState<"sprout" | "mid" | "full">("sprout");

  useEffect(() => {
    let timer1: ReturnType<typeof setTimeout>;
    let timer2: ReturnType<typeof setTimeout>;
    let timer3: ReturnType<typeof setTimeout>;

    const startLoop = () => {
      setPhase("sprout");

      timer1 = setTimeout(() => setPhase("mid"), 700);
      timer2 = setTimeout(() => setPhase("full"), 1500);
      timer3 = setTimeout(() => startLoop(), 2400);
    };

    startLoop();

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const loadingTitle = lang === "en" ? "Generating" : "生成中";
  const loadingText =
    lang === "en"
      ? "Generating image... (30 sec–1 min)"
      : "画像生成中...（30秒〜1分）";

  return (
    <div
      style={{
        marginTop: "24px",
        marginBottom: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "220px",
          height: "220px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
          position: "relative",
        }}
      >
        <img
          src={sprout}
          alt="sprout"
          style={{
            position: "absolute",
            width: "220px",
            height: "220px",
            objectFit: "contain",
            opacity: phase === "sprout" ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />

        <img
          src={midTree}
          alt="mid tree"
          style={{
            position: "absolute",
            width: "220px",
            height: "220px",
            objectFit: "contain",
            opacity: phase === "mid" ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />

        <img
          src={fullTree}
          alt="full tree"
          style={{
            position: "absolute",
            width: "220px",
            height: "220px",
            objectFit: "contain",
            opacity: phase === "full" ? 1 : 0,
            transform: phase === "full" ? "scale(1.04)" : "scale(0.96)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        />
      </div>

      <div
        style={{
          width: "290px",
          maxWidth: "90%",
          backgroundColor: "#d9d9d9",
          borderRadius: "999px",
          textAlign: "center",
          padding: "10px 20px",
          color: "#5c6770",
          fontSize: "2rem",
          fontWeight: 500,
          lineHeight: 1.2,
        }}
      >
        {loadingTitle}
      </div>

      <p
        style={{
          marginTop: "18px",
          marginBottom: 0,
          color: "#222",
          fontSize: "1.05rem",
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        {loadingText}
      </p>
    </div>
  );
};

export default GrowingTreeLoading;
