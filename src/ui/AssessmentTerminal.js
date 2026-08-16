import Phaser from "phaser";

import RoomView from "./RoomView";


export default class AssessmentTerminal {

    constructor(scene) {

        this.scene = scene;

        this.width =
            scene.scale.width;

        this.height =
            scene.scale.height;

        this.buttons = {};

        this.callback = null;

        this.draw();

    }


    // =====================================================
    // DRAW TERMINAL
    // =====================================================

    draw() {

        const w =
            this.width;

        const h =
            this.height;


        // =====================================================
        // LAYOUT CONSTANTS
        // =====================================================

        const topBarHeight =
            60;

        const bottomBarHeight =
            90;

        const sidebarWidth =
            w * 0.22;

        const padding =
            20;


        // =====================================================
        // BACKGROUND
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


        // =====================================================
        // TERMINAL TITLE
        // =====================================================

        this.scene.add.text(

            padding,

            16,

            "Startup Lab Assessment Terminal",

            {

                fontSize:
                    "26px",

                fontFamily:
                    "monospace",

                color:
                    "#ffffff",

                fontStyle:
                    "bold"

            }

        );


        // =====================================================
        // SCORE
        // =====================================================

        this.scoreText =
            this.scene.add.text(

                w - 220,

                16,

                "Score: 0",

                {

                    fontSize:
                        "22px",

                    fontFamily:
                        "monospace",

                    color:
                        "#ffffff"

                }

            );


        // =====================================================
        // TIMER
        // =====================================================

        this.timeText =
            this.scene.add.text(

                w - 95,

                16,

                "15:00",

                {

                    fontSize:
                        "22px",

                    fontFamily:
                        "monospace",

                    color:
                        "#ffffff"

                }

            );


        // =====================================================
        // SIDEBAR
        // =====================================================

        const sidebarHeight =

            h -
            topBarHeight -
            bottomBarHeight;


        this.scene.add.rectangle(

            sidebarWidth / 2,

            topBarHeight +
            sidebarHeight / 2,

            sidebarWidth,

            sidebarHeight,

            0x2d364c

        );


        const buttonStart =
            110;

        const buttonGap =
            70;


        // =====================================================
        // NOTEBOOK
        // =====================================================

        this.createButton(

            "notebook",

            "📒 Notebook",

            buttonStart

        );


        // =====================================================
        // ASSESSMENT
        // =====================================================

        this.createButton(

            "assessment",

            "📋 Assessment",

            buttonStart +
            buttonGap

        );


        // =====================================================
        // HINT
        // =====================================================

        this.createButton(

            "hint",

            "💡 Request Hint",

            buttonStart +
            buttonGap * 2

        );


        // =====================================================
        // PROGRESS
        // =====================================================

        this.createButton(

            "progress",

            "📊 Progress",

            buttonStart +
            buttonGap * 3

        );


        // =====================================================
        // ROOM VIEW
        // =====================================================

        const roomX =

            sidebarWidth +
            padding;


        const roomY =

            topBarHeight +
            padding;


        const roomWidth =

            w -
            sidebarWidth -
            padding * 2;


        const roomHeight =

            h -
            topBarHeight -
            bottomBarHeight -
            padding * 2;


        this.roomView =
            new RoomView(

                this.scene,

                roomX +
                roomWidth / 2,

                roomY +
                roomHeight / 2,

                roomWidth,

                roomHeight

            );


        // =====================================================
        // ROOM TITLE
        // =====================================================

        this.roomTitle =
            this.scene.add.text(

                roomX + 30,

                roomY + 22,

                "MISSION 01: PROBLEM DISCOVERY",

                {

                    fontSize:
                        "22px",

                    fontFamily:
                        "monospace",

                    fontStyle:
                        "bold",

                    color:
                        "#ffffff",

                    stroke:
                        "#000000",

                    strokeThickness:
                        6,

                    shadow: {

                        offsetX:
                            2,

                        offsetY:
                            2,

                        color:
                            "#000000",

                        blur:
                            3,

                        fill:
                            true

                    }

                }

            );


        // =====================================================
        // ROOM SUBTITLE
        // =====================================================

        this.roomSubtitle =
            this.scene.add.text(

                roomX + 32,

                roomY + 52,

                "RESTAURANT",

                {

                    fontSize:
                        "15px",

                    fontFamily:
                        "monospace",

                    fontStyle:
                        "bold",

                    color:
                        "#d9ecff",

                    stroke:
                        "#000000",

                    strokeThickness:
                        5,

                    shadow: {

                        offsetX:
                            2,

                        offsetY:
                            2,

                        color:
                            "#000000",

                        blur:
                            3,

                        fill:
                            true

                    }

                }

            );


        // =====================================================
        // BOTTOM DIALOGUE BAR
        // =====================================================

        this.scene.add.rectangle(

            w / 2,

            h -
            bottomBarHeight / 2,

            w,

            bottomBarHeight,

            0x1d2638

        );


        // =====================================================
        // DIALOGUE TEXT
        // =====================================================

        this.dialogueText =
            this.scene.add.text(

                padding,

                h - 65,

                "Welcome, Candidate.",

                {

                    fontSize:
                        "20px",

                    fontFamily:
                        "monospace",

                    color:
                        "#ffffff",

                    wordWrap: {

                        width:
                            w - 260

                    }

                }

            );


        // =====================================================
        // CONTINUE BUTTON
        // =====================================================

        this.continueButton =
            this.scene.add.text(

                w - 170,

                h - 60,

                "[ Continue ]",

                {

                    fontSize:
                        "22px",

                    fontFamily:
                        "monospace",

                    color:
                        "#00ff88",

                    fontStyle:
                        "bold"

                }

            )
            .setInteractive({

                useHandCursor:
                    true

            });


        // =====================================================
        // STORE CONTINUE BUTTON
        // =====================================================

        /*
         * This lets setButtonEnabled("continue", ...)
         * work the same way as the sidebar buttons.
         */

        this.buttons.continue =
            this.continueButton;


        // =====================================================
        // CONTINUE — HOVER IN
        // =====================================================

        this.continueButton.on(

            "pointerover",

            () => {

                this.continueButton
                    .setColor(
                        "#7dffb5"
                    )
                    .setScale(
                        1.05
                    );

            }

        );


        // =====================================================
        // CONTINUE — HOVER OUT
        // =====================================================

        this.continueButton.on(

            "pointerout",

            () => {

                this.continueButton
                    .setColor(
                        "#00ff88"
                    )
                    .setScale(
                        1
                    );

            }

        );


        // =====================================================
        // CONTINUE — CLICK
        // =====================================================

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
    // SIDEBAR BUTTON
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

                    fontSize:
                        "22px",

                    fontFamily:
                        "Arial",

                    fontStyle:
                        "bold",

                    color:
                        "#ffffff"

                }

            )
            .setInteractive({

                useHandCursor:
                    true

            });


        // =====================================================
        // HOVER IN
        // =====================================================

        button.on(

            "pointerover",

            () => {

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


        // =====================================================
        // HOVER OUT
        // =====================================================

        button.on(

            "pointerout",

            () => {

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


        // =====================================================
        // CLICK
        // =====================================================

        button.on(

            "pointerdown",

            () => {

                if (
                    this.callback
                ) {

                    this.callback(
                        id
                    );

                }

            }

        );


        // =====================================================
        // STORE BUTTON
        // =====================================================

        this.buttons[id] =
            button;

    }


    // =====================================================
    // BUTTON CALLBACK
    // =====================================================

    onButtonClick(callback) {

        this.callback =
            callback;

    }


    // =====================================================
    // SET DIALOGUE
    // =====================================================

    setDialogue(text) {

        this.dialogueText.setText(
            text
        );

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


        // =================================================
        // ENABLE
        // =================================================

        if (enabled) {

            button.setAlpha(
                1
            );


            button.setInteractive({

                useHandCursor:
                    true

            });


            // Continue has its own green color.
            if (
                id === "continue"
            ) {

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


        // =================================================
        // DISABLE
        // =================================================

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

    setScore(score) {

        this.scoreText.setText(

            `Score: ${score}`

        );

    }


    // =====================================================
    // SET ROOM TITLE
    // =====================================================

    setRoom(roomName) {

        /*
         * Example:
         *
         * MISSION 01: PROBLEM DISCOVERY
         * RESTAURANT
         *
         * The first line becomes the main title.
         * The second line becomes the subtitle.
         */

        const lines =

            String(
                roomName
            )
                .split(
                    "\n"
                );


        const title =

            lines[0] ||

            "MISSION 01: PROBLEM DISCOVERY";


        const subtitle =

            lines[1] ||

            "";


        this.roomTitle.setText(
            title
        );


        if (
            this.roomSubtitle
        ) {

            this.roomSubtitle.setText(
                subtitle
            );

        }

    }


    // =====================================================
    // SET TIMER
    // =====================================================

    setTime(time) {

        this.timeText.setText(
            time
        );

    }


    // =====================================================
    // GET ROOM VIEW
    // =====================================================

    getRoomView() {

        return this.roomView;

    }

}