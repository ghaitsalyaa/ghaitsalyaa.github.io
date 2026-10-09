<script src="book.js" defer></script>
/* ==========================================================================
   Kedai Pinguin - Booking Script (book.js)
   Berjalan khusus pada halaman reservasi book.html[cite: 23]
   ========================================================================== */

// --- FUNGSI ATURAN BISNIS (BUSINESS RULES) ---[cite: 18, 28]

/**
 * Rule 1: Tamu lebih dari 8 orang wajib telepon langsung[cite: 20, 28]
 * @param {number} party 
 * @returns {boolean}
 */
function needsPhoneCall(party) {
  return party > 8; //[cite: 28]
}

/**
 * Rule 2: Pilihan area outdoor maksimal 6 orang per meja[cite: 32]
 * @param {number} party 
 * @param {boolean} isOutdoor 
 * @returns {boolean}
 */
function isOutdoorExceeded(party, isOutdoor) {
  return isOutdoor && party > 6; //[cite: 32]
}

/**
 * Rule 3: Mengecek apakah tanggal yang dipilih sudah berlalu[cite: 28]
 * @param {string} dateText 
 * @returns {boolean}
 */
function isPastDate(dateText) {
  if (!dateText) return false;
  const selectedDate = new Date(dateText);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset waktu ke awal hari
  return selectedDate < today;
}


// --- INTERAKSI DOM & EVENT LISTENERS ---[cite: 22, 28]

document.addEventListener("DOMContentLoaded", () => {
  // Pilihan elemen DOM[cite: 13, 23, 24]
  const indoorRadio = document.querySelector("#indoor"); //[cite: 23]
  const outdoorRadio = document.querySelector("#outdoor"); //[cite: 23]
  const seatingNote = document.querySelector("#seating-note"); //[cite: 23]
  const requestsInput = document.querySelector("#requests"); //[cite: 24]
  const requestsCount = document.querySelector("#requests-count"); //[cite: 24]
  const bookingForm = document.querySelector("#booking-form"); //[cite: 28]
  const formMessage = document.querySelector("#form-message"); //[cite: 28]

  // 1. Event Listener: Tampilkan/Sembunyikan Peringatan Area Outdoor[cite: 22, 23]
  function toggleSeatingNote() {
    if (outdoorRadio && seatingNote) {
      seatingNote.hidden = !outdoorRadio.checked; //[cite: 23]
    }
  }

  if (indoorRadio && outdoorRadio) {
    indoorRadio.addEventListener("click", toggleSeatingNote); //[cite: 23]
    outdoorRadio.addEventListener("click", toggleSeatingNote); //[cite: 23]
  }

  // 2. Event Listener: Hitung Karakter Tersisa pada Catatan Khusus[cite: 22, 24]
  function updateCharacterCount() {
    if (requestsInput && requestsCount) {
      const remaining = 200 - requestsInput.value.length; //[cite: 24]
      requestsCount.textContent = `${remaining} karakter tersisa`; //[cite: 24]
    }
  }

  if (requestsInput) {
    requestsInput.addEventListener("input", updateCharacterCount); //[cite: 24]
  }

  // 3. Event Listener: Validasi Form Sebelum Dikirim (submit)[cite: 22, 28]
  function validateBooking(event) {
    const partyInput = document.querySelector("#party");
    const dateInput = document.querySelector("#date");
    const nameInput = document.querySelector("#name");

    // WAJIB: Konversi input party dari string menjadi angka[cite: 8, 28, 29]
    const party = Number(partyInput ? partyInput.value : 0); //[cite: 8, 28]
    const isOutdoor = outdoorRadio ? outdoorRadio.checked : false; //[cite: 23]
    const dateText = dateInput ? dateInput.value : "";

    let problem = ""; // Tempat menyimpan pesan kesalahan[cite: 28]

    // Pengecekan Aturan Bisnis bertingkat[cite: 28]
    if (isPastDate(dateText)) { //[cite: 28]
      problem = "⚠️ Tanggal yang Anda pilih sudah berlalu. Silakan pilih tanggal hari ini atau yang akan datang."; //[cite: 28, 30]
    } else if (needsPhoneCall(party)) { //[cite: 28]
      problem = "⚠️ Untuk rombongan lebih dari 8 orang, silakan hubungi kami langsung via telepon di (031) 555-0199."; //[cite: 28, 30]
    } else if (isOutdoorExceeded(party, isOutdoor)) { //[cite: 32]
      problem = "⚠️ Area outdoor maksimal berkapasitas 6 orang. Silakan pilih area Indoor atau kurangi jumlah tamu."; //[cite: 32]
    }

    // Jika ditemukan masalah / error[cite: 28]
    if (problem !== "") { //[cite: 28]
      event.preventDefault(); // Batalkan pengiriman form[cite: 28]
      if (formMessage) {
        formMessage.textContent = problem; // Tampilkan pesan kesalahan di form[cite: 28]
      }
    } else {
      // Jika semua aturan terpenuhi
      if (formMessage) {
        formMessage.textContent = "";
      }
      alert(`Terima kasih, ${nameInput ? nameInput.value : ""}! Reservasi meja untuk ${party} orang berhasil diproses.`);
    }
  }

  if (bookingForm) {
    bookingForm.addEventListener("submit", validateBooking); //[cite: 28]
  }
});