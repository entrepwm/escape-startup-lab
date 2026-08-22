const ROOM2_EVIDENCE = [

    // =====================================================
    // 1. WAWANCARA PELANGGAN
    // =====================================================

    {
        id: "customer_interview",

        title: "Wawancara Pelanggan",

        type: "document",

        icon: "📝",

        content:
`Wawancara Pelanggan

Pelanggan A:
"Saya sangat menyukai suasana restoran ini. Nyaman dan stafnya ramah."

Pelanggan B:
"Makanannya enak, tetapi biasanya saya harus menunggu cukup lama."

Pelanggan C:
"Saya tidak keberatan membayar sedikit lebih mahal jika pelayanannya lebih cepat."

Pelanggan D:
"Saya kadang datang ke sini bersama teman-teman, tetapi kami menghindarinya saat jam sibuk karena waktu tunggunya terlalu lama."`
    },


    // =====================================================
    // 2. SURVEI PELANGGAN
    // =====================================================

    {
        id: "customer_survey",

        title: "Survei Pelanggan",

        type: "excel",

        icon: "📊",

        content:
`Survei Kepuasan Pelanggan
Jumlah responden: 100

Kualitas Makanan
★★★★★  72%
★★★★☆   20%
★★★☆☆    6%
★★☆☆☆    2%
★☆☆☆☆    0%

Kecepatan Pelayanan
★★★★★   8%
★★★★☆   17%
★★★☆☆   25%
★★☆☆☆   30%
★☆☆☆☆   20%

Kepuasan Secara Keseluruhan

Puas ............... 61%
Netral ............. 24%
Tidak Puas ......... 15%`
    },


    // =====================================================
    // 3. ULASAN ONLINE
    // =====================================================

    {
        id: "online_reviews",

        title: "Ulasan Online",

        type: "pdf",

        icon: "⭐",

        content:
`Pilihan Ulasan Online

★★★★★
"Makanan enak dan suasananya menyenangkan. Pasti akan kembali!"

★★★★☆
"Makanannya sangat enak, tetapi waktu tunggunya membuat frustrasi."

★★★☆☆
"Kualitasnya baik, tetapi pelayanan menjadi sangat lambat saat jam makan siang."

★★☆☆☆
"Makanannya enak, tetapi saya menunggu hampir 45 menit."

★★☆☆☆
"Stafnya ramah, tetapi restoran perlu meningkatkan kecepatan pelayanannya."

★★★★★
"Setelah makanannya datang, rasanya sangat enak. Saya hanya berharap makanannya bisa datang lebih cepat."`
    },


    // =====================================================
    // 4. DASBOR PENJUALAN
    // =====================================================

    {
        id: "sales_dashboard",

        title: "Dasbor Penjualan",

        type: "excel",

        icon: "📈",

        content:
`Dasbor Penjualan Bulanan

                    Hari Kerja     Akhir Pekan

Rata-rata
Transaksi              85              140

Rata-rata
Waktu Tunggu         18 menit         41 menit

Rata-rata
Belanja Pelanggan     Rp82K            Rp91K


Periode Puncak:

Jumat malam
18:00–20:00

Rata-rata Waktu Tunggu:
47 menit

Keluhan Pelanggan:
Tertinggi selama periode puncak.`
    },


    // =====================================================
    // 5. WAWANCARA MANAJER
    // =====================================================

    {
        id: "manager_report",

        title: "Laporan Manajer",

        type: "document",

        icon: "🧑‍💼",

        content:
`Wawancara Manajer

Manajer:

"Saya pikir masalah utama kita adalah pelanggan tidak memahami harga yang kita tetapkan."

"Beberapa pesaing menawarkan makanan yang lebih murah, jadi saya yakin kita seharusnya fokus pada diskon."

"Dapur kita sudah bekerja semaksimal mungkin."

"Kita mungkin dapat menyelesaikan masalah ini dengan menjalankan promosi untuk menarik lebih banyak pelanggan."

Solusi yang Diusulkan Manajer:

Meningkatkan diskon promosi
dan iklan selama periode puncak.`
    }

];

export default ROOM2_EVIDENCE;