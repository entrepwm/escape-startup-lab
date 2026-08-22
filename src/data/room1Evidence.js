const ROOM1_EVIDENCE = [

    {
        id: "reviews",
        title: "Ulasan Pelanggan",
        type: "pdf",
        icon: "📄",
        content:
`★★★★★
"Makanannya lezat, tetapi saya menunggu selama 40 menit."

★★★★☆
"Rasanya sangat enak, tetapi pelayanannya sangat lambat."

★★☆☆☆
"Saya hampir pergi karena tidak ada yang datang untuk mencatat pesanan saya."`
    },

    {
        id: "sales",
        title: "Laporan Penjualan",
        type: "excel",
        icon: "📊",
        content:
`Penjualan Bulanan

Senin .......... 12 juta

Selasa ......... 11 juta

Jumat .......... 28 juta`
    },

    {
        id: "employee",
        title: "Wawancara Karyawan",
        type: "document",
        icon: "📝",
        content:
`Staf Dapur

"Hanya ada dua koki saat jam makan siang."

Kasir

"Pelanggan datang lebih cepat daripada makanan dapat disiapkan."`
    },

    {
        id: "kitchen_photo",
        title: "Foto_Dapur.png",
        type: "image",
        icon: "🖼",

        content:

            "• Pemeriksaan kualitas makanan menunjukkan bahwa sebagian besar hidangan memenuhi standar restoran.\n" +

            "• Pada periode normal, pesanan dapat disiapkan tanpa keterlambatan yang berarti.\n" +

            "• Pada jam sibuk, dapur menerima pesanan lebih cepat daripada kemampuan staf untuk menyelesaikannya.\n" +

            "• Beberapa hidangan memerlukan beberapa tahap persiapan, sehingga memperlambat pelayanan ketika permintaan tinggi.\n" +

            "• Staf sering harus menunggu penggunaan peralatan atau ruang kerja bersama pada periode paling sibuk.\n\n" +

            "Temuan Utama:\n" +

            "Dapur mampu menangani permintaan pada kondisi normal, tetapi kapasitas menjadi hambatan utama pada jam sibuk."
    },

    {
        id: "receipt",
        title: "Catatan Transaksi Kasir",
        icon: "💳",

        content:

            "Observasi Kasir\n\n" +

            "• Kasir melaporkan bahwa antrean pesanan meningkat dengan cepat pada jam sibuk.\n" +

            "• Pelanggan sering bertanya berapa lama pesanan mereka akan selesai sebelum melakukan pembayaran.\n" +

            "• Permintaan pengembalian dana jarang terjadi, tetapi keluhan mengenai waktu tunggu cukup sering muncul.\n" +

            "• Rata-rata pengeluaran per pelanggan relatif stabil.\n" +

            "• Menurut kasir, tekanan terbesar terjadi ketika beberapa kelompok besar datang pada waktu yang bersamaan.\n\n" +

            "Temuan Utama:\n" +

            "Bukti menunjukkan bahwa masalah pengalaman pelanggan lebih kuat berkaitan dengan alur pelayanan dan waktu tunggu dibandingkan dengan harga."
    }

];

export default ROOM1_EVIDENCE;