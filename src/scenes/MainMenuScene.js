import Phaser from "phaser";

export default class MainMenuScene extends Phaser.Scene {

    constructor() {
        super("MainMenuScene");
    }

    create() {

        // --------------------------------------------------
        // Background
        // --------------------------------------------------

        this.cameras.main.setBackgroundColor("#24324a");

        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        // --------------------------------------------------
        // Game Title
        // --------------------------------------------------

        this.add.text(
            centerX,
            centerY - 220,
            "ESCAPE STARTUP LAB",
            {
                fontSize: "64px",
                fontStyle: "bold",
                color: "#ffffff",
                fontFamily: "Arial"
            }
        ).setOrigin(0.5);

        // --------------------------------------------------
        // Subtitle
        // --------------------------------------------------

        this.add.text(
            centerX,
            centerY - 150,
            "A Founder Assessment Simulation",
            {
                fontSize: "28px",
                color: "#bfc9d8",
                fontFamily: "Arial"
            }
        ).setOrigin(0.5);

        // --------------------------------------------------
        // Start Button
        // --------------------------------------------------

        const startButton = this.add.text(
            centerX,
            centerY,
            "Start Assessment",
            {
                fontSize: "36px",
                color: "#ffffff",
                backgroundColor: "#2e7d32",
                padding: {
                    left: 30,
                    right: 30,
                    top: 15,
                    bottom: 15
                }
            }
        )
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

        // Hover Effect
        startButton.on("pointerover", () => {
            startButton.setStyle({
                backgroundColor: "#43a047"
            });
        });

        startButton.on("pointerout", () => {
            startButton.setStyle({
                backgroundColor: "#2e7d32"
            });
        });

        // Click
        startButton.on("pointerdown", () => {
            this.scene.start("IntroScene");
        });

        // --------------------------------------------------
        // Credits
        // --------------------------------------------------

        this.add.text(
            centerX,
            centerY + 120,
            "Developed by Entrepreneurship Lab\nWidya Mandala Catholic University Surabaya",
            {
                align: "center",
                fontSize: "20px",
                color: "#cccccc"
            }
        ).setOrigin(0.5);

        // --------------------------------------------------
        // Version
        // --------------------------------------------------

        this.add.text(
            centerX,
            this.scale.height - 30,
            "Version 0.1.0",
            {
                fontSize: "18px",
                color: "#888888"
            }
        ).setOrigin(0.5);

    }

}