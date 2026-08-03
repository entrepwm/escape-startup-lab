import Phaser from "phaser";

export default class DesktopLayout {

    constructor(scene) {

        this.scene = scene;

        this.width = scene.scale.width;
        this.height = scene.scale.height;

        this.icons = [];
        this.iconClickCallback = null;

        this.createBackground();
        this.createTaskbar();
    }

    // =====================================================
    // BACKGROUND
    // =====================================================

    createBackground() {

        this.scene.add.rectangle(
            this.width / 2,
            this.height / 2,
            this.width,
            this.height,
            0x2f3b52
        );

    }

    // =====================================================
    // TASKBAR
    // =====================================================

    createTaskbar() {

        this.scene.add.rectangle(
            this.width / 2,
            25,
            this.width,
            50,
            0x1b2535
        );

        this.scene.add.text(
            20,
            13,
            "Escape Startup Lab",
            {
                fontSize: "22px",
                color: "#ffffff",
                fontStyle: "bold"
            }
        );

        this.timerText = this.scene.add.text(
            this.width - 140,
            13,
            "15:00",
            {
                fontSize: "22px",
                color: "#ffffff"
            }
        );

    }

    // =====================================================
    // ICONS
    // =====================================================

    addIcon(config) {

        const {

            id,
            label,
            icon,
            x,
            y

        } = config;

        const iconText = this.scene.add.text(
            x,
            y,
            icon,
            {
                fontSize: "48px"
            }
        )
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

        const labelText = this.scene.add.text(
            x,
            y + 45,
            label,
            {
                fontSize: "18px",
                color: "#ffffff",
                align: "center"
            }
        )
        .setOrigin(0.5);

        iconText.on("pointerover", () => {

            iconText.setScale(1.15);

        });

        iconText.on("pointerout", () => {

            iconText.setScale(1);

        });

        iconText.on("pointerdown", () => {

            if (this.iconClickCallback) {

                this.iconClickCallback(id);

            }

        });

        this.icons.push({
            id,
            iconText,
            labelText
        });

    }

    // =====================================================
    // EVENTS
    // =====================================================

    onIconClick(callback) {

        this.iconClickCallback = callback;

    }

    // =====================================================
    // TIMER
    // =====================================================

    setTimer(time) {

        this.timerText.setText(time);

    }

}