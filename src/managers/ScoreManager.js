export default class ScoreManager {

    constructor() {

        // =====================================================
        // COMPETITION INFORMATION
        // =====================================================

        this.teamName =
            "";


        this.runId =
            this.generateRunId();


        this.resultSubmitted =
            false;


        // =====================================================
        // SCORE
        // =====================================================

        this.score =
            0;


        // =====================================================
        // CURRENT ROOM
        // =====================================================

        this.currentRoom =
            1;


        // =====================================================
        // ROOM SCORES
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
        // ROOM STATE
        // =====================================================

        this.notebookSubmitted =
            false;


        this.assessmentSubmitted =
            false;


        this.correctRecommendation =
            null;


        this.assessmentExplanation =
            "";


        // =====================================================
        // GLOBAL 20-MINUTE TIMER
        // =====================================================

        this.gameDuration =
            20 * 60;


        this.timeRemaining =
            this.gameDuration;


        this.timerStarted =
            false;


        this.timerExpired =
            false;

    }


    // =====================================================
    // TEAM
    // =====================================================

    setTeamName(name) {

        this.teamName =
            String(name || "")
                .trim()
                .replace(/\s+/g, " ");

    }


    getTeamName() {

        return this.teamName;

    }


    // =====================================================
    // RUN ID
    // =====================================================

    generateRunId() {

        const random =
            Math.random()
                .toString(36)
                .substring(2, 10);


        return (
            `${Date.now()}-${random}`
        );

    }


    getRunId() {

        return this.runId;

    }


    // =====================================================
    // RESULT SUBMISSION
    // =====================================================

    hasResultBeenSubmitted() {

        return this.resultSubmitted;

    }


    markResultSubmitted() {

        this.resultSubmitted =
            true;

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


        return this.score;

    }


    // =====================================================
    // ROOM
    // =====================================================

    setRoom(roomNumber) {

        this.currentRoom =
            roomNumber;


        this.notebookSubmitted =
            false;


        this.assessmentSubmitted =
            false;


        this.correctRecommendation =
            null;


        this.assessmentExplanation =
            "";

    }


    getRoom() {

        return this.currentRoom;

    }


    // =====================================================
    // ROOM SCORES
    // =====================================================

    getRoomScore(roomNumber) {

        return (

            this.roomScores[
                roomNumber
            ] || {
                notebook: 0,
                assessment: 0
            }

        );

    }


    getNotebookScore(roomNumber) {

        return this.getRoomScore(
            roomNumber
        ).notebook;

    }


    getAssessmentScore(roomNumber) {

        return this.getRoomScore(
            roomNumber
        ).assessment;

    }


    getTotalRoomScore(roomNumber) {

        const room =
            this.getRoomScore(
                roomNumber
            );


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

        if (
            this.notebookSubmitted
        ) {

            return this.getNotebookScore(
                this.currentRoom
            );

        }


        let points =
            0;


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

                    points +=
                        10;

                }

            }
        );


        this.score +=
            points;


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

    }


    // =====================================================
    // ASSESSMENT
    // =====================================================

    evaluate(answer) {

        if (
            this.assessmentSubmitted
        ) {

            return {

                correct:
                    answer ===
                    this.correctRecommendation,

                score:
                    0,

                explanation:
                    this.assessmentExplanation

            };

        }


        if (
            !this.correctRecommendation
        ) {

            return {

                correct:
                    false,

                score:
                    0,

                explanation:
                    "Assessment configuration is missing."

            };

        }


        const correct =

            answer ===
            this.correctRecommendation;


        const points =
            correct
                ? 50
                : 0;


        if (
            correct
        ) {

            this.score +=
                points;

        }


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


        return {

            correct,

            score:
                points,

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
    // GLOBAL TIMER
    // =====================================================

    startGameTimer() {

        if (
            this.timerStarted
        ) {

            return;

        }


        this.timerStarted =
            true;


        this.timerExpired =
            false;

    }


    tickGameTimer() {

        if (
            !this.timerStarted ||
            this.timerExpired
        ) {

            return this.timeRemaining;

        }


        this.timeRemaining--;


        if (
            this.timeRemaining <= 0
        ) {

            this.timeRemaining =
                0;


            this.timerExpired =
                true;

        }


        return this.timeRemaining;

    }


    getTimeRemaining() {

        return Math.max(
            0,
            this.timeRemaining
        );

    }


    getFormattedTime() {

        const remaining =
            this.getTimeRemaining();


        const minutes =
            Math.floor(
                remaining / 60
            );


        const seconds =
            remaining % 60;


        return (

            `${String(minutes).padStart(2, "0")}:` +
            `${String(seconds).padStart(2, "0")}`

        );

    }


    isTimerStarted() {

        return this.timerStarted;

    }


    isTimerExpired() {

        return this.timerExpired;

    }


    getElapsedTime() {

        return (

            this.gameDuration -
            this.timeRemaining

        );

    }


    getFormattedElapsedTime() {

        const elapsed =
            this.getElapsedTime();


        const minutes =
            Math.floor(
                elapsed / 60
            );


        const seconds =
            elapsed % 60;


        return (

            `${String(minutes).padStart(2, "0")}:` +
            `${String(seconds).padStart(2, "0")}`

        );

    }


    resetGameTimer() {

        this.timeRemaining =
            this.gameDuration;


        this.timerStarted =
            false;


        this.timerExpired =
            false;

    }


    // =====================================================
    // COMPETITION RESULT DATA
    // =====================================================

    getCompetitionResult() {

        return {

            runId:
                this.runId,

            teamName:
                this.teamName,

            room1Notebook:
                this.getNotebookScore(1),

            room1Assessment:
                this.getAssessmentScore(1),

            room1Total:
                this.getTotalRoomScore(1),

            room2Notebook:
                this.getNotebookScore(2),

            room2Assessment:
                this.getAssessmentScore(2),

            room2Total:
                this.getTotalRoomScore(2),

            room3Notebook:
                this.getNotebookScore(3),

            room3Assessment:
                this.getAssessmentScore(3),

            room3Total:
                this.getTotalRoomScore(3),

            finalScore:
                this.getScore(),

            timeRemaining:
                this.getFormattedTime(),

            elapsedTime:
                this.getFormattedElapsedTime(),

            timerExpired:
                this.isTimerExpired()

        };

    }


    // =====================================================
    // RESET FULL GAME
    // =====================================================

    reset() {

        this.teamName =
            "";


        this.runId =
            this.generateRunId();


        this.resultSubmitted =
            false;


        this.score =
            0;


        this.currentRoom =
            1;


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


        this.resetGameTimer();


        console.log(
            "ScoreManager reset."
        );

    }

}