import Phaser from "phaser";
import DialogueBox from "../ui/DialogueBox";


export default class IntroScene extends Phaser.Scene {

    constructor() {

        super("IntroScene");

    }


    // =====================================================
    // CREATE
    // =====================================================

    create() {

        // =================================================
        // AUDIO
        // =================================================

        if (
            !this.game.openingMusic
        ) {

            this.game.openingMusic =
                this.sound.add(
                    "opening-music",
                    {
                        loop: true,
                        volume: 0.25
                    }
                );

            this.game.openingMusic.play();

        }


        // =================================================
        // BACKGROUND
        // =================================================

        this.background =
            this.add.image(

                this.scale.width / 2,
                this.scale.height / 2,

                "intro-background"

            );


        this.background
            .setDisplaySize(
                this.scale.width,
                this.scale.height
            )
            .setDepth(
                -10
            );


        // =================================================
        // CINEMATIC OVERLAY
        // =================================================

        this.overlay =
            this.add.rectangle(

                this.scale.width / 2,
                this.scale.height / 2,

                this.scale.width,
                this.scale.height,

                0x000000,
                0.10

            )
            .setDepth(
                -5
            );


        // =================================================
        // TITLE
        // =================================================

        this.titleText =
            this.add.text(

                this.scale.width / 2,
                75,

                "ESCAPE STARTUP LAB",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "40px",

                    color:
                        "#ffffff",

                    fontStyle:
                        "bold",

                    stroke:
                        "#000000",

                    strokeThickness:
                        6,

                    align:
                        "center"

                }

            )
            .setOrigin(
                0.5
            )
            .setDepth(
                5
            );


        // =================================================
        // SUBTITLE
        // =================================================

        this.subtitleText =
            this.add.text(

                this.scale.width / 2,
                125,

                "Founder Assessment Initiated",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "21px",

                    color:
                        "#d8e4f5",

                    fontStyle:
                        "bold",

                    stroke:
                        "#000000",

                    strokeThickness:
                        4,

                    align:
                        "center"

                }

            )
            .setOrigin(
                0.5
            )
            .setDepth(
                5
            );


        // =================================================
        // EVA TARGET POSITION
        // =================================================

        const dialogueTopY =
            this.scale.height - 230;


        this.evaTargetX =
            this.scale.width / 2;


        this.evaTargetY =
            dialogueTopY - 80;


        // =================================================
        // EVA
        // =================================================

        this.eva =
            this.add.image(

                this.evaTargetX,
                this.evaTargetY + 35,

                "eva-idle"

            );


        this.eva
            .setOrigin(
                0.5,
                1
            )
            .setDepth(
                2
            )
            .setAlpha(
                0
            );


        // =================================================
        // NORMALIZE EVA SIZE
        // =================================================

        this.evaTargetHeight =
            300;


        this.evaBaseScale =
            this.evaTargetHeight /
            this.eva.height;


        this.eva.setScale(
            this.evaBaseScale
        );


        // =================================================
        // EVA ENTRANCE
        // =================================================

        this.evaEntranceTween =
            this.tweens.add({

                targets:
                    this.eva,

                y:
                    this.evaTargetY,

                alpha:
                    1,

                duration:
                    700,

                ease:
                    "Cubic.Out",

                onComplete:
                    () => {

                        this.evaEntranceTween =
                            null;


                        this.startEvaIdle();

                        this.scheduleRandomEvaPose();

                    }

            });


        // =================================================
        // TITLE INTRO
        // =================================================

        this.titleText.setAlpha(
            0
        );


        this.subtitleText.setAlpha(
            0
        );


        this.tweens.add({

            targets:
                this.titleText,

            alpha:
                1,

            duration:
                600,

            ease:
                "Power2"

        });


        this.tweens.add({

            targets:
                this.subtitleText,

            alpha:
                1,

            delay:
                150,

            duration:
                700,

            ease:
                "Power2"

        });


        // =================================================
        // CAMERA FADE IN
        // =================================================

        this.cameras.main.fadeIn(
            500
        );


        // =================================================
        // DIALOGUE DATA
        // =================================================

        this.dialogueData = [

            {
                speaker:
                    "EVA",

                text:
                    "Welcome, Candidate Team.",

                pose:
                    "wink"
            },

            {
                speaker:
                    "EVA",

                text:
                    "I am EVA, your Entrepreneurial Virtual Assistant.",

                pose:
                    "confident"
            },

            {
                speaker:
                    "EVA",

                text:
                    "Today you will complete three Founder Assessments designed to evaluate your entrepreneurial thinking.",

                pose:
                    "present"
            },

            {
                speaker:
                    "EVA",

                text:
                    "Search every room carefully. Evidence may be hidden inside reports, interviews, financial records, and customer feedback.",

                pose:
                    "talk"
            },

            {
                speaker:
                    "EVA",

                text:
                    "Your objective is not to find the 'correct answer', but to justify the strongest recommendation using evidence.",

                pose:
                    "think"
            },

            {
                speaker:
                    "EVA",

                text:
                    "The Investment Committee will evaluate both your reasoning and your final proposal.",

                pose:
                    "confident"
            },

            {
                speaker:
                    "EVA",

                text:
                    "Good luck.\n\nYour assessment begins now.",

                pose:
                    "wink"
            }

        ];


        // =================================================
        // DIALOGUE
        // =================================================

        this.dialogue =
            new DialogueBox(
                this
            );


        this.currentDialogueIndex =
            0;


        this.dialogue.start(

            this.dialogueData,

            () => {

                this.finishIntro();

            },

            (currentDialogue, index) => {

                this.currentDialogueIndex =
                    index;


                this.setEvaPose(

                    currentDialogue.pose ||
                    "idle"

                );


                this.scheduleRandomEvaPose();

            }

        );


        // =================================================
        // RESPONSIVE RESIZE
        // =================================================

        this.scale.on(

            "resize",

            this.handleResize,

            this

        );


        // =================================================
        // CLEANUP
        // =================================================

        this.events.once(

            Phaser.Scenes.Events.SHUTDOWN,

            () => {

                this.cleanupScene();

            }

        );

    }


    // =====================================================
    // SET EVA POSE
    // =====================================================

    setEvaPose(pose) {

        if (
            !this.eva
        ) {

            return;

        }


        const textureMap = {

            idle:
                "eva-idle",

            talk:
                "eva-talk",

            wink:
                "eva-wink",

            think:
                "eva-think",

            present:
                "eva-present",

            confident:
                "eva-confident"

        };


        const texture =
            textureMap[pose] ||
            "eva-idle";


        if (
            !this.textures.exists(
                texture
            )
        ) {

            console.warn(
                `EVA texture '${texture}' not found.`
            );

            return;

        }


        // =================================================
        // CHANGE TEXTURE
        // =================================================

        this.eva.setTexture(
            texture
        );


        // =================================================
        // RECALCULATE SCALE FOR THIS TEXTURE
        // =================================================

        /*
         * Some generated EVA images may have slightly
         * different pixel dimensions.
         */

        this.evaBaseScale =
            this.evaTargetHeight /
            this.eva.height;


        this.eva.setScale(
            this.evaBaseScale
        );


        // =================================================
        // STOP ONLY THE PREVIOUS POSE POP TWEEN
        // =================================================

        /*
         * IMPORTANT:
         *
         * We do NOT call:
         *
         * this.tweens.killTweensOf(this.eva)
         *
         * because EVA also has:
         *
         * - entrance tween
         * - idle bob tween
         *
         * which must keep running.
         */

        if (
            this.evaPoseTween
        ) {

            this.evaPoseTween.stop();

            this.evaPoseTween =
                null;

        }


        // =================================================
        // SMALL POSE POP
        // =================================================

        this.evaPoseTween =
            this.tweens.add({

                targets:
                    this.eva,

                scaleX:
                    this.evaBaseScale * 1.025,

                scaleY:
                    this.evaBaseScale * 1.025,

                duration:
                    110,

                yoyo:
                    true,

                ease:
                    "Sine.Out",

                onComplete:
                    () => {

                        this.evaPoseTween =
                            null;


                        if (
                            this.eva
                        ) {

                            this.eva.setScale(
                                this.evaBaseScale
                            );

                        }

                    }

            });

    }


    // =====================================================
    // EVA IDLE BOB
    // =====================================================

    startEvaIdle() {

        if (
            !this.eva
        ) {

            return;

        }


        if (
            this.evaIdleTween
        ) {

            this.evaIdleTween.stop();

            this.evaIdleTween =
                null;

        }


        this.evaIdleTween =
            this.tweens.add({

                targets:
                    this.eva,

                y:
                    this.evaTargetY - 4,

                duration:
                    1400,

                yoyo:
                    true,

                repeat:
                    -1,

                ease:
                    "Sine.InOut"

            });

    }


    // =====================================================
    // RANDOM EVA EXPRESSION
    // =====================================================

    scheduleRandomEvaPose() {

        if (
            this.evaRandomPoseTimer
        ) {

            this.evaRandomPoseTimer.remove(
                false
            );


            this.evaRandomPoseTimer =
                null;

        }


        const delay =
            Phaser.Math.Between(
                4000,
                7000
            );


        this.evaRandomPoseTimer =
            this.time.delayedCall(

                delay,

                () => {

                    this.playRandomEvaPose();

                }

            );

    }


    // =====================================================
    // PLAY RANDOM EVA POSE
    // =====================================================

    playRandomEvaPose() {

        if (
            !this.eva
        ) {

            return;

        }


        const randomPoses = [

            "wink",
            "confident",
            "present"

        ];


        const pose =
            Phaser.Utils.Array.GetRandom(
                randomPoses
            );


        this.setEvaPose(
            pose
        );


        // =================================================
        // RETURN TO CURRENT DIALOGUE POSE
        // =================================================

        if (
            this.evaReturnPoseTimer
        ) {

            this.evaReturnPoseTimer.remove(
                false
            );

        }


        this.evaReturnPoseTimer =
            this.time.delayedCall(

                900,

                () => {

                    if (
                        !this.eva
                    ) {

                        return;

                    }


                    const currentDialogue =
                        this.dialogueData[

                            Math.min(

                                this.currentDialogueIndex,

                                this.dialogueData.length - 1

                            )

                        ];


                    this.setEvaPose(

                        currentDialogue?.pose ||
                        "idle"

                    );


                    this.scheduleRandomEvaPose();

                }

            );

    }


    // =====================================================
    // FINISH INTRO
    // =====================================================

    finishIntro() {

        // =================================================
        // STOP RANDOM TIMERS
        // =================================================

        if (
            this.evaRandomPoseTimer
        ) {

            this.evaRandomPoseTimer.remove(
                false
            );


            this.evaRandomPoseTimer =
                null;

        }


        if (
            this.evaReturnPoseTimer
        ) {

            this.evaReturnPoseTimer.remove(
                false
            );


            this.evaReturnPoseTimer =
                null;

        }


        // =================================================
        // STOP POSE TWEEN
        // =================================================

        if (
            this.evaPoseTween
        ) {

            this.evaPoseTween.stop();

            this.evaPoseTween =
                null;

        }


        // =================================================
        // STOP IDLE TWEEN
        // =================================================

        if (
            this.evaIdleTween
        ) {

            this.evaIdleTween.stop();

            this.evaIdleTween =
                null;

        }


        // =================================================
        // FINAL EVA POSE
        // =================================================

        if (
            this.eva
        ) {

            this.eva.setTexture(
                "eva-idle"
            );


            this.evaBaseScale =
                this.evaTargetHeight /
                this.eva.height;


            this.eva.setScale(
                this.evaBaseScale
            );

        }


        // =================================================
        // EVA EXIT
        // =================================================

        this.tweens.add({

            targets:
                this.eva,

            alpha:
                0,

            y:
                this.eva.y + 20,

            duration:
                300,

            ease:
                "Power2"

        });


        // =================================================
        // CAMERA FADE OUT
        // =================================================

        this.cameras.main.fadeOut(
            500
        );


        this.cameras.main.once(

            "camerafadeoutcomplete",

            () => {

                this.scene.start(
                    "Room1Scene"
                );

            }

        );

    }


    // =====================================================
    // HANDLE RESIZE
    // =====================================================

    handleResize(gameSize) {

        const width =
            gameSize.width;


        const height =
            gameSize.height;


        // =================================================
        // BACKGROUND
        // =================================================

        this.background
            .setPosition(

                width / 2,
                height / 2

            )
            .setDisplaySize(

                width,
                height

            );


        // =================================================
        // OVERLAY
        // =================================================

        this.overlay
            .setPosition(

                width / 2,
                height / 2

            )
            .setSize(

                width,
                height

            );


        // =================================================
        // TITLE
        // =================================================

        this.titleText.setPosition(

            width / 2,
            75

        );


        // =================================================
        // SUBTITLE
        // =================================================

        this.subtitleText.setPosition(

            width / 2,
            125

        );


        // =================================================
        // EVA POSITION
        // =================================================

        const dialogueTopY =
            height - 230;


        this.evaTargetX =
            width / 2;


        this.evaTargetY =
            dialogueTopY - 80;


        if (
            this.eva
        ) {

            this.eva.setX(
                this.evaTargetX
            );


            /*
             * Don't forcibly reset Y while the bob
             * animation is active.
             */

            if (
                !this.evaIdleTween
            ) {

                this.eva.setY(
                    this.evaTargetY
                );

            }

        }

    }


    // =====================================================
    // CLEANUP
    // =====================================================

    cleanupScene() {

        // =================================================
        // RESIZE LISTENER
        // =================================================

        this.scale.off(

            "resize",

            this.handleResize,

            this

        );


        // =================================================
        // ENTRANCE TWEEN
        // =================================================

        if (
            this.evaEntranceTween
        ) {

            this.evaEntranceTween.stop();

            this.evaEntranceTween =
                null;

        }


        // =================================================
        // RANDOM POSE TIMER
        // =================================================

        if (
            this.evaRandomPoseTimer
        ) {

            this.evaRandomPoseTimer.remove(
                false
            );


            this.evaRandomPoseTimer =
                null;

        }


        // =================================================
        // RETURN POSE TIMER
        // =================================================

        if (
            this.evaReturnPoseTimer
        ) {

            this.evaReturnPoseTimer.remove(
                false
            );


            this.evaReturnPoseTimer =
                null;

        }


        // =================================================
        // POSE TWEEN
        // =================================================

        if (
            this.evaPoseTween
        ) {

            this.evaPoseTween.stop();

            this.evaPoseTween =
                null;

        }


        // =================================================
        // IDLE TWEEN
        // =================================================

        if (
            this.evaIdleTween
        ) {

            this.evaIdleTween.stop();

            this.evaIdleTween =
                null;

        }

    }

}