import Phaser from "phaser";


export default class MainMenuScene extends Phaser.Scene {

    constructor() {

        super("MainMenuScene");

    }


    // =====================================================
    // CREATE
    // =====================================================

    create() {

        const width =
            this.scale.width;

        const height =
            this.scale.height;

        const centerX =
            width / 2;

        const centerY =
            height / 2;


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

                centerX,
                centerY,

                "main-menu-background"

            );


        background
            .setDisplaySize(
                width,
                height
            )
            .setDepth(
                0
            );


        // =====================================================
        // START BUTTON POSITION
        // =====================================================

        /*
         * These proportions match the actual green
         * Start Assessment button baked into the artwork.
         */

        const buttonX =
            centerX;

        const buttonY =
            height * 0.572;

        const buttonWidth =
            width * 0.35;

        const buttonHeight =
            height * 0.14;


        // =====================================================
        // SUBTLE HOVER BORDER
        // =====================================================

        /*
         * No large filled rectangle.
         *
         * The artwork already contains the green glow.
         * This border simply gives extra feedback when
         * the player hovers over the button.
         */

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
        // INVISIBLE CLICK AREA
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
                10
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
        // CLICK
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
                    "Start Assessment clicked"
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
         * Keep this extremely subtle.
         *
         * A large zoom would make the invisible button
         * stop aligning with the artwork.
         */

        const originalScaleX =
            background.scaleX;

        const originalScaleY =
            background.scaleY;


        this.tweens.add({

            targets:
                background,

            scaleX:
                originalScaleX * 1.002,

            scaleY:
                originalScaleY * 1.002,

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
            "Starting IntroScene..."
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
                    "IntroScene"
                );

            }

        );

    }

}