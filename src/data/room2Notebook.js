const ROOM2_NOTEBOOK = [

    // =====================================================
    // Q1 — CUSTOMER INTERVIEWS
    // =====================================================

    {
        id: "customer_experience",

        question:
            "Based on the customer interviews, what do customers generally think about the restaurant's food?",

        type: "radio",

        options: [
            "Mostly Poor",
            "Mostly Average",
            "Generally Good",
            "Very Poor"
        ],

        correctAnswer:
            "Generally Good"
    },

    // =====================================================
    // Q2 — CUSTOMER SATISFACTION
    // =====================================================

    {
        id: "survey_satisfaction",

        question:
            "According to the customer survey, what percentage of respondents reported being satisfied with their overall experience?",

        type: "radio",

        options: [
            "24%",
            "62%",
            "61%",
            "85%"
        ],

        correctAnswer:
            "62%"
    },


    // =====================================================
    // Q3 — SERVICE PROBLEM
    // =====================================================

    {
        id: "service_problem",

        question:
            "Which problem is most strongly supported by the customer survey?",

        type: "radio",

        options: [
            "Poor food quality",
            "Slow service speed",
            "Unfriendly employees",
            "High prices"
        ],

        correctAnswer:
            "Slow service speed"
    },


    // =====================================================
    // Q4 — ONLINE REVIEW PATTERN
    // =====================================================

    {
        id: "review_pattern",

        question:
            "What recurring pattern can be identified from the online reviews?",

        type: "radio",

        options: [
            "Customers dislike the restaurant's atmosphere",
            "Customers think the food is consistently poor",
            "Customers generally like the food but complain about waiting time",
            "Customers believe the restaurant is too expensive"
        ],

        correctAnswer:
            "Customers generally like the food but complain about waiting time"
    },


    // =====================================================
    // Q5 — SALES DASHBOARD
    // =====================================================

    {
        id: "peak_waiting_time",

        question:
            "According to the sales dashboard, when is the restaurant's waiting time the highest?",

        type: "radio",

        options: [
            "Monday morning",
            "Weekday lunch",
            "Friday evening during peak hours",
            "Weekend morning"
        ],

        correctAnswer:
            "Friday evening during peak hours"
    },


    // =====================================================
    // Q6 — CONNECTING MULTIPLE SOURCES
    // =====================================================

    {
        id: "evidence_connection",

        question:
            "What conclusion is best supported when customer reviews are compared with the sales dashboard?",

        type: "radio",

        options: [
            "Customers mainly dislike the food",
            "Long waiting times are especially problematic during busy periods",
            "The restaurant needs more advertising",
            "Customers are primarily concerned about pricing"
        ],

        correctAnswer:
            "Long waiting times are especially problematic during busy periods"
    },


    // =====================================================
    // Q7 — MANAGER CLAIM
    // =====================================================

    {
        id: "manager_claim",

        question:
            "The manager believes pricing is the restaurant's main problem. What is the best way to evaluate this claim?",

        type: "radio",

        options: [
            "Accept it because the manager has authority",
            "Reject it because managers may be biased",
            "Compare it against customer and operational evidence",
            "Ignore internal opinions entirely"
        ],

        correctAnswer:
            "Compare it against customer and operational evidence"
    },


    // =====================================================
    // Q8 — ENTREPRENEURSHIP: ASSUMPTION TESTING
    // =====================================================

    {
        id: "assumption_testing",

        question:
            "An entrepreneur believes customers are leaving because prices are too high. What is the strongest next step?",

        type: "radio",

        options: [
            "Immediately reduce prices",
            "Collect evidence to test whether price is actually causing customers to leave",
            "Increase advertising before investigating further",
            "Copy a competitor's pricing strategy"
        ],

        correctAnswer:
            "Collect evidence to test whether price is actually causing customers to leave"
    },


    // =====================================================
    // Q9 — ENTREPRENEURSHIP: PRODUCT-MARKET FIT
    // =====================================================

    {
        id: "product_market_fit",

        question:
            "Which situation is the strongest indication that a business may be moving toward product-market fit?",

        type: "radio",

        options: [
            "The founder personally likes the product",
            "Customers repeatedly choose the offering because it solves an important problem for them",
            "The business has a visually attractive logo",
            "The company spends heavily on promotion"
        ],

        correctAnswer:
            "Customers repeatedly choose the offering because it solves an important problem for them"
    },


    // =====================================================
    // Q10 — ENTREPRENEURSHIP: OPPORTUNITY COST
    // =====================================================

    {
        id: "opportunity_cost",

        question:
            "A small business can either spend its limited budget on advertising or on improving service capacity. What does opportunity cost mean in this decision?",

        type: "radio",

        options: [
            "The total amount of money the business owns",
            "The value of the best alternative the business gives up when choosing one option",
            "The cost of hiring additional employees",
            "The amount customers are willing to pay"
        ],

        correctAnswer:
            "The value of the best alternative the business gives up when choosing one option"
    },


    // =====================================================
    // Q11 — ENTREPRENEURSHIP: SCALABILITY
    // =====================================================

    {
        id: "scalability",

        question:
            "Which improvement would best support scalability in a restaurant experiencing peak-hour delays?",

        type: "radio",

        options: [
            "Depend more heavily on one highly skilled employee",
            "Create repeatable processes that allow the team to handle higher demand efficiently",
            "Offer more menu items regardless of kitchen capacity",
            "Increase demand before fixing operational bottlenecks"
        ],

        correctAnswer:
            "Create repeatable processes that allow the team to handle higher demand efficiently"
    },


    // =====================================================
    // Q12 — ENTREPRENEURSHIP: DATA-DRIVEN DECISION MAKING
    // =====================================================

    {
        id: "data_driven_decision",

        question:
            "Which statement best reflects data-driven entrepreneurial decision making?",

        type: "radio",

        options: [
            "Always follow the largest data source even if it conflicts with the business context",
            "Use evidence from multiple relevant sources while applying entrepreneurial judgment",
            "Avoid qualitative information because only numerical data is reliable",
            "Follow management opinion whenever data is unclear"
        ],

        correctAnswer:
            "Use evidence from multiple relevant sources while applying entrepreneurial judgment"
    }

];


export default ROOM2_NOTEBOOK;