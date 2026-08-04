import Phaser from "phaser";

export default class NotebookViewer {

    constructor(scene, window, notebookData) {

        this.scene = scene;
        this.window = window;
        this.notebookData = notebookData;

        this.answers = {};

    }

    open() {

        const container = this.scene.add.container(0, 0);

        let currentY = 0;

        this.notebookData.forEach(question => {

            // Question
            const title = this.scene.add.text(
                0,
                currentY,
                question.question,
                {
                    fontSize: "22px",
                    color: "#000000",
                    fontStyle: "bold",
                    wordWrap: { width: 420 }
                }
            );

            container.add(title);

            currentY += 40;

            // Options
            question.options.forEach(option => {

                const optionText = this.scene.add.text(
                    20,
                    currentY,
                    `○ ${option}`,
                    {
                        fontSize: "20px",
                        color: "#0066cc"
                    }
                )
                .setInteractive({ useHandCursor: true });

                optionText.on("pointerdown", () => {

                    this.answers[question.id] = option;

                    // Refresh notebook
                    this.open();

                });

                // Show selected answer
                if (this.answers[question.id] === option) {

                    optionText.setText(`● ${option}`);

                }

                container.add(optionText);

                currentY += 32;

            });

            currentY += 25;

        });

        // Save Button
        const saveButton = this.scene.add.text(
            0,
            currentY,
            "💾 Save & Close",
            {
                fontSize: "22px",
                color: "#008800",
                fontStyle: "bold"
            }
        )
        .setInteractive({ useHandCursor: true });

        saveButton.on("pointerdown", () => {

            console.log(this.answers);

            this.window.close();

        });

        container.add(saveButton);

        this.window.open({
            title: "Investigation Notebook"
        });

        this.window.setContent(container);

    }

}