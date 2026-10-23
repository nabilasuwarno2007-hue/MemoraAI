let memori = Number(localStorage.getItem("memoriMemoraAI")) || 65;

let riwayatTersimpan =
    localStorage.getItem("riwayatMemoraAI");

if (riwayatTersimpan) {
    document.getElementById("riwayat").innerHTML =
        riwayatTersimpan;
    hapusPlaceholderRiwayat();
}
document.querySelector("#memory h2").innerText = memori + "%";
document.getElementById("grafikMemori").value = memori;
document.getElementById("persenGrafik").innerText = memori + "%";
document.getElementById("grafikMemori").style.accentColor =
    memori >= 90 ? "#ef4444" :
    memori >= 75 ? "#f59e0b" : "#0891b2";

const grafik = document.getElementById("grafikMemori");

if (memori >= 90) {
    grafik.style.accentColor = "red";
} else if (memori >= 75) {
    grafik.style.accentColor = "orange";
} else {
    grafik.style.accentColor = "green";
}

document.getElementById("statusMemori").innerText =
    memori >= 90 ? "Status: Tinggi" : "Status: Normal";

let statusAwal = document.getElementById("statusSistem");

if (memori >= 90) {
    statusAwal.innerText = "● Memori Tinggi";
    statusAwal.style.background = "#fee2e2";
    statusAwal.style.color = "#b91c1c";
} else if (memori >= 75) {
    statusAwal.innerText = "● Memori Meningkat";
    statusAwal.style.background = "#fef3c7";
    statusAwal.style.color = "#92400e";
} else {
    statusAwal.innerText = "● Sistem Normal";
    statusAwal.style.background = "#dcfce7";
    statusAwal.style.color = "#15803d";
}
let ringkasanTersimpan =
    localStorage.getItem("ringkasanMemoraAI");

if (ringkasanTersimpan) {
    document.getElementById("ringkasan").innerText =
        ringkasanTersimpan;
}
let hasilTersimpan =
    localStorage.getItem("hasilMemoraAI");

if (hasilTersimpan) {
    document.getElementById("hasil").innerText =
        hasilTersimpan;
}

let waktuTersimpan = localStorage.getItem("waktuTerakhirMemoraAI");

if (waktuTersimpan) {
    document.getElementById("waktuTerakhir").innerText = waktuTersimpan;
}

function hapusPlaceholderRiwayat() {
    document.querySelectorAll("#riwayat li").forEach(function(item) {
        const teks = item.innerText.trim().toLowerCase();

        if (
            teks.includes("menunggu simulasi") ||
            teks.includes("menunggu simmulasi")
        ) {
            item.remove();
        }
    });
}


function jalankanSimulasi() {
    let tahapan = document.querySelectorAll(".pipeline-flow div");

    tahapan.forEach(function(item) {
        item.classList.remove("sedang-proses", "selesai-proses");
    });

    tahapan.forEach(function(item, index) {
        setTimeout(function() {
            item.classList.add("sedang-proses");

            if (index > 0) {
                tahapan[index - 1].classList.remove("sedang-proses");
                tahapan[index - 1].classList.add("selesai-proses");
            }

            if (index === tahapan.length - 1) {
                setTimeout(function() {
                    item.classList.remove("sedang-proses");
                    item.classList.add("selesai-proses");
                }, 800);
            }
        }, index * 800);
    });

    if (memori < 100) {
        memori = Math.min(memori + 5, 100);
    }

    dataGrafikMemori.push(memori);
    dataGrafikMemori = dataGrafikMemori.slice(-8);

    localStorage.setItem(
        "grafikMemoriMemoraAI",
        JSON.stringify(dataGrafikMemori)
    );

    renderGrafikMemori();

    let kapasitas = Number(
        document.getElementById("kapasitasMemori").value
    );

    document.getElementById("memoriTerpakai").innerText =
        (memori / 100 * kapasitas).toFixed(1);

    localStorage.setItem("memoriMemoraAI", memori);

    document.querySelector("#memory h2").innerText = memori + "%";

    let statusMemori = document.getElementById("statusMemori");

    statusMemori.innerText =
        memori >= 100 ? "Status: Penuh" :
        memori >= 90 ? "Status: Tinggi" :
        memori >= 75 ? "Status: Meningkat" :
        "Status: Normal";

    if (memori >= 90) {
        statusMemori.style.background = "#fee2e2";
        statusMemori.style.color = "#b91c1c";
    } else if (memori >= 75) {
        statusMemori.style.background = "#fef3c7";
        statusMemori.style.color = "#92400e";
    } else {
        statusMemori.style.background = "#dcfce7";
        statusMemori.style.color = "#166534";
    }

    document.getElementById("grafikMemori").value = memori;
    document.getElementById("persenGrafik").innerText = memori + "%";

    document.getElementById("grafikMemori").style.accentColor =
        memori >= 90 ? "#ef4444" :
        memori >= 75 ? "#f59e0b" : "#0891b2";

    let waktu = new Date().toLocaleTimeString("id-ID");

    document.getElementById("waktuTerakhir").innerText = waktu;
    localStorage.setItem("waktuTerakhirMemoraAI", waktu);

    hapusPlaceholderRiwayat();
    const itemRiwayat = document.createElement("li");
    const ukuran = Number(document.getElementById("ukuranData").value);
    const waktuBiasa = (ukuran * 1.2).toFixed(1);
    const waktuZero = (ukuran * 0.4).toFixed(1);

itemRiwayat.innerText =
    "[" + waktu + "] Jalankan Simulasi | Memori: " + memori +
    "% | Copy Biasa: " + waktuBiasa +
    " ms | Zero-copy: " + waktuZero + " ms";
    document.getElementById("riwayat").prepend(itemRiwayat);

    const semuaRiwayat = document.querySelectorAll("#riwayat li");
    if (semuaRiwayat.length > 10) {
        semuaRiwayat[semuaRiwayat.length - 1].remove();
    }

    localStorage.setItem(
        "riwayatMemoraAI",
        document.getElementById("riwayat").innerHTML
    );
    perbaruiTampilanRiwayat();
}


function resetSimulasi() {
    // Reset data utama
    memori = 65;
    localStorage.setItem("memoriMemoraAI", 65);

    // Reset waktu terakhir
    document.getElementById("waktuTerakhir").innerText = "Belum ada";
    localStorage.removeItem("waktuTerakhirMemoraAI");

    // Reset kartu memori
    document.querySelector("#memory h2").innerText = "65%";

    const statusMemori = document.getElementById("statusMemori");
    statusMemori.innerText = "Status: Normal";
    statusMemori.style.background = "#dcfce7";
    statusMemori.style.color = "#166534";

    // Reset grafik penggunaan memori
    document.getElementById("grafikMemori").value = 65;
    document.getElementById("grafikMemori").style.width = "100%";
    document.getElementById("grafikMemori").style.accentColor = "#0891b2";
    document.getElementById("persenGrafik").innerText = "65%";

    dataGrafikMemori = [65];

    localStorage.setItem(
        "grafikMemoriMemoraAI",
        JSON.stringify(dataGrafikMemori)
    );

    renderGrafikMemori();

    // Reset status sistem
    const status = document.getElementById("statusSistem");
    status.innerText = "● Sistem Siap";
    status.style.background = "#dcfce7";
    status.style.color = "#15803d";

    // Reset pilihan ukuran dan kapasitas
    document.getElementById("ukuranData").value = "50";
    document.getElementById("kapasitasMemori").value = "1024";
    perbaruiMemoriTerpakai();

    // Reset kartu Zero-copy
    document.getElementById("pengurangan").innerText = "66.7";
    document.getElementById("copyBiasa").innerText = "3";
    document.getElementById("zeroCopy").innerText = "1";

    document.getElementById("dataCopyBiasa").innerText = "150";
    document.getElementById("dataZeroCopy").innerText = "50";

    document.getElementById("waktuCopyBiasa").innerText = "60";
    document.getElementById("waktuZeroCopy").innerText = "20";

    // Reset grafik perbandingan
    const batangBiasa = document.getElementById("batangCopyBiasa");
    batangBiasa.style.width = "100%";
    batangBiasa.innerText = "60 ms";

    const batangZero = document.getElementById("batangZeroCopy");
    batangZero.style.width = "33.3%";
    batangZero.innerText = "20 ms";

    // Reset hasil perbandingan
    document.getElementById("hasilPerbandingan").innerHTML = `
        <h4>Hasil Perbandingan</h4>
        <p>Pilih Bandingkan Metode untuk melihat hasil.</p>
    `;

    document.getElementById("hasil").innerText = "";
    document.getElementById("ringkasan").innerText =
        "Belum ada simulasi yang dijalankan.";

    // Reset kartu waktu pemrosesan
    document.getElementById("waktuCopyBiasa").innerText = "60";
    document.getElementById("waktuZeroCopy").innerText = "20";
    document.getElementById("waktuBiasaUtama").innerText = "60";
    document.getElementById("waktuZeroUtama").innerText = "20";
    document.getElementById("waktuZeroCadangan").innerText = "20";

    // Reset peringatan kapasitas
    const peringatan = document.getElementById("peringatanKapasitas");
    peringatan.innerText = "Kapasitas memori mencukupi.";
    peringatan.style.color = "#16a34a";

    // Reset pipeline
    document.getElementById("statusPipeline").innerText =
    "Status: Menunggu Simulasi";

    document.querySelectorAll(".pipeline-flow div").forEach(function(item) {
        item.classList.remove("sedang-proses", "selesai-proses");
    });

    // Reset riwayat dan pencarian
    document.getElementById("riwayat").innerHTML =
        "<li>Menunggu simulasi...</li>";

    document.getElementById("cariRiwayat").value = "";

    const pesanPencarian = document.getElementById("pesanPencarian");
    if (pesanPencarian) {
        pesanPencarian.innerText = "";
    }

    const filterRiwayat = document.getElementById("filterRiwayat");
    if (filterRiwayat) {
        filterRiwayat.value = "semua";
    }

    // Hapus data hasil sebelumnya
    localStorage.removeItem("riwayatMemoraAI");
    localStorage.removeItem("ringkasanMemoraAI");
    localStorage.removeItem("hasilMemoraAI");

    // Perbarui angka dan tabel sesuai pilihan awal
    perbaruiPerbandinganData();

    // Simpan ringkasan awal
    localStorage.setItem(
        "ringkasanMemoraAI",
        document.getElementById("ringkasan").innerText
    );

    // Beri tahu pengguna bahwa reset selesai
    console.log("Memora AI berhasil di-reset.");
}

function bandingkanMetode() {
    const ukuran = Number(document.getElementById("ukuranData").value);

    const biasa = ukuran * 1.2;
    const zero = ukuran * 0.4;
    const selisih = ((biasa - zero) / biasa) * 100;
    const hematWaktu = biasa - zero;
    const waktuBiasa = biasa.toFixed(1);
    const waktuZero = zero.toFixed(1);
    const penghematan = selisih.toFixed(1);

    const batangBiasa = document.getElementById("batangCopyBiasa");
    const batangZero = document.getElementById("batangZeroCopy");

    document.getElementById("waktuCopyBiasa").innerText = waktuBiasa;
    document.getElementById("waktuZeroCopy").innerText = waktuZero;
    document.getElementById("pengurangan").innerText = penghematan;

    if (batangBiasa && batangZero) {
        batangBiasa.style.width = "100%";
        batangBiasa.innerText = waktuBiasa + " ms";

        batangZero.style.width = (zero / biasa * 100) + "%";
        batangZero.innerText = waktuZero + " ms";
    }

    document.getElementById("hasil").innerText =
        "Copy Biasa: " + waktuBiasa + " ms | Zero-copy: " +
        waktuZero + " ms | Pengurangan waktu: " +
        penghematan + "% (simulasi)";

    document.getElementById("hasilPerbandingan").innerHTML = `
        <h4>Hasil Perbandingan</h4>
        <p>Ukuran data: ${ukuran} MB</p>
        <p>Copy Biasa: ${waktuBiasa} ms</p>
        <p>Zero-copy: ${waktuZero} ms</p>
        <p>Penghematan waktu: ${hematWaktu.toFixed(1)} ms</p>
        <p>Efisiensi waktu: ${penghematan}%</p>
    `;

    const waktuRiwayat = new Date().toLocaleTimeString("id-ID");
    document.getElementById("waktuTerakhir").innerText = waktuRiwayat;
    localStorage.setItem("waktuTerakhirMemoraAI", waktuRiwayat);

    const itemPerbandingan =
        "<li>[" + waktuRiwayat + "] Perbandingan " +
        ukuran + " MB | Copy Biasa: " + waktuBiasa +
        " ms | Zero-copy: " + waktuZero + " ms</li>";

    document.getElementById("riwayat").insertAdjacentHTML(
        "afterbegin",
        itemPerbandingan
    );

    hapusPlaceholderRiwayat();

    const semuaRiwayat = document.querySelectorAll("#riwayat li");
    if (semuaRiwayat.length > 10) {
        semuaRiwayat[semuaRiwayat.length - 1].remove();
    }

    document.getElementById("ringkasan").innerText =
        "Untuk data " + ukuran + " MB, Zero-copy menghemat " +
        hematWaktu.toFixed(1) + " ms atau " + penghematan +
        "% dibandingkan Copy Biasa (simulasi).";

    localStorage.setItem(
        "ringkasanMemoraAI",
        document.getElementById("ringkasan").innerText
    );

    localStorage.setItem(
        "hasilMemoraAI",
        document.getElementById("hasil").innerText
    );

    localStorage.setItem(
        "riwayatMemoraAI",
        document.getElementById("riwayat").innerHTML
    );

    document.getElementById("statusSistem").innerText =
        "● Perbandingan Selesai";

    document.getElementById("statusSistem").style.background = "#dbeafe";
    document.getElementById("statusSistem").style.color = "#1d4ed8";

    document.getElementById("statusPipeline").innerText =
        "Status: Perbandingan Metode Selesai";

    cariDataRiwayat();
}

function downloadRiwayat() {
    let laporan =
        "MEMORA AI - LAPORAN SIMULASI\n\n" +
        "Penggunaan Memori: " +
        document.querySelector("#memory h2").innerText + "\n" +
        "Status Memori: " +
        document.getElementById("statusMemori").innerText + "\n" +
        "Waktu Terakhir: " +
        document.getElementById("waktuTerakhir").innerText + "\n" +
        "Pengurangan Penyalinan Data: " +
        document.getElementById("pengurangan").innerText + "%\n" +
        "Waktu Copy Biasa: " +
        document.getElementById("waktuCopyBiasa").innerText + " ms\n" +
        "Waktu Zero-copy: " +
        document.getElementById("waktuZeroCopy").innerText + " ms\n\n" +
        "Ringkasan:\n" +
        document.getElementById("ringkasan").innerText + "\n\n" +
        "Hasil:\n" +
        document.getElementById("hasil").innerText + "\n\n" +
        "Riwayat Simulasi:\n" +
        document.getElementById("riwayat").innerText;

    let file = new Blob([laporan], { type: "text/plain;charset=utf-8" });
    let url = URL.createObjectURL(file);
    let link = document.createElement("a");

    link.href = url;
    link.download = "laporan_memora_ai.txt";
    link.click();

    setTimeout(function() {
        URL.revokeObjectURL(url);
    }, 1000);
}



function perbaruiTampilanRiwayat() {
    const kataKunci = document.getElementById("cariRiwayat")
        .value.toLocaleLowerCase("id-ID").trim();
    const filter = document.getElementById("filterRiwayat").value;
    const daftar = document.querySelectorAll("#riwayat li");
    let jumlahCocok = 0;

    daftar.forEach(function(item) {
        const teks = item.textContent.toLocaleLowerCase("id-ID").trim();
        const placeholder = teks.includes("menunggu simulasi");

        if (placeholder) {
            item.hidden = true;
            item.style.display = "none";
            return;
        }
        item.hidden = false;
        item.hidden = false;
        const teksPencarian = teks.replace(/\s+/g, " ");
        const kueriPencarian = kataKunci.replace(/\s+/g, " ");
        const cocokKata = teksPencarian.includes(kueriPencarian);
        const cocokFilter = filter === "semua" ||
            (filter === "memori" &&
                (teksPencarian.includes("memori") ||
                 teksPencarian.includes("jalankan simulasi"))) ||
            (filter === "zero-copy" &&
                (teksPencarian.includes("zero-copy") ||
                 teksPencarian.includes("zero copy")));

        const tampilkan = cocokKata && cocokFilter;
        item.hidden = false;
        item.style.display = tampilkan ? "" : "none";
        if (tampilkan) jumlahCocok++;
    });

    const pesanLama = document.getElementById("pesanPencarian");
    if (pesanLama) {
        pesanLama.hidden = true;
    }

    if (jumlahCocok === 0 &&
        (kataKunci !== "" || filter !== "semua")) {
        const pesan = pesanLama || document.createElement("p");
        pesan.id = "pesanPencarian";
        pesan.textContent = "Riwayat tidak ditemukan.";
        pesan.hidden = false;
        if (!pesanLama) {
            document.getElementById("riwayat")
                .insertAdjacentElement("afterend", pesan);
        }
    }
}

function cariDataRiwayat() {
    perbaruiTampilanRiwayat();
}

window.addEventListener("DOMContentLoaded", function () {
    const data = localStorage.getItem("riwayatMemoraAI");

    if (data) {
        document.getElementById("riwayat").innerHTML = data;
        hapusPlaceholderRiwayat();
    }

    perbaruiTampilanRiwayat();
});

const pilihanKapasitas = document.getElementById("kapasitasMemori");

pilihanKapasitas.value =
    localStorage.getItem("kapasitasMemoraAI") || "1024";

function perbaruiMemoriTerpakai(kapasitasSebelumnya) {
    const kapasitas = Number(pilihanKapasitas.value);

    if (kapasitasSebelumnya) {
        const memoriTerpakaiSebelumnya =
            memori / 100 * kapasitasSebelumnya;
        memori = Number(
            (memoriTerpakaiSebelumnya / kapasitas * 100).toFixed(4)
        );
        dataGrafikMemori = dataGrafikMemori.map(function(nilai) {
            return Number(
                (nilai * kapasitasSebelumnya / kapasitas).toFixed(4)
            );
        });
        localStorage.setItem(
            "grafikMemoriMemoraAI",
            JSON.stringify(dataGrafikMemori)
        );
        renderGrafikMemori();
    }

    const persenMemori = Number(memori.toFixed(1));
    const statusMemori = document.getElementById("statusMemori");
    const grafikMemori = document.getElementById("grafikMemori");
    const statusSistem = document.getElementById("statusSistem");

    document.querySelector("#memory h2").innerText = persenMemori + "%";
    document.getElementById("memoriTerpakai").innerText =
        (memori / 100 * kapasitas).toFixed(1);
    grafikMemori.value = Math.min(memori, 100);
    document.getElementById("persenGrafik").innerText = persenMemori + "%";

    statusMemori.innerText =
        memori >= 100 ? "Status: Penuh" :
        memori >= 90 ? "Status: Tinggi" :
        memori >= 75 ? "Status: Meningkat" :
        "Status: Normal";

    if (memori >= 90) {
        statusMemori.style.background = "#fee2e2";
        statusMemori.style.color = "#b91c1c";
        statusSistem.innerText = "● Memori Tinggi";
        statusSistem.style.background = "#fee2e2";
        statusSistem.style.color = "#b91c1c";
        grafikMemori.style.accentColor = "#ef4444";
    } else if (memori >= 75) {
        statusMemori.style.background = "#fef3c7";
        statusMemori.style.color = "#92400e";
        statusSistem.innerText = "● Memori Meningkat";
        statusSistem.style.background = "#fef3c7";
        statusSistem.style.color = "#92400e";
        grafikMemori.style.accentColor = "#f59e0b";
    } else {
        statusMemori.style.background = "#dcfce7";
        statusMemori.style.color = "#166534";
        statusSistem.innerText = "● Sistem Normal";
        statusSistem.style.background = "#dcfce7";
        statusSistem.style.color = "#15803d";
        grafikMemori.style.accentColor = "#0891b2";
    }

    localStorage.setItem("memoriMemoraAI", memori);
    localStorage.setItem("kapasitasMemoraAI", kapasitas);
}

pilihanKapasitas.addEventListener("change", function() {
    const kapasitasSebelumnya =
        Number(localStorage.getItem("kapasitasMemoraAI")) ||
        Number(pilihanKapasitas.value);

    perbaruiMemoriTerpakai(kapasitasSebelumnya);
});
perbaruiMemoriTerpakai();

document.getElementById("cariRiwayat")
    .addEventListener("input", cariDataRiwayat);

document.getElementById("filterRiwayat")
    .addEventListener("change", filterDataRiwayat);

document.getElementById("tombolJalankan")
    .addEventListener("click", jalankanSimulasi);

document.getElementById("tombolBandingkan")
    .addEventListener("click", bandingkanMetode);

document.getElementById("tombolReset")
    .addEventListener("click", resetSimulasi);

document.getElementById("tombolDownload")
    .addEventListener("click", downloadRiwayat);


let dataGrafikMemori = JSON.parse(
    localStorage.getItem("grafikMemoriMemoraAI")
) || [65];

function renderGrafikMemori() {
    const wadah = document.getElementById("grafikRiwayat");

    if (!wadah) return;

    wadah.innerHTML = "";

    dataGrafikMemori.slice(-8).forEach(function(nilai) {
        const batang = document.createElement("div");
        batang.className = "batang-grafik";

        batang.innerHTML = `
            <div class="tinggi-batang"
                 style="height: ${nilai}%"></div>
            <span>${nilai}%</span>
        `;

        wadah.appendChild(batang);
    });
}

renderGrafikMemori();


function filterDataRiwayat() {
    perbaruiTampilanRiwayat();
}


function perbaruiPerbandinganData() {
    const pilihan = document.getElementById("ukuranData");
    const kapasitas = document.getElementById("kapasitasMemori");
    const peringatan = document.getElementById("peringatanKapasitas");

    if (!pilihan || !kapasitas || !peringatan) return;

    const ukuran = Number(pilihan.value);
    const kapasitasMB = Number(kapasitas.value);

    document.getElementById("dataCopyBiasa").innerText = ukuran * 3;
    document.getElementById("dataZeroCopy").innerText = ukuran;

    document.getElementById("waktuCopyBiasa").innerText = ukuran * 1.2;
    document.getElementById("waktuZeroCopy").innerText = ukuran * 0.4;

    const memoriTerpakai = kapasitasMB * (Number(memori) / 100);
    const totalMemori = memoriTerpakai + ukuran;

    if (totalMemori > kapasitasMB) {
        peringatan.innerText = "Peringatan: kapasitas memori berpotensi terlampaui!";
        peringatan.style.color = "#dc2626";
    } else {
        peringatan.innerText = "Kapasitas memori mencukupi.";
        peringatan.style.color = "#16a34a";
    }


    const tabel = document.getElementById("tabelUkuranData");

    if (tabel) {
        tabel.innerHTML = "";

        [10, 50, 100, 500].forEach(function(ukuran) {
            const biasa = ukuran * 1.2;
            const zero = ukuran * 0.4;
            const hemat = ((biasa - zero) / biasa) * 100;

            tabel.innerHTML += `
                <tr>
                    <td>${ukuran} MB</td>
                    <td>${biasa.toFixed(1)} ms</td>
                    <td>${zero.toFixed(1)} ms</td>
                    <td>${hemat.toFixed(1)}%</td>
                </tr>
            `;
        });
    }

}

document.getElementById("ukuranData")?.addEventListener(
    "change",
    perbaruiPerbandinganData
);

document.getElementById("kapasitasMemori")?.addEventListener(
    "change",
    perbaruiPerbandinganData
);

window.addEventListener("DOMContentLoaded", perbaruiPerbandinganData);

let sensorAktif = false;
let intervalSensor = null;
let jumlahFrame = 0;

function toggleSensor() {
    const status = document.getElementById("statusSensor");
    const jumlah = document.getElementById("jumlahDataSensor");
    const data = document.getElementById("dataSensor");
    const tombol = document.getElementById("tombolSensor");

    if (!sensorAktif) {
        sensorAktif = true;

        status.innerText = "Aktif";
        tombol.innerText = "Hentikan Camera / Sensor";

        intervalSensor = setInterval(function () {
            jumlahFrame++;

            const intensitas = Math.floor(Math.random() * 100) + 1;
        
const tahapan = document.querySelectorAll(".pipeline-flow div");

tahapan.forEach(function (tahap) {
    tahap.classList.remove("sedang-proses", "selesai-proses");
});

tahapan[0].classList.add("sedang-proses");

setTimeout(function () {
    tahapan[0].classList.remove("sedang-proses");
    tahapan[0].classList.add("selesai-proses");
    tahapan[1].classList.add("sedang-proses");
}, 200);

setTimeout(function () {
    tahapan[1].classList.remove("sedang-proses");
    tahapan[1].classList.add("selesai-proses");
    tahapan[2].classList.add("sedang-proses");
}, 400);

setTimeout(function () {
    tahapan[2].classList.remove("sedang-proses");
    tahapan[2].classList.add("selesai-proses");
}, 600);


            jumlah.innerText = jumlahFrame;
            data.innerText =
                "Frame #" + jumlahFrame +
                " | Intensitas: " + intensitas + "%";
            document.getElementById("statusSharedMemory").innerText = "Menerima data";
            document.getElementById("dataSharedMemory").innerText = jumlahFrame;
            document.getElementById("statusGPU").innerText = "Memproses data...";
            document.getElementById("dataGPU").innerText = jumlahFrame;
        }, 1000);
    } else {
        sensorAktif = false;

        clearInterval(intervalSensor);
        intervalSensor = null;

        status.innerText = "Standby";
        tombol.innerText = "Mulai Camera / Sensor";

        document.getElementById("statusSharedMemory").innerText = "Menunggu data";
        document.getElementById("statusGPU").innerText = "Menunggu data";
        document.getElementById("dataGPU").innerText = "Menunggu data";
    }
}

let kameraAktif = false;
let streamKamera = null;

let canvasFrame = document.createElement("canvas");
let contextFrame = canvasFrame.getContext("2d");

async function toggleKamera() {
    const video = document.getElementById("kameraLaptop");
    const status = document.getElementById("statusKamera");
    const tombol = document.getElementById("tombolKamera");

    if (!kameraAktif) {
        try {
            streamKamera = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            });

            video.srcObject = streamKamera;
            kameraAktif = true;
            jumlahFrame = 0;

if (intervalSensor) {
    clearInterval(intervalSensor);
    intervalSensor = null;
    sensorAktif = false;
}

intervalSensor = setInterval(function () {
    if (!kameraAktif || video.readyState < 2) return;

    
canvasFrame.width = video.videoWidth;
canvasFrame.height = video.videoHeight;

contextFrame.drawImage(
    video,
    0,
    0,
    canvasFrame.width,
    canvasFrame.height
);

const gambar = contextFrame.getImageData(
    0,
    0,
    canvasFrame.width,
    canvasFrame.height
);

const ukuranFrameKB = (gambar.data.length / 1024).toFixed(2);

localStorage.setItem("ukuranFrameMemoraAI", ukuranFrameKB);

jumlahFrame++;


    document.getElementById("jumlahDataSensor").innerText = jumlahFrame;
    document.getElementById("dataSensor").innerText =
    "Frame #" + jumlahFrame +
    " | Resolusi: " + canvasFrame.width + "x" + canvasFrame.height +
    " | Data piksel: " + ukuranFrameKB + " KB";
    document.getElementById("statusSharedMemory").innerText = "Menerima frame kamera";
    document.getElementById("dataSharedMemory").innerText = jumlahFrame;

    document.getElementById("statusGPU").innerText = "Memproses frame simulasi";
    document.getElementById("dataGPU").innerText = jumlahFrame;
}, 1000);

            status.innerText = "Kamera aktif";
            tombol.innerText = "Matikan Kamera";

        } catch (error) {
            status.innerText = "Kamera gagal diakses. Periksa izin kamera.";
            console.error("Kesalahan kamera:", error);
        }
    } else {
        streamKamera.getTracks().forEach(function (track) {
            track.stop();
        });

        video.srcObject = null;
        streamKamera = null;
        kameraAktif = false;

        status.innerText = "Kamera belum dinyalakan";
        tombol.innerText = "Nyalakan Kamera Laptop";
    }
}

function pindahHalaman(idHalaman) {
    const halamanTujuan = document.getElementById(idHalaman);

    if (!halamanTujuan || !halamanTujuan.classList.contains("halaman")) {
        return;
    }

    document.querySelectorAll(".halaman").forEach(function(halaman) {
        halaman.classList.remove("aktif");
    });

    halamanTujuan.classList.add("aktif");

    document.querySelectorAll(".sidebar a").forEach(function(menu) {
        menu.classList.remove("active");
        menu.removeAttribute("aria-current");
    });

    const menuAktif = document.querySelector(
        '.sidebar a[data-halaman="' + idHalaman + '"]'
    );

    if (menuAktif) {
        menuAktif.classList.add("active");
        menuAktif.setAttribute("aria-current", "page");
        document.getElementById("judulHalaman").innerText =
            menuAktif.dataset.judul;
    }
}

document.querySelectorAll(".sidebar a[data-halaman]").forEach(function(menu) {
    menu.addEventListener("click", function(event) {
        event.preventDefault();
        pindahHalaman(menu.dataset.halaman);
    });
});
