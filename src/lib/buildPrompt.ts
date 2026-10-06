export type PromptConfig = Record<string, string>;

export type VisionBoardFormData = {
  fullName?: string;
  email?: string;
  age?: string;
  gender?: string;
  hairAppearance?: string;
  charmPoints?: string;
  favoriteColors?: string;
  imageStyle?: string;
  selfExpression?: string;
  happyMoment?: string;
  strengths?: string;
  idealVision?: string;
  learnWant?: string;
  learnReason?: string;
  learnWhenWhere?: string;
  workStyle?: string;
  workValues?: string;
  workIdealIncomePlace?: string;
  residencePlace?: string;
  residenceEnvironment?: string;
  marriageIdealRelation?: string;
  marriageThoughts?: string;
  childThoughts?: string;
  childValues?: string;
  oldAgeIdeal?: string;
  oldAgePreparation?: string;
  nextAction?: string;
  lang?: string;
};

const joinExisting = (items: Array<string | undefined>) => {
  return items.filter((v): v is string => Boolean(v && v.trim() !== ""));
};

export const normalizeStyleKey = (style?: string) => {
  switch (style) {
    case "水彩画風":
      return "watercolor";
    case "グラレコ風":
      return "grareco";
    case "リアル風":
      return "real";
    case "アート風":
      return "art";
    case "漫画風":
      return "comic";
    case "アニメ風":
      return "anime";
    default:
      return "watercolor";
  }
};

export const getStylePrompt = (styleKey: string) => {
  switch (styleKey) {
    case "watercolor":
      return "soft watercolor illustration, rich gentle colors, full background, leaves, light, flowers, mist";
    case "grareco":
      return "Japanese graphic recording inspired illustration, clean hand-drawn lines, symbolic scenes, connected storytelling, not text-heavy";
    case "real":
      return "semi-realistic cinematic illustration, natural lighting, realistic person and environments, almost no text";
    case "art":
      return "symbolic artistic illustration, bold composition, abstract color fields, conceptual motifs, gallery-like atmosphere";
    case "comic":
      return "manga-influenced illustration, expressive character, dynamic pose, motion curves, very little text";
    case "anime":
      return "warm anime-inspired illustration, polished character, scenic background, light, wind, petals, fantasy atmosphere";
    default:
      return "soft watercolor illustration";
  }
};

export const buildCharacterText = (data: VisionBoardFormData) => {
  const parts: string[] = [];

  if (data.gender === "男性") {
    parts.push("Japanese male-presenting person");
  } else if (data.gender === "女性") {
    parts.push("Japanese female-presenting person");
  } else {
    parts.push("Japanese person");
  }

  if (data.age) {
    parts.push(`appears around ${data.age} years old`);
  }

  if (data.hairAppearance) {
    parts.push(`appearance: ${data.hairAppearance}`);
  }

  if (data.charmPoints) {
    parts.push(`charm points: ${data.charmPoints}`);
  }

  return parts.join(", ");
};

export const buildUserDataText = (data: VisionBoardFormData) => {
  const lines: string[] = [];

  lines.push(`Character reference: ${buildCharacterText(data)}`);

  if (data.favoriteColors) {
    lines.push(`Favorite colors: ${data.favoriteColors}`);
  }

  if (data.selfExpression) {
    lines.push(`Self-expression: ${data.selfExpression}`);
  }

  if (data.idealVision) {
    lines.push(`Vision and dream: ${data.idealVision}`);
  }

  if (data.happyMoment) {
    lines.push(`Happy moment: ${data.happyMoment}`);
  }

  if (data.strengths) {
    lines.push(`Strengths: ${data.strengths}`);
  }

  const learning = joinExisting([
    data.learnWant,
    data.learnReason,
    data.learnWhenWhere,
  ]);

  if (learning.length > 0) {
    lines.push(`Learning: ${learning.join(", ")}`);
  }

  const work = joinExisting([
    data.workStyle,
    data.workValues,
    data.workIdealIncomePlace,
  ]);

  if (work.length > 0) {
    lines.push(`Work: ${work.join(", ")}`);
  }

  const residence = joinExisting([
    data.residencePlace,
    data.residenceEnvironment,
  ]);

  if (residence.length > 0) {
    lines.push(`Living: ${residence.join(", ")}`);
  }

  const marriage = joinExisting([
    data.marriageIdealRelation,
    data.marriageThoughts,
  ]);

  if (marriage.length > 0) {
    lines.push(`Relationship: ${marriage.join(", ")}`);
  }

  const child = joinExisting([data.childThoughts, data.childValues]);

  if (child.length > 0) {
    lines.push(`Family: ${child.join(", ")}`);
  }

  const oldAge = joinExisting([data.oldAgeIdeal, data.oldAgePreparation]);

  if (oldAge.length > 0) {
    lines.push(`Later life: ${oldAge.join(", ")}`);
  }

  if (data.nextAction) {
    lines.push(`Next action: ${data.nextAction}`);
  }

  return lines.join("\n");
};

export const buildFinalPrompt = (
  promptConfig: PromptConfig,
  data: VisionBoardFormData
) => {
  const stylePrompt = getStylePrompt(normalizeStyleKey(data.imageStyle));

  return (
    "Create a vertical 9:16 personal vision board illustration.\n\n" +
    "Follow these Japanese creative directions. Express everything visually, not as text.\n\n" +

    "【ベース方針】\n" +
    (promptConfig["ベース方針"] || "") +
    "\n\n" +

    "【文字ルール】\n" +
    (promptConfig["文字ルール"] || "") +
    "\n\n" +

    "【背景ルール】\n" +
    (promptConfig["背景ルール"] || "") +
    "\n\n" +

    "【人物ルール】\n" +
    (promptConfig["人物ルール"] || "") +
    "\n\n" +

    "【服装ルール】\n" +
    (promptConfig["服装ルール"] || "") +
    "\n\n" +

    "【構成ルール】\n" +
    (promptConfig["構成ルール"] || "") +
    "\n\n" +

    "【品質ルール】\n" +
    (promptConfig["品質ルール"] || "") +
    "\n\n" +

    "Selected style: " +
    stylePrompt +
    "\n\n" +

    "User data:\n" +
    buildUserDataText(data) +
    "\n\n" +

    "Final constraints:\n" +
    "- Do not write the user's name.\n" +
    "- Do not write age numbers.\n" +
    "- Do not write gender labels.\n" +
    "- Do not write questionnaire labels.\n" +
    "- Do not create a plain white background.\n" +
    "- Prioritize illustration, pose, clothing, color, objects, and atmosphere.\n"
  );
};