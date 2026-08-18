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
        // FIXED LOGICAL SIZE
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

        const buttonX =
            640;

        const buttonY =
            425;

        const buttonWidth =
            470;

        const buttonHeight =
            105;


        // =====================================================
        // HOVER / TOUCH BORDER
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
        // DESKTOP HOVER
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
                        180,

                    ease:
                        "Sine.Out"

                });

            }

        );


        // =====================================================
        // DESKTOP HOVER OUT
        // =====================================================

        startButton.on(

            "pointerout",

            () => {

                /*
                 * IMPORTANT:
                 *
                 * Once the game is starting, do not allow
                 * pointerout to interfere with anything.
                 */

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
                        150,

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


                // =============================================
                // VISUAL FEEDBACK
                // =============================================

                hoverBorder
                    .setAlpha(
                        1
                    )
                    .setScale(
                        1
                    )
                    .setStrokeStyle(

                        3,
                        0xffffff,
                        1

                    );


                // =============================================
                // START IMMEDIATELY
                // =============================================

                /*
                 * IMPORTANT MOBILE FIX:
                 *
                 * Do NOT wait for a tween's onComplete.
                 *
                 * Mobile browsers can emit pointerout when
                 * the finger is released, which may cancel
                 * that tween.
                 */

                this.startGame();

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