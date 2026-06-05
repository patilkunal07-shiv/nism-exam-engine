export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(200).json({
      message: "API Running Successfully"
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // बाकी code...
}

  if (!apiKey) {
    return res.status(500).json({
      error: "Gemini API Key Missing"
    });
  }

  const { prompt } = req.body;

  try {

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response";

    res.status(200).json({
      result: text
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

}
