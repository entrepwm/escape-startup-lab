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
        // CURRENT ASSESSMENT CONFIG
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

        const safePoints =
            Number(points) || 0;


        this.score +=
            safePoints;


        console.log(

            `Added ${safePoints} points. Total: ${this.score}`

        );


        return this.score;

    }


    // =====================================================
    // ROOM
    // =====================================================

    setRoom(roomNumber) {

        this.currentRoom =
            roomNumber;


        // Reset room-specific state
        this.notebookSubmitted =
            false;


        this.assessmentSubmitted =
            false;


        this.correctRecommendation =
            null;


        this.assessmentExplanation =
            "";


        console.log(

            `ScoreManager entered Room ${roomNumber}`

        );

    }


    getRoom() {

        return this.currentRoom;

    }


    // =====================================================
    // ROOM SCORE BREAKDOWN
    // =====================================================

    getRoomScore(roomNumber) {

        if (
            !this.roomScores[
                roomNumber
            ]
        ) {

            return {

                notebook: 0,

                assessment: 0

            };

        }


        return this.roomScores[
            roomNumber
        ];

    }


    getNotebookScore(roomNumber) {

        if (
            !this.roomScores[
                roomNumber
            ]
        ) {

            return 0;

        }


        return this.roomScores[
            roomNumber
        ].notebook;

    }


    getAssessmentScore(roomNumber) {

        if (
            !this.roomScores[
                roomNumber
            ]
        ) {

            return 0;

        }


        return this.roomScores[
            roomNumber
        ].assessment;

    }


    getTotalRoomScore(roomNumber) {

        if (
            !this.roomScores[
                roomNumber
            ]
        ) {

            return 0;

        }


        const room =
            this.roomScores[
                roomNumber
            ];


        return (

            room.notebook +
            room.assessment

        );

    }


    // =====================================================
    // NOTEBOOK
    // =====================================================

    calculateNotebookScore(
        answers,
        correctAnswers
    ) {

        // Prevent duplicate scoring
        if (
            this.notebookSubmitted
        ) {

            console.warn(

                `Room ${this.currentRoom} notebook already submitted.`

            );


            return this.getNotebookScore(
                this.currentRoom
            );

        }


        let points = 0;


        Object.keys(
            correctAnswers
        ).forEach(

            questionId => {

                if (

                    answers[
                        questionId
                    ] ===
                    correctAnswers[
                        questionId
                    ]

                ) {

                    points += 10;

                }

            }

        );


        // =================================================
        // ADD TOTAL SCORE
        // =================================================

        this.score +=
            points;


        // =================================================
        // RECORD ROOM SCORE
        // =================================================

        if (
            this.roomScores[
                this.currentRoom
            ]
        ) {

            this.roomScores[
                this.currentRoom
            ].notebook =
                points;

        }


        this.notebookSubmitted =
            true;


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
            explanation || "";


        console.log(

            `Assessment configured for Room ${this.currentRoom}`

        );

    }


    // =====================================================
    // ASSESSMENT
    // =====================================================

    evaluate(answer) {

        // -------------------------------------------------
        // Prevent duplicate assessment scoring
        // -------------------------------------------------

        if (
            this.assessmentSubmitted
        ) {

            console.warn(

                `Room ${this.currentRoom} assessment already submitted.`

            );


            return {

                correct:
                    answer ===
                    this.correctRecommendation,

                score: 0,

                explanation:
                    this.assessmentExplanation

            };

        }


        // -------------------------------------------------
        // Validate configuration
        // -------------------------------------------------

        if (
            !this.correctRecommendation
        ) {

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


        // -------------------------------------------------
        // Check answer
        // -------------------------------------------------

        const correct =

            answer ===
            this.correctRecommendation;


        let points = 0;


        // -------------------------------------------------
        // Award points
        // -------------------------------------------------

        if (correct) {

            points = 50;


            this.score +=
                points;

        }


        // -------------------------------------------------
        // Record room assessment score
        // -------------------------------------------------

        if (
            this.roomScores[
                this.currentRoom
            ]
        ) {

            this.roomScores[
                this.currentRoom
            ].assessment =
                points;

        }


        this.assessmentSubmitted =
            true;


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

        this.assessmentSubmitted =
            true;

    }


    // =====================================================
    // RESET GAME
    // =====================================================

    reset() {

        this.score = 0;


        this.currentRoom = 1;


        this.notebookSubmitted =
            false;


        this.assessmentSubmitted =
            false;


        this.correctRecommendation =
            null;


        this.assessmentExplanation =
            "";


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