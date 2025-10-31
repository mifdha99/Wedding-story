export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const { name, message, jumlah } = req.body;
  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return res.status(500).json({ error: 'Bot token/chat_id belum diatur di Environment' });
  }

  const text = `💌 *Support Baru dari Wedding Story Website!*\n\n👤 Nama: ${name}\n💬 Pesan: ${message}\n💰 Dukungan: Rp${jumlah || 0}\n\n#WeddingStory`;

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: 'Markdown'
      })
    });
    res.status(200).send('Terkirim ke Telegram');
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengirim ke Telegram', detail: error.message });
  }
}
