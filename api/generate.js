export default async function handler(req, res) {

  console.log("API STARTED");

  if (req.method !== "POST") {
    return res.status(200).json({
      message: "API Running Successfully"
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Gemini API Key Missing"
    });
  }

  try {

    const { prompt } = req.body;

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
                  text: prompt || "Create NISM exam notes"
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("Gemini Response:", data);

    const result =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini";

    return res.status(200).json({
      result
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: error.message
    });

  }

}
