let gejala = {};
let pertanyaanIndex = 0;

const pertanyaanList = [
  { text: "Apakah motor Anda sulit dinyalakan menggunakan elektrik starter?", key: "starter_sulit" },
  { text: "Apakah bahan bakar di karburator terlihat sangat sedikit atau kosong?", key: "bahan_bakar_kosong" },
  { text: "Apakah lampu kontrol di speedometer tidak menyala saat kunci ON?", key: "lampu_speedometer_mati" },
  { text: "Apakah lampu sein Anda tidak berkedip saat diaktifkan?", key: "lampu_sein_tidak_berkedip" },
  { text: "Apakah semua lampu pada motor Anda tidak menyala?", key: "lampu_motor_mati" },
  { text: "Apakah lampu pada motor sering kali cepat putus?", key: "lampu_cepat_putus" },
  { text: "Apakah dynamo starter terasa panas setelah beberapa kali penggunaan?", key: "dynamo_panas" },
  { text: "Apakah busi tidak memercikkan api saat motor distater?", key: "busi_tidak_memercik" },
  { text: "Apakah asap putih keluar dari knalpot saat mesin menyala?", key: "asap_putih_knalpot" },
  { text: "Apakah suara mesin terdengar berisik dan motor sulit stasioner?", key: "suara_berisik" },
  { text: "Apakah motor sulit distarter meskipun bahan bakar ada?", key: "starter_sulit_meski_bahan_bakar_ada" },
  { text: "Apakah motor terasa tidak bertenaga saat dijalankan?", key: "motor_tidak_bertenaga" }
];

function tampilkanPertanyaan() {
  if (pertanyaanIndex < pertanyaanList.length) {
    document.getElementById("pertanyaan").innerText = pertanyaanList[pertanyaanIndex].text;
  } else {
    diagnosa();
  }
}

function jawab(jawaban) {
  const key = pertanyaanList[pertanyaanIndex].key;
  gejala[key] = (jawaban === 'ya');
  pertanyaanIndex++;
  tampilkanPertanyaan();
}

function hitungPersentase(gejalaTerdeteksi, totalGejala) {
  return Math.round((gejalaTerdeteksi / totalGejala) * 100) + "%";
}

function diagnosa() {
  let hasil = [];
  let rekomendasi = [];

  const diagnosaList = [
    {
      kerusakan: "Bahan bakar habis",
      gejala: ["starter_sulit", "bahan_bakar_kosong", "starter_sulit_meski_bahan_bakar_ada"],
      rekomendasi: "Periksa tangki bahan bakar dan isi jika kosong."
    },
    {
      kerusakan: "Selang bahan bakar tersumbat",
      gejala: ["starter_sulit", "bahan_bakar_kosong", "lampu_speedometer_mati", "starter_sulit_meski_bahan_bakar_ada"],
      rekomendasi: "Periksa selang bahan bakar dan bersihkan jika tersumbat."
    },
    {
      kerusakan: "Baterai soak",
      gejala: ["lampu_speedometer_mati", "starter_sulit", "dynamo_panas", "motor_tidak_bertenaga"],
      rekomendasi: "Ganti baterai motor Anda."
    },
    {
      kerusakan: "Flasher rusak",
      gejala: ["lampu_sein_tidak_berkedip", "lampu_motor_mati", "lampu_cepat_putus"],
      rekomendasi: "Periksa flasher dan ganti jika diperlukan."
    },
    {
      kerusakan: "Sekring putus",
      gejala: ["lampu_motor_mati", "lampu_cepat_putus", "starter_sulit", "dynamo_panas"],
      rekomendasi: "Periksa sekring dan ganti jika putus."
    },
    {
      kerusakan: "Kiprok rusak",
      gejala: ["lampu_cepat_putus", "starter_sulit", "motor_tidak_bertenaga", "lampu_motor_mati"],
      rekomendasi: "Periksa kiprok dan ganti jika rusak."
    },
    {
      kerusakan: "Dynamo starter rusak",
      gejala: ["dynamo_panas", "starter_sulit", "lampu_speedometer_mati", "starter_sulit_meski_bahan_bakar_ada"],
      rekomendasi: "Periksa dynamo starter dan lakukan perbaikan."
    },
    {
      kerusakan: "CDI rusak",
      gejala: ["busi_tidak_memercik", "starter_sulit", "motor_tidak_bertenaga", "asap_putih_knalpot"],
      rekomendasi: "Periksa CDI dan ganti jika diperlukan."
    },
    {
      kerusakan: "Ring piston rusak",
      gejala: ["asap_putih_knalpot", "suara_berisik", "motor_tidak_bertenaga", "starter_sulit_meski_bahan_bakar_ada"],
      rekomendasi: "Periksa ring piston dan lakukan perbaikan segera."
    },
    {
      kerusakan: "Setelan katup terlalu rapat",
      gejala: ["suara_berisik", "!asap_putih_knalpot", "starter_sulit", "lampu_cepat_putus"],
      rekomendasi: "Setel ulang katup mesin sesuai standar."
    }
  ];

  diagnosaList.forEach(item => {
    const gejalaTerpenuhi = item.gejala.filter(key => gejala[key]).length;
    const totalGejala = item.gejala.length;
    if (gejalaTerpenuhi > 0) {
      hasil.push({
        kerusakan: item.kerusakan,
        jawaban: item.gejala.map(key => ({
          pertanyaan: pertanyaanList.find(p => p.key === key)?.text || key,
          jawaban: gejala[key] ? "ya" : "tidak"
        })),
        persentase: hitungPersentase(gejalaTerpenuhi, totalGejala)
      });
      rekomendasi.push(item.rekomendasi);
    }
  });

  if (hasil.length > 0) {
    let hasilText = "Hasil Diagnosis:\n";
    hasil.forEach((item, index) => {
      hasilText += `${index + 1}. Kerusakan: ${item.kerusakan}\n`;
      hasilText += `   Pertanyaan sebelumnya:\n`;
      item.jawaban.forEach(jawaban => {
        hasilText += `   - ${jawaban.pertanyaan} : ${jawaban.jawaban}\n`;
      });
      hasilText += `   Nilai keyakinan: ${item.persentase}\n\n`;
    });
    hasilText += "Rekomendasi:\n" + rekomendasi.join("\n");
    document.getElementById("hasil-diagnosis").innerText = hasilText;
  } else {
    document.getElementById("hasil-diagnosis").innerText = "Tidak ada kerusakan yang terdeteksi berdasarkan jawaban Anda.";
  }
}

tampilkanPertanyaan();
