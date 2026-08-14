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

    }


    getRoom() {

        return this.currentRoom;

    }


    // =====================================================
    // NOTEBOOK
    // =====================================================

    calculateNotebookScore(
        answers,
        correctAnswers
    ) {

        let points = 0;

        Object.keys(correctAnswers).forEach(
            questionId => {

                if (
                    answers[questionId] ===
                    correctAnswers[questionId]
                ) {

                    points += 10;

                }

            }
        );


        this.score += points;

        this.notebookSubmitted = true;


        console.log(
            `Notebook score: +${points}`
        );

        console.log(
            `Total score: ${this.score}`
        );


        return points;

    }


    isNotebookSubmitted() {

        return this.notebookSubmitted;

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

    }


    // =====================================================
    // ASSESSMENT
    // =====================================================

    evaluate(answer) {

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


        const correct =
            answer ===
            this.correctRecommendation;


        let points = 0;


        if (correct) {

            points = 50;

            this.score += points;

        }


        this.assessmentSubmitted = true;


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


        return {

            correct,

            score: points,

            explanation:
                this.assessmentExplanation

        };

    }


    isAssessmentSubmitted() {

        return this.assessmentSubmitted;

    }


    markAssessmentSubmitted() {

        this.assessmentSubmitted = true;

    }

}