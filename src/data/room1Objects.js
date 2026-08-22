const ROOM1_OBJECTS = [

    {
        id: "customer",
        label: "Pelanggan",
        icon: "🙂",

        // Sprite pelanggan di area makan
        x: 0.250,
        y: 0.645,

        evidence: "reviews"
    },

    {
        id: "employee",
        label: "Karyawan",
        icon: "👨‍🍳",

        // Sprite karyawan di sisi kanan ruangan
        x: 0.952,
        y: 0.475,

        evidence: "employee"
    },

    {
        id: "blackboard",
        label: "Papan Menu",
        icon: "📋",

        // Area papan menu di atas konter pelayanan
        x: 0.425,
        y: 0.135,

        evidence: "sales"
    },

    {
        id: "kitchen",
        label: "Dapur",
        icon: "🚪",

        // Area persiapan di dapur
        x: 0.650,
        y: 0.370,

        evidence: "kitchen_photo"
    },

    {
        id: "cashier",
        label: "Kasir",
        icon: "💰",

        // Area mesin kasir
        x: 0.505,
        y: 0.295,

        evidence: "receipt"
    }

];

export default ROOM1_OBJECTS;