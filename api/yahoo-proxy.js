module.exports = async function handler(req, res) {
  const symbols = req.query.symbols;
  if (!symbols) return res.status(400).json({ error: "no symbols" });

  const GAS_URL = "https://script.google.com/macros/s/AKfycbz8AZrPUFy55gwPvM8COb4GExsVtCgmdtXpmCn31BengXymAPz2lNvp0TZMcUtNvG0z/exec";

  try {
    const response = await fetch(`${GAS_URL}?symbols=${encodeURIComponent(symbols)}`, {
      redirect: "follow"
    });
    const text = await response.text();
    try {
      res.status(200).json(JSON.parse(text));
    } catch {
      res.status(502).json({ error: "Apps Script 응답 파싱 실패", raw: text.slice(0, 300) });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
