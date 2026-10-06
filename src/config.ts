// ============================================================
// 新バックエンド（会社アカウントのGAS Webアプリ）の窓口URL
// ------------------------------------------------------------
// ※ コードを直してデプロイし直すときは、必ず
//   「デプロイ → デプロイを管理 → 既存のデプロイを編集 → 新バージョン」
//   で更新すること。URLが変わらず、このファイルを直さずに済む。
//   「新しいデプロイ」を押すとURLが変わり、ここも直す必要が出る。
// ============================================================
export const GAS_EXEC_URL =
  "https://script.google.com/macros/s/AKfycbyaNilLqpdQsaH-mUzV-8UYCsnEHoTJbaHOLo8QLYvAh9IYoXLgxMA3oUi9PO_gRJjm/exec";

// ============================================================
// ログイントークン（認証の合言葉）の保管
// ------------------------------------------------------------
// ログイン時にパスコードが正しければ、GASが使い捨てのトークンを発行する。
// 以降の画像生成・フィードバック送信では、このトークンを自動で添えて送る。
// → UIを触る人はパスコードを「最初の1回」入れるだけでよい。
// ============================================================
const TOKEN_KEY = "vb_token";

export function getToken(): string {
  try {
    return localStorage.getItem(TOKEN_KEY) || "";
  } catch (e) {
    return "";
  }
}

export function setToken(token: string): void {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.warn("token save skipped:", e);
  }
}

export function clearToken(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    /* noop */
  }
}

// GAS へ POST する。CORSのプリフライトを避けるため Content-Type は text/plain。
// 保管しているトークンがあれば自動で添える（payload側で明示指定があればそちらを優先）。
export async function postToGas(payload: Record<string, any>): Promise<any> {
  const token = getToken();
  const body = token ? { token, ...payload } : payload;
  const res = await fetch(GAS_EXEC_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(body),
  });
  return res.json();
}
