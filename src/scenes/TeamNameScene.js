import Phaser from "phaser";


export default class TeamNameScene extends Phaser.Scene {

    constructor() {

        super("TeamNameScene");

    }


    create() {

        const width =
            this.scale.width;

        const height =
            this.scale.height;

        // =====================================================
        // AUDIO
        // =====================================================

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
        
        // =====================================================
        // BACKGROUND
        // =====================================================

        this.add.rectangle(
            width / 2,
            height / 2,
            width,
            height,
            0x101827
        );


        // =====================================================
        // PANEL
        // =====================================================

        const panelWidth =
            Math.min(720, width * 0.72);

        const panelHeight =
            430;


        this.add.rectangle(
            width / 2,
            height / 2,
            panelWidth,
            panelHeight,
            0x17263b
        )
        .setStrokeStyle(
            2,
            0x24b8ff
        );


        // =====================================================
        // HEADER
        // =====================================================

        this.add.text(
            width / 2,
            height / 2 - 155,
            "ESCAPE STARTUP LAB",
            {
                fontFamily: "monospace",
                fontSize: "16px",
                fontStyle: "bold",
                color: "#67d6ff"
            }
        )
        .setOrigin(0.5);


        this.add.text(
            width / 2,
            height / 2 - 110,
            "TEAM REGISTRATION",
            {
                fontFamily: "monospace",
                fontSize: "30px",
                fontStyle: "bold",
                color: "#ffffff"
            }
        )
        .setOrigin(0.5);


        this.add.text(
            width / 2,
            height / 2 - 65,
            "Enter your team name before beginning the Founder Assessment.",
            {
                fontFamily: "monospace",
                fontSize: "15px",
                color: "#aebdce",
                align: "center"
            }
        )
        .setOrigin(0.5);


        // =====================================================
        // HTML INPUT
        // =====================================================

        this.inputElement =
            document.createElement("input");


        this.inputElement.type =
            "text";


        this.inputElement.placeholder =
            "Enter team name";


        this.inputElement.maxLength =
            40;


        this.inputElement.autocomplete =
            "off";


        Object.assign(
            this.inputElement.style,
            {
                width: "440px",
                height: "50px",
                padding: "0 16px",
                fontFamily: "monospace",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#17263b",
                background: "#fbfaf7",
                border: "2px solid #24b8ff",
                borderRadius: "5px",
                outline: "none",
                boxSizing: "border-box",
                textAlign: "center"
            }
        );


        document.body.appendChild(
            this.inputElement
        );


        this.positionInput();


        // =====================================================
        // ERROR MESSAGE
        // =====================================================

        this.errorText =
            this.add.text(
                width / 2,
                height / 2 + 35,
                "",
                {
                    fontFamily: "monospace",
                    fontSize: "14px",
                    fontStyle: "bold",
                    color: "#ff7070"
                }
            )
            .setOrigin(0.5);


        // =====================================================
        // START BUTTON
        // =====================================================

        this.startButton =
            this.add.rectangle(
                width / 2,
                height / 2 + 105,
                300,
                54,
                0x203a55
            )
            .setStrokeStyle(
                2,
                0x24b8ff
            )
            .setInteractive({
                useHandCursor: true
            });


        this.startLabel =
            this.add.text(
                width / 2,
                height / 2 + 105,
                "BEGIN ASSESSMENT  →",
                {
                    fontFamily: "monospace",
                    fontSize: "17px",
                    fontStyle: "bold",
                    color: "#67d6ff"
                }
            )
            .setOrigin(0.5);


        this.startButton.on(
            "pointerover",
            () => {

                this.startButton.setFillStyle(
                    0x294d70
                );

                this.startLabel.setColor(
                    "#ffffff"
                );

            }
        );


        this.startButton.on(
            "pointerout",
            () => {

                this.startButton.setFillStyle(
                    0x203a55
                );

                this.startLabel.setColor(
                    "#67d6ff"
                );

            }
        );


        this.startButton.on(
            "pointerdown",
            () => {

                this.submitTeamName();

            }
        );


        // =====================================================
        // ENTER KEY
        // =====================================================

        this.keyHandler =
            (event) => {

                if (
                    event.key === "Enter"
                ) {

                    this.submitTeamName();

                }

            };


        this.inputElement.addEventListener(
            "keydown",
            this.keyHandler
        );


        // =====================================================
        // RESIZE
        // =====================================================

        this.scale.on(
            "resize",
            this.positionInput,
            this
        );


        // =====================================================
        // CLEANUP
        // =====================================================

        this.events.once(
            Phaser.Scenes.Events.SHUTDOWN,
            () => {

                this.cleanup();

            }
        );


        setTimeout(
            () => {

                this.inputElement?.focus();

            },
            100
        );

    }


    // =====================================================
    // SUBMIT TEAM
    // =====================================================

    submitTeamName() {

        if (
            !this.inputElement
        ) {

            return;

        }


        const teamName =
            this.inputElement.value
                .trim()
                .replace(/\s+/g, " ");


        if (
            teamName.length < 2
        ) {

            this.errorText.setText(
                "Please enter a valid team name."
            );

            return;

        }


        if (
            teamName.length > 40
        ) {

            this.errorText.setText(
                "Team name must be 40 characters or fewer."
            );

            return;

        }


        const scoreManager =
            this.game.scoreManager;


        if (
            !scoreManager
        ) {

            this.errorText.setText(
                "Game data could not be initialized."
            );

            return;

        }


        scoreManager.setTeamName(
            teamName
        );


        console.log(
            `Registered team: ${teamName}`
        );


        this.scene.start(
            "IntroScene"
        );

    }


    // =====================================================
    // POSITION DOM INPUT
    // =====================================================

    positionInput() {

        if (
            !this.inputElement
        ) {

            return;

        }


        const canvas =
            this.game.canvas;


        const rect =
            canvas.getBoundingClientRect();


        const scaleX =
            rect.width /
            this.scale.width;


        const scaleY =
            rect.height /
            this.scale.height;


        const inputWidth =
            440 * scaleX;


        const inputHeight =
            50 * scaleY;


        const centerX =
            rect.left +
            rect.width / 2;


        const centerY =
            rect.top +
            rect.height / 2 -
            8 * scaleY;


        this.inputElement.style.width =
            `${inputWidth}px`;


        this.inputElement.style.height =
            `${inputHeight}px`;


        this.inputElement.style.position =
            "fixed";


        this.inputElement.style.left =
            `${centerX - inputWidth / 2}px`;


        this.inputElement.style.top =
            `${centerY - inputHeight / 2}px`;


        this.inputElement.style.zIndex =
            "1000";

    }


    // =====================================================
    // CLEANUP
    // =====================================================

    cleanup() {

        this.scale.off(
            "resize",
            this.positionInput,
            this
        );


        if (
            this.inputElement
        ) {

            this.inputElement.removeEventListener(
                "keydown",
                this.keyHandler
            );


            this.inputElement.remove();


            this.inputElement =
                null;

        }

    }

}