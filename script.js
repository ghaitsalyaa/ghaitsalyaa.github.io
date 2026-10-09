<script src="script.js" defer></script>
/* ==========================================================================
   Kedai Pinguin - Global Script (script.js)
   Berjalan di semua halaman untuk memeriksa jam operasional[cite: 9]
   ========================================================================== */

/**
 * Memeriksa apakah kedai sedang buka berdasarkan jam lokal pengunjung[cite: 18]
 * Jam Operasional: 11:00 - 22:00 WIB[cite: 18, 27]
 * @param {number} hour 
 * @returns {boolean}
 */
function isOpen(hour) {
  return hour >= 11 && hour < 22; //[cite: 18]
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Cek dan perbarui elemen status buka/tutup di header[cite: 14, 18]
  const openStatus = document.querySelector("#open-status"); //[cite: 14]

  if (openStatus) {
    const hourNow = new Date().getHours(); // Mengambil jam perangkat pengunjung[cite: 18]

    if (isOpen(hourNow)) { //[cite: 18]
      openStatus.textContent = "🟢 Buka Sekarang (11:00 – 22:00 WIB)"; //[cite: 14, 18]
      openStatus.classList.remove("closed");
      openStatus.classList.add("open"); //[cite: 14]
    } else {
      openStatus.textContent = "🔴 Tutup Sekarang (Buka Jam 11:00 WIB)"; //[cite: 18]
      openStatus.classList.remove("open");
      openStatus.classList.add("closed"); //[cite: 18]
    }
  }
});