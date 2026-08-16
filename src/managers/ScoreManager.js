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
        // ROOM SCORE BREAKDOWN
        // =====================================================

        this.roomScores = {

            1: {
                notebook: 0,
                assessment: 0
            },

            2: {
                notebook: 0,
                assessment: 0
            },

            3: {
                notebook: 0,
                assessment: 0
            }

        };


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
    // ROOM SCORE BREAKDOWN
    // =====================================================

    getRoomScore(roomNumber) {

        if (!this.roomScores[roomNumber]) {

            return {
                notebook: 0,
                assessment: 0
            };

        }

        return this.roomScores[roomNumber];

    }


    getNotebookScore(roomNumber) {

        if (!this.roomScores[roomNumber]) {
            return 0;
        }

        return this.roomScores[roomNumber].notebook;

    }


    getAssessmentScore(roomNumber) {

        if (!this.roomScores[roomNumber]) {
            return 0;
        }

        return this.roomScores[roomNumber].assessment;

    }


    getTotalRoomScore(roomNumber) {

        if (!this.roomScores[roomNumber]) {
            return 0;
        }

        return (
            this.roomScores[roomNumber].notebook +
            this.roomScores[roomNumber].assessment
        );

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


        // Add to total score

        this.score += points;


        // Record score for current room

        if (this.roomScores[this.currentRoom]) {

            this.roomScores[
                this.currentRoom
            ].notebook = points;

        }


        this.notebookSubmitted = true;


        console.log(
            `Room ${this.currentRoom} Notebook score: +${points}`
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


        // Record assessment score

        if (this.roomScores[this.currentRoom]) {

            this.roomScores[
                this.currentRoom
            ].assessment = points;

        }


        this.assessmentSubmitted = true;


        console.log(
            `Room ${this.currentRoom} Assessment answer: ${answer}`
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


    // =====================================================
    // RESET GAME
    // =====================================================

    reset() {

        this.score = 0;

        this.currentRoom = 1;

        this.notebookSubmitted = false;

        this.assessmentSubmitted = false;

        this.correctRecommendation = null;

        this.assessmentExplanation = "";


        this.roomScores = {

            1: {
                notebook: 0,
                assessment: 0
            },

            2: {
                notebook: 0,
                assessment: 0
            },

            3: {
                notebook: 0,
                assessment: 0
            }

        };


        console.log(
            "ScoreManager reset."
        );

    }

}