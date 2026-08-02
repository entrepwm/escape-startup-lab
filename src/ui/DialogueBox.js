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

        // Speaker Name
        this.speakerText = this.scene.add.text(
            100,
            height - 270,
            "",
            {
                fontSize: this.fonts.speaker,
                fontStyle: "bold",
                color: this.colors.speaker
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

        // ----------------------------
        // Store all UI elements
        // ----------------------------

        this.elements = [
            this.panel,
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

    }



    show() {

        this.elements.forEach(element => {
            element.setVisible(true);
        });
    }

    hide() {

        this.elements.forEach(element => {
            element.setVisible(false);
        });

    }

}