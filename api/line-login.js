module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      status: "error",
      message: "Method not allowed",
    });
  }

  try {
    const { code } = req.body || {};

    if (!code) {
      return res.status(400).json({
        status: "error",
        message: "code is required",
      });
    }

    const tokenResponse = await fetch(
      "https://api.line.me/oauth2/v2.1/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: process.env.LINE_REDIRECT_URI,
          client_id: process.env.LINE_CHANNEL_ID,
          client_secret: process.env.LINE_CHANNEL_SECRET,
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return res.status(400).json({
        status: "error",
        message: "Failed to get LINE access token",
        detail: tokenData,
      });
    }

    const profileResponse = await fetch("https://api.line.me/v2/profile", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const profileData = await profileResponse.json();

    if (!profileResponse.ok) {
      return res.status(400).json({
        status: "error",
        message: "Failed to get LINE profile",
        detail: profileData,
      });
    }

    return res.status(200).json({
      status: "success",
      profile: profileData,
      accessToken: tokenData.access_token,
      idToken: tokenData.id_token || null,
    });
  } catch (error) {
    console.error("line-login error:", error);

    return res.status(500).json({
      status: "error",
      message: "LINEログイン中にエラーが発生しました。",
      detail: error instanceof Error ? error.message : String(error),
    });
  }
};
