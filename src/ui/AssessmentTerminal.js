import Phaser from "phaser";

import RoomView from "./RoomView";

export default class AssessmentTerminal {

    constructor(scene) {

        this.scene = scene;

        this.width = scene.scale.width;
        this.height = scene.scale.height;

        this.buttons = {};

        this.draw();

    }

    draw() {

        const w = this.width;
        const h = this.height;

        // =====================================================
        // Layout Constants
        // =====================================================

        const topBarHeight = 60;
        const bottomBarHeight = 90;
        const sidebarWidth = w * 0.22;
        const padding = 20;

        // =====================================================
        // Background
        // =====================================================

        this.scene.add.rectangle(
            w / 2,
            h / 2,
            w,
            h,
            0x36415d
        );

        // =====================================================
        // TOP BAR
        // =====================================================

        this.scene.add.rectangle(
            w / 2,
            topBarHeight / 2,
            w,
            topBarHeight,
            0x1d2638
        );

        this.scene.add.text(
            padding,
            16,
            "Startup Lab Assessment Terminal",
            {
                fontSize: "26px",
                color: "#ffffff",
                fontStyle: "bold"
            }
        );

        this.scoreText = this.scene.add.text(
            w - 220,
            16,
            "Score: 0",
            {
                fontSize: "22px",
                color: "#ffffff"
            }
        );

        this.timeText = this.scene.add.text(
            w - 95,
            16,
            "15:00",
            {
                fontSize: "22px",
                color: "#ffffff"
            }
        );

        // =====================================================
        // SIDEBAR
        // =====================================================

        const sidebarHeight =
            h - topBarHeight - bottomBarHeight;

        this.scene.add.rectangle(
            sidebarWidth / 2,
            topBarHeight + sidebarHeight / 2,
            sidebarWidth,
            sidebarHeight,
            0x2d364c
        );

        const buttonStart = 110;
        const buttonGap = 70;

        this.createButton(
            "notebook",
            "📒 Notebook",
            buttonStart
        );

        this.createButton(
            "assessment",
            "📋 Assessment",
            buttonStart + buttonGap
        );

        this.createButton(
            "hint",
            "💡 Request Hint",
            buttonStart + buttonGap * 2
        );

        this.createButton(
            "progress",
            "📊 Progress",
            buttonStart + buttonGap * 3
        );

        // =====================================================
        // ROOM VIEW
        // =====================================================

        const roomX = sidebarWidth + padding;

        const roomY = topBarHeight + padding;

        const roomWidth =
            w - sidebarWidth - padding * 2;

        const roomHeight =
            h
            - topBarHeight
            - bottomBarHeight
            - padding * 2;

        this.roomView = new RoomView(

            this.scene,

            roomX + roomWidth / 2,

            roomY + roomHeight / 2,

            roomWidth,

            roomHeight

        );

        this.roomTitle = this.scene.add.text(

            roomX + 20,

            roomY + 20,

            "Idea Lab",

            {

                fontSize: "28px",

                color: "#000000",

                fontStyle: "bold"

            }

        );

        // =====================================================
        // DIALOGUE BAR
        // =====================================================

        this.scene.add.rectangle(
            w / 2,
            h - bottomBarHeight / 2,
            w,
            bottomBarHeight,
            0x1d2638
        );

        this.dialogueText = this.scene.add.text(
            padding,
            h - 65,
            "Welcome, Candidate.",
            {
                fontSize: "20px",
                color: "#ffffff",
                wordWrap: {
                    width: w - 260
                }
            }
        );

        this.continueButton = this.scene.add.text(
            w - 170,
            h - 60,
            "[ Continue ]",
            {
                fontSize: "22px",
                color: "#00ff88",
                fontStyle: "bold"
            }
        )
        .setInteractive({
            useHandCursor: true
        });

    }

    // =====================================================
    // Sidebar Buttons
    // =====================================================

    createButton(id, label, y) {

        const button = this.scene.add.text(
            25,
            y,
            label,
            {
                fontSize: "22px",
                fontFamily: "Arial",
                fontStyle: "bold",
                color: "#ffffff"
            }
        )
        .setInteractive({
            useHandCursor: true
        });

        button.on("pointerover", () => {

            button.setColor("#ffd54f");

            button.setScale(1.05);
            button.setX(30);

        });

        button.on("pointerout", () => {

            button.setColor("#ffffff");

            button.setScale(1);
            button.setX(25);

        });

        button.on("pointerdown", () => {

            if (this.callback) {

                this.callback(id);

            }

        });

        this.buttons[id] = button;

    }

    // =====================================================
    // Public Methods
    // =====================================================

    onButtonClick(callback) {

        this.callback = callback;

    }

    setDialogue(text) {

        this.dialogueText.setText(text);

    }

    setButtonEnabled(id, enabled) {

        const button = this.buttons[id];

        if (!button) {

            console.warn(
                `Button '${id}' not found.`
            );

            return;

        }

        if (enabled) {

            button.setAlpha(1);

            button.setInteractive({
                useHandCursor: true
            });

            button.setColor("#ffffff");

        }   
        else {

            button.setAlpha(0.4);

            button.disableInteractive();

            button.setColor("#888888");

        }

    }

    setScore(score) {

        this.scoreText.setText(`Score: ${score}`);

    }

    setRoom(roomName) {

        this.roomTitle.setText(roomName);

    }

    setTime(time) {

        this.timeText.setText(time);

    }

    getRoomView() {

        return this.roomView;

    }

}