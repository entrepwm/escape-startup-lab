import Phaser from "phaser";


export default class MainMenuScene extends Phaser.Scene {

    constructor() {

        super("MainMenuScene");

    }


    // =====================================================
    // CREATE
    // =====================================================

    create() {

        // =====================================================
        // FIXED LOGICAL GAME SIZE
        // =====================================================

        const GAME_WIDTH =
            1280;

        const GAME_HEIGHT =
            720;


        const CENTER_X =
            GAME_WIDTH / 2;

        const CENTER_Y =
            GAME_HEIGHT / 2;


        this.isStarting =
            false;


        // =====================================================
        // BACKGROUND
        // =====================================================

        this.cameras.main.setBackgroundColor(
            "#07131f"
        );


        if (
            !this.textures.exists(
                "main-menu-background"
            )
        ) {

            console.error(
                "main-menu-background texture was not loaded."
            );

            return;

        }


        const background =
            this.add.image(

                CENTER_X,
                CENTER_Y,

                "main-menu-background"

            );


        background
            .setDisplaySize(

                GAME_WIDTH,
                GAME_HEIGHT

            )
            .setDepth(
                0
            );


        // =====================================================
        // START BUTTON POSITION
        // =====================================================

        /*
         * Fixed coordinates inside the 1280 × 720 game.
         *
         * Phaser.Scale.FIT scales the artwork and this
         * hit area together on desktop, laptop and mobile.
         *
         * The button is intentionally a little larger than
         * the visible green button so it is easy to tap
         * with a finger.
         */

        const buttonX =
            640;

        const buttonY =
            425;

        const buttonWidth =
            470;

        const buttonHeight =
            105;


        // =====================================================
        // SUBTLE HOVER BORDER
        // =====================================================

        const hoverBorder =
            this.add.rectangle(

                buttonX,
                buttonY,

                buttonWidth,
                buttonHeight,

                0x000000,
                0

            )
            .setStrokeStyle(

                2,
                0xaaffea,
                0

            )
            .setAlpha(
                0
            )
            .setDepth(
                3
            );


        // =====================================================
        // INVISIBLE CLICK / TOUCH AREA
        // =====================================================

        const startButton =
            this.add.rectangle(

                buttonX,
                buttonY,

                buttonWidth,
                buttonHeight,

                0xffffff,
                0.001

            )
            .setInteractive({

                useHandCursor:
                    true

            })
            .setDepth(
                20
            );


        // =====================================================
        // MOBILE INPUT SAFETY
        // =====================================================

        /*
         * Phaser's pointer events handle both mouse and touch.
         *
         * This is intentionally a large invisible rectangle
         * so the user does not need pixel-perfect tapping.
         */

        startButton.input.hitArea.setTo(

            -buttonWidth / 2,
            -buttonHeight / 2,

            buttonWidth,
            buttonHeight

        );


        // =====================================================
        // HOVER IN
        // =====================================================

        startButton.on(

            "pointerover",

            () => {

                if (
                    this.isStarting
                ) {

                    return;

                }


                this.tweens.killTweensOf(
                    hoverBorder
                );


                hoverBorder
                    .setScale(
                        1
                    )
                    .setAlpha(
                        0
                    )
                    .setStrokeStyle(

                        2,
                        0xaaffea,
                        0.85

                    );


                this.tweens.add({

                    targets:
                        hoverBorder,

                    alpha:
                        0.9,

                    scaleX:
                        1.015,

                    scaleY:
                        1.03,

                    duration:
                        220,

                    ease:
                        "Sine.Out"

                });

            }

        );


        // =====================================================
        // HOVER OUT
        // =====================================================

        startButton.on(

            "pointerout",

            () => {

                if (
                    this.isStarting
                ) {

                    return;

                }


                this.tweens.killTweensOf(
                    hoverBorder
                );


                this.tweens.add({

                    targets:
                        hoverBorder,

                    alpha:
                        0,

                    scaleX:
                        1,

                    scaleY:
                        1,

                    duration:
                        180,

                    ease:
                        "Sine.Out"

                });

            }

        );


        // =====================================================
        // CLICK / TOUCH
        // =====================================================

        startButton.on(

            "pointerdown",

            () => {

                if (
                    this.isStarting
                ) {

                    return;

                }


                console.log(
                    "Start Assessment pressed"
                );


                this.tweens.killTweensOf(
                    hoverBorder
                );


                hoverBorder
                    .setAlpha(
                        1
                    )
                    .setStrokeStyle(

                        3,
                        0xffffff,
                        1

                    );


                this.tweens.add({

                    targets:
                        hoverBorder,

                    scaleX:
                        0.99,

                    scaleY:
                        0.96,

                    duration:
                        80,

                    yoyo:
                        true,

                    ease:
                        "Quad.Out",

                    onComplete:
                        () => {

                            this.startGame();

                        }

                });

            }

        );


        // =====================================================
        // POINTER UP FALLBACK
        // =====================================================

        /*
         * Some mobile browsers can occasionally behave more
         * reliably with pointerup after a tap.
         *
         * This does not start twice because startGame()
         * already checks this.isStarting.
         */

        startButton.on(

            "pointerup",

            () => {

                if (
                    !this.isStarting
                ) {

                    this.startGame();

                }

            }

        );


        // =====================================================
        // KEYBOARD SUPPORT
        // =====================================================

        if (
            this.input.keyboard
        ) {

            this.input.keyboard.on(

                "keydown-ENTER",

                () => {

                    this.startGame();

                }

            );


            this.input.keyboard.on(

                "keydown-SPACE",

                () => {

                    this.startGame();

                }

            );

        }


        // =====================================================
        // VERY SUBTLE BACKGROUND MOTION
        // =====================================================

        /*
         * Tiny zoom only.
         *
         * Keep this extremely subtle so the baked-in green
         * button does not visibly move away from the fixed
         * hit area.
         */

        const originalScaleX =
            background.scaleX;

        const originalScaleY =
            background.scaleY;


        this.tweens.add({

            targets:
                background,

            scaleX:
                originalScaleX *
                1.001,

            scaleY:
                originalScaleY *
                1.001,

            duration:
                8000,

            yoyo:
                true,

            repeat:
                -1,

            ease:
                "Sine.easeInOut"

        });


        // =====================================================
        // FADE IN
        // =====================================================

        this.cameras.main.fadeIn(

            450,

            4,
            12,
            20

        );

    }


    // =====================================================
    // START GAME
    // =====================================================

    startGame() {

        if (
            this.isStarting
        ) {

            return;

        }


        this.isStarting =
            true;


        console.log(
            "Starting TeamNameScene..."
        );


        // =====================================================
        // FADE OUT
        // =====================================================

        this.cameras.main.fadeOut(

            350,

            3,
            10,
            17

        );


        this.cameras.main.once(

            Phaser.Cameras.Scene2D.Events
                .FADE_OUT_COMPLETE,

            () => {

                this.scene.start(
                    "TeamNameScene"
                );

            }

        );

    }

}