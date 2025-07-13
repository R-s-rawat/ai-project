const aiService = require("../services/ai.service");

// module.exports.getReview = async (req, res) => {
//   const code = req.body.code;

//   if (!code) {
//     return res.status(400).send("Prompt is required");
//   }

//   const response = await aiService(code);

//   res.send(response);
// };

module.exports.getReview = async (req, res) => {
  console.log("GOOGLE_GEMINI_KEY in service:", process.env.GOOGLE_GEMINI_KEY?.slice(0, 8));
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: "Code is required" });

  try {
    const answer = await aiService(code);
    return res.json({ review: answer });
  } catch (err) {
    console.error("Gemini failure:", err);
    return res.status(500).json({ error: "Gemini call failed", details: err.message });
  }
};
