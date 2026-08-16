const ROOM1_NOTEBOOK = [

    // =====================================================
    // Q1 — CUSTOMER SATISFACTION
    // =====================================================

    {
        id: "customer_satisfaction",

        question:
            "Based on the evidence collected in the restaurant, how would you describe overall customer satisfaction?",

        type: "radio",

        options: [
            "Mostly Positive",
            "Mixed",
            "Mostly Negative",
            "Completely Negative"
        ],

        correctAnswer: "Mixed"
    },


    // =====================================================
    // Q2 — FOOD QUALITY
    // =====================================================

    {
        id: "food_quality",

        question:
            "What conclusion about food quality is most strongly supported by the available evidence?",

        type: "radio",

        options: [
            "Customers generally consider the food quality good",
            "Food quality is the restaurant's main problem",
            "Most customers dislike the menu",
            "The food is consistently poor"
        ],

        correctAnswer:
            "Customers generally consider the food quality good"
    },


    // =====================================================
    // Q3 — SERVICE SPEED
    // =====================================================

    {
        id: "service_speed",

        question:
            "Which operational weakness appears most consistently across the available evidence?",

        type: "radio",

        options: [
            "Poor kitchen hygiene",
            "Slow service and long waiting times",
            "Unfriendly employees",
            "Lack of menu variety"
        ],

        correctAnswer:
            "Slow service and long waiting times"
    },


    // =====================================================
    // Q4 — MAIN BUSINESS PROBLEM
    // =====================================================

    {
        id: "main_problem",

        question:
            "What appears to be the restaurant's most important immediate business problem?",

        type: "radio",

        options: [
            "Food quality",
            "Service speed",
            "Brand awareness",
            "Restaurant decoration"
        ],

        correctAnswer:
            "Service speed"
    },


    // =====================================================
    // Q5 — PRIORITIZATION
    // =====================================================

    {
        id: "customer_priority",

        question:
            "If the restaurant can improve only ONE area first, which action is best supported by the evidence?",

        type: "radio",

        options: [
            "Redesign the entire menu",
            "Improve service speed and reduce waiting time",
            "Spend more money on advertising",
            "Increase prices to reduce demand"
        ],

        correctAnswer:
            "Improve service speed and reduce waiting time"
    },


    // =====================================================
    // Q6 — EVIDENCE QUALITY
    // =====================================================

    {
        id: "evidence_quality",

        question:
            "Which approach gives the strongest basis for identifying the restaurant's real business problem?",

        type: "radio",

        options: [
            "Rely only on the manager's opinion",
            "Use only customer comments",
            "Compare multiple sources of customer and operational evidence",
            "Choose the issue that is easiest to fix"
        ],

        correctAnswer:
            "Compare multiple sources of customer and operational evidence"
    },


    // =====================================================
    // Q7 — ENTREPRENEURSHIP: VALUE PROPOSITION
    // =====================================================

    {
        id: "value_proposition",

        question:
            "In entrepreneurship, what is a value proposition?",

        type: "radio",

        options: [
            "A description of why customers should choose a product or service",
            "The total amount of money invested in a business",
            "A list of all employees in the company",
            "A record of all business expenses"
        ],

        correctAnswer:
            "A description of why customers should choose a product or service"
    },


    // =====================================================
    // Q8 — ENTREPRENEURSHIP: PROBLEM VALIDATION
    // =====================================================

    {
        id: "problem_validation",

        question:
            "Before investing heavily in solving a business problem, what should an entrepreneur do first?",

        type: "radio",

        options: [
            "Immediately build the solution",
            "Validate the problem using evidence from customers and operations",
            "Copy the biggest competitor",
            "Spend most of the budget on advertising"
        ],

        correctAnswer:
            "Validate the problem using evidence from customers and operations"
    },


    // =====================================================
    // Q9 — ENTREPRENEURSHIP: CUSTOMER SEGMENT
    // =====================================================

    {
        id: "customer_segment",

        question:
            "What is a customer segment?",

        type: "radio",

        options: [
            "A specific group of customers with similar needs or characteristics",
            "The physical location of a business",
            "The total number of employees in a company",
            "A list of competitors in the market"
        ],

        correctAnswer:
            "A specific group of customers with similar needs or characteristics"
    },


    // =====================================================
    // Q10 — ENTREPRENEURSHIP: OPPORTUNITY RECOGNITION
    // =====================================================

    {
        id: "opportunity_recognition",

        question:
            "Which situation best represents an entrepreneurial opportunity?",

        type: "radio",

        options: [
            "A recurring customer problem that can be solved in a valuable and sustainable way",
            "Any idea that sounds creative",
            "A product that has no identified customer need",
            "A business decision based only on intuition"
        ],

        correctAnswer:
            "A recurring customer problem that can be solved in a valuable and sustainable way"
    }

];


export default ROOM1_NOTEBOOK;