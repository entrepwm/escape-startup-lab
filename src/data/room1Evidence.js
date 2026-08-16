const ROOM1_EVIDENCE = [

    {
        id: "reviews",
        title: "Customer Reviews",
        type: "pdf",
        icon: "📄",
        content:
`★★★★★
"The food is delicious but I waited 40 minutes."

★★★★☆
"Excellent taste but service is extremely slow."

★★☆☆☆
"I almost left because nobody came to take my order."`
    },

    {
        id: "sales",
        title: "Sales Report",
        type: "excel",
        icon: "📊",
        content:
`Monthly Sales

Monday .......... 12M

Tuesday ......... 11M

Friday .......... 28M`
    },

    {
        id: "employee",
        title: "Employee Interview",
        type: "document",
        icon: "📝",
        content:
`Kitchen Staff

"There are only two cooks during lunch."

Cashier

"Customers arrive faster than food can be prepared."`
    },

    {
        id: "kitchen_photo",
        title: "Kitchen_Photo.png",
        type: "image",
        icon: "🖼",

    // Placeholder for now
        content:
            
            "• Food quality checks show that most dishes meet the restaurant's standards.\n" +

            "• During normal periods, orders are prepared without major delays.\n" +

            "• During peak periods, the kitchen receives orders faster than staff can complete them.\n" +

            "• Some dishes require several preparation steps, which slows down service when demand is high.\n" +

            "• Staff members often wait for shared equipment or workspace during the busiest periods.\n\n" +

            "Key Insight:\n" +

            "The kitchen appears capable during normal demand, but capacity becomes a bottleneck during peak periods."
    },

    {
        id: "receipt",
        title: "Cashier Transaction Notes",
        icon: "💳",

        content:
            "Cashier Observation\n\n" +

            "• The cashier reports that order queues build quickly during busy periods.\n" +

            "• Customers often ask how long their orders will take before paying.\n" +

            "• Refund requests are uncommon, but complaints about waiting are frequent.\n" +

            "• Average spending per customer remains relatively stable.\n" +

            "• The cashier believes the biggest pressure occurs when several large groups arrive at the same time.\n\n" +

            "Key Insight:\n" +

            "The evidence suggests that the customer experience problem may be linked more strongly to service flow and waiting time than to pricing."
    }

];

export default ROOM1_EVIDENCE;