module.exports = async function handler(req, res) {
  console.log("generate.js loaded");

  try {
    if (req.method === "GET") {
      return res.status(200).json({
        status: "ok",
        message: "Vercel API route is running",
      });
    }

    if (req.method !== "POST") {
      return res.status(405).json({
        status: "error",
        message: "Method not allowed",
      });
    }

    const gasEndpoints = [
      process.env.GAS_ENDPOINT_01,
      process.env.GAS_ENDPOINT_02,
      process.env.GAS_ENDPOINT_03,
      process.env.GAS_ENDPOINT_04,
      process.env.GAS_ENDPOINT_05,
      process.env.GAS_ENDPOINT_06,
      process.env.GAS_ENDPOINT_07,
      process.env.GAS_ENDPOINT_08,
      process.env.GAS_ENDPOINT_09,
      process.env.GAS_ENDPOINT_10,
      process.env.GAS_ENDPOINT_11,
    ].filter(Boolean);

    if (gasEndpoints.length === 0) {
      return res.status(500).json({
        status: "error",
        message: "No GAS endpoints are set",
      });
    }

    const selectedIndex = Math.floor(Math.random() * gasEndpoints.length);
    const gasEndpoint = gasEndpoints[selectedIndex];

    const requestBody =
      typeof req.body === "string" ? req.body : JSON.stringify(req.body);

    console.log("Selected GAS index:", selectedIndex);
    console.log("Total endpoints:", gasEndpoints.length);
    console.log("Sending request to GAS:", gasEndpoint);

    const gasResponse = await fetch(gasEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    const rawText = await gasResponse.text();

    console.log("GAS status:", gasResponse.status);

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (parseError) {
      console.error("Failed to parse GAS response:", parseError);

      return res.status(500).json({
        status: "error",
        message: "GASがJSONを返していません",
        selectedGasIndex: selectedIndex,
        rawResponse: rawText,
      });
    }

    if (!gasResponse.ok) {
      return res.status(gasResponse.status).json({
        status: "error",
        message: data.message || "GAS returned an error",
        selectedGasIndex: selectedIndex,
        gasResponse: data,
      });
    }

    return res.status(200).json({
      ...data,
      selectedGasIndex: selectedIndex,
      totalEndpoints: gasEndpoints.length,
    });
  } catch (error) {
    console.error("API route error:", error);

    return res.status(500).json({
      status: "error",
      message: error?.message || "Unknown server error",
    });
  }
};
