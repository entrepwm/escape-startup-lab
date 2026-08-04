import Phaser from "phaser";

export default class AssessmentViewer {

    constructor(scene, window, assessmentData) {

        this.scene = scene;
        this.window = window;
        this.assessmentData = assessmentData;

        this.selectedAnswer = null;

    }

    open() {

        const container = this.scene.add.container(0, 0);

        let currentY = 0;

        // Title
        const title = this.scene.add.text(

            0,
            currentY,

            "Choose ONE recommendation for the restaurant.",

            {

                fontSize: "22px",
                color: "#000000",
                fontStyle: "bold",
                wordWrap: {

                    width: 420

                }

            }

        );

        container.add(title);

        currentY += 50;

        // Options
        this.assessmentData.forEach(option => {

            const text = this.scene.add.text(

                20,
                currentY,

                this.selectedAnswer === option.id
                    ? `● ${option.text}`
                    : `○ ${option.text}`,

                {

                    fontSize: "20px",
                    color: "#0066cc"

                }

            )
            .setInteractive({ useHandCursor: true });

            text.on("pointerover", () => {

                text.setColor("#ff8800");

            });

            text.on("pointerout", () => {

                text.setColor("#0066cc");

            });

            text.on("pointerdown", () => {

                this.selectedAnswer = option.id;

                this.open();

            });

            container.add(text);

            currentY += 40;

        });

        currentY += 20;

        // Submit Button
        const submitButton = this.scene.add.text(

            0,
            currentY,

            "✅ Submit Assessment",

            {

                fontSize: "22px",
                color: "#008800",
                fontStyle: "bold"

            }

        )
        .setInteractive({ useHandCursor: true });

        submitButton.on("pointerdown", () => {

            if (!this.selectedAnswer) {

                alert("Please choose one recommendation first.");

                return;

            }

            console.log("Final Assessment:", this.selectedAnswer);

            this.window.close();

        });

        container.add(submitButton);

        this.window.open({

            title: "Final Assessment"

        });

        this.window.setContent(container);

    }

}