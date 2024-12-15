// diagnosis.js

// Penyimpanan gejala yang dipilih pengguna
let gejala = {};

// Fungsi untuk memasukkan gejala yang dipilih
function setGejala(gejalaKey, status) {
  gejala[gejalaKey] = status;
}

// Fungsi untuk menjalankan forward chaining dan menentukan hasil diagnosis
function diagnosa() {
  let hasil = "";

  // Tahap 1 - Kerusakan pada Mesin
  if (gejala["suara_mesin_kasar"] && gejala["mesin_susah_nyala"] && gejala["terdengar_kasar_pada_mesin"] && gejala["suara_mesin_kasar_getaran"] && gejala["kebocoran_oli"]) {
    hasil = "Kerusakan pada Mesin";
  }
  // Tahap 2 - Kerusakan pada Kelistrikan
  else if (gejala["aki_cepat_habis"] && gejala["kabel_lampu_putus"] && gejala["kabel_stater_mati"] && gejala["motor_mati_total"]) {
    hasil = "Kerusakan pada Kelistrikan";
  }
  // Tahap 3 - Kerusakan pada Bagian Pengapian
  else if (gejala["motor_tidak_bisa_starter"] && gejala["busi_memercikan_api"] && gejala["koil_terputus"] && gejala["cdi_konslet"] && gejala["sepul_kerusakan"]) {
    hasil = "Kerusakan pada Bagian Pengapian";
  }
  // Tahap 4 - Kerusakan pada Bagian Penggerak Roda
  else if (gejala["suara_berisik_bagian_kiri_bawah_mesin"] && gejala["suara_kasar_saat_motor_jalan"] && gejala["roda_tidak_stabil"] && gejala["ban_kurang_angin"]) {
    hasil = "Kerusakan pada Bagian Penggerak Roda";
  }

  // Menampilkan hasil diagnosis
  document.getElementById("hasil-diagnosis").innerHTML = hasil || "Gejala tidak teridentifikasi dengan jelas. Silakan cek kembali gejalanya.";
}
