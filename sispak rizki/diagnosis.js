
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

function diagnosa() {
  let hasil = [];
  let rekomendasi = [];

  if (gejala["starter_sulit"] && gejala["bahan_bakar_kosong"] && gejala["starter_sulit_meski_bahan_bakar_ada"]) {
    hasil.push({
      kerusakan: "Bahan bakar habis",
      jawaban: [
        { pertanyaan: pertanyaanList[0].text, jawaban: gejala["starter_sulit"] ? 'ya' : 'tidak' },
        { pertanyaan: pertanyaanList[1].text, jawaban: gejala["bahan_bakar_kosong"] ? 'ya' : 'tidak' },
        { pertanyaan: pertanyaanList[10].text, jawaban: gejala["starter_sulit_meski_bahan_bakar_ada"] ? 'ya' : 'tidak' }
      ],
      persentase: "100%"
    });
    rekomendasi.push("Periksa tangki bahan bakar dan isi jika kosong.");
  }

  if (gejala["starter_sulit"] && gejala["bahan_bakar_kosong"] && gejala["lampu_speedometer_mati"] && gejala["starter_sulit_meski_bahan_bakar_ada"]) {
    hasil.push({
      kerusakan: "Selang bahan bakar tersumbat",
      jawaban: [
        { pertanyaan: pertanyaanList[0].text, jawaban: gejala["starter_sulit"] ? 'ya' : 'tidak' },
        { pertanyaan: pertanyaanList[1].text, jawaban: gejala["bahan_bakar_kosong"] ? 'ya' : 'tidak' },
        { pertanyaan: pertanyaanList[2].text, jawaban: gejala["lampu_speedometer_mati"] ? 'ya' : 'tidak' },
        { pertanyaan: pertanyaanList[10].text, jawaban: gejala["starter_sulit_meski_bahan_bakar_ada"] ? 'ya' : 'tidak' }
      ],
      persentase: "90 %"
    });
    rekomendasi.push("Periksa selang bahan bakar dan bersihkan jika tersumbat.");
  }

  if (gejala["lampu_speedometer_mati"] && gejala["starter_sulit"] && gejala["dynamo_panas"] && gejala["motor_tidak_bertenaga"]) {
    hasil.push({
      kerusakan: "Baterai soak",
      jawaban: [
        { pertanyaan: pertanyaanList[2].text, jawaban: gejala["lampu_speedometer_mati"] ? 'ya' : 'tidak' },
        { pertanyaan: pertanyaanList[0].text, jawaban: gejala["starter_sulit"] ? 'ya' : 'tidak' },
        { pertanyaan: pertanyaanList[6].text, jawaban: gejala["dynamo_panas"] ? 'ya' : 'tidak' },
        { pertanyaan: pertanyaanList[11].text, jawaban: gejala["motor_tidak_bertenaga"] ? 'ya' : 'tidak' }
      ],
      persentase: "85%"
    });
    rekomendasi.push("Ganti baterai motor Anda.");
  }

  if (gejala["lampu_sein_tidak_berkedip"] && gejala["lampu_motor_mati"] && gejala["lampu_cepat_putus"]) {
    hasil.push({
      kerusakan: "Flasher rusak",
      jawaban: [
        { pertanyaan: pertanyaanList[3].text, jawaban: gejala["lampu_sein_tidak_berkedip"] ? 'ya' : 'tidak' },
        { pertanyaan: pertanyaanList[4].text, jawaban: gejala["lampu_motor_mati"] ? 'ya' : 'tidak' },
        { pertanyaan: pertanyaanList[5].text, jawaban: gejala["lampu_cepat_putus"] ? 'ya' : 'tidak' }
      ],
      persentase: "75%"
    });
    rekomendasi.push("Periksa flasher dan ganti jika diperlukan.");
  }

  if (gejala["lampu_motor_mati"] && gejala["lampu_cepat_putus"] && gejala["starter_sulit"] && gejala["dynamo_panas"]) {
    hasil.push({
      kerusakan: "Sekring putus",
      jawaban: [
        { pertanyaan: pertanyaanList[4].text, jawaban: gejala["lampu_motor_mati"] ? 'ya' : 'tidak' },
        { pertanyaan: pertanyaanList[5].text, jawaban: gejala["lampu_cepat_putus"] ? 'ya' : 'tidak' },
        { pertanyaan: pertanyaanList[0].text, jawaban: gejala["starter_sulit"] ? 'ya' : 'tidak' },
        { pertanyaan: pertanyaanList[6].text, jawaban: gejala["dynamo_panas"] ? 'ya' : 'tidak' }
      ],
      persentase: "80%"
    });
    rekomendasi.push("Periksa sekring dan ganti jika putus.");
  }

  if (gejala["lampu_cepat_putus"] && gejala["starter_sulit"] && gejala["motor_tidak_bertenaga"] && gejala["lampu_motor_mati"]) {
    hasil.push({
      kerusakan: "Kiprok rusak",
      jawaban: [
        { pertanyaan: pertanyaanList[5].text, jawaban: gejala["lampu_cepat_putus"] ? 'ya' : 'tidak' },
        { pertanyaan: pertanyaanList[0].text, jawaban: gejala["starter_sulit"] ? 'ya' : 'tidak' },
        { pertanyaan: pertanyaanList[11].text, jawaban: gejala["motor_tidak_bertenaga"] ? 'ya' : 'tidak' },
        { pertanyaan: pertanyaanList[4].text, jawaban: gejala["lampu_motor_mati"] ? 'ya' : 'tidak' }
      ],
      persentase: "85%"
    });
    rekomendasi.push("Periksa kiprok dan ganti jika rusak.");
  }

  if (gejala["dynamo_panas"] && gejala["starter_sulit"] && gejala["lampu_speedometer_mati"] && gejala["starter_sulit_meski_bahan_bakar_ada"]) {
    hasil.push({
      kerusakan: "Dynamo starter rusak",
      jawaban: [
        { pertanyaan: pertanyaanList[6].text, jawaban: gejala["dynamo_panas"] ? 'ya' : 'tidak' },
        { pertanyaan: pertanyaanList[0].text, jawaban: gejala["starter_sulit"] ? 'ya' : 'tidak' },
        { pertanyaan: pertanyaanList[2].text, jawaban: gejala["lampu_speedometer_mati"] ? 'ya' : 'tidak' },
        { pertanyaan: pertanyaanList[10].text, jawaban: gejala["starter_sulit_meski_bahan_bakar_ada"] ? 'ya' : 'tidak' }
      ],
      persentase: "90%"
    });
    rekomendasi.push("Periksa dynamo starter dan lakukan perbaikan.");
  }

  if (gejala["busi_tidak_memercik"] && gejala["starter_sulit"] && gejala["motor_tidak_bertenaga"] && gejala["asap_putih_knalpot"]) {
    hasil.push({
      kerusakan: "CDI rusak",
      jawaban: [
        { pertanyaan: pertanyaanList[7].text, jawaban: gejala["busi_tidak_memercik"] ? 'ya' : 'tidak' },
        { pertanyaan: pertanyaanList[0].text, jawaban: gejala["starter_sulit"] ? 'ya' : 'tidak' },
        { pertanyaan: pertanyaanList[11].text, jawaban: gejala["motor_tidak_bertenaga"] ? 'ya' : 'tidak' },
        { pertanyaan: pertanyaanList[8].text, jawaban: gejala["asap_putih_knalpot"] ? 'ya' : 'tidak' }
      ],
      persentase: "85%"
    });
    rekomendasi.push("Periksa CDI dan ganti jika diperlukan.");
  }

  if (gejala["asap_putih_knalpot"] && gejala["suara_berisik"] && gejala["motor_tidak_bertenaga"] && gejala["starter_sulit_meski_bahan_bakar_ada"]) {
    hasil.push({
      kerusakan: "Ring piston rusak",
      jawaban: [
        { pertanyaan: pertanyaanList[8].text, jawaban: gejala["asap_putih_knalpot"] ? 'ya' : 'tidak' },
        { pertanyaan: pertanyaanList[9].text, jawaban: gejala["suara_berisik"] ? 'ya' : 'tidak' },
        { pertanyaan: pertanyaanList[11].text, jawaban: gejala["motor_tidak_bertenaga"] ? 'ya' : 'tidak' },
        { pertanyaan: pertanyaanList[10].text, jawaban: gejala["starter_sulit_meski_bahan_bakar_ada"] ? 'ya' : 'tidak' }
      ],
      persentase: "80%"
    });
    rekomendasi.push("Periksa ring piston dan lakukan perbaikan segera.");
  }

  if (gejala["suara_berisik"] && !gejala["asap_putih_knalpot"] && gejala["starter_sulit"] && gejala["lampu_cepat_putus"]) {
    hasil.push({
      kerusakan: "Setelan katup terlalu rapat",
      jawaban: [
        { pertanyaan: pertanyaanList[9].text, jawaban: gejala["suara_berisik"] ? 'ya' : 'tidak' },
        { pertanyaan: pertanyaanList[8].text, jawaban: !gejala["asap_putih_knalpot"] ? 'tidak' : 'ya' },
        { pertanyaan: pertanyaanList[0].text, jawaban: gejala["starter_sulit"] ? 'ya' : 'tidak' },
        { pertanyaan: pertanyaanList[5].text, jawaban: gejala["lampu_cepat_putus"] ? 'ya' : 'tidak' }
      ],
      persentase: "75%"
    });
    rekomendasi.push("Setel ulang katup mesin sesuai standar.");
  }

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
    hasilText += "Rekomendasi:\n" + rekomendasi.join('\n');
    document.getElementById("hasil-diagnosis").innerText = hasilText;
  } else {
    document.getElementById("hasil-diagnosis").innerText = "Tidak ada kerusakan yang terdeteksi berdasarkan jawaban Anda.";
  }
}

tampilkanPertanyaan();