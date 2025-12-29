async function askGemini() {
  const subject = document.getElementById("subject").value;
  const hours = document.getElementById("hours").value;
  const level = document.getElementById("level").value;
  const output = document.getElementById("output");

  if (!subject || !hours || !level) {
    output.innerHTML = "⚠️ Please fill all details.";
    return;
  }

  output.innerHTML = "🤖 Gemini AI is generating your study plan...";

  const prompt = `
You are an AI study planner.
Create a personalized daily study plan.

Subject: ${subject}
Daily Study Time: ${hours} hours
Student Level: ${level}

Provide:
- Theory vs practice ratio
- Daily tips
- Simple and clear points
`;

  try {

    const response = await fetch(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyBAfGX0UhPjxGQ5fH-zIqWY6IYGZ8UZQWw",
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

    const aiText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini.";

    output.innerHTML = `🤖 GEMINI AI RESPONSE:\n\n${aiText}`;

  } catch (error) {
    output.innerHTML =
      "❌ Error connecting to Gemini AI. Please check API key or internet.";
  }
}
