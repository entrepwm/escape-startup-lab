import Phaser from "phaser";


export default class PreloadScene extends Phaser.Scene {

    constructor() {

        super("PreloadScene");

    }


    // =====================================================
    // PRELOAD
    // =====================================================

    preload() {

        // =================================================
        // BACKGROUNDS
        // =================================================

        this.load.image(
            "main-menu-background",
            "assets/backgrounds/main-menu-background.png"
        );


        this.load.image(
            "intro-background",
            "assets/backgrounds/intro-background.png"
        );


        this.load.image(
            "room1-restaurant",
            "assets/rooms/room1-restaurant.png"
        );


        this.load.image(
            "room2-office",
            "assets/rooms/room2-office.png"
        );


        this.load.image(
            "room3-ceo",
            "assets/rooms/room3-ceo.png"
        );


        // =================================================
        // EVA POSES
        // =================================================

        this.load.image(
            "eva-idle",
            "assets/characters/eva/eva-idle.png"
        );


        this.load.image(
            "eva-talk",
            "assets/characters/eva/eva-talk.png"
        );


        this.load.image(
            "eva-wink",
            "assets/characters/eva/eva-wink.png"
        );


        this.load.image(
            "eva-think",
            "assets/characters/eva/eva-think.png"
        );


        this.load.image(
            "eva-present",
            "assets/characters/eva/eva-present.png"
        );


        this.load.image(
            "eva-confident",
            "assets/characters/eva/eva-confident.png"
        );


        // =================================================
        // ROOM CHARACTERS
        // =================================================

        this.load.image(
            "customer-south",
            "assets/characters/customer/customer-south.png"
        );


        this.load.image(
            "employee-south",
            "assets/characters/employee/employee-south.png"
        );


        // =================================================
        // LOAD ERROR DEBUGGING
        // =================================================

        this.load.on(
            "loaderror",
            (file) => {

                console.error(
                    "FAILED TO LOAD ASSET:",
                    file.key,
                    file.src
                );

            }
        );


        // =================================================
        // LOADING SCREEN
        // =================================================

        this.cameras.main.setBackgroundColor(
            "#07131f"
        );


        const centerX =
            this.cameras.main.centerX;


        const centerY =
            this.cameras.main.centerY;


        // =================================================
        // LOADING TITLE
        // =================================================

        const loadingText =
            this.add.text(

                centerX,
                centerY - 80,

                "Loading Escape Startup Lab...",

                {

                    fontSize:
                        "30px",

                    color:
                        "#ffffff",

                    fontFamily:
                        "monospace",

                    fontStyle:
                        "bold"

                }

            )
            .setOrigin(
                0.5
            );


        // =================================================
        // PROGRESS BOX
        // =================================================

        const progressBox =
            this.add.graphics();


        progressBox.fillStyle(
            0x1b2638,
            0.95
        );


        progressBox.fillRoundedRect(

            centerX - 210,
            centerY,

            420,
            40,

            8

        );


        // =================================================
        // PROGRESS BAR
        // =================================================

        const progressBar =
            this.add.graphics();


        // =================================================
        // PERCENTAGE
        // =================================================

        const percentText =
            this.add.text(

                centerX,
                centerY + 65,

                "0%",

                {

                    fontSize:
                        "20px",

                    color:
                        "#8be9fd",

                    fontFamily:
                        "monospace"

                }

            )
            .setOrigin(
                0.5
            );


        // =================================================
        // CURRENT FILE
        // =================================================

        const assetText =
            this.add.text(

                centerX,
                centerY + 105,

                "",

                {

                    fontSize:
                        "14px",

                    color:
                        "#8a98a8",

                    fontFamily:
                        "monospace"

                }

            )
            .setOrigin(
                0.5
            );


        // =================================================
        // PROGRESS EVENT
        // =================================================

        this.load.on(
            "progress",
            (value) => {

                progressBar.clear();


                progressBar.fillStyle(
                    0x00d4ff,
                    1
                );


                progressBar.fillRoundedRect(

                    centerX - 200,
                    centerY + 10,

                    400 * value,
                    20,

                    6

                );


                percentText.setText(

                    `${Math.round(
                        value * 100
                    )}%`

                );

            }
        );


        // =================================================
        // CURRENT ASSET EVENT
        // =================================================

        this.load.on(
            "fileprogress",
            (file) => {

                assetText.setText(
                    `Loading: ${file.key}`
                );

            }
        );


        // =================================================
        // COMPLETE
        // =================================================

        this.load.on(
            "complete",
            () => {

                console.log(
                    "================================="
                );

                console.log(
                    "ASSET LOAD CHECK"
                );

                console.log(
                    "================================="
                );


                console.log(
                    "Main menu loaded:",
                    this.textures.exists(
                        "main-menu-background"
                    )
                );


                console.log(
                    "Intro background loaded:",
                    this.textures.exists(
                        "intro-background"
                    )
                );


                console.log(
                    "Room 1 loaded:",
                    this.textures.exists(
                        "room1-restaurant"
                    )
                );


                console.log(
                    "Room 2 loaded:",
                    this.textures.exists(
                        "room2-office"
                    )
                );


                console.log(
                    "Room 3 loaded:",
                    this.textures.exists(
                        "room3-ceo"
                    )
                );


                console.log(
                    "---------------------------------"
                );

                console.log(
                    "EVA idle loaded:",
                    this.textures.exists(
                        "eva-idle"
                    )
                );


                console.log(
                    "EVA talk loaded:",
                    this.textures.exists(
                        "eva-talk"
                    )
                );


                console.log(
                    "EVA wink loaded:",
                    this.textures.exists(
                        "eva-wink"
                    )
                );


                console.log(
                    "EVA think loaded:",
                    this.textures.exists(
                        "eva-think"
                    )
                );


                console.log(
                    "EVA present loaded:",
                    this.textures.exists(
                        "eva-present"
                    )
                );


                console.log(
                    "EVA confident loaded:",
                    this.textures.exists(
                        "eva-confident"
                    )
                );


                console.log(
                    "---------------------------------"
                );


                console.log(
                    "Customer loaded:",
                    this.textures.exists(
                        "customer-south"
                    )
                );


                console.log(
                    "Employee loaded:",
                    this.textures.exists(
                        "employee-south"
                    )
                );


                console.log(
                    "================================="
                );


                // =========================================
                // DESTROY LOADING UI
                // =========================================

                progressBar.destroy();

                progressBox.destroy();

                loadingText.destroy();

                percentText.destroy();

                assetText.destroy();

            }
        );

    }


    // =====================================================
    // CREATE
    // =====================================================

    create() {

        this.scene.start(
            "MainMenuScene"
        );

    }

}