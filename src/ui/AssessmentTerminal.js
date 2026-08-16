import Phaser from "phaser";

import RoomView from "./RoomView";


export default class AssessmentTerminal {

    constructor(scene) {

        this.scene =
            scene;

        this.width =
            scene.scale.width;

        this.height =
            scene.scale.height;

        this.buttons =
            {};

        this.callback =
            null;


        this.draw();


        // =====================================================
        // CLEAN UP RESIZE LISTENER
        // =====================================================

        this.scene.events.once(

            Phaser.Scenes.Events.SHUTDOWN,

            () => {

                this.destroy();

            }

        );

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
        // LAYOUT
        // =====================================================

        this.topBarHeight =
            60;

        this.bottomBarHeight =
            90;

        this.sidebarWidth =
            w * 0.22;

        this.padding =
            20;


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


        // =====================================================
        // TERMINAL TITLE
        // =====================================================

        this.terminalTitle =
            this.scene.add.text(

                this.padding,
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
        // SCORE HUD
        // =====================================================

        /*
         * Fixed score slot.
         *
         * We separate the label and number so a score such as
         * 1100 cannot grow into the timer.
         */


        this.scoreLabel =
            this.scene.add.text(

                w - 300,
                17,

                "SCORE",

                {

                    fontSize:
                        "12px",

                    fontFamily:
                        "monospace",

                    fontStyle:
                        "bold",

                    color:
                        "#91a5bd"

                }

            );


        this.scoreText =
            this.scene.add.text(

                w - 195,
                15,

                "0",

                {

                    fontSize:
                        "23px",

                    fontFamily:
                        "monospace",

                    fontStyle:
                        "bold",

                    color:
                        "#ffffff",

                    align:
                        "right"

                }

            )
            .setOrigin(
                1,
                0
            );


        // =====================================================
        // SCORE / TIMER DIVIDER
        // =====================================================

        this.hudDivider =
            this.scene.add.rectangle(

                w - 165,
                30,

                1,
                30,

                0x596a82

            );


        // =====================================================
        // TIMER
        // =====================================================

        /*
         * IMPORTANT:
         *
         * AssessmentTerminal does NOT own the countdown.
         *
         * ScoreManager owns the remaining time.
         * Room1Scene / Room2Scene / Room3Scene update it.
         * This object only displays the formatted value.
         */

        this.timeText =
            this.scene.add.text(

                w - 20,
                15,

                "20:00",

                {

                    fontSize:
                        "23px",

                    fontFamily:
                        "monospace",

                    fontStyle:
                        "bold",

                    color:
                        "#ffffff",

                    align:
                        "right"

                }

            )
            .setOrigin(
                1,
                0
            );


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

                this.topBarHeight +
                sidebarHeight / 2,

                this.sidebarWidth,

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

            this.sidebarWidth +
            this.padding;


        const roomY =

            this.topBarHeight +
            this.padding;


        const roomWidth =

            w -
            this.sidebarWidth -
            this.padding * 2;


        const roomHeight =

            h -
            this.topBarHeight -
            this.bottomBarHeight -
            this.padding * 2;


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

        this.bottomBar =
            this.scene.add.rectangle(

                w / 2,

                h -
                this.bottomBarHeight / 2,

                w,

                this.bottomBarHeight,

                0x1d2638

            );


        // =====================================================
        // DIALOGUE TEXT
        // =====================================================

        this.dialogueText =
            this.scene.add.text(

                this.padding,

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
                            w - 300

                    }

                }

            );


        // =====================================================
        // CONTINUE BUTTON
        // =====================================================

        this.continueButton =
            this.scene.add.text(

                w - 15,

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
            .setOrigin(
                1,
                0
            )
            .setInteractive({

                useHandCursor:
                    true

            });


        this.buttons.continue =
            this.continueButton;


        // =====================================================
        // CONTINUE HOVER
        // =====================================================

        this.continueButton.on(

            "pointerover",

            () => {

                this.continueButton
                    .setColor(
                        "#7dffb5"
                    )
                    .setScale(
                        1.04
                    );

            }

        );


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
        // CONTINUE CLICK
        // =====================================================

        this.continueButton.on(

            "pointerdown",

            () => {

                console.log(
                    "Continue button clicked"
                );


                if (
                    this.callback
                ) {

                    this.callback(
                        "continue"
                    );

                }

            }

        );


        // =====================================================
        // RESPONSIVE RESIZE
        // =====================================================

        this.scene.scale.on(

            "resize",

            this.handleResize,

            this

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


        // =================================================
        // HOVER IN
        // =================================================

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


        // =================================================
        // HOVER OUT
        // =================================================

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


        // =================================================
        // CLICK
        // =================================================

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


        this.buttons[
            id
        ] =
            button;

    }


    // =====================================================
    // BUTTON CALLBACK
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

        if (
            this.dialogueText
        ) {

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
            this.buttons[
                id
            ];


        if (
            !button
        ) {

            console.warn(
                `Button '${id}' not found.`
            );

            return;

        }


        if (
            enabled
        ) {

            button.setAlpha(
                1
            );


            button.setInteractive({

                useHandCursor:
                    true

            });


            if (
                id ===
                "continue"
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

        if (
            !this.scoreText
        ) {

            return;

        }


        const safeScore =
            Number(
                score
            ) || 0;


        this.scoreText.setText(
            String(
                safeScore
            )
        );


        // =================================================
        // SMALL FEEDBACK ANIMATION
        // =================================================

        this.scene.tweens.killTweensOf(
            this.scoreText
        );


        this.scoreText.setScale(
            1
        );


        this.scene.tweens.add({

            targets:
                this.scoreText,

            scaleX:
                1.08,

            scaleY:
                1.08,

            duration:
                90,

            yoyo:
                true,

            ease:
                "Sine.Out"

        });

    }


    // =====================================================
    // SET ROOM TITLE
    // =====================================================

    setRoom(
        roomName
    ) {

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
    // SET TIMER DISPLAY
    // =====================================================

    /*
     * DISPLAY ONLY.
     *
     * Do not create a Phaser timer here.
     *
     * ScoreManager owns the global remaining time.
     */

    setTime(
        time
    ) {

        if (
            !this.timeText
        ) {

            return;

        }


        this.timeText.setText(
            String(
                time
            )
        );

    }


    // =====================================================
    // OPTIONAL TIMER COLOR HELPER
    // =====================================================

    setTimeWarningLevel(
        level = "normal"
    ) {

        if (
            !this.timeText
        ) {

            return;

        }


        switch (
            level
        ) {

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
    // HANDLE RESIZE
    // =====================================================

    handleResize(
        gameSize
    ) {

        const w =
            gameSize.width;


        this.width =
            w;


        // =================================================
        // SCORE LABEL
        // =================================================

        if (
            this.scoreLabel
        ) {

            this.scoreLabel.setPosition(

                w - 300,
                17

            );

        }


        // =================================================
        // SCORE VALUE
        // =================================================

        if (
            this.scoreText
        ) {

            this.scoreText.setPosition(

                w - 195,
                15

            );

        }


        // =================================================
        // DIVIDER
        // =================================================

        if (
            this.hudDivider
        ) {

            this.hudDivider.setPosition(

                w - 165,
                30

            );

        }


        // =================================================
        // TIMER
        // =================================================

        if (
            this.timeText
        ) {

            this.timeText.setPosition(

                w - 20,
                15

            );

        }


        // =================================================
        // CONTINUE BUTTON
        // =================================================

        if (
            this.continueButton
        ) {

            this.continueButton.setX(
                w - 15
            );

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

        this.scene.scale.off(

            "resize",

            this.handleResize,

            this

        );

    }

}