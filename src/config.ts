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

// GAS へ POST する。CORSのプリフライトを避けるため Content-Type は text/plain。
export async function postToGas(payload: Record<string, any>): Promise<any> {
  const res = await fetch(GAS_EXEC_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
  return res.json();
}
