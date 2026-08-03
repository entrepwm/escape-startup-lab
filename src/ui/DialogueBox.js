import Phaser from "phaser";

export default class DialogueBox {

    constructor(scene) {

        this.scene = scene;

        this.dialogues = [];
        this.currentIndex = 0;
        this.onComplete = null;

        this.colors = {
            panel: 0x111111,
            speaker: "#00d4ff",
            text: "#ffffff",
            hint: "#aaaaaa"
        };

        this.fonts = {
            speaker: "30px",
            dialogue: "28px",
            hint: "22px"
        };

        this.createUI();

    }

    createUI() {

        const width = this.scene.scale.width;
        const height = this.scene.scale.height;

        // Background Panel
        this.panel = this.scene.add.rectangle(
            width / 2,
            height - 180,
            width - 120,
            240,
            this.colors.panel,
            0.9
        );

        // Panel Border
        this.panelBorder = this.scene.add.rectangle(
            width / 2,
            height - 300,
            width - 120,
            4,
            0x4FC3F7
        );

        // Speaker Name
        this.speakerText = this.scene.add.text(
            100,
            height - 270,
            "",
            {
                fontSize: this.fonts.speaker,
                fontStyle: "bold",
                color: "#7FDBFF"
            }
        );

        // Dialogue Text
        this.dialogueText = this.scene.add.text(
            100,
            height - 220,
            "",
            {
                fontSize: this.fonts.dialogue,
                color: this.colors.text,
                wordWrap: {
                    width: width - 200
                }
            }
        );

        // Continue Hint
        this.continueText = this.scene.add.text(
            width - 220,
            height - 90,
            "Click to Continue",
            {
                fontSize: this.fonts.hint,
                color: this.colors.hint
            }
        );
        
        // Blinking Animation
        this.scene.tweens.add({
            targets: this.continueText,
            alpha: 0.3,
            duration: 700,
            yoyo: true,
            repeat: -1
        });

        // ----------------------------
        // Store all UI elements
        // ----------------------------

        this.elements = [
            this.panel,
            this.panelBorder,
            this.speakerText,
            this.dialogueText,
            this.continueText
        ];

        // Hide everything initially
        this.hide();

    }

    start(dialogues, onComplete = null) {

        this.dialogues = dialogues;
        this.currentIndex = 0;
        this.onComplete = onComplete;

        this.showDialogue();
        this.waitForInput();

    }

    showDialogue() {

        this.show();

        const current = this.dialogues[this.currentIndex];

        this.speakerText.setText(current.speaker);
        this.dialogueText.setText(current.text);

    }

    nextDialogue() {

        this.currentIndex++;

        if (this.currentIndex >= this.dialogues.length) {

            this.hide();

            if (this.onComplete) {
            this.onComplete();
            }

            return;
        }

        this.showDialogue();
        this.waitForInput();

    }

    waitForInput() {

        this.scene.input.once("pointerdown", () => {
            this.nextDialogue();
        });

        this.scene.input.keyboard.once("keydown-SPACE", () => {
            this.nextDialogue();
        });

        this.scene.input.keyboard.once("keydown-ENTER", () => {
            this.nextDialogue();
        });

    }
    
    show() {

        this.elements.forEach(element => {
            element.setVisible(true);
            element.setAlpha(0);
        });

        this.scene.tweens.add({
            targets: this.elements,
            alpha: 1,
            duration: 250,
            ease: "Power2"
        });

    }
    
    hide() {

        this.scene.tweens.add({
            targets: this.elements,
            alpha: 0,
            duration: 250,
            ease: "Power2",
            onComplete: () => {

                this.elements.forEach(element => {
                element.setVisible(false);
                });

            }
        });

    }

}