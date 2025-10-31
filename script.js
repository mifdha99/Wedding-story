document.getElementById('supportForm').addEventListener('submit', async function(e){
  e.preventDefault();
  const f = new FormData(e.target);
  const data = Object.fromEntries(f.entries());
  const msg = document.getElementById('msg');
  msg.textContent = 'Mengirim...';

  try {
    const res = await fetch('/api/send-support', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });

    const txt = await res.text();
    if (res.ok) {
      msg.textContent = '✅ Ucapanmu terkirim! Terima kasih ❤️';
      e.target.reset();

      // Munculkan ucapan terima kasih jika ada nominal
      if (data.jumlah && parseInt(data.jumlah) > 0) {
        showThankYouModal(data.name, data.jumlah);
      }

    } else {
      msg.textContent = '⚠️ Error: ' + txt;
    }
  } catch (err) {
    msg.textContent = '❌ Koneksi gagal: ' + err.message;
  }
});

// Musik
window.addEventListener('load', ()=>{
  const a = document.getElementById('bgAudio');
  a.volume = 0.35;
});

// Fullscreen foto
const galleryImages = document.querySelectorAll('#gallery img');
galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    const fullscreen = document.createElement('div');
    fullscreen.classList.add('fullscreen');
    fullscreen.innerHTML = `<img src="${img.src}" alt="">`;
    fullscreen.addEventListener('click', () => fullscreen.remove());
    document.body.appendChild(fullscreen);
  });
});

// Share WhatsApp di bawah form
const qrdanaDiv = document.getElementById('qrdana');
const shareBtn = document.createElement('button');
shareBtn.textContent = '📤 Bagikan ke WhatsApp';
shareBtn.classList.add('share-btn');
shareBtn.onclick = () => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent("Yuk lihat Wedding Story Huda 💕 Lutfi!");
  window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
};
qrdanaDiv.after(shareBtn);

// Generate QR DANA otomatis
const nomorDANA = '6285311969708';
const qrImg = document.createElement('img');
qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://link.dana.id/qr/${nomorDANA}`;
qrImg.alt = 'QR DANA';
qrImg.style.display = 'block';
qrImg.style.margin = '16px auto';
qrdanaDiv.appendChild(qrImg);

const danaLabel = document.createElement('div');
danaLabel.textContent = `Scan untuk dukung via DANA (${nomorDANA})`;
danaLabel.style.textAlign = 'center';
danaLabel.style.fontSize = '14px';
danaLabel.style.marginTop = '6px';
qrdanaDiv.appendChild(danaLabel);

// Modal ucapan terima kasih
function showThankYouModal(name, jumlah) {
  const modal = document.createElement('div');
  modal.classList.add('thankyou-modal');
  modal.innerHTML = `
    <div class="thankyou-box">
      <h3>Terima kasih, ${name}! 💖</h3>
      <p>Dukungan sebesar Rp${jumlah} sudah diterima.</p>
      <p>Semoga rezekimu makin lancar ✨</p>
      <button onclick="this.closest('.thankyou-modal').remove()">Tutup</button>
    </div>`;
  document.body.appendChild(modal);
                          }
