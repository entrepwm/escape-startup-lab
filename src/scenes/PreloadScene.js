import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {

        // ----------------------------
        // Background
        // ----------------------------

        this.cameras.main.setBackgroundColor("#24324a");

        // ----------------------------
        // Loading Title
        // ----------------------------

        const loadingText = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 80,
            "Loading Escape Startup Lab...",
            {
                fontSize: "32px",
                color: "#ffffff",
                fontFamily: "Arial"
            }
        ).setOrigin(0.5);

        // ----------------------------
        // Progress Box
        // ----------------------------

        const progressBox = this.add.graphics();
        const progressBar = this.add.graphics();

        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRoundedRect(
            this.cameras.main.centerX - 210,
            this.cameras.main.centerY,
            420,
            40,
            8
        );

        // ----------------------------
        // Percentage Text
        // ----------------------------

        const percentText = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 60,
            "0%",
            {
                fontSize: "24px",
                color: "#ffffff",
                fontFamily: "Arial"
            }
        ).setOrigin(0.5);

        // ----------------------------
        // Update Loading Bar
        // ----------------------------

        this.load.on("progress", (value) => {

            progressBar.clear();

            progressBar.fillStyle(0x00d4ff, 1);

            progressBar.fillRoundedRect(
                this.cameras.main.centerX - 200,
                this.cameras.main.centerY + 10,
                400 * value,
                20,
                8
            );

            percentText.setText(`${Math.round(value * 100)}%`);

        });

        // ----------------------------
        // Loading Complete
        // ----------------------------

        this.load.on("complete", () => {

            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();

        });

        // ===================================================
        // LOAD ASSETS HERE
        // ===================================================

        /*
        Example:

        this.load.image("logo", "assets/images/logo.png");
        this.load.image("laptop", "assets/images/laptop.png");

        this.load.audio("click", "assets/audio/click.mp3");

        this.load.json("room1", "data/room1.json");
        */

    }

    create() {

        this.scene.start("MainMenuScene");

    }

}