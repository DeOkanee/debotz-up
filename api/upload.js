export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "PUT, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "PUT") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { filename } = req.query;
    const apiKey = process.env.PIXELDRAIN_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "API key not configured" });
    }

    if (!filename) {
      return res.status(400).json({ error: "Filename required" });
    }

    // Upload ke Pixeldrain API
    const pixeldrainUrl = `https://pixeldrain.com/api/file/${encodeURIComponent(filename)}`;
    const auth = Buffer.from(`:${apiKey}`).toString("base64");

    const response = await fetch(pixeldrainUrl, {
      method: "PUT",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/octet-stream",
      },
      body: req.body,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return res.status(response.status).json({
        error: errorData.message || `Pixeldrain error: ${response.statusText}`,
      });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("[API Upload Error]", error);
    res.status(500).json({ error: error.message || "Upload failed" });
  }
}
