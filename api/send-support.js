// File: api/send-support.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { nama, ucapan, jumlah } = req.body;

  const TOKEN = process.env.BOT_TOKEN; // dari .env
  const CHAT_ID = process.env.CHAT_ID; // dari .env

  const text = `
💌 *Ucapan Baru Masuk!* 
👤 Dari: ${nama}
📝 Pesan: ${ucapan}
💰 Support: ${jumlah ? "Rp" + jumlah : "—"}
`;

  try {
    const telegramURL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    await fetch(telegramURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "Markdown",
      }),
    });

    res.status(200).json({ message: "Terkirim ke Telegram!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengirim ke Telegram" });
  }
}
