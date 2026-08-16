const ROOM2_NOTEBOOK = [

    // =====================================================
    // Q1 — FOOD QUALITY: AGGREGATING DATA
    // =====================================================

    {
        id: "food_positive_rating",

        question:
            "In the customer survey, what percentage of respondents rated food quality either 4 or 5 stars?",

        type: "radio",

        options: [
            "72%",
            "82%",
            "92%",
            "98%"
        ],

        correctAnswer:
            "92%"
    },


    // =====================================================
    // Q2 — SERVICE SPEED: NEGATIVE RATINGS
    // =====================================================

    {
        id: "service_negative_rating",

        question:
            "What percentage of respondents rated service speed only 1 or 2 stars?",

        type: "radio",

        options: [
            "25%",
            "30%",
            "45%",
            "50%"
        ],

        correctAnswer:
            "50%"
    },


    // =====================================================
    // Q3 — QUANTITATIVE GAP
    // =====================================================

    {
        id: "quality_service_gap",

        question:
            "Food quality receives 92% positive ratings (4–5 stars), while service speed receives only 25% positive ratings. What is the percentage-point gap between these two measures?",

        type: "radio",

        options: [
            "50 percentage points",
            "57 percentage points",
            "67 percentage points",
            "75 percentage points"
        ],

        correctAnswer:
            "67 percentage points"
    },


    // =====================================================
    // Q4 — OVERALL SATISFACTION
    // =====================================================

    {
        id: "overall_satisfaction",

        question:
            "According to the customer survey, what proportion of respondents are NOT classified as satisfied overall?",

        type: "radio",

        options: [
            "15%",
            "24%",
            "39%",
            "61%"
        ],

        correctAnswer:
            "39%"
    },


    // =====================================================
    // Q5 — TRANSACTION GROWTH
    // =====================================================

    {
        id: "weekend_transaction_growth",

        question:
            "Average transactions increase from 85 on weekdays to 140 on weekends. Approximately how much higher are weekend transactions compared with weekdays?",

        type: "radio",

        options: [
            "About 35%",
            "About 50%",
            "About 65%",
            "About 85%"
        ],

        correctAnswer:
            "About 65%"
    },


    // =====================================================
    // Q6 — WAITING-TIME GROWTH
    // =====================================================

    {
        id: "weekend_wait_growth",

        question:
            "Average waiting time increases from 18 minutes on weekdays to 41 minutes on weekends. Approximately how much does waiting time increase relative to the weekday level?",

        type: "radio",

        options: [
            "About 28%",
            "About 64%",
            "About 100%",
            "About 128%"
        ],

        correctAnswer:
            "About 128%"
    },


    // =====================================================
    // Q7 — DEMAND VS. SERVICE CAPACITY
    // =====================================================

    {
        id: "demand_capacity_relationship",

        question:
            "Weekend transactions are about 65% higher than weekday transactions, but average waiting time is about 128% higher. What is the strongest interpretation of this pattern?",

        type: "radio",

        options: [
            "Service capacity appears to be scaling faster than customer demand",
            "Waiting time is unrelated to transaction volume",
            "Service capacity appears unable to keep pace with higher demand",
            "The restaurant should increase demand further before changing operations"
        ],

        correctAnswer:
            "Service capacity appears unable to keep pace with higher demand"
    },


    // =====================================================
    // Q8 — PEAK-PERIOD COMPARISON
    // =====================================================

    {
        id: "peak_wait_comparison",

        question:
            "Friday evening peak waiting time is 47 minutes, compared with a weekend average of 41 minutes. Approximately how much higher is the peak waiting time than the weekend average?",

        type: "radio",

        options: [
            "About 6%",
            "About 15%",
            "About 26%",
            "About 41%"
        ],

        correctAnswer:
            "About 15%"
    },


    // =====================================================
    // Q9 — CUSTOMER SPEND VS. WAITING TIME
    // =====================================================

    {
        id: "spend_wait_comparison",

        question:
            "Average customer spend rises from Rp82K on weekdays to Rp91K on weekends, while waiting time rises from 18 to 41 minutes. Which conclusion is best supported by these numbers?",

        type: "radio",

        options: [
            "Higher spending fully compensates customers for much longer waiting times",
            "Customer spend rises only modestly while waiting time increases dramatically",
            "Customers spend less whenever the restaurant becomes busier",
            "The data prove that price is the main source of dissatisfaction"
        ],

        correctAnswer:
            "Customer spend rises only modestly while waiting time increases dramatically"
    },


    // =====================================================
    // Q10 — MANAGER HYPOTHESIS VS. EVIDENCE
    // =====================================================

    {
        id: "manager_hypothesis_test",

        question:
            "The manager believes pricing is the main problem and proposes discounts. Which combination of evidence most strongly challenges that hypothesis?",

        type: "radio",

        options: [
            "61% overall satisfaction combined with higher weekend spending",
            "92% positive food-quality ratings, 50% low service-speed ratings, and peak waiting times of 47 minutes",
            "The restaurant has competitors and customers sometimes visit with friends",
            "Weekend spending is Rp91K and weekday spending is Rp82K"
        ],

        correctAnswer:
            "92% positive food-quality ratings, 50% low service-speed ratings, and peak waiting times of 47 minutes"
    },


    // =====================================================
    // Q11 — ENTREPRENEURSHIP: CONSTRAINT / BOTTLENECK ANALYSIS
    // =====================================================

    {
        id: "bottleneck_analysis",

        question:
            "Suppose management can improve only one part of the business immediately. Based on the evidence, which decision best reflects bottleneck-oriented resource allocation?",

        type: "radio",

        options: [
            "Increase advertising because demand growth should always be prioritized",
            "Reduce menu prices because lower prices automatically improve customer experience",
            "Invest in service or operational capacity because waiting time deteriorates sharply as demand rises",
            "Expand the menu because variety is more strategically important than throughput"
        ],

        correctAnswer:
            "Invest in service or operational capacity because waiting time deteriorates sharply as demand rises"
    },


    // =====================================================
    // Q12 — ENTREPRENEURSHIP: EVIDENCE-BASED OPPORTUNITY
    // =====================================================

    {
        id: "opportunity_evaluation",

        question:
            "Which statement best describes the entrepreneurial opportunity revealed by the Room 2 evidence?",

        type: "radio",

        options: [
            "The main opportunity is to create demand because current customer interest is too low",
            "The main opportunity is to improve the restaurant's ability to convert strong product demand into a faster, more reliable customer experience",
            "The main opportunity is to reposition the restaurant around lower food quality and lower prices",
            "The main opportunity is to copy competitor promotions without testing customer behavior"
        ],

        correctAnswer:
            "The main opportunity is to improve the restaurant's ability to convert strong product demand into a faster, more reliable customer experience"
    }

];


export default ROOM2_NOTEBOOK;