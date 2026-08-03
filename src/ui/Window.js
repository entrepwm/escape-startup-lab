import Phaser from "phaser";

export default class Window {

    constructor(scene) {

        this.scene = scene;

        this.width = scene.scale.width;
        this.height = scene.scale.height;

        this.elements = [];

        this.create();

    }

    create() {

        // =============================
        // Background Panel
        // =============================

        this.panel = this.scene.add.rectangle(
            this.width / 2,
            this.height / 2,
            650,
            420,
            0xffffff
        )
        .setStrokeStyle(2, 0x222222)
        .setVisible(false);

        // =============================
        // Title Bar
        // =============================

        this.titleBar = this.scene.add.rectangle(
            this.width / 2,
            this.height / 2 - 190,
            650,
            40,
            0x1b2535
        ).setVisible(false);

        // =============================
        // Title
        // =============================

        this.titleText = this.scene.add.text(
            this.width / 2 - 305,
            this.height / 2 - 203,
            "",
            {
                fontSize: "20px",
                color: "#ffffff",
                fontStyle: "bold"
            }
        ).setVisible(false);

        // =============================
        // Close Button
        // =============================

        this.closeButton = this.scene.add.text(
            this.width / 2 + 290,
            this.height / 2 - 205,
            "✕",
            {
                fontSize: "22px",
                color: "#ffffff"
            }
        )
        .setInteractive({ useHandCursor: true })
        .setVisible(false);

        // =============================
        // Content
        // =============================

        this.contentText = this.scene.add.text(
            this.width / 2 - 300,
            this.height / 2 - 145,
            "",
            {
                fontSize: "20px",
                color: "#000000",
                wordWrap: {
                    width: 580
                }
            }
        ).setVisible(false);

        this.elements = [
            this.panel,
            this.titleBar,
            this.titleText,
            this.closeButton,
            this.contentText
        ];

        this.closeButton.on("pointerdown", () => {

            this.close();

        });

    }

    // ======================================
    // Open Window
    // ======================================

    open(config) {

        this.titleText.setText(config.title);
        this.contentText.setText(config.content);

        this.elements.forEach(element => {

            element.setVisible(true);
            element.setAlpha(0);

        });

        this.scene.tweens.add({

            targets: this.elements,
            alpha: 1,
            duration: 200

        });

    }

    // ======================================
    // Close Window
    // ======================================

    close() {

        this.scene.tweens.add({

            targets: this.elements,
            alpha: 0,
            duration: 200,

            onComplete: () => {

                this.elements.forEach(element => {

                    element.setVisible(false);

                });

            }

        });

    }

}