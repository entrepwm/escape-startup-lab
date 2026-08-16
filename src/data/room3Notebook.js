const ROOM3_NOTEBOOK = [

    // =====================================================
    // Q1 — INVESTMENT BUDGET
    // =====================================================

    {
        id: "available_budget",

        question:
            "How much investment capital has management approved for the improvement project?",

        type: "radio",

        options: [
            "Rp20,000,000",
            "Rp30,000,000",
            "Rp50,000,000",
            "Rp85,000,000"
        ],

        correctAnswer:
            "Rp50,000,000"
    },


    // =====================================================
    // Q2 — OPERATIONAL BOTTLENECK
    // =====================================================

    {
        id: "main_bottleneck",

        question:
            "According to the operations evidence, what is the restaurant's most important peak-period bottleneck?",

        type: "radio",

        options: [
            "Insufficient marketing reach",
            "Kitchen processing capacity",
            "Restaurant atmosphere",
            "Menu pricing"
        ],

        correctAnswer:
            "Kitchen processing capacity"
    },


    // =====================================================
    // Q3 — STAFF UTILIZATION
    // =====================================================

    {
        id: "staff_utilization",

        question:
            "What happens to staff utilization during peak periods?",

        type: "radio",

        options: [
            "It decreases to approximately 50%",
            "It remains at approximately 68%",
            "It increases to approximately 94%",
            "It remains below 60%"
        ],

        correctAnswer:
            "It increases to approximately 94%"
    },


    // =====================================================
    // Q4 — BOTTLENECK INTERPRETATION
    // =====================================================

    {
        id: "capacity_interpretation",

        question:
            "What does the combination of high staff utilization and long customer waiting times most strongly suggest?",

        type: "radio",

        options: [
            "The restaurant has excessive unused capacity",
            "Demand is exceeding current operational capacity during peak periods",
            "Customers are primarily dissatisfied with food quality",
            "The restaurant should reduce its marketing activity"
        ],

        correctAnswer:
            "Demand is exceeding current operational capacity during peak periods"
    },


    // =====================================================
    // Q5 — CUSTOMER IMPACT
    // =====================================================

    {
        id: "waiting_time",

        question:
            "What is the most direct customer consequence of the restaurant's peak-period capacity constraint?",

        type: "radio",

        options: [
            "Higher food prices",
            "Longer waiting times",
            "Lower advertising exposure",
            "Reduced brand awareness"
        ],

        correctAnswer:
            "Longer waiting times"
    },


    // =====================================================
    // Q6 — STAFFING OPTION
    // =====================================================

    {
        id: "staff_benefit",

        question:
            "Why could hiring additional kitchen employees help address the current bottleneck?",

        type: "radio",

        options: [
            "It directly increases available labor capacity during peak periods",
            "It guarantees lower ingredient costs",
            "It automatically eliminates all waiting time",
            "It reduces the need for operational processes"
        ],

        correctAnswer:
            "It directly increases available labor capacity during peak periods"
    },


    // =====================================================
    // Q7 — EQUIPMENT OPTION
    // =====================================================

    {
        id: "equipment_benefit",

        question:
            "What is the strongest strategic argument for upgrading kitchen equipment?",

        type: "radio",

        options: [
            "It may increase throughput at the identified production bottleneck",
            "It guarantees that customer demand will increase",
            "It eliminates the need for employees",
            "It mainly improves brand awareness"
        ],

        correctAnswer:
            "It may increase throughput at the identified production bottleneck"
    },


    // =====================================================
    // Q8 — TECHNOLOGY LIMITATION
    // =====================================================

    {
        id: "technology_limitation",

        question:
            "Why might an online ordering or queue-management system fail to fully resolve the restaurant's main problem?",

        type: "radio",

        options: [
            "Customers generally refuse to use technology",
            "The systems may improve ordering flow without increasing kitchen processing capacity",
            "Technology investments always reduce profitability",
            "The systems would necessarily increase food prices"
        ],

        correctAnswer:
            "The systems may improve ordering flow without increasing kitchen processing capacity"
    },


    // =====================================================
    // Q9 — EVIDENCE INTEGRATION
    // =====================================================

    {
        id: "evidence_integration",

        question:
            "Considering the operations, HR, and technology evidence together, which conclusion is best supported?",

        type: "radio",

        options: [
            "The core problem is insufficient advertising",
            "The restaurant should focus primarily on lowering prices",
            "The restaurant should prioritize an intervention that increases peak-period throughput",
            "The restaurant should redesign its brand identity before addressing operations"
        ],

        correctAnswer:
            "The restaurant should prioritize an intervention that increases peak-period throughput"
    },


    // =====================================================
    // Q10 — CASE-BASED STRATEGIC PRIORITIZATION
    // =====================================================

    {
        id: "case_priority",

        question:
            "Given the Rp50,000,000 budget constraint, what is the strongest basis for choosing among the available improvement options?",

        type: "radio",

        options: [
            "Choose the option with the lowest initial cost",
            "Choose the most technologically advanced option",
            "Prioritize the option that best addresses the bottleneck while remaining financially and operationally feasible",
            "Select the option preferred by management regardless of evidence"
        ],

        correctAnswer:
            "Prioritize the option that best addresses the bottleneck while remaining financially and operationally feasible"
    },


    // =====================================================
    // Q11 — STRATEGIC DECISION MAKING:
    // MARGINAL VALUE
    // =====================================================

    {
        id: "marginal_value",

        question:
            "When comparing two investment alternatives under a fixed budget, which reasoning best reflects marginal analysis?",

        type: "radio",

        options: [
            "Choose whichever option has the highest total cost because it probably delivers more value",
            "Compare the additional benefit generated by each additional unit of resources committed",
            "Select the alternative with the largest number of features",
            "Ignore incremental benefits and focus only on total expenditure"
        ],

        correctAnswer:
            "Compare the additional benefit generated by each additional unit of resources committed"
    },


    // =====================================================
    // Q12 — STRATEGIC DECISION MAKING:
    // RESOURCE ALLOCATION
    // =====================================================

    {
        id: "resource_allocation",

        question:
            "A firm has several attractive projects but insufficient capital to fund all of them. Which principle should guide strategic resource allocation?",

        type: "radio",

        options: [
            "Allocate resources equally across all projects regardless of expected impact",
            "Fund projects according to strategic relevance, expected value, constraints, and risk",
            "Prioritize projects proposed by the most senior manager",
            "Always select the project with the shortest implementation time"
        ],

        correctAnswer:
            "Fund projects according to strategic relevance, expected value, constraints, and risk"
    },


    // =====================================================
    // Q13 — STRATEGIC DECISION MAKING:
    // STRATEGIC FIT
    // =====================================================

    {
        id: "strategic_fit",

        question:
            "What does strategic fit mean when evaluating an entrepreneurial investment decision?",

        type: "radio",

        options: [
            "The investment is fashionable within the industry",
            "The investment is consistent with the firm's capabilities, priorities, and the problem it is trying to solve",
            "The investment has the highest possible purchase price",
            "The investment can be implemented without collecting evidence"
        ],

        correctAnswer:
            "The investment is consistent with the firm's capabilities, priorities, and the problem it is trying to solve"
    },


    // =====================================================
    // Q14 — STRATEGIC DECISION MAKING:
    // UNCERTAINTY
    // =====================================================

    {
        id: "decision_under_uncertainty",

        question:
            "When expected outcomes are uncertain, which approach is most defensible for an entrepreneur making a major investment decision?",

        type: "radio",

        options: [
            "Assume the most optimistic outcome will occur",
            "Delay every decision until uncertainty disappears completely",
            "Compare plausible outcomes, risks, assumptions, and downside exposure before committing resources",
            "Choose whichever alternative has the most innovative technology"
        ],

        correctAnswer:
            "Compare plausible outcomes, risks, assumptions, and downside exposure before committing resources"
    },


    // =====================================================
    // Q15 — STRATEGIC DECISION MAKING:
    // IMPLEMENTATION RISK
    // =====================================================

    {
        id: "implementation_risk",

        question:
            "Two alternatives have similar expected financial returns, but one requires substantial employee retraining and major workflow changes. Why might management reasonably prefer the other alternative?",

        type: "radio",

        options: [
            "Because strategic decisions should avoid all organizational change",
            "Because implementation complexity and execution risk can reduce the value actually realized from an investment",
            "Because employee training never creates long-term value",
            "Because financial returns are irrelevant when choosing investments"
        ],

        correctAnswer:
            "Because implementation complexity and execution risk can reduce the value actually realized from an investment"
    }

];


export default ROOM3_NOTEBOOK;