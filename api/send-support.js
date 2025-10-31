export default async function handler(req, res) {
  // Biar cuma bisa diakses via POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Ambil data dari .env (udah kamu isi di Vercel)
  const { BOT_TOKEN, CHAT_ID } = process.env;

  // Ambil data dari form (frontend)
  const { name, message, amount } = req.body;

  // Validasi data
  if (!BOT_TOKEN || !CHAT_ID) {
    return res.status(500).json({ error: 'BOT_TOKEN atau CHAT_ID belum diatur di Vercel' });
  }

  if (!name || !message) {
    return res.status(400).json({ error: 'Nama dan pesan harus diisi.' });
  }

  // Format pesan yang dikirim ke Telegram
  const text = `
💌 *Support Baru dari Wedding Story Website!*

👤 Nama: ${name}
💬 Pesan: ${message}
💰 Dukungan: Rp${amount || 0}

#WeddingStory
`;

  // Kirim ke Telegram API
  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: 'Markdown',
      }),
    });

    const data = await response.json();

    if (!data.ok) {
      throw new Error(data.description);
    }

    // Kirim respon sukses ke frontend
    res.status(200).json({ success: true, message: 'Terkirim ke Telegram!' });
  } catch (error) {
    console.error('Gagal kirim ke Telegram:', error);
    res.status(500).json({ error: 'Gagal mengirim ke Telegram.' });
  }
      }
