export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { BOT_TOKEN, CHAT_ID } = process.env;
  const { name, message, amount } = req.body;

  if (!BOT_TOKEN || !CHAT_ID) {
    return res.status(500).json({ error: 'Missing bot token or chat ID' });
  }

  const text = `💌 *Support baru dari website Wedding Story*\n\n👤 Nama: ${name}\n💬 Pesan: ${message}\n💰 Dukungan: Rp${amount}`;
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'Markdown' }),
    });

    const data = await response.json();
    if (!data.ok) throw new Error(data.description);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Gagal mengirim ke Telegram.' });
  }
                                 }
