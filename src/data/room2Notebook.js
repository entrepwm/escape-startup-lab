const ROOM2_NOTEBOOK = [

    // =====================================================
    // Q1 — KUALITAS MAKANAN: AGREGASI DATA
    // =====================================================

    {
        id: "food_positive_rating",

        question:
            "Dalam survei pelanggan, berapa persentase responden yang memberikan nilai 4 atau 5 bintang untuk kualitas makanan?",

        type: "radio",

        options: [
            "72%",
            "82%",
            "92%",
            "98%"
        ],

        correctAnswer:
            "92%"
    },


    // =====================================================
    // Q2 — KECEPATAN PELAYANAN: PENILAIAN NEGATIF
    // =====================================================

    {
        id: "service_negative_rating",

        question:
            "Berapa persentase responden yang memberikan nilai hanya 1 atau 2 bintang untuk kecepatan pelayanan?",

        type: "radio",

        options: [
            "25%",
            "30%",
            "45%",
            "50%"
        ],

        correctAnswer:
            "50%"
    },


    // =====================================================
    // Q3 — KESENJANGAN KUANTITATIF
    // =====================================================

    {
        id: "quality_service_gap",

        question:
            "Kualitas makanan memperoleh 92% penilaian positif (4–5 bintang), sedangkan kecepatan pelayanan hanya memperoleh 25% penilaian positif. Berapa selisih persentase antara kedua ukuran tersebut?",

        type: "radio",

        options: [
            "50 poin persentase",
            "57 poin persentase",
            "67 poin persentase",
            "75 poin persentase"
        ],

        correctAnswer:
            "67 poin persentase"
    },


    // =====================================================
    // Q4 — KEPUASAN KESELURUHAN
    // =====================================================

    {
        id: "overall_satisfaction",

        question:
            "Menurut survei pelanggan, berapa proporsi responden yang TIDAK dikategorikan puas secara keseluruhan?",

        type: "radio",

        options: [
            "15%",
            "24%",
            "39%",
            "61%"
        ],

        correctAnswer:
            "39%"
    },


    // =====================================================
    // Q5 — PERTUMBUHAN TRANSAKSI
    // =====================================================

    {
        id: "weekend_transaction_growth",

        question:
            "Rata-rata transaksi meningkat dari 85 pada hari kerja menjadi 140 pada akhir pekan. Kira-kira berapa persen lebih tinggi transaksi akhir pekan dibandingkan hari kerja?",

        type: "radio",

        options: [
            "Sekitar 35%",
            "Sekitar 50%",
            "Sekitar 65%",
            "Sekitar 85%"
        ],

        correctAnswer:
            "Sekitar 65%"
    },


    // =====================================================
    // Q6 — PERTUMBUHAN WAKTU TUNGGU
    // =====================================================

    {
        id: "weekend_wait_growth",

        question:
            "Rata-rata waktu tunggu meningkat dari 18 menit pada hari kerja menjadi 41 menit pada akhir pekan. Kira-kira berapa persen peningkatan waktu tunggu dibandingkan tingkat pada hari kerja?",

        type: "radio",

        options: [
            "Sekitar 28%",
            "Sekitar 64%",
            "Sekitar 100%",
            "Sekitar 128%"
        ],

        correctAnswer:
            "Sekitar 128%"
    },


    // =====================================================
    // Q7 — PERMINTAAN VS. KAPASITAS PELAYANAN
    // =====================================================

    {
        id: "demand_capacity_relationship",

        question:
            "Transaksi akhir pekan sekitar 65% lebih tinggi daripada hari kerja, tetapi rata-rata waktu tunggu sekitar 128% lebih tinggi. Interpretasi mana yang paling kuat terhadap pola ini?",

        type: "radio",

        options: [
            "Kapasitas pelayanan tampaknya meningkat lebih cepat daripada permintaan pelanggan",
            "Waktu tunggu tidak berhubungan dengan volume transaksi",
            "Kapasitas pelayanan tampaknya tidak mampu mengimbangi peningkatan permintaan",
            "Restoran seharusnya meningkatkan permintaan lebih lanjut sebelum mengubah operasional"
        ],

        correctAnswer:
            "Kapasitas pelayanan tampaknya tidak mampu mengimbangi peningkatan permintaan"
    },


    // =====================================================
    // Q8 — BELANJA PELANGGAN VS. WAKTU TUNGGU
    // =====================================================

    {
        id: "spend_wait_comparison",

        question:
            "Rata-rata belanja pelanggan meningkat dari Rp82K pada hari kerja menjadi Rp91K pada akhir pekan, sementara waktu tunggu meningkat dari 18 menjadi 41 menit. Kesimpulan mana yang paling didukung oleh angka-angka tersebut?",

        type: "radio",

        options: [
            "Peningkatan belanja pelanggan sepenuhnya mengompensasi waktu tunggu yang jauh lebih lama",
            "Belanja pelanggan hanya meningkat sedikit sementara waktu tunggu meningkat secara drastis",
            "Pelanggan selalu membelanjakan lebih sedikit ketika restoran semakin sibuk",
            "Data membuktikan bahwa harga adalah sumber utama ketidakpuasan"
        ],

        correctAnswer:
            "Belanja pelanggan hanya meningkat sedikit sementara waktu tunggu meningkat secara drastis"
    },


    // =====================================================
    // Q9 — KEWIRAUSAHAAN: ANALISIS HAMBATAN / BOTTLENECK
    // =====================================================

    {
        id: "bottleneck_analysis",

        question:
            "Misalkan manajemen hanya dapat memperbaiki satu bagian bisnis dalam waktu dekat. Berdasarkan bukti, keputusan mana yang paling mencerminkan alokasi sumber daya yang berorientasi pada bottleneck?",

        type: "radio",

        options: [
            "Meningkatkan iklan karena pertumbuhan permintaan harus selalu menjadi prioritas",
            "Menurunkan harga menu karena harga yang lebih rendah otomatis meningkatkan pengalaman pelanggan",
            "Berinvestasi pada kapasitas pelayanan atau operasional karena waktu tunggu memburuk secara tajam ketika permintaan meningkat",
            "Memperluas menu karena variasi lebih penting secara strategis daripada kapasitas pelayanan"
        ],

        correctAnswer:
            "Berinvestasi pada kapasitas pelayanan atau operasional karena waktu tunggu memburuk secara tajam ketika permintaan meningkat"
    },


    // =====================================================
    // Q10 — KEWIRAUSAHAAN: PELUANG BERBASIS BUKTI
    // =====================================================

    {
        id: "opportunity_evaluation",

        question:
            "Pernyataan mana yang paling tepat menggambarkan peluang kewirausahaan yang terungkap dari bukti di Room 2?",

        type: "radio",

        options: [
            "Peluang utama adalah menciptakan permintaan karena minat pelanggan saat ini terlalu rendah",
            "Peluang utama adalah meningkatkan kemampuan restoran untuk mengubah permintaan produk yang kuat menjadi pengalaman pelanggan yang lebih cepat dan lebih andal",
            "Peluang utama adalah memosisikan ulang restoran dengan kualitas makanan yang lebih rendah dan harga yang lebih murah",
            "Peluang utama adalah meniru promosi pesaing tanpa menguji perilaku pelanggan"
        ],

        correctAnswer:
            "Peluang utama adalah meningkatkan kemampuan restoran untuk mengubah permintaan produk yang kuat menjadi pengalaman pelanggan yang lebih cepat dan lebih andal"
    }

];


export default ROOM2_NOTEBOOK;