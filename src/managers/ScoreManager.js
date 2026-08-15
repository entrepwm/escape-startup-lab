export default class ScoreManager {

    constructor() {

        // =====================================================
        // TOTAL GAME SCORE
        // =====================================================

        this.score = 0;


        // =====================================================
        // CURRENT ROOM
        // =====================================================

        this.currentRoom = 1;


        // =====================================================
        // NOTEBOOK STATUS
        // =====================================================

        this.notebookSubmitted = false;


        // =====================================================
        // NOTEBOOK CORRECT ANSWERS
        // =====================================================

        this.notebookCorrectAnswers = {};


        // =====================================================
        // ASSESSMENT STATUS
        // =====================================================

        this.assessmentSubmitted = false;


        // =====================================================
        // CURRENT ASSESSMENT
        // =====================================================

        this.correctRecommendation = null;

        this.assessmentExplanation = "";

    }


    // =====================================================
    // SCORE
    // =====================================================

    getScore() {

        return this.score;

    }


    addPoints(points) {

        if (typeof points !== "number") {

            console.warn(
                "addPoints() received a non-number:",
                points
            );

            return this.score;

        }

        this.score += points;

        console.log(
            `Added ${points} points. Total: ${this.score}`
        );

        return this.score;

    }


    // =====================================================
    // ROOM
    // =====================================================

    setRoom(roomNumber) {

        this.currentRoom = roomNumber;

        // Reset room-specific progress
        this.notebookSubmitted = false;

        this.assessmentSubmitted = false;

        this.correctRecommendation = null;

        this.assessmentExplanation = "";

        this.notebookCorrectAnswers = {};

        console.log(
            `ScoreManager switched to Room ${roomNumber}`
        );

    }


    getRoom() {

        return this.currentRoom;

    }


    // =====================================================
    // NOTEBOOK CONFIGURATION
    // =====================================================

    setNotebookCorrectAnswers(correctAnswers) {

        if (
            !correctAnswers ||
            typeof correctAnswers !== "object"
        ) {

            console.warn(
                "Invalid notebook correct answers."
            );

            this.notebookCorrectAnswers = {};

            return;

        }

        this.notebookCorrectAnswers = {
            ...correctAnswers
        };

        console.log(
            "Notebook correct answers configured:",
            this.notebookCorrectAnswers
        );

    }


    // =====================================================
    // NOTEBOOK
    // =====================================================

    calculateNotebookScore(
        answers,
        correctAnswers = null
    ) {

        // -----------------------------------------------------
        // Safety check
        // -----------------------------------------------------

        if (
            !answers ||
            typeof answers !== "object"
        ) {

            console.error(
                "Notebook scoring failed: answers are missing."
            );

            return 0;

        }


        // -----------------------------------------------------
        // Determine correct answers
        //
        // Priority:
        // 1. correctAnswers passed directly
        // 2. answers configured previously through
        //    setNotebookCorrectAnswers()
        // -----------------------------------------------------

        let answerKey = correctAnswers;

        if (
            !answerKey ||
            typeof answerKey !== "object"
        ) {

            answerKey = this.notebookCorrectAnswers;

        }


        // -----------------------------------------------------
        // If there are no correct answers configured,
        // do NOT crash the game.
        // -----------------------------------------------------

        if (
            !answerKey ||
            typeof answerKey !== "object" ||
            Object.keys(answerKey).length === 0
        ) {

            console.warn(
                "No notebook correct answers configured."
            );

            console.warn(
                "Answers received:",
                answers
            );

            // Still mark notebook as submitted so the game
            // does not become permanently locked.

            this.notebookSubmitted = true;

            return 0;

        }


        // -----------------------------------------------------
        // Calculate score
        // -----------------------------------------------------

        let points = 0;

        const questionIds =
            Object.keys(answerKey);


        questionIds.forEach(
            questionId => {

                const playerAnswer =
                    answers[questionId];

                const correctAnswer =
                    answerKey[questionId];


                // -------------------------------------------------
                // Normal answer comparison
                // -------------------------------------------------

                if (
                    playerAnswer ===
                    correctAnswer
                ) {

                    points += 10;

                }

            }
        );


        // -----------------------------------------------------
        // Add points to total score
        // -----------------------------------------------------

        this.score += points;


        // -----------------------------------------------------
        // Mark notebook as submitted
        // -----------------------------------------------------

        this.notebookSubmitted = true;


        // -----------------------------------------------------
        // Console information
        // -----------------------------------------------------

        console.log(
            `Notebook score: +${points}`
        );

        console.log(
            `Questions evaluated: ${questionIds.length}`
        );

        console.log(
            `Total score: ${this.score}`
        );


        return points;

    }


    // =====================================================
    // NOTEBOOK STATUS
    // =====================================================

    isNotebookSubmitted() {

        return this.notebookSubmitted;

    }


    // =====================================================
    // FORCE NOTEBOOK SUBMISSION
    // =====================================================

    markNotebookSubmitted() {

        this.notebookSubmitted = true;

    }


    // =====================================================
    // ASSESSMENT CONFIGURATION
    // =====================================================

    setAssessment(
        correctRecommendation,
        explanation
    ) {

        this.correctRecommendation =
            correctRecommendation;

        this.assessmentExplanation =
            explanation;

        console.log(
            "Assessment configured:",
            correctRecommendation
        );

    }


    // =====================================================
    // ASSESSMENT
    // =====================================================

    evaluate(answer) {

        // -----------------------------------------------------
        // Safety check
        // -----------------------------------------------------

        if (!this.correctRecommendation) {

            console.warn(
                "No assessment answer configured."
            );

            return {

                correct: false,

                score: 0,

                explanation:
                    "Assessment configuration is missing."

            };

        }


        // -----------------------------------------------------
        // Check answer
        // -----------------------------------------------------

        const correct =
            answer ===
            this.correctRecommendation;


        let points = 0;


        // -----------------------------------------------------
        // Award points
        // -----------------------------------------------------

        if (correct) {

            points = 50;

            this.score += points;

        }


        // -----------------------------------------------------
        // Mark assessment submitted
        // -----------------------------------------------------

        this.assessmentSubmitted = true;


        // -----------------------------------------------------
        // Console information
        // -----------------------------------------------------

        console.log(
            `Assessment answer: ${answer}`
        );

        console.log(
            `Correct: ${correct}`
        );

        console.log(
            `Assessment points: +${points}`
        );

        console.log(
            `Total score: ${this.score}`
        );


        // -----------------------------------------------------
        // Return result
        // -----------------------------------------------------

        return {

            correct,

            score: points,

            explanation:
                this.assessmentExplanation

        };

    }


    // =====================================================
    // ASSESSMENT STATUS
    // =====================================================

    isAssessmentSubmitted() {

        return this.assessmentSubmitted;

    }


    // =====================================================
    // FORCE ASSESSMENT SUBMISSION
    // =====================================================

    markAssessmentSubmitted() {

        this.assessmentSubmitted = true;

    }

}