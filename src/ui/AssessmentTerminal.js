import Phaser from "phaser";
import RoomView from "./RoomView";


export default class AssessmentTerminal {

    constructor(scene) {

        this.scene = scene;


        // =====================================================
        // FIXED LOGICAL GAME SIZE
        // =====================================================

        /*
         * Game dirancang pada resolusi logis 1280 × 720.
         *
         * Phaser.Scale.FIT akan menangani scaling ke berbagai
         * ukuran layar.
         *
         * Koordinat UI di dalam game tidak mengikuti ukuran
         * fisik browser.
         */

        this.width =
            1280;

        this.height =
            720;


        this.buttons =
            {};

        this.callback =
            null;


        this.draw();


        this.scene.events.once(

            Phaser.Scenes.Events.SHUTDOWN,

            () => {

                this.destroy();

            }

        );

    }


    // =====================================================
    // DRAW
    // =====================================================

    draw() {

        const w =
            this.width;

        const h =
            this.height;


        // =====================================================
        // FIXED LAYOUT
        // =====================================================

        this.topBarHeight =
            60;

        this.bottomBarHeight =
            90;

        this.sidebarWidth =
            280;

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


        this.terminalTitle =
            this.scene.add.text(

                20,
                16,

                "Terminal Asesmen Startup Lab",

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

        this.scoreLabel =
            this.scene.add.text(

                980,
                17,

                "SKOR",

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

                1085,
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


        this.createButton(

            "notebook",

            "📒 Catatan",

            buttonStart

        );


        this.createButton(

            "assessment",

            "📋 Asesmen",

            buttonStart +
            buttonGap

        );


        this.createButton(

            "hint",

            "💡 Petunjuk",

            buttonStart +
            buttonGap * 2

        );


        this.createButton(

            "progress",

            "📊 Progres",

            buttonStart +
            buttonGap * 3

        );


        // =====================================================
        // ROOM VIEW
        // =====================================================

        /*
         * Posisi RoomView tetap menggunakan koordinat fixed.
         *
         * left   = 300
         * top    = 80
         * width  = 960
         * height = 530
         *
         * Jangan mengubah nilai ini berdasarkan ukuran browser.
         */

        this.roomLeft =
            300;

        this.roomTop =
            80;

        this.roomWidth =
            960;

        this.roomHeight =
            530;


        this.roomView =
            new RoomView(

                this.scene,

                this.roomLeft +
                this.roomWidth / 2,

                this.roomTop +
                this.roomHeight / 2,

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

                "MISI 01: IDENTIFIKASI MASALAH",

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

            )
            .setDepth(
                30
            );


        this.roomSubtitle =
            this.scene.add.text(

                this.roomLeft + 32,
                this.roomTop + 52,

                "RESTORAN",

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

            )
            .setDepth(
                30
            );


        // =====================================================
        // BOTTOM BAR
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


        this.dialogueText =
            this.scene.add.text(

                20,

                h - 65,

                "Selamat datang, Kandidat.",

                {
                    fontSize:
                        "20px",

                    fontFamily:
                        "monospace",

                    color:
                        "#ffffff",

                    wordWrap: {

                        width:
                            1000

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

                "[ Lanjutkan ]",

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


        this.continueButton.on(

            "pointerdown",

            () => {

                console.log(
                    "Tombol Lanjutkan ditekan"
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

                if (
                    this.callback
                ) {

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
            this.buttons[id];


        if (
            !button
        ) {

            console.warn(
                `Tombol '${id}' tidak ditemukan.`
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
            Number(score) ||
            0;


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
    // SET ROOM
    // =====================================================

    setRoom(
        roomName
    ) {

        const lines =

            String(roomName)
                .split(
                    "\n"
                );


        const title =

            lines[0] ||

            "MISI 01: IDENTIFIKASI MASALAH";


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

    setTime(
        time
    ) {

        if (
            !this.timeText
        ) {

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
    // GET ROOM VIEW
    // =====================================================

    getRoomView() {

        return this.roomView;

    }


    // =====================================================
    // DESTROY
    // =====================================================

    destroy() {

        /*
         * Tidak ada browser-size layout listener.
         *
         * Phaser.Scale.FIT menangani scaling seluruh canvas
         * fixed 1280 × 720.
         */

    }

}