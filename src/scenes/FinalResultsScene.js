import Phaser from "phaser";

export default class FinalResultsScene extends Phaser.Scene {

    constructor() {

        super("FinalResultsScene");

    }


    // =====================================================
    // CREATE
    // =====================================================

    create(data) {

        // =================================================
        // SCORE MANAGER
        // =================================================

        this.scoreManager =
            data.scoreManager ||
            this.game.scoreManager;


        const finalScore =
            this.scoreManager.getScore();


        // =================================================
        // BACKGROUND
        // =================================================

        this.add.rectangle(

            0,
            0,

            this.scale.width,
            this.scale.height,

            0x1d2638

        )
        .setOrigin(0, 0);


        // =================================================
        // MAIN PANEL
        // =================================================

        const panelWidth = 720;
        const panelHeight = 620;

        const panelX =
            this.scale.width / 2;

        const panelY =
            this.scale.height / 2;


        this.add.rectangle(

            panelX,
            panelY,

            panelWidth,
            panelHeight,

            0xf5f5f5

        )
        .setStrokeStyle(
            3,
            0x0066cc
        );


        // =================================================
        // TITLE
        // =================================================

        this.add.text(

            panelX,
            panelY - 275,

            "🎉 GAME COMPLETE!",

            {

                fontSize: "36px",
                color: "#000000",
                fontStyle: "bold",

                align: "center"

            }

        )
        .setOrigin(0.5);


        // =================================================
        // SUBTITLE
        // =================================================

        this.add.text(

            panelX,
            panelY - 225,

            "Business Investigation Results",

            {

                fontSize: "20px",
                color: "#666666",

                align: "center"

            }

        )
        .setOrigin(0.5);


        // =================================================
        // FINAL SCORE
        // =================================================

        this.add.text(

            panelX,
            panelY - 175,

            `FINAL SCORE: ${finalScore}`,

            {

                fontSize: "30px",
                color: "#0066cc",
                fontStyle: "bold",

                align: "center"

            }

        )
        .setOrigin(0.5);


        // =================================================
        // SCORE BREAKDOWN TITLE
        // =================================================

        this.add.text(

            panelX - 300,
            panelY - 125,

            "SCORE BREAKDOWN",

            {

                fontSize: "18px",
                color: "#333333",
                fontStyle: "bold"

            }

        );


        // =================================================
        // TABLE HEADER
        // =================================================

        const tableX = panelX - 300;

        const headerY = panelY - 90;


        this.add.text(

            tableX,
            headerY,

            "Room",

            {

                fontSize: "16px",
                color: "#666666",
                fontStyle: "bold"

            }

        );


        this.add.text(

            tableX + 170,
            headerY,

            "Notebook",

            {

                fontSize: "16px",
                color: "#666666",
                fontStyle: "bold"

            }

        );


        this.add.text(

            tableX + 290,
            headerY,

            "Assessment",

            {

                fontSize: "16px",
                color: "#666666",
                fontStyle: "bold"

            }

        );


        this.add.text(

            tableX + 450,
            headerY,

            "Total",

            {

                fontSize: "16px",
                color: "#666666",
                fontStyle: "bold"

            }

        );


        // =================================================
        // ROOM ROWS
        // =================================================

        const rooms = [1, 2, 3];

        rooms.forEach(
            (roomNumber, index) => {

                const y =
                    headerY +
                    45 +
                    index * 45;


                const notebook =
                    this.scoreManager
                        .getNotebookScore(
                            roomNumber
                        );


                const assessment =
                    this.scoreManager
                        .getAssessmentScore(
                            roomNumber
                        );


                const total =
                    this.scoreManager
                        .getTotalRoomScore(
                            roomNumber
                        );


                this.add.text(

                    tableX,
                    y,

                    `Room ${roomNumber}`,

                    {

                        fontSize: "17px",
                        color: "#000000"

                    }

                );


                this.add.text(

                    tableX + 190,
                    y,

                    `${notebook}`,

                    {

                        fontSize: "17px",
                        color: "#000000"

                    }

                );


                this.add.text(

                    tableX + 330,
                    y,

                    `${assessment}`,

                    {

                        fontSize: "17px",
                        color: "#000000"

                    }

                );


                this.add.text(

                    tableX + 470,
                    y,

                    `${total}`,

                    {

                        fontSize: "17px",
                        color: "#0066cc",
                        fontStyle: "bold"

                    }

                );

            }
        );


        // =================================================
        // PERFORMANCE
        // =================================================

        let performanceMessage;


        if (finalScore >= 400) {

            performanceMessage =
                "Excellent Business Judgment!";

        }
        else if (finalScore >= 300) {

            performanceMessage =
                "Strong Business Judgment!";

        }
        else if (finalScore >= 200) {

            performanceMessage =
                "Good Effort!";

        }
        else {

            performanceMessage =
                "Keep Developing Your Business Skills!";

        }


        this.add.text(

            panelX,
            panelY + 90,

            performanceMessage,

            {

                fontSize: "23px",
                color: "#008800",
                fontStyle: "bold",

                align: "center"

            }

        )
        .setOrigin(0.5);


        // =================================================
        // PLAY AGAIN
        // =================================================

        const restartButton =
            this.add.text(

                panelX,
                panelY + 165,

                "🔄 Play Again",

                {

                    fontSize: "21px",
                    color: "#0066cc",
                    fontStyle: "bold",

                    backgroundColor: "#e8f1ff",

                    padding: {

                        left: 20,
                        right: 20,
                        top: 10,
                        bottom: 10

                    }

                }

            )
            .setOrigin(0.5)
            .setInteractive({
                useHandCursor: true
            });


        restartButton.on(
            "pointerover",
            () => {

                restartButton.setColor(
                    "#ff8800"
                );

            }
        );


        restartButton.on(
            "pointerout",
            () => {

                restartButton.setColor(
                    "#0066cc"
                );

            }
        );


        restartButton.on(
            "pointerdown",
            () => {

                this.restartGame();

            }
        );


        // =================================================
        // FOOTER
        // =================================================

        this.add.text(

            panelX,
            panelY + 230,

            "Thank you for playing!",

            {

                fontSize: "15px",
                color: "#777777",

                align: "center"

            }

        )
        .setOrigin(0.5);

    }


    // =====================================================
    // RESTART GAME
    // =====================================================

    restartGame() {

        console.log(
            "Restarting game..."
        );


        // Reset the entire ScoreManager

        this.scoreManager.reset();


        // Return to main menu

        this.scene.start(
            "MainMenuScene"
        );

    }

}