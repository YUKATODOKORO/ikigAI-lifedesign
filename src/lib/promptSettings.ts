import { supabase } from "./supabase";
import type { PromptConfig } from "./buildPrompt";

type PromptSettingRow = {
  key: string;
  value: string;
};

export const fetchPromptSettings = async (): Promise<PromptConfig> => {
  const { data, error } = await supabase
    .from("prompt_settings")
    .select("key, value");

  if (error) {
    console.error("Prompt settings fetch error:", error);
    throw new Error(error.message);
  }

  const promptConfig: PromptConfig = {};

  (data as PromptSettingRow[] | null)?.forEach((row) => {
    if (row.key && row.value) {
      promptConfig[row.key] = row.value;
    }
  });

  return promptConfig;
};