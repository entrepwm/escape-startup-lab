const ROOM2_NOTEBOOK = [

    // =====================================================
    // Q1 — CUSTOMER INTERVIEW
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

        correctAnswer: "Generally Good"
    },


    // =====================================================
    // Q2 — CUSTOMER SURVEY
    // =====================================================

    {
        id: "survey_food_quality",

        question:
            "According to the customer survey, what percentage of respondents gave the food a 4-star or 5-star rating?",

        type: "radio",

        options: [
            "52%",
            "72%",
            "82%",
            "92%"
        ],

        correctAnswer: "82%"
    },


    // =====================================================
    // Q3 — SERVICE SPEED
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

        correctAnswer: "Slow service speed"
    },


    // =====================================================
    // Q4 — ONLINE REVIEWS
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
    // Q6 — CONNECTING EVIDENCE
    // =====================================================

    {
        id: "evidence_connection",

        question:
            "What conclusion is best supported when customer reviews are compared with the sales dashboard?",

        type: "radio",

        options: [
            "Customers mainly dislike the food",
            "Long waiting times are particularly problematic during busy periods",
            "The restaurant needs more advertising",
            "Customers are primarily concerned about pricing"
        ],

        correctAnswer:
            "Long waiting times are particularly problematic during busy periods"
    },


    // =====================================================
    // Q7 — MANAGER'S CLAIM
    // =====================================================

    {
        id: "manager_claim",

        question:
            "The manager believes that pricing is the restaurant's main problem. How should this claim be evaluated?",

        type: "radio",

        options: [
            "Accept it immediately because the manager knows the business",
            "Reject it immediately because managers are always biased",
            "Compare it with customer and operational evidence",
            "Ignore all internal opinions"
        ],

        correctAnswer:
            "Compare it with customer and operational evidence"
    },


    // =====================================================
    // Q8 — CONFLICTING EVIDENCE
    // =====================================================

    {
        id: "conflicting_evidence",

        question:
            "The manager recommends discounts, but customers frequently complain about waiting time. What is the most appropriate interpretation?",

        type: "radio",

        options: [
            "Discounts are definitely the best solution",
            "Waiting time should be ignored because discounts attract customers",
            "The proposed solution may not address the main problem identified by the evidence",
            "Customer feedback should always be ignored"
        ],

        correctAnswer:
            "The proposed solution may not address the main problem identified by the evidence"
    },


    // =====================================================
    // Q9 — PRIORITIZATION
    // =====================================================

    {
        id: "priority_problem",

        question:
            "If the restaurant can address only ONE issue immediately, which should receive priority based on the evidence?",

        type: "radio",

        options: [
            "Food quality",
            "Restaurant atmosphere",
            "Service speed during peak periods",
            "Advertising budget"
        ],

        correctAnswer:
            "Service speed during peak periods"
    },


    // =====================================================
    // Q10 — FINAL BUSINESS JUDGMENT
    // =====================================================

    {
        id: "best_action",

        question:
            "Which action is most strongly supported by the evidence collected in Room 2?",

        type: "radio",

        options: [
            "Increase promotional discounts during peak periods",
            "Increase advertising to attract more customers",
            "Improve service capacity and reduce waiting time during peak periods",
            "Replace the restaurant's menu entirely"
        ],

        correctAnswer:
            "Improve service capacity and reduce waiting time during peak periods"
    }

];

export default ROOM2_NOTEBOOK;