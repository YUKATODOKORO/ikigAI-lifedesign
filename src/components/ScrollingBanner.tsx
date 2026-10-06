import React from "react";
import "../styles.css";

type Props = {
  src: string;
  /** left = 右から左へ流れる / right = 左から右へ流れる */
  direction?: "left" | "right";
};

// 画像を横に4枚つないでループさせる、シームレスなマーキー（流れるバナー）。
// 枚数を多めにすることで、PCの広い画面でも継ぎ目（隙間）が出ないようにしている。
// 高さは styles.css 側でレスポンシブに指定（スマホ:170px / PC:250px）。
const ScrollingBanner: React.FC<Props> = ({ src, direction = "left" }) => {
  return (
    <div className="scrolling-banner">
      <div className={`scrolling-banner__track scrolling-banner__track--${direction}`}>
        <img src={src} alt="" />
        <img src={src} alt="" aria-hidden="true" />
        <img src={src} alt="" aria-hidden="true" />
        <img src={src} alt="" aria-hidden="true" />
      </div>
    </div>
  );
};

export default ScrollingBanner;
