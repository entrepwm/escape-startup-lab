import Phaser from "phaser";
import RoomView from "./RoomView";

export default class AssessmentTerminal {

    constructor(scene) {

        this.scene = scene;

        // =====================================================
        // FIXED LOGICAL GAME SIZE
        // =====================================================
        //
        // IMPORTANT:
        // The game itself is 1280 × 720.
        // Phaser.Scale.FIT is responsible for scaling the canvas.
        //
        // UI coordinates inside the game must NEVER follow the
        // browser's physical pixel dimensions.
        // =====================================================

        this.width = 1280;
        this.height = 720;

        this.buttons = {};
        this.callback = null;

        this.draw();

        this.scene.events.once(
            Phaser.Scenes.Events.SHUTDOWN,
            () => this.destroy()
        );
    }


    // =====================================================
    // DRAW
    // =====================================================

    draw() {

        const w = this.width;
        const h = this.height;

        // =====================================================
        // FIXED LAYOUT
        // =====================================================

        this.topBarHeight = 60;
        this.bottomBarHeight = 90;
        this.sidebarWidth = 280;
        this.padding = 20;

        // =====================================================
        // BACKGROUND
        // =====================================================

        this.background =
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

        this.topBar =
            this.scene.add.rectangle(
                w / 2,
                this.topBarHeight / 2,
                w,
                this.topBarHeight,
                0x1d2638
            );

        this.terminalTitle =
            this.scene.add.text(
                20,
                16,
                "Startup Lab Assessment Terminal",
                {
                    fontSize: "26px",
                    fontFamily: "monospace",
                    color: "#ffffff",
                    fontStyle: "bold"
                }
            );

        // =====================================================
        // SCORE HUD
        // =====================================================

        this.scoreLabel =
            this.scene.add.text(
                980,
                17,
                "SCORE",
                {
                    fontSize: "12px",
                    fontFamily: "monospace",
                    fontStyle: "bold",
                    color: "#91a5bd"
                }
            );

        this.scoreText =
            this.scene.add.text(
                1085,
                15,
                "0",
                {
                    fontSize: "23px",
                    fontFamily: "monospace",
                    fontStyle: "bold",
                    color: "#ffffff",
                    align: "right"
                }
            )
            .setOrigin(1, 0);

        this.hudDivider =
            this.scene.add.rectangle(
                1115,
                30,
                1,
                30,
                0x596a82
            );

        this.timeText =
            this.scene.add.text(
                1260,
                15,
                "20:00",
                {
                    fontSize: "23px",
                    fontFamily: "monospace",
                    fontStyle: "bold",
                    color: "#ffffff",
                    align: "right"
                }
            )
            .setOrigin(1, 0);

        // =====================================================
        // SIDEBAR
        // =====================================================

        const sidebarHeight =
            h -
            this.topBarHeight -
            this.bottomBarHeight;

        this.sidebar =
            this.scene.add.rectangle(
                this.sidebarWidth / 2,
                this.topBarHeight + sidebarHeight / 2,
                this.sidebarWidth,
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

        //
        // FIXED:
        // left   = 300
        // top    = 80
        // width  = 960
        // height = 530
        //
        // These values never change between devices.
        //

        this.roomLeft = 300;
        this.roomTop = 80;
        this.roomWidth = 960;
        this.roomHeight = 530;

        this.roomView =
            new RoomView(
                this.scene,
                this.roomLeft + this.roomWidth / 2,
                this.roomTop + this.roomHeight / 2,
                this.roomWidth,
                this.roomHeight
            );

        // =====================================================
        // ROOM TITLE
        // =====================================================

        this.roomTitle =
            this.scene.add.text(
                this.roomLeft + 30,
                this.roomTop + 22,
                "MISSION 01: PROBLEM DISCOVERY",
                {
                    fontSize: "22px",
                    fontFamily: "monospace",
                    fontStyle: "bold",
                    color: "#ffffff",
                    stroke: "#000000",
                    strokeThickness: 6,
                    shadow: {
                        offsetX: 2,
                        offsetY: 2,
                        color: "#000000",
                        blur: 3,
                        fill: true
                    }
                }
            )
            .setDepth(30);

        this.roomSubtitle =
            this.scene.add.text(
                this.roomLeft + 32,
                this.roomTop + 52,
                "RESTAURANT",
                {
                    fontSize: "15px",
                    fontFamily: "monospace",
                    fontStyle: "bold",
                    color: "#d9ecff",
                    stroke: "#000000",
                    strokeThickness: 5,
                    shadow: {
                        offsetX: 2,
                        offsetY: 2,
                        color: "#000000",
                        blur: 3,
                        fill: true
                    }
                }
            )
            .setDepth(30);

        // =====================================================
        // BOTTOM BAR
        // =====================================================

        this.bottomBar =
            this.scene.add.rectangle(
                w / 2,
                h - this.bottomBarHeight / 2,
                w,
                this.bottomBarHeight,
                0x1d2638
            );

        this.dialogueText =
            this.scene.add.text(
                20,
                h - 65,
                "Welcome, Candidate.",
                {
                    fontSize: "20px",
                    fontFamily: "monospace",
                    color: "#ffffff",
                    wordWrap: {
                        width: 1000
                    }
                }
            );

        // =====================================================
        // CONTINUE
        // =====================================================

        this.continueButton =
            this.scene.add.text(
                1265,
                h - 60,
                "[ Continue ]",
                {
                    fontSize: "22px",
                    fontFamily: "monospace",
                    color: "#00ff88",
                    fontStyle: "bold"
                }
            )
            .setOrigin(1, 0)
            .setInteractive({
                useHandCursor: true
            });

        this.buttons.continue =
            this.continueButton;

        this.continueButton.on(
            "pointerover",
            () => {
                this.continueButton
                    .setColor("#7dffb5")
                    .setScale(1.04);
            }
        );

        this.continueButton.on(
            "pointerout",
            () => {
                this.continueButton
                    .setColor("#00ff88")
                    .setScale(1);
            }
        );

        this.continueButton.on(
            "pointerdown",
            () => {

                console.log(
                    "Continue button clicked"
                );

                if (this.callback) {
                    this.callback(
                        "continue"
                    );
                }
            }
        );
    }


    // =====================================================
    // CREATE SIDEBAR BUTTON
    // =====================================================

    createButton(
        id,
        label,
        y
    ) {

        const button =
            this.scene.add.text(
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

        button.on(
            "pointerover",
            () => {

                if (
                    !button.input ||
                    !button.input.enabled
                ) {
                    return;
                }

                button.setColor(
                    "#ffd54f"
                );

                button.setScale(
                    1.05
                );

                button.setX(
                    30
                );
            }
        );

        button.on(
            "pointerout",
            () => {

                if (
                    !button.input ||
                    !button.input.enabled
                ) {
                    return;
                }

                button.setColor(
                    "#ffffff"
                );

                button.setScale(
                    1
                );

                button.setX(
                    25
                );
            }
        );

        button.on(
            "pointerdown",
            () => {

                if (this.callback) {
                    this.callback(
                        id
                    );
                }
            }
        );

        this.buttons[id] =
            button;
    }


    // =====================================================
    // CALLBACK
    // =====================================================

    onButtonClick(
        callback
    ) {

        this.callback =
            callback;
    }


    // =====================================================
    // SET DIALOGUE
    // =====================================================

    setDialogue(
        text
    ) {

        if (this.dialogueText) {
            this.dialogueText.setText(
                text
            );
        }
    }


    // =====================================================
    // ENABLE / DISABLE BUTTON
    // =====================================================

    setButtonEnabled(
        id,
        enabled
    ) {

        const button =
            this.buttons[id];

        if (!button) {

            console.warn(
                `Button '${id}' not found.`
            );

            return;
        }

        if (enabled) {

            button.setAlpha(
                1
            );

            button.setInteractive({
                useHandCursor: true
            });

            if (id === "continue") {
                button.setColor(
                    "#00ff88"
                );
            }
            else {
                button.setColor(
                    "#ffffff"
                );
            }
        }
        else {

            button.setAlpha(
                0.4
            );

            button.disableInteractive();

            button.setColor(
                "#888888"
            );
        }
    }


    // =====================================================
    // SET SCORE
    // =====================================================

    setScore(
        score
    ) {

        if (!this.scoreText) {
            return;
        }

        const safeScore =
            Number(score) || 0;

        this.scoreText.setText(
            String(safeScore)
        );

        this.scene.tweens.killTweensOf(
            this.scoreText
        );

        this.scoreText.setScale(
            1
        );

        this.scene.tweens.add({
            targets: this.scoreText,
            scaleX: 1.08,
            scaleY: 1.08,
            duration: 90,
            yoyo: true,
            ease: "Sine.Out"
        });
    }


    // =====================================================
    // SET ROOM
    // =====================================================

    setRoom(
        roomName
    ) {

        const lines =
            String(roomName)
                .split("\n");

        const title =
            lines[0] ||
            "MISSION 01: PROBLEM DISCOVERY";

        const subtitle =
            lines[1] ||
            "";

        this.roomTitle.setText(
            title
        );

        if (this.roomSubtitle) {
            this.roomSubtitle.setText(
                subtitle
            );
        }
    }


    // =====================================================
    // SET TIMER DISPLAY
    // =====================================================

    setTime(
        time
    ) {

        if (!this.timeText) {
            return;
        }

        this.timeText.setText(
            String(time)
        );
    }


    // =====================================================
    // TIMER COLOR
    // =====================================================

    setTimeWarningLevel(
        level = "normal"
    ) {

        if (!this.timeText) {
            return;
        }

        switch (level) {

            case "danger":
                this.timeText.setColor(
                    "#ff5c5c"
                );
                break;

            case "warning":
                this.timeText.setColor(
                    "#ffd166"
                );
                break;

            default:
                this.timeText.setColor(
                    "#ffffff"
                );
                break;
        }
    }


    // =====================================================
    // GET ROOM VIEW
    // =====================================================

    getRoomView() {

        return this.roomView;
    }


    // =====================================================
    // DESTROY
    // =====================================================

    destroy() {

        // No browser-size layout listener on purpose.
        //
        // Phaser.Scale.FIT scales the entire fixed logical
        // 1280 × 720 canvas instead.
    }
}
