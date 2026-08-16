import Phaser from "phaser";

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
            data.scoreManager ||
            this.game.scoreManager;

    }


    // =====================================================
    // CREATE
    // =====================================================

    create() {

        const finalScore =
            this.scoreManager
                ? this.scoreManager.getScore()
                : 0;


        const rating =
            this.getFinalRating(finalScore);


        // =================================================
        // BACKGROUND
        // =================================================

        this.createBackground();


        // =================================================
        // PANEL
        // =================================================

        const panelWidth = 760;
        const panelHeight = 610;

        const panelX =
            this.scale.width / 2;

        const panelY =
            this.scale.height / 2;


        const panel =
            this.add.rectangle(

                panelX,
                panelY,

                panelWidth,
                panelHeight,

                0xf4f4f4

            );


        panel.setStrokeStyle(
            3,
            0x1683e8
        );


        // =================================================
        // TITLE
        // =================================================

        this.add.text(

            panelX,
            panelY - 275,

            "🎉 BUSINESS CHALLENGE COMPLETE!",

            {

                fontFamily: "monospace",

                fontSize: "30px",

                fontStyle: "bold",

                color: "#111111",

                align: "center"

            }

        )
        .setOrigin(0.5);


        // =================================================
        // SUBTITLE
        // =================================================

        this.add.text(

            panelX,
            panelY - 235,

            "Your Entrepreneurial Performance",

            {

                fontFamily: "monospace",

                fontSize: "17px",

                color: "#666666",

                align: "center"

            }

        )
        .setOrigin(0.5);


        // =================================================
        // FINAL SCORE LABEL
        // =================================================

        this.add.text(

            panelX,
            panelY - 185,

            "FINAL SCORE",

            {

                fontFamily: "monospace",

                fontSize: "16px",

                fontStyle: "bold",

                color: "#555555",

                align: "center"

            }

        )
        .setOrigin(0.5);


        // =================================================
        // FINAL SCORE
        // =================================================

        const scoreText =
            this.add.text(

                panelX,
                panelY - 145,

                `${finalScore}`,

                {

                    fontFamily: "monospace",

                    fontSize: "46px",

                    fontStyle: "bold",

                    color: "#1683e8",

                    align: "center"

                }

            )
            .setOrigin(0.5);


        // =================================================
        // FINAL RATING
        // =================================================

        this.add.text(

            panelX,
            panelY - 90,

            `${rating.icon} ${rating.title}`,

            {

                fontFamily: "monospace",

                fontSize: "24px",

                fontStyle: "bold",

                color: rating.color,

                align: "center",

                wordWrap: {
                    width: 680
                }

            }

        )
        .setOrigin(0.5);


        // =================================================
        // RATING DESCRIPTION
        // =================================================

        this.add.text(

            panelX,
            panelY - 45,

            rating.description,

            {

                fontFamily: "monospace",

                fontSize: "14px",

                color: "#444444",

                align: "center",

                wordWrap: {
                    width: 600
                },

                lineSpacing: 4

            }

        )
        .setOrigin(0.5);


        // =================================================
        // SCORE BREAKDOWN
        // =================================================

        this.add.text(

            panelX,
            panelY + 15,

            "SCORE BREAKDOWN",

            {

                fontFamily: "monospace",

                fontSize: "16px",

                fontStyle: "bold",

                color: "#222222",

                align: "center"

            }

        )
        .setOrigin(0.5);


        this.createScoreBreakdown(
            panelX,
            panelY + 50
        );


        // =================================================
        // PLAY AGAIN BUTTON
        // =================================================

        const buttonY =
            panelY + 215;


        const button =
            this.add.rectangle(

                panelX,
                buttonY,

                190,
                45,

                0xeaf3ff

            );


        button.setStrokeStyle(
            2,
            0x1683e8
        );


        button.setInteractive({
            useHandCursor: true
        });


        const buttonText =
            this.add.text(

                panelX,
                buttonY,

                "🔄 Play Again",

                {

                    fontFamily: "monospace",

                    fontSize: "17px",

                    fontStyle: "bold",

                    color: "#1683e8",

                    align: "center"

                }

            )
            .setOrigin(0.5);


        button.on(
            "pointerover",
            () => {

                button.setFillStyle(
                    0xdceeff
                );

                buttonText.setColor(
                    "#ff8800"
                );

            }
        );


        button.on(
            "pointerout",
            () => {

                button.setFillStyle(
                    0xeaf3ff
                );

                buttonText.setColor(
                    "#1683e8"
                );

            }
        );


        button.on(
            "pointerdown",
            () => {

                this.playAgain();

            }
        );


        // =================================================
        // FOOTER
        // =================================================

        this.add.text(

            panelX,
            panelY + 270,

            "Every great entrepreneur learns, adapts, and acts.",

            {

                fontFamily: "monospace",

                fontSize: "13px",

                color: "#777777",

                align: "center"

            }

        )
        .setOrigin(0.5);


        // =================================================
        // SCORE ANIMATION
        // =================================================

        scoreText.setScale(0.7);


        this.tweens.add({

            targets: scoreText,

            scaleX: 1,

            scaleY: 1,

            duration: 500,

            ease: "Back.out"

        });

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

            0x1d2638

        );

    }


    // =====================================================
    // FINAL ENTREPRENEURIAL RATING
    // =====================================================

    getFinalRating(score) {

        // =================================================
        // 300+
        // =================================================

        if (score >= 300) {

            return {

                icon: "👑",

                title:
                    "ENTREPRENEURIAL MASTERMIND",

                description:
                    "You demonstrate exceptional entrepreneurial judgment. You identify the right problems, evaluate evidence, and turn insights into strategic action.",

                color: "#9b59b6"

            };

        }


        // =================================================
        // 250–299
        // =================================================

        if (score >= 250) {

            return {

                icon: "🚀",

                title:
                    "BUSINESS STRATEGIST",

                description:
                    "You think strategically and understand how to turn business challenges into opportunities for growth.",

                color: "#8e44ad"

            };

        }


        // =================================================
        // 180–249
        // =================================================

        if (score >= 180) {

            return {

                icon: "📈",

                title:
                    "GROWTH ENTREPRENEUR",

                description:
                    "You understand the business and can make decisions that create meaningful opportunities for improvement and growth.",

                color: "#1683e8"

            };

        }


        // =================================================
        // 100–179
        // =================================================

        if (score >= 100) {

            return {

                icon: "💡",

                title:
                    "EMERGING ENTREPRENEUR",

                description:
                    "You are beginning to recognize opportunities, evaluate business problems, and make your first strategic moves.",

                color: "#27ae60"

            };

        }


        // =================================================
        // BELOW 100
        // =================================================

        return {

            icon: "🌱",

            title:
                "ASPIRING ENTREPRENEUR",

            description:
                "You have the foundation of an entrepreneurial mindset. Keep questioning assumptions, looking for opportunities, and turning ideas into action.",

            color: "#795548"

        };

    }


    // =====================================================
    // SCORE BREAKDOWN
    // =====================================================

    createScoreBreakdown(
        centerX,
        startY
    ) {

        // -------------------------------------------------
        // COLUMN POSITIONS
        // -------------------------------------------------

        const roomX =
            centerX - 270;

        const notebookX =
            centerX - 90;

        const assessmentX =
            centerX + 80;

        const totalX =
            centerX + 250;


        // =================================================
        // HEADERS
        // =================================================

        this.add.text(

            roomX,
            startY,

            "Room",

            {

                fontFamily: "monospace",

                fontSize: "13px",

                fontStyle: "bold",

                color: "#555555"

            }

        );


        this.add.text(

            notebookX,
            startY,

            "Notebook",

            {

                fontFamily: "monospace",

                fontSize: "13px",

                fontStyle: "bold",

                color: "#555555",

                align: "center"

            }

        )
        .setOrigin(0.5, 0);


        this.add.text(

            assessmentX,
            startY,

            "Assessment",

            {

                fontFamily: "monospace",

                fontSize: "13px",

                fontStyle: "bold",

                color: "#555555",

                align: "center"

            }

        )
        .setOrigin(0.5, 0);


        this.add.text(

            totalX,
            startY,

            "Total",

            {

                fontFamily: "monospace",

                fontSize: "13px",

                fontStyle: "bold",

                color: "#555555",

                align: "center"

            }

        )
        .setOrigin(0.5, 0);


        // =================================================
        // ROOM SCORES
        // =================================================

        const roomScores =
            this.getRoomScores();


        for (
            let i = 0;
            i < 3;
            i++
        ) {

            const roomNumber =
                i + 1;


            const room =
                roomScores[roomNumber];


            const rowY =
                startY +
                27 +
                (i * 27);


            // -------------------------------------------------
            // ROOM
            // -------------------------------------------------

            this.add.text(

                roomX,
                rowY,

                `Room ${roomNumber}`,

                {

                    fontFamily: "monospace",

                    fontSize: "13px",

                    color: "#333333"

                }

            );


            // -------------------------------------------------
            // NOTEBOOK
            // -------------------------------------------------

            this.add.text(

                notebookX,
                rowY,

                `${room.notebook}`,

                {

                    fontFamily: "monospace",

                    fontSize: "13px",

                    color: "#333333",

                    align: "center"

                }

            )
            .setOrigin(0.5, 0);


            // -------------------------------------------------
            // ASSESSMENT
            // -------------------------------------------------

            this.add.text(

                assessmentX,
                rowY,

                `${room.assessment}`,

                {

                    fontFamily: "monospace",

                    fontSize: "13px",

                    color: "#333333",

                    align: "center"

                }

            )
            .setOrigin(0.5, 0);


            // -------------------------------------------------
            // TOTAL
            // -------------------------------------------------

            this.add.text(

                totalX,
                rowY,

                `${room.total}`,

                {

                    fontFamily: "monospace",

                    fontSize: "13px",

                    fontStyle: "bold",

                    color: "#1683e8",

                    align: "center"

                }

            )
            .setOrigin(0.5, 0);

        }

    }


    // =====================================================
    // GET ROOM SCORES
    // =====================================================

    getRoomScores() {

        const scores = {};


        // =================================================
        // CURRENT SCORE MANAGER STRUCTURE
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


                scores[roomNumber] = {

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
        // FALLBACK
        // =================================================

        for (
            let roomNumber = 1;
            roomNumber <= 3;
            roomNumber++
        ) {

            scores[roomNumber] = {

                notebook: 0,

                assessment: 0,

                total: 0

            };

        }


        return scores;

    }


    // =====================================================
    // PLAY AGAIN
    // =====================================================

    playAgain() {

        console.log(
            "Starting a new game..."
        );


        // =================================================
        // RESET SCORE MANAGER
        // =================================================

        if (
            this.scoreManager &&
            typeof this.scoreManager.reset === "function"
        ) {

            this.scoreManager.reset();

        }


        // =================================================
        // RESET GLOBAL SCORE MANAGER
        // =================================================

        if (
            this.game.scoreManager &&
            this.game.scoreManager !== this.scoreManager &&
            typeof this.game.scoreManager.reset === "function"
        ) {

            this.game.scoreManager.reset();

        }


        // =================================================
        // RETURN TO MAIN MENU
        // =================================================

        this.scene.start(
            "MainMenuScene"
        );

    }

}