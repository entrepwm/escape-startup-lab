const ROOM1_OBJECTS = [

    {
        id: "customer",
        label: "Customer",
        icon: "🙂",

        // 25.0% across, 77.8% down
        x: 0.2500,
        y: 0.7778,

        evidence: "reviews"
    },

    {
        id: "employee",
        label: "Employee",
        icon: "👨‍🍳",

        // Corrected from the old x:1020 value,
        // which was outside the 900-wide room reference.
        x: 0.9530,
        y: 0.4889,

        evidence: "employee"
    },

    {
        id: "blackboard",
        label: "Blackboard",
        icon: "📋",

        x: 0.5556,
        y: 0.1667,

        evidence: "sales"
    },

    {
        id: "kitchen",
        label: "Kitchen",
        icon: "🚪",

        x: 0.8778,
        y: 0.3556,

        evidence: "kitchen_photo"
    },

    {
        id: "cashier",
        label: "Cashier",
        icon: "💰",

        x: 0.6500,
        y: 0.3667,

        evidence: "receipt"
    }

];

export default ROOM1_OBJECTS;
