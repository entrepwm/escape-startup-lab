const ROOM1_NOTEBOOK = [

    {
        id: "customer_satisfaction",

        question:
            "How would you describe overall customer satisfaction?",

        type: "radio",

        options: [
            "Mostly Positive",
            "Mixed",
            "Mostly Negative"
        ],

        correctAnswer: "Mixed"
    },


    {
        id: "food_quality",

        question:
            "How is the food quality?",

        type: "radio",

        options: [
            "Excellent",
            "Average",
            "Poor"
        ],

        correctAnswer: "Excellent"
    },


    {
        id: "service_speed",

        question:
            "How is the service speed?",

        type: "radio",

        options: [
            "Fast",
            "Average",
            "Slow"
        ],

        correctAnswer: "Slow"
    },


    {
        id: "main_problem",

        question:
            "What appears to be the restaurant's biggest issue?",

        type: "radio",

        options: [
            "Food Quality",
            "Service Speed",
            "Marketing",
            "Kitchen Hygiene"
        ],

        correctAnswer: "Service Speed"
    },


    {
        id: "customer_priority",

        question:
            "Based on the evidence, what should the restaurant prioritize first?",

        type: "radio",

        options: [
            "Improve Food Quality",
            "Improve Service Speed",
            "Increase Advertising",
            "Expand the Restaurant"
        ],

        correctAnswer: "Improve Service Speed"
    }

];

export default ROOM1_NOTEBOOK;