import Phaser from "phaser";


export default class DialogueBox {

    constructor(scene) {

        this.scene =
            scene;

        this.dialogues =
            [];

        this.currentIndex =
            0;

        this.onComplete =
            null;

        this.onDialogueChange =
            null;

        this.container =
            null;

        this.background =
            null;

        this.speakerText =
            null;

        this.dialogueText =
            null;

        this.continueText =
            null;

        this.advanceZone =
            null;

        this.isFinished =
            false;


        // =====================================================
        // VISUAL SETTINGS
        // =====================================================

        this.boxHeight =
            230;

        this.sideMargin =
            60;

        this.padding =
            38;


        // =====================================================
        // INPUT
        // =====================================================

        this.handleAdvance =
            this.handleAdvance.bind(
                this
            );


        this.handleResize =
            this.handleResize.bind(
                this
            );

    }


    // =====================================================
    // START
    // =====================================================

    start(
        dialogues,
        onComplete = null,
        onDialogueChange = null
    ) {

        this.dialogues =
            Array.isArray(
                dialogues
            )
                ? dialogues
                : [];


        this.currentIndex =
            0;


        this.onComplete =
            onComplete;


        this.onDialogueChange =
            onDialogueChange;


        this.isFinished =
            false;


        if (
            this.dialogues.length === 0
        ) {

            if (
                this.onComplete
            ) {

                this.onComplete();

            }

            return;

        }


        // =================================================
        // CREATE UI
        // =================================================

        this.createUI();


        // =================================================
        // SHOW FIRST DIALOGUE
        // =================================================

        this.showDialogue();


        // =================================================
        // KEYBOARD SUPPORT
        // =================================================

        if (
            this.scene.input.keyboard
        ) {

            this.scene.input.keyboard.on(

                "keydown-SPACE",

                this.handleAdvance

            );


            this.scene.input.keyboard.on(

                "keydown-ENTER",

                this.handleAdvance

            );

        }


        // =================================================
        // RESIZE SUPPORT
        // =================================================

        this.scene.scale.on(

            "resize",

            this.handleResize

        );


        // =================================================
        // CLEANUP WHEN SCENE CLOSES
        // =================================================

        this.scene.events.once(

            Phaser.Scenes.Events.SHUTDOWN,

            () => {

                this.destroy();

            }

        );

    }


    // =====================================================
    // CREATE UI
    // =====================================================

    createUI() {

        const width =
            this.scene.scale.width;


        const height =
            this.scene.scale.height;


        // =================================================
        // CONTAINER
        // =================================================

        this.container =
            this.scene.add.container(
                0,
                0
            );


        this.container.setDepth(
            100
        );


        // =================================================
        // BACKGROUND PANEL
        // =================================================

        this.background =
            this.scene.add.graphics();


        this.drawBackground(
            width,
            height
        );


        this.container.add(
            this.background
        );


        // =================================================
        // SPEAKER
        // =================================================

        this.speakerText =
            this.scene.add.text(

                this.sideMargin +
                this.padding,

                height -
                this.boxHeight +
                32,

                "",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "23px",

                    fontStyle:
                        "bold",

                    color:
                        "#43d9ff",

                    stroke:
                        "#00151c",

                    strokeThickness:
                        2

                }

            );


        this.container.add(
            this.speakerText
        );


        // =================================================
        // DIALOGUE TEXT
        // =================================================

        this.dialogueText =
            this.scene.add.text(

                this.sideMargin +
                this.padding,

                height -
                this.boxHeight +
                78,

                "",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "21px",

                    color:
                        "#ffffff",

                    wordWrap: {

                        width:

                            width -
                            (
                                this.sideMargin * 2
                            ) -
                            (
                                this.padding * 2
                            )

                    },

                    lineSpacing:
                        8

                }

            );


        this.container.add(
            this.dialogueText
        );


        // =================================================
        // CONTINUE TEXT
        // =================================================

        this.continueText =
            this.scene.add.text(

                width -
                this.sideMargin -
                this.padding,

                height - 25,

                "Click to Continue →",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "15px",

                    fontStyle:
                        "bold",

                    color:
                        "#7d8992",

                    align:
                        "right"

                }

            )
            .setOrigin(
                1,
                1
            );


        this.container.add(
            this.continueText
        );


        // =================================================
        // CONTINUE ANIMATION
        // =================================================

        this.continueTween =
            this.scene.tweens.add({

                targets:
                    this.continueText,

                alpha:
                    0.35,

                duration:
                    850,

                yoyo:
                    true,

                repeat:
                    -1,

                ease:
                    "Sine.InOut"

            });


        // =================================================
        // CLICKABLE AREA
        // =================================================

        this.advanceZone =
            this.scene.add.zone(

                width / 2,

                height -
                (
                    this.boxHeight / 2
                ),

                width -
                (
                    this.sideMargin * 2
                ),

                this.boxHeight

            );


        this.advanceZone
            .setInteractive({

                useHandCursor:
                    true

            });


        this.advanceZone.on(

            "pointerdown",

            this.handleAdvance

        );


        this.container.add(
            this.advanceZone
        );

    }


    // =====================================================
    // DRAW BACKGROUND
    // =====================================================

    drawBackground(
        width,
        height
    ) {

        if (
            !this.background
        ) {

            return;

        }


        this.background.clear();


        const boxX =
            this.sideMargin;


        const boxY =
            height -
            this.boxHeight;


        const boxWidth =

            width -
            (
                this.sideMargin * 2
            );


        // =================================================
        // DROP SHADOW
        // =================================================

        this.background.fillStyle(

            0x000000,
            0.35

        );


        this.background.fillRoundedRect(

            boxX + 6,
            boxY + 8,

            boxWidth,
            this.boxHeight,

            8

        );


        // =================================================
        // MAIN PANEL
        // =================================================

        this.background.fillStyle(

            0x0d1117,
            0.94

        );


        this.background.fillRoundedRect(

            boxX,
            boxY,

            boxWidth,
            this.boxHeight,

            8

        );


        // =================================================
        // BORDER
        // =================================================

        this.background.lineStyle(

            2,

            0x38bdf8,

            1

        );


        this.background.strokeRoundedRect(

            boxX,
            boxY,

            boxWidth,
            this.boxHeight,

            8

        );


        // =================================================
        // TOP ACCENT
        // =================================================

        this.background.fillStyle(

            0x38bdf8,
            1

        );


        this.background.fillRect(

            boxX,
            boxY,

            boxWidth,
            4

        );

    }


    // =====================================================
    // SHOW CURRENT DIALOGUE
    // =====================================================

    showDialogue() {

        if (

            this.currentIndex >=
            this.dialogues.length

        ) {

            this.complete();

            return;

        }


        const current =
            this.dialogues[
                this.currentIndex
            ];


        // =================================================
        // SPEAKER
        // =================================================

        this.speakerText.setText(

            current.speaker ||
            ""

        );


        // =================================================
        // DIALOGUE
        // =================================================

        this.dialogueText.setText(

            current.text ||
            ""

        );


        // =================================================
        // CONTINUE MESSAGE
        // =================================================

        const isLast =

            this.currentIndex ===
            this.dialogues.length - 1;


        this.continueText.setText(

            isLast
                ? "Click to Begin →"
                : "Click to Continue →"

        );


        // =================================================
        // NOTIFY SCENE
        // =================================================

        /*
         * This is the important addition.
         *
         * IntroScene can now change EVA's pose exactly
         * when the dialogue itself changes.
         */

        if (
            this.onDialogueChange
        ) {

            this.onDialogueChange(

                current,

                this.currentIndex

            );

        }

    }


    // =====================================================
    // ADVANCE
    // =====================================================

    handleAdvance() {

        if (
            this.isFinished
        ) {

            return;

        }


        this.currentIndex++;


        if (

            this.currentIndex >=
            this.dialogues.length

        ) {

            this.complete();

            return;

        }


        this.showDialogue();

    }


    // =====================================================
    // COMPLETE
    // =====================================================

    complete() {

        if (
            this.isFinished
        ) {

            return;

        }


        this.isFinished =
            true;


        const callback =
            this.onComplete;


        this.destroy();


        if (
            callback
        ) {

            callback();

        }

    }


    // =====================================================
    // RESPONSIVE RESIZE
    // =====================================================

    handleResize(gameSize) {

        if (
            !this.container
        ) {

            return;

        }


        const width =
            gameSize.width;


        const height =
            gameSize.height;


        // =================================================
        // BACKGROUND
        // =================================================

        this.drawBackground(
            width,
            height
        );


        // =================================================
        // SPEAKER
        // =================================================

        this.speakerText.setPosition(

            this.sideMargin +
            this.padding,

            height -
            this.boxHeight +
            32

        );


        // =================================================
        // DIALOGUE
        // =================================================

        this.dialogueText.setPosition(

            this.sideMargin +
            this.padding,

            height -
            this.boxHeight +
            78

        );


        this.dialogueText.setWordWrapWidth(

            width -
            (
                this.sideMargin * 2
            ) -
            (
                this.padding * 2
            )

        );


        // =================================================
        // CONTINUE TEXT
        // =================================================

        this.continueText.setPosition(

            width -
            this.sideMargin -
            this.padding,

            height - 25

        );


        // =================================================
        // CLICK AREA
        // =================================================

        this.advanceZone.setPosition(

            width / 2,

            height -
            (
                this.boxHeight / 2
            )

        );


        this.advanceZone.setSize(

            width -
            (
                this.sideMargin * 2
            ),

            this.boxHeight

        );

    }


    // =====================================================
    // DESTROY
    // =====================================================

    destroy() {

        // =================================================
        // REMOVE INPUT
        // =================================================

        if (

            this.scene &&
            this.scene.input &&
            this.scene.input.keyboard

        ) {

            this.scene.input.keyboard.off(

                "keydown-SPACE",

                this.handleAdvance

            );


            this.scene.input.keyboard.off(

                "keydown-ENTER",

                this.handleAdvance

            );

        }


        // =================================================
        // REMOVE RESIZE
        // =================================================

        if (
            this.scene &&
            this.scene.scale
        ) {

            this.scene.scale.off(

                "resize",

                this.handleResize

            );

        }


        // =================================================
        // STOP TWEEN
        // =================================================

        if (
            this.continueTween
        ) {

            this.continueTween.stop();


            this.continueTween =
                null;

        }


        // =================================================
        // REMOVE POINTER LISTENER
        // =================================================

        if (
            this.advanceZone
        ) {

            this.advanceZone.off(

                "pointerdown",

                this.handleAdvance

            );

        }


        // =================================================
        // DESTROY CONTAINER
        // =================================================

        if (
            this.container
        ) {

            this.container.destroy(
                true
            );


            this.container =
                null;

        }


        this.background =
            null;

        this.speakerText =
            null;

        this.dialogueText =
            null;

        this.continueText =
            null;

        this.advanceZone =
            null;


        // =================================================
        // CALLBACK REFERENCES
        // =================================================

        this.onDialogueChange =
            null;

    }

}