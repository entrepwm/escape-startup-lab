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
        // FIXED LOGICAL GAME SIZE
        // =================================================

        const GAME_WIDTH =
            1280;

        const GAME_HEIGHT =
            720;


        const CENTER_X =
            GAME_WIDTH / 2;

        const CENTER_Y =
            GAME_HEIGHT / 2;


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
                        loop:
                            true,

                        volume:
                            0.25
                    }
                );


            this.game.openingMusic.play();

        }


        // =================================================
        // BACKGROUND
        // =================================================

        this.background =
            this.add.image(

                CENTER_X,
                CENTER_Y,

                "intro-background"

            );


        this.background
            .setDisplaySize(

                GAME_WIDTH,
                GAME_HEIGHT

            )
            .setDepth(
                -10
            );


        // =================================================
        // CINEMATIC OVERLAY
        // =================================================

        this.overlay =
            this.add.rectangle(

                CENTER_X,
                CENTER_Y,

                GAME_WIDTH,
                GAME_HEIGHT,

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

                CENTER_X,
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

                CENTER_X,
                125,

                "Asesmen Pendiri Dimulai",

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
        // EVA POSITION
        // =================================================

        this.evaTargetX =
            CENTER_X;

        this.evaTargetY =
            455;


        // =================================================
        // EVA
        // =================================================

        this.eva =
            this.add.image(

                this.evaTargetX,

                this.evaTargetY +
                35,

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
                    "Selamat datang, Tim Kandidat.",

                pose:
                    "wink"

            },

            {

                speaker:
                    "EVA",

                text:
                    "Saya EVA, Asisten Virtual Kewirausahaan Anda.",

                pose:
                    "confident"

            },

            {

                speaker:
                    "EVA",

                text:
                    "Hari ini Anda akan menyelesaikan tiga Asesmen Pendiri yang dirancang untuk menguji cara berpikir kewirausahaan Anda.",

                pose:
                    "present"

            },

            {

                speaker:
                    "EVA",

                text:
                    "Periksa setiap ruangan dengan teliti. Bukti dapat tersembunyi di dalam laporan, wawancara, catatan keuangan, dan umpan balik pelanggan.",

                pose:
                    "talk"

            },

            {

                speaker:
                    "EVA",

                text:
                    "Tujuan Anda bukan sekadar menemukan 'jawaban yang benar', tetapi memberikan rekomendasi terkuat yang didukung oleh bukti.",

                pose:
                    "think"

            },

            {

                speaker:
                    "EVA",

                text:
                    "Komite Investasi akan menilai kualitas penalaran Anda serta proposal akhir yang Anda berikan.",

                pose:
                    "confident"

            },

            {

                speaker:
                    "EVA",

                text:
                    "Semoga berhasil.\n\nAsesmen Anda dimulai sekarang.",

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

            (
                currentDialogue,
                index
            ) => {

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

    setEvaPose(
        pose
    ) {

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

            textureMap[
                pose
            ] ||

            "eva-idle";


        if (
            !this.textures.exists(
                texture
            )
        ) {

            console.warn(

                `Texture EVA '${texture}' tidak ditemukan.`

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
        // NORMALIZE SIZE
        // =================================================

        this.evaBaseScale =

            this.evaTargetHeight /
            this.eva.height;


        this.eva.setScale(
            this.evaBaseScale
        );


        // =================================================
        // STOP PREVIOUS POSE POP
        // =================================================

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
                    this.evaBaseScale *
                    1.025,

                scaleY:
                    this.evaBaseScale *
                    1.025,

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
                    this.evaTargetY -
                    4,

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

                                this.dialogueData.length -
                                1

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


        if (
            this.evaPoseTween
        ) {

            this.evaPoseTween.stop();


            this.evaPoseTween =
                null;

        }


        if (
            this.evaIdleTween
        ) {

            this.evaIdleTween.stop();


            this.evaIdleTween =
                null;

        }


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


        this.tweens.add({

            targets:
                this.eva,

            alpha:
                0,

            y:
                this.eva.y +
                20,

            duration:
                300,

            ease:
                "Power2"

        });


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
    // CLEANUP
    // =====================================================

    cleanupScene() {

        if (
            this.evaEntranceTween
        ) {

            this.evaEntranceTween.stop();


            this.evaEntranceTween =
                null;

        }


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


        if (
            this.evaPoseTween
        ) {

            this.evaPoseTween.stop();


            this.evaPoseTween =
                null;

        }


        if (
            this.evaIdleTween
        ) {

            this.evaIdleTween.stop();


            this.evaIdleTween =
                null;

        }

    }

}