const ROOM3_NOTEBOOK = [

    // =====================================================
    // Q1 — ANGGARAN INVESTASI
    // =====================================================

    {
        id: "available_budget",

        question:
            "Berapa besar modal investasi yang telah disetujui manajemen untuk proyek perbaikan?",

        type: "radio",

        options: [
            "Rp20.000.000",
            "Rp30.000.000",
            "Rp50.000.000",
            "Rp85.000.000"
        ],

        correctAnswer:
            "Rp50.000.000"
    },


    // =====================================================
    // Q2 — UTILISASI STAF
    // =====================================================

    {
        id: "staff_utilization",

        question:
            "Apa yang terjadi pada tingkat utilisasi staf selama periode sibuk?",

        type: "radio",

        options: [
            "Menurun menjadi sekitar 50%",
            "Tetap berada di sekitar 68%",
            "Meningkat menjadi sekitar 94%",
            "Tetap berada di bawah 60%"
        ],

        correctAnswer:
            "Meningkat menjadi sekitar 94%"
    },


    // =====================================================
    // Q3 — INTERPRETASI BOTTLENECK
    // =====================================================

    {
        id: "capacity_interpretation",

        question:
            "Apa yang paling kuat ditunjukkan oleh kombinasi utilisasi staf yang tinggi dan waktu tunggu pelanggan yang panjang?",

        type: "radio",

        options: [
            "Restoran memiliki terlalu banyak kapasitas yang tidak digunakan",
            "Permintaan melebihi kapasitas operasional saat ini selama periode sibuk",
            "Pelanggan terutama tidak puas terhadap kualitas makanan",
            "Restoran seharusnya mengurangi aktivitas pemasarannya"
        ],

        correctAnswer:
            "Permintaan melebihi kapasitas operasional saat ini selama periode sibuk"
    },


    // =====================================================
    // Q4 — DAMPAK TERHADAP PELANGGAN
    // =====================================================

    {
        id: "waiting_time",

        question:
            "Apa dampak paling langsung terhadap pelanggan akibat keterbatasan kapasitas restoran selama periode sibuk?",

        type: "radio",

        options: [
            "Harga makanan yang lebih tinggi",
            "Waktu tunggu yang lebih lama",
            "Paparan iklan yang lebih rendah",
            "Kesadaran merek yang lebih rendah"
        ],

        correctAnswer:
            "Waktu tunggu yang lebih lama"
    },


    // =====================================================
    // Q5 — PRIORITAS STRATEGIS BERBASIS KASUS
    // =====================================================

    {
        id: "case_priority",

        question:
            "Dengan keterbatasan anggaran sebesar Rp50.000.000, apa dasar terkuat untuk memilih di antara berbagai opsi perbaikan yang tersedia?",

        type: "radio",

        options: [
            "Memilih opsi dengan biaya awal paling rendah",
            "Memilih opsi yang paling maju secara teknologi",
            "Memprioritaskan opsi yang paling efektif mengatasi bottleneck sekaligus tetap layak secara finansial dan operasional",
            "Memilih opsi yang disukai manajemen tanpa mempertimbangkan bukti"
        ],

        correctAnswer:
            "Memprioritaskan opsi yang paling efektif mengatasi bottleneck sekaligus tetap layak secara finansial dan operasional"
    },


    // =====================================================
    // Q6 — PENGAMBILAN KEPUTUSAN STRATEGIS:
    // NILAI MARGINAL
    // =====================================================

    {
        id: "marginal_value",

        question:
            "Ketika membandingkan dua alternatif investasi dalam anggaran yang terbatas, penalaran mana yang paling mencerminkan analisis marginal?",

        type: "radio",

        options: [
            "Memilih opsi dengan biaya total tertinggi karena kemungkinan memberikan nilai lebih besar",
            "Membandingkan manfaat tambahan yang dihasilkan oleh setiap tambahan unit sumber daya yang digunakan",
            "Memilih alternatif dengan jumlah fitur paling banyak",
            "Mengabaikan manfaat tambahan dan hanya berfokus pada total pengeluaran"
        ],

        correctAnswer:
            "Membandingkan manfaat tambahan yang dihasilkan oleh setiap tambahan unit sumber daya yang digunakan"
    },


    // =====================================================
    // Q7 — PENGAMBILAN KEPUTUSAN STRATEGIS:
    // ALOKASI SUMBER DAYA
    // =====================================================

    {
        id: "resource_allocation",

        question:
            "Sebuah perusahaan memiliki beberapa proyek yang menarik, tetapi tidak memiliki modal yang cukup untuk membiayai semuanya. Prinsip apa yang seharusnya menjadi dasar dalam alokasi sumber daya strategis?",

        type: "radio",

        options: [
            "Membagi sumber daya secara merata ke semua proyek tanpa mempertimbangkan dampak yang diharapkan",
            "Mendanai proyek berdasarkan relevansi strategis, nilai yang diharapkan, keterbatasan, dan risiko",
            "Memprioritaskan proyek yang diusulkan oleh manajer dengan jabatan tertinggi",
            "Selalu memilih proyek dengan waktu implementasi paling singkat"
        ],

        correctAnswer:
            "Mendanai proyek berdasarkan relevansi strategis, nilai yang diharapkan, keterbatasan, dan risiko"
    },


    // =====================================================
    // Q8 — PENGAMBILAN KEPUTUSAN STRATEGIS:
    // KESESUAIAN STRATEGIS
    // =====================================================

    {
        id: "strategic_fit",

        question:
            "Apa yang dimaksud dengan kesesuaian strategis ketika mengevaluasi keputusan investasi kewirausahaan?",

        type: "radio",

        options: [
            "Investasi tersebut sedang populer di dalam industri",
            "Investasi tersebut sesuai dengan kemampuan perusahaan, prioritas, dan masalah yang ingin diselesaikan",
            "Investasi tersebut memiliki harga pembelian setinggi mungkin",
            "Investasi tersebut dapat diterapkan tanpa mengumpulkan bukti"
        ],

        correctAnswer:
            "Investasi tersebut sesuai dengan kemampuan perusahaan, prioritas, dan masalah yang ingin diselesaikan"
    },


    // =====================================================
    // Q9 — PENGAMBILAN KEPUTUSAN STRATEGIS:
    // KETIDAKPASTIAN
    // =====================================================

    {
        id: "decision_under_uncertainty",

        question:
            "Ketika hasil yang diharapkan masih mengandung ketidakpastian, pendekatan mana yang paling dapat dipertanggungjawabkan bagi seorang wirausahawan sebelum membuat keputusan investasi besar?",

        type: "radio",

        options: [
            "Menganggap bahwa hasil yang paling optimistis pasti akan terjadi",
            "Menunda semua keputusan sampai seluruh ketidakpastian hilang sepenuhnya",
            "Membandingkan berbagai hasil yang mungkin terjadi, risiko, asumsi, dan potensi kerugian sebelum mengalokasikan sumber daya",
            "Memilih alternatif yang memiliki teknologi paling inovatif"
        ],

        correctAnswer:
            "Membandingkan berbagai hasil yang mungkin terjadi, risiko, asumsi, dan potensi kerugian sebelum mengalokasikan sumber daya"
    },


    // =====================================================
    // Q10 — PENGAMBILAN KEPUTUSAN STRATEGIS:
    // RISIKO IMPLEMENTASI
    // =====================================================

    {
        id: "implementation_risk",

        question:
            "Dua alternatif memiliki estimasi imbal hasil finansial yang serupa, tetapi salah satunya membutuhkan pelatihan ulang karyawan secara besar-besaran dan perubahan alur kerja yang signifikan. Mengapa manajemen dapat secara wajar memilih alternatif yang lain?",

        type: "radio",

        options: [
            "Karena keputusan strategis harus menghindari seluruh bentuk perubahan organisasi",
            "Karena kompleksitas implementasi dan risiko eksekusi dapat mengurangi nilai yang benar-benar diperoleh dari investasi",
            "Karena pelatihan karyawan tidak pernah menciptakan nilai jangka panjang",
            "Karena imbal hasil finansial tidak relevan dalam memilih investasi"
        ],

        correctAnswer:
            "Karena kompleksitas implementasi dan risiko eksekusi dapat mengurangi nilai yang benar-benar diperoleh dari investasi"
    }

];


export default ROOM3_NOTEBOOK;