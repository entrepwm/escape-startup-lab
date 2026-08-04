import Phaser from "phaser";

export default class AssessmentViewer {

    constructor(scene, window, assessmentData, scoreManager) {

        this.scene = scene;
        this.window = window;
        this.assessmentData = assessmentData;
        this.scoreManager = scoreManager;

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

            const result = this.scoreManager.evaluate(this.selectedAnswer);

            const container = this.scene.add.container(0, 0);

            const title = this.scene.add.text(

                0,
                0,

                result.correct
                    ? "✅ Correct!"
                    : "❌ Incorrect",

                {

                    fontSize: "26px",
                    color: "#000000",
                    fontStyle: "bold"

                }

            );

            const score = this.scene.add.text(

                0,
                50,

                `Score: ${result.score}`,

                {

                    fontSize: "22px",
                    color: "#006600"

                }

            );

            const explanation = this.scene.add.text(

                0,
                100,

                result.explanation,

                {

                    fontSize: "20px",
                    color: "#000000",

                    wordWrap: {

                        width: 420

                    }

                }

            );

            const button = this.scene.add.text(

                0,
                230,

                "Continue",

                {

                    fontSize: "22px",
                    color: "#0066cc",
                    fontStyle: "bold"

                }

            )
            .setInteractive({ useHandCursor: true });

            button.on("pointerdown", () => {

                this.window.close();

            });

            container.add(title);
            container.add(score);
            container.add(explanation);
            container.add(button);

            this.window.open({

                title: "Assessment Result"

            });

            this.window.setContent(container);

        });

        container.add(submitButton);

        this.window.open({

            title: "Final Assessment"

        });

        this.window.setContent(container);

    }

}