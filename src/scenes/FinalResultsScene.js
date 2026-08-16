import Phaser from "phaser";

import CompetitionResultsService
    from "../services/CompetitionResultsService";


export default class FinalResultsScene extends Phaser.Scene {

    constructor() {

        super({
            key: "FinalResultsScene"
        });

    }


    // =====================================================
    // INIT
    // =====================================================

    init(data) {

        this.scoreManager =
            data?.scoreManager ||
            this.game.scoreManager;


        this.submissionStatusText =
            null;


        this.submissionStarted =
            false;

    }


    // =====================================================
    // CREATE
    // =====================================================

    create() {

        // =================================================
        // SAFETY
        // =================================================

        if (
            !this.scoreManager
        ) {

            console.error(
                "FinalResultsScene: ScoreManager is missing."
            );

        }


        // =================================================
        // COMPETITION DATA
        // =================================================

        const finalScore =
            this.scoreManager
                ? this.scoreManager.getScore()
                : 0;


        const teamName =
            this.getTeamName();


        const timeRemaining =
            this.getTimeRemaining();


        const elapsedTime =
            this.getElapsedTime();


        const timerExpired =
            this.getTimerExpired();


        const rating =
            this.getFinalRating(
                finalScore
            );


        const roomScores =
            this.getRoomScores();


        const notebookTotal =

            roomScores[1].notebook +
            roomScores[2].notebook +
            roomScores[3].notebook;


        const assessmentTotal =

            roomScores[1].assessment +
            roomScores[2].assessment +
            roomScores[3].assessment;

        // =================================================
        // AUDIO
        // =================================================

        if (
            this.game.gameMusic
        ) {

            this.game.gameMusic.stop();
            this.game.gameMusic.destroy();

            this.game.gameMusic =
                null;

        }


        if (
            !this.game.finalMusic
        ) {

            this.game.finalMusic =
                this.sound.add(
                    "finalscene-music",
                    {
                loop: false,
                        volume: 0.25
                    }
                );

            this.game.finalMusic.play();

        }

        // =================================================
        // BACKGROUND
        // =================================================

        this.createBackground();


        // =================================================
        // ROOT CONTAINER
        // =================================================

        const centerX =
            this.scale.width / 2;


        const centerY =
            this.scale.height / 2;


        this.resultsContainer =
            this.add.container(
                centerX,
                centerY
            );


        // =================================================
        // RESPONSIVE SCALE
        // =================================================

        const scaleX =
            this.scale.width / 1280;


        const scaleY =
            this.scale.height / 720;


        this.uiScale =
            Math.min(
                scaleX,
                scaleY,
                1
            );


        this.resultsContainer.setScale(
            this.uiScale
        );


        // =================================================
        // OUTER SHADOW
        // =================================================

        const shadow =
            this.add.rectangle(

                8,
                10,

                1000,
                650,

                0x07111f,
                0.55

            );


        this.resultsContainer.add(
            shadow
        );


        // =================================================
        // OUTER PANEL
        // =================================================

        const outerPanel =
            this.add.rectangle(

                0,
                0,

                1000,
                650,

                0x0d1828

            );


        outerPanel.setStrokeStyle(
            3,
            0x24b8ff
        );


        this.resultsContainer.add(
            outerPanel
        );


        // =================================================
        // REPORT PANEL
        // =================================================

        const report =
            this.add.rectangle(

                0,
                18,

                950,
                590,

                0xf4f1e8

            );


        report.setStrokeStyle(
            1,
            0xb9c3cc
        );


        this.resultsContainer.add(
            report
        );


        // =================================================
        // HEADER
        // =================================================

        const header =
            this.add.rectangle(

                0,
                -257,

                950,
                112,

                0x17263b

            );


        this.resultsContainer.add(
            header
        );


        // =================================================
        // GAME LABEL
        // =================================================

        const gameLabel =
            this.add.text(

                0,
                -287,

                "ESCAPE STARTUP LAB",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "13px",

                    fontStyle:
                        "bold",

                    color:
                        "#62d6ff",

                    letterSpacing:
                        3

                }

            )
            .setOrigin(
                0.5
            );


        this.resultsContainer.add(
            gameLabel
        );


        // =================================================
        // MAIN TITLE
        // =================================================

        const title =
            this.add.text(

                0,
                -258,

                timerExpired
                    ? "FOUNDER ASSESSMENT — TIME EXPIRED"
                    : "FOUNDER ASSESSMENT COMPLETE",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "27px",

                    fontStyle:
                        "bold",

                    color:
                        "#ffffff",

                    align:
                        "center"

                }

            )
            .setOrigin(
                0.5
            );


        this.resultsContainer.add(
            title
        );


        // =================================================
        // SUBTITLE
        // =================================================

        const subtitle =
            this.add.text(

                0,
                -225,

                "ENTREPRENEURIAL PERFORMANCE REPORT",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "12px",

                    color:
                        "#b8c6d9"

                }

            )
            .setOrigin(
                0.5
            );


        this.resultsContainer.add(
            subtitle
        );


        // =================================================
        // COMPETITION INFORMATION BAR
        // =================================================

        this.createCompetitionInfoBar(

            teamName,

            timeRemaining,

            elapsedTime,

            timerExpired

        );


        // =================================================
        // FINAL SCORE LABEL
        // =================================================

        const finalScoreLabel =
            this.add.text(

                -320,
                -114,

                "FINAL SCORE",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "14px",

                    fontStyle:
                        "bold",

                    color:
                        "#5d6670"

                }

            )
            .setOrigin(
                0.5
            );


        this.resultsContainer.add(
            finalScoreLabel
        );


        // =================================================
        // SCORE NUMBER
        // =================================================

        const scoreText =
            this.add.text(

                -320,
                -65,

                `${finalScore}`,

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "58px",

                    fontStyle:
                        "bold",

                    color:
                        "#148be8"

                }

            )
            .setOrigin(
                0.5
            );


        this.resultsContainer.add(
            scoreText
        );


        // =================================================
        // SCORE SUBTEXT
        // =================================================

        const scoreSubtext =
            this.add.text(

                -320,
                -22,

                "TOTAL PERFORMANCE POINTS",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "10px",

                    color:
                        "#7b848c"

                }

            )
            .setOrigin(
                0.5
            );


        this.resultsContainer.add(
            scoreSubtext
        );


        // =================================================
        // VERTICAL DIVIDER
        // =================================================

        const divider =
            this.add.rectangle(

                -145,
                -70,

                1,
                130,

                0xc6ccd1

            );


        this.resultsContainer.add(
            divider
        );


        // =================================================
        // RATING LABEL
        // =================================================

        const ratingLabel =
            this.add.text(

                -105,
                -125,

                "ENTREPRENEURIAL PROFILE",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "12px",

                    fontStyle:
                        "bold",

                    color:
                        "#69727a"

                }

            );


        this.resultsContainer.add(
            ratingLabel
        );


        // =================================================
        // RATING BADGE
        // =================================================

        const ratingBadge =
            this.add.rectangle(

                145,
                -82,

                500,
                50,

                0xffffff

            );


        ratingBadge.setStrokeStyle(

            2,

            Phaser.Display.Color
                .HexStringToColor(
                    rating.color
                )
                .color

        );


        this.resultsContainer.add(
            ratingBadge
        );


        // =================================================
        // RATING TITLE
        // =================================================

        const ratingTitle =
            this.add.text(

                145,
                -82,

                `${rating.icon}  ${rating.title}`,

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "19px",

                    fontStyle:
                        "bold",

                    color:
                        rating.color,

                    align:
                        "center"

                }

            )
            .setOrigin(
                0.5
            );


        this.fitTextToWidth(

            ratingTitle,

            450,

            13

        );


        this.resultsContainer.add(
            ratingTitle
        );


        // =================================================
        // RATING DESCRIPTION
        // =================================================

        const ratingDescription =
            this.add.text(

                -105,
                -46,

                rating.description,

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "12px",

                    color:
                        "#42484e",

                    wordWrap: {

                        width:
                            500

                    },

                    lineSpacing:
                        3

                }

            );


        this.resultsContainer.add(
            ratingDescription
        );


        // =================================================
        // SECTION DIVIDER
        // =================================================

        const horizontalDivider =
            this.add.rectangle(

                0,
                22,

                880,
                1,

                0xc7ccd0

            );


        this.resultsContainer.add(
            horizontalDivider
        );


        // =================================================
        // BREAKDOWN TITLE
        // =================================================

        const breakdownTitle =
            this.add.text(

                -425,
                37,

                "MISSION SCORE BREAKDOWN",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "14px",

                    fontStyle:
                        "bold",

                    color:
                        "#253342"

                }

            );


        this.resultsContainer.add(
            breakdownTitle
        );


        // =================================================
        // ROOM CARDS
        // =================================================

        this.createRoomCard(

            -290,
            123,

            1,

            "PROBLEM DISCOVERY",

            roomScores[1]

        );


        this.createRoomCard(

            0,
            123,

            2,

            "OPPORTUNITY ANALYSIS",

            roomScores[2]

        );


        this.createRoomCard(

            290,
            123,

            3,

            "STRATEGIC DECISION",

            roomScores[3]

        );


        // =================================================
        // TOTALS PANEL
        // =================================================

        const totalsPanel =
            this.add.rectangle(

                -150,
                230,

                540,
                60,

                0xe7edf2

            );


        totalsPanel.setStrokeStyle(
            1,
            0xc1cbd3
        );


        this.resultsContainer.add(
            totalsPanel
        );


        // =================================================
        // SUMMARY VALUES
        // =================================================

        this.createSummaryValue(

            -365,
            215,

            "NOTEBOOK",

            notebookTotal

        );


        this.createSummaryValue(

            -190,
            215,

            "ASSESSMENT",

            assessmentTotal

        );


        this.createSummaryValue(

            -15,
            215,

            "FINAL TOTAL",

            finalScore

        );


        // =================================================
        // PLAY AGAIN
        // =================================================

        this.createPlayAgainButton(

            285,
            230

        );


        // =================================================
        // SUBMISSION STATUS
        // =================================================

        this.submissionStatusText =
            this.add.text(

                0,
                279,

                "Submitting competition result...",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "11px",

                    fontStyle:
                        "bold",

                    color:
                        "#68727d",

                    align:
                        "center"

                }

            )
            .setOrigin(
                0.5
            );


        this.fitTextToWidth(

            this.submissionStatusText,

            700,

            9

        );


        this.resultsContainer.add(
            this.submissionStatusText
        );


        // =================================================
        // FOOTER
        // =================================================

        const footer =
            this.add.text(

                0,
                302,

                "Every founder learns. Every founder adapts. Every founder acts.",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "10px",

                    color:
                        "#7a838b",

                    align:
                        "center"

                }

            )
            .setOrigin(
                0.5
            );


        this.resultsContainer.add(
            footer
        );


        // =================================================
        // ENTRANCE ANIMATION
        // =================================================

        this.resultsContainer
            .setAlpha(
                0
            )
            .setScale(
                this.uiScale * 0.96
            );


        this.tweens.add({

            targets:
                this.resultsContainer,

            alpha:
                1,

            scaleX:
                this.uiScale,

            scaleY:
                this.uiScale,

            duration:
                550,

            ease:
                "Back.Out"

        });


        // =================================================
        // SCORE POP
        // =================================================

        scoreText.setScale(
            0.65
        );


        this.tweens.add({

            targets:
                scoreText,

            scaleX:
                1,

            scaleY:
                1,

            delay:
                250,

            duration:
                550,

            ease:
                "Back.Out"

        });


        // =================================================
        // SUBMIT RESULT
        // =================================================

        this.submitCompetitionResult();

    }


    // =====================================================
    // COMPETITION INFORMATION BAR
    // =====================================================

    createCompetitionInfoBar(
        teamName,
        timeRemaining,
        elapsedTime,
        timerExpired
    ) {

        // =================================================
        // PANEL GEOMETRY
        // =================================================

        const panelY =
            -178;


        const panelWidth =
            880;


        const panelHeight =
            46;


        const panel =
            this.add.rectangle(

                0,
                panelY,

                panelWidth,
                panelHeight,

                0xe7edf2

            );


        panel.setStrokeStyle(
            1,
            0xc1cbd3
        );


        this.resultsContainer.add(
            panel
        );


        // =================================================
        // SAFE VERTICAL POSITIONS
        // =================================================

        /*
         * The bar spans roughly:
         *
         * top    = -201
         * bottom = -155
         *
         * Keeping labels at -188 and values at -172
         * prevents the text from touching the bottom border.
         */

        const labelY =
            -188;


        const valueY =
            -172;


        // =================================================
        // COLUMN LAYOUT
        // =================================================

        const teamLeft =
            -415;


        const teamWidth =
            450;


        const timeLeft =
            100;


        const timeWidth =
            145;


        const elapsedLeft =
            305;


        const elapsedWidth =
            110;


        // =================================================
        // COLUMN DIVIDERS
        // =================================================

        const divider1 =
            this.add.rectangle(

                70,
                panelY,

                1,
                30,

                0xc5cfd7

            );


        const divider2 =
            this.add.rectangle(

                275,
                panelY,

                1,
                30,

                0xc5cfd7

            );


        this.resultsContainer.add([
            divider1,
            divider2
        ]);


        // =================================================
        // TEAM LABEL
        // =================================================

        const teamLabel =
            this.add.text(

                teamLeft,
                labelY,

                "TEAM",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "10px",

                    fontStyle:
                        "bold",

                    color:
                        "#68727d"

                }

            );


        this.resultsContainer.add(
            teamLabel
        );


        // =================================================
        // TEAM VALUE
        // =================================================

        const teamValue =
            this.add.text(

                teamLeft,
                valueY,

                teamName,

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "14px",

                    fontStyle:
                        "bold",

                    color:
                        "#17263b"

                }

            )
            .setOrigin(
                0,
                0
            );


        this.fitTextToWidth(

            teamValue,

            teamWidth,

            9

        );


        this.resultsContainer.add(
            teamValue
        );


        // =================================================
        // TIME REMAINING LABEL
        // =================================================

        const timeLabel =
            this.add.text(

                timeLeft,
                labelY,

                "TIME REMAINING",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "9px",

                    fontStyle:
                        "bold",

                    color:
                        "#68727d"

                }

            );


        this.fitTextToWidth(

            timeLabel,

            timeWidth,

            8

        );


        this.resultsContainer.add(
            timeLabel
        );


        // =================================================
        // TIME REMAINING VALUE
        // =================================================

        const timeValue =
            this.add.text(

                timeLeft +
                timeWidth,

                valueY,

                timeRemaining,

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "14px",

                    fontStyle:
                        "bold",

                    color:
                        timerExpired
                            ? "#c94747"
                            : "#1683e8",

                    align:
                        "right"

                }

            )
            .setOrigin(
                1,
                0
            );


        this.fitTextToWidth(

            timeValue,

            timeWidth,

            10

        );


        this.resultsContainer.add(
            timeValue
        );


        // =================================================
        // ELAPSED LABEL
        // =================================================

        const elapsedLabel =
            this.add.text(

                elapsedLeft,
                labelY,

                "ELAPSED",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "9px",

                    fontStyle:
                        "bold",

                    color:
                        "#68727d"

                }

            );


        this.fitTextToWidth(

            elapsedLabel,

            elapsedWidth,

            8

        );


        this.resultsContainer.add(
            elapsedLabel
        );


        // =================================================
        // ELAPSED VALUE
        // =================================================

        const elapsedValue =
            this.add.text(

                elapsedLeft +
                elapsedWidth,

                valueY,

                elapsedTime,

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "14px",

                    fontStyle:
                        "bold",

                    color:
                        "#17263b",

                    align:
                        "right"

                }

            )
            .setOrigin(
                1,
                0
            );


        this.fitTextToWidth(

            elapsedValue,

            elapsedWidth,

            10

        );


        this.resultsContainer.add(
            elapsedValue
        );

    }


    // =====================================================
    // FIT TEXT TO AVAILABLE WIDTH
    // =====================================================

    fitTextToWidth(
        textObject,
        maxWidth,
        minimumFontSize = 8
    ) {

        if (
            !textObject
        ) {

            return;

        }


        let fontSize =
            parseInt(
                textObject.style.fontSize
            ) || 16;


        // =================================================
        // SHRINK FONT
        // =================================================

        while (
            textObject.width > maxWidth &&
            fontSize > minimumFontSize
        ) {

            fontSize--;


            textObject.setFontSize(
                fontSize
            );

        }


        // =================================================
        // LAST RESORT: ELLIPSIS
        // =================================================

        if (
            textObject.width > maxWidth
        ) {

            const original =
                String(
                    textObject.text
                );


            let shortened =
                original;


            while (
                shortened.length > 3
            ) {

                shortened =
                    shortened.slice(
                        0,
                        -1
                    );


                textObject.setText(
                    `${shortened}...`
                );


                if (
                    textObject.width <= maxWidth
                ) {

                    break;

                }

            }

        }

    }


    // =====================================================
    // TEAM NAME
    // =====================================================

    getTeamName() {

        if (
            this.scoreManager &&
            typeof this.scoreManager.getTeamName ===
                "function"
        ) {

            const name =
                this.scoreManager.getTeamName();


            if (
                name
            ) {

                return name;

            }

        }


        return "UNREGISTERED TEAM";

    }


    // =====================================================
    // TIME REMAINING
    // =====================================================

    getTimeRemaining() {

        if (
            this.scoreManager &&
            typeof this.scoreManager.getFormattedTime ===
                "function"
        ) {

            return this.scoreManager
                .getFormattedTime();

        }


        return "--:--";

    }


    // =====================================================
    // ELAPSED TIME
    // =====================================================

    getElapsedTime() {

        if (
            this.scoreManager &&
            typeof this.scoreManager.getFormattedElapsedTime ===
                "function"
        ) {

            return this.scoreManager
                .getFormattedElapsedTime();

        }


        return "--:--";

    }


    // =====================================================
    // TIMER STATUS
    // =====================================================

    getTimerExpired() {

        if (
            this.scoreManager &&
            typeof this.scoreManager.isTimerExpired ===
                "function"
        ) {

            return this.scoreManager
                .isTimerExpired();

        }


        return false;

    }


    // =====================================================
    // SUBMIT COMPETITION RESULT
    // =====================================================

    async submitCompetitionResult() {

        // =================================================
        // PREVENT DOUBLE CALL
        // =================================================

        if (
            this.submissionStarted
        ) {

            return;

        }


        this.submissionStarted =
            true;


        // =================================================
        // SCORE MANAGER CHECK
        // =================================================

        if (
            !this.scoreManager
        ) {

            this.setSubmissionStatus(

                "Result not submitted — game data unavailable.",

                "#c94747"

            );


            return;

        }


        // =================================================
        // TEAM CHECK
        // =================================================

        const teamName =
            this.getTeamName();


        if (
            !teamName ||
            teamName ===
                "UNREGISTERED TEAM"
        ) {

            console.warn(
                "Competition result not submitted: no team name."
            );


            this.setSubmissionStatus(

                "Result not submitted — no team name registered.",

                "#c94747"

            );


            return;

        }


        // =================================================
        // ALREADY SUBMITTED
        // =================================================

        if (
            typeof this.scoreManager
                .hasResultBeenSubmitted ===
                "function" &&
            this.scoreManager
                .hasResultBeenSubmitted()
        ) {

            this.setSubmissionStatus(

                "Competition result already submitted ✓",

                "#249b5b"

            );


            return;

        }


        // =================================================
        // SEND RESULT
        // =================================================

        try {

            this.setSubmissionStatus(

                "Submitting competition result...",

                "#68727d"

            );


            await CompetitionResultsService.submit(
                this.scoreManager
            );


            console.log(
                "Competition result submitted."
            );


            this.setSubmissionStatus(

                "Competition result submitted ✓",

                "#249b5b"

            );

        }

        catch (
            error
        ) {

            console.error(

                "Competition result submission failed:",

                error

            );


            this.setSubmissionStatus(

                "Could not submit result — check network connection.",

                "#c94747"

            );

        }

    }


    // =====================================================
    // UPDATE SUBMISSION STATUS
    // =====================================================

    setSubmissionStatus(
        text,
        color
    ) {

        if (
            !this.submissionStatusText
        ) {

            return;

        }


        this.submissionStatusText
            .setText(
                text
            )
            .setColor(
                color
            );


        this.submissionStatusText
            .setFontSize(
                11
            );


        this.fitTextToWidth(

            this.submissionStatusText,

            700,

            8

        );

    }


    // =====================================================
    // BACKGROUND
    // =====================================================

    createBackground() {

        this.add.rectangle(

            this.scale.width / 2,
            this.scale.height / 2,

            this.scale.width,
            this.scale.height,

            0x172337

        );


        this.add.rectangle(

            this.scale.width / 2,
            this.scale.height / 2,

            this.scale.width * 0.78,
            this.scale.height * 0.72,

            0x223751,
            0.45

        );


        this.add.rectangle(

            this.scale.width / 2,
            12,

            this.scale.width,
            3,

            0x24b8ff,
            0.65

        );

    }


    // =====================================================
    // ROOM SCORE CARD
    // =====================================================

    createRoomCard(
        x,
        y,
        roomNumber,
        title,
        room
    ) {

        // =================================================
        // CARD
        // =================================================

        const card =
            this.add.rectangle(

                x,
                y,

                260,
                142,

                0xffffff

            );


        card.setStrokeStyle(
            1,
            0xbfc8cf
        );


        this.resultsContainer.add(
            card
        );


        // =================================================
        // ROOM LABEL
        // =================================================

        const roomLabel =
            this.add.text(

                x - 108,
                y - 56,

                `MISSION 0${roomNumber}`,

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "10px",

                    fontStyle:
                        "bold",

                    color:
                        "#1683e8"

                }

            );


        this.resultsContainer.add(
            roomLabel
        );


        // =================================================
        // ROOM TITLE
        // =================================================

        const roomTitle =
            this.add.text(

                x - 108,
                y - 36,

                title,

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "10px",

                    fontStyle:
                        "bold",

                    color:
                        "#2a3138"

                }

            );


        this.fitTextToWidth(

            roomTitle,

            215,

            8

        );


        this.resultsContainer.add(
            roomTitle
        );


        // =================================================
        // DIVIDER
        // =================================================

        const divider =
            this.add.rectangle(

                x,
                y - 12,

                215,
                1,

                0xd5dadd

            );


        this.resultsContainer.add(
            divider
        );


        // =================================================
        // NOTEBOOK
        // =================================================

        this.createCardRow(

            x,
            y + 2,

            "Notebook",

            room.notebook

        );


        // =================================================
        // ASSESSMENT
        // =================================================

        this.createCardRow(

            x,
            y + 24,

            "Assessment",

            room.assessment

        );


        // =================================================
        // TOTAL LABEL
        // =================================================

        const totalLabel =
            this.add.text(

                x - 108,
                y + 49,

                "TOTAL",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "11px",

                    fontStyle:
                        "bold",

                    color:
                        "#37424d"

                }

            );


        this.resultsContainer.add(
            totalLabel
        );


        // =================================================
        // TOTAL VALUE
        // =================================================

        const totalValue =
            this.add.text(

                x + 108,
                y + 45,

                `${room.total}`,

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "17px",

                    fontStyle:
                        "bold",

                    color:
                        "#1683e8"

                }

            )
            .setOrigin(
                1,
                0
            );


        this.fitTextToWidth(

            totalValue,

            90,

            10

        );


        this.resultsContainer.add(
            totalValue
        );

    }


    // =====================================================
    // ROOM CARD ROW
    // =====================================================

    createCardRow(
        x,
        y,
        label,
        value
    ) {

        const labelText =
            this.add.text(

                x - 108,
                y,

                label,

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "10px",

                    color:
                        "#747c83"

                }

            );


        this.resultsContainer.add(
            labelText
        );


        const valueText =
            this.add.text(

                x + 108,
                y,

                `${value}`,

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "11px",

                    fontStyle:
                        "bold",

                    color:
                        "#333333"

                }

            )
            .setOrigin(
                1,
                0
            );


        this.fitTextToWidth(

            valueText,

            85,

            8

        );


        this.resultsContainer.add(
            valueText
        );

    }


    // =====================================================
    // SUMMARY VALUE
    // =====================================================

    createSummaryValue(
        x,
        y,
        label,
        value
    ) {

        const labelText =
            this.add.text(

                x,
                y,

                label,

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "10px",

                    fontStyle:
                        "bold",

                    color:
                        "#68727d"

                }

            );


        this.resultsContainer.add(
            labelText
        );


        const valueText =
            this.add.text(

                x,
                y + 19,

                `${value}`,

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "18px",

                    fontStyle:
                        "bold",

                    color:
                        "#1683e8"

                }

            );


        this.fitTextToWidth(

            valueText,

            110,

            10

        );


        this.resultsContainer.add(
            valueText
        );

    }


    // =====================================================
    // PLAY AGAIN BUTTON
    // =====================================================

    createPlayAgainButton(
        x,
        y
    ) {

        const button =
            this.add.rectangle(

                x,
                y,

                240,
                60,

                0x17263b

            );


        button.setStrokeStyle(
            2,
            0x24b8ff
        );


        button.setInteractive({

            useHandCursor:
                true

        });


        this.resultsContainer.add(
            button
        );


        // =================================================
        // LABEL
        // =================================================

        const label =
            this.add.text(

                x,
                y - 5,

                "PLAY AGAIN",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "16px",

                    fontStyle:
                        "bold",

                    color:
                        "#67d6ff"

                }

            )
            .setOrigin(
                0.5
            );


        this.resultsContainer.add(
            label
        );


        // =================================================
        // SUBLABEL
        // =================================================

        const sublabel =
            this.add.text(

                x,
                y + 17,

                "Register a new team",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "9px",

                    color:
                        "#aebed0"

                }

            )
            .setOrigin(
                0.5
            );


        this.resultsContainer.add(
            sublabel
        );


        // =================================================
        // HOVER IN
        // =================================================

        button.on(

            "pointerover",

            () => {

                button.setFillStyle(
                    0x203a55
                );


                label.setColor(
                    "#ffffff"
                );

            }

        );


        // =================================================
        // HOVER OUT
        // =================================================

        button.on(

            "pointerout",

            () => {

                button.setFillStyle(
                    0x17263b
                );


                label.setColor(
                    "#67d6ff"
                );

            }

        );


        // =================================================
        // CLICK
        // =================================================

        button.on(

            "pointerdown",

            () => {

                this.playAgain();

            }

        );

    }


    // =====================================================
    // FINAL RATING
    // =====================================================

    getFinalRating(
        score
    ) {

        if (
            score >= 300
        ) {

            return {

                icon:
                    "◆",

                title:
                    "ENTREPRENEURIAL MASTERMIND",

                description:
                    "Exceptional entrepreneurial judgment. You identify the right problems, evaluate evidence, and translate insight into strategic action.",

                color:
                    "#8e44ad"

            };

        }


        if (
            score >= 250
        ) {

            return {

                icon:
                    "▲",

                title:
                    "BUSINESS STRATEGIST",

                description:
                    "You think strategically and understand how to turn business challenges into opportunities for growth.",

                color:
                    "#7d3c98"

            };

        }


        if (
            score >= 180
        ) {

            return {

                icon:
                    "↑",

                title:
                    "GROWTH ENTREPRENEUR",

                description:
                    "You understand the business and can make decisions that create meaningful opportunities for improvement and growth.",

                color:
                    "#1683e8"

            };

        }


        if (
            score >= 100
        ) {

            return {

                icon:
                    "●",

                title:
                    "EMERGING ENTREPRENEUR",

                description:
                    "You are beginning to recognize opportunities, evaluate business problems, and make strategic choices.",

                color:
                    "#249b5b"

            };

        }


        return {

            icon:
                "◇",

            title:
                "ASPIRING ENTREPRENEUR",

            description:
                "You have the foundation of an entrepreneurial mindset. Keep testing assumptions, examining evidence, and turning ideas into action.",

            color:
                "#8a6748"

        };

    }


    // =====================================================
    // GET ROOM SCORES
    // =====================================================

    getRoomScores() {

        const scores =
            {};


        // =================================================
        // PREFERRED SCORE MANAGER METHOD
        // =================================================

        if (
            this.scoreManager &&
            typeof this.scoreManager.getRoomScore ===
                "function"
        ) {

            for (
                let roomNumber = 1;
                roomNumber <= 3;
                roomNumber++
            ) {

                const room =
                    this.scoreManager.getRoomScore(
                        roomNumber
                    );


                const notebook =
                    Number(
                        room?.notebook || 0
                    );


                const assessment =
                    Number(
                        room?.assessment || 0
                    );


                scores[
                    roomNumber
                ] = {

                    notebook,

                    assessment,

                    total:
                        notebook +
                        assessment

                };

            }


            return scores;

        }


        // =================================================
        // ROOM SCORES FALLBACK
        // =================================================

        if (
            this.scoreManager &&
            this.scoreManager.roomScores
        ) {

            for (
                let roomNumber = 1;
                roomNumber <= 3;
                roomNumber++
            ) {

                const room =
                    this.scoreManager.roomScores[
                        roomNumber
                    ] || {};


                const notebook =
                    Number(
                        room.notebook || 0
                    );


                const assessment =
                    Number(
                        room.assessment || 0
                    );


                scores[
                    roomNumber
                ] = {

                    notebook,

                    assessment,

                    total:
                        notebook +
                        assessment

                };

            }


            return scores;

        }


        // =================================================
        // EMPTY FALLBACK
        // =================================================

        for (
            let roomNumber = 1;
            roomNumber <= 3;
            roomNumber++
        ) {

            scores[
                roomNumber
            ] = {

                notebook:
                    0,

                assessment:
                    0,

                total:
                    0

            };

        }


        return scores;

    }


    // =====================================================
    // PLAY AGAIN
    // =====================================================

    playAgain() {

        console.log(
            "Starting a new competition run..."
        );


        // =================================================
        // RESET SCORE MANAGER
        // =================================================

        if (
            this.scoreManager &&
            typeof this.scoreManager.reset ===
                "function"
        ) {

            this.scoreManager.reset();

        }


        // =================================================
        // RESET GLOBAL MANAGER IF DIFFERENT
        // =================================================

        if (
            this.game.scoreManager &&
            this.game.scoreManager !==
                this.scoreManager &&
            typeof this.game.scoreManager.reset ===
                "function"
        ) {

            this.game.scoreManager.reset();

        }


        // =================================================
        // RETURN TO MAIN MENU
        // =================================================

        this.cameras.main.fadeOut(
            300
        );


        this.cameras.main.once(

            "camerafadeoutcomplete",

            () => {

                this.scene.start(
                    "MainMenuScene"
                );

            }

        );

    }

}