import Phaser from "phaser";

export default class AssessmentViewer {

    constructor(
        scene,
        window,
        assessmentData,
        scoreManager,
        nextscene = null,
        answerData,
        onComplete
    ) {

        this.scene = scene;
        this.window = window;
        this.assessmentData = assessmentData;
        this.scoreManager = scoreManager;
        this.nextScene = this.nextScene;
        this.answerData = answerData;
        this.onComplete = onComplete;

        this.selectedAnswer = null;

    }

    // =====================================================
    // OPEN ASSESSMENT
    // =====================================================

    open() {

        const container =
            this.scene.add.container(0, 0);

        let currentY = 0;

        // =====================================================
        // TITLE
        // =====================================================

        const title =
            this.scene.add.text(
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

        currentY += title.height + 20;

        // =====================================================
        // OPTIONS
        // =====================================================

        this.assessmentData.forEach(option => {

            const text =
                this.scene.add.text(
                    20,
                    currentY,
                    this.selectedAnswer === option.id
                        ? `● ${option.text}`
                        : `○ ${option.text}`,
                    {
                        fontSize: "20px",
                        color: "#0066cc"
                    }
                );

            text.setInteractive({
                useHandCursor: true
            });

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

            currentY += text.height + 10;

        });

        currentY += 20;

        // =====================================================
        // SUBMIT BUTTON
        // =====================================================

        const submitButton =
            this.scene.add.text(
                0,
                currentY,
                "✅ Submit Assessment",
                {
                    fontSize: "22px",
                    color: "#008800",
                    fontStyle: "bold"
                }
            );

        submitButton.setInteractive({
            useHandCursor: true
        });

        submitButton.on("pointerover", () => {

            submitButton.setColor("#00aa55");

        });

        submitButton.on("pointerout", () => {

            submitButton.setColor("#008800");

        });

        submitButton.on("pointerdown", () => {

            this.submitAssessment();

        });

        container.add(submitButton);

        // =====================================================
        // OPEN WINDOW
        // =====================================================

        this.window.open({
            title: "Final Assessment"
        });

        this.window.setContent(container);

    }

    // =====================================================
    // SUBMIT ASSESSMENT
    // =====================================================

    submitAssessment() {

        // -----------------------------------------------------
        // Check answer
        // -----------------------------------------------------

        if (!this.selectedAnswer) {

            this.window.open({
                title: "Assessment"
            });

            this.window.setContent(

                this.scene.add.text(
                    0,
                    0,
                    "Please choose one recommendation first.",
                    {
                        fontSize: "20px",
                        color: "#cc0000",
                        wordWrap: {
                            width: 420
                        }
                    }
                )

            );

            return;

        }

        // -----------------------------------------------------
        // Prevent duplicate submission
        // -----------------------------------------------------

        if (this.scoreManager.isAssessmentSubmitted()) {

            console.warn(
                "Assessment has already been submitted."
            );

            return;

        }

        // -----------------------------------------------------
        // Evaluate answer
        // -----------------------------------------------------

        const correct =
            this.selectedAnswer ===
            this.answerData.correctRecommendation;

        // -----------------------------------------------------
        // Calculate assessment points
        // -----------------------------------------------------

        const points = correct ? 30 : 0;

        if (points > 0) {

            this.scoreManager.addPoints(points);

        }

        this.scoreManager.markAssessmentSubmitted();

        // -----------------------------------------------------
        // Result explanation
        // -----------------------------------------------------

        const result = {

            correct: correct,

            score: points,

            explanation:
                this.answerData.explanation

        };

        console.log(
            "Assessment result:",
            result
        );

        console.log(
            "Total score:",
            this.scoreManager.getScore()
        );

        // -----------------------------------------------------
        // Display result
        // -----------------------------------------------------

        this.showResult(result);

    }

    // =====================================================
    // SHOW RESULT
    // =====================================================

    showResult(result) {

        const container =
            this.scene.add.container(0, 0);

        // -----------------------------------------------------
        // Title
        // -----------------------------------------------------

        const title =
            this.scene.add.text(
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

        // -----------------------------------------------------
        // Score
        // -----------------------------------------------------

        const score =
            this.scene.add.text(
                0,
                50,
                `Score: +${result.score}`,
                {
                    fontSize: "22px",
                    color: "#006600"
                }
            );

        // -----------------------------------------------------
        // Explanation
        // -----------------------------------------------------

        const explanation =
            this.scene.add.text(
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

        // -----------------------------------------------------
        // Continue button
        // -----------------------------------------------------

        const button =
            this.scene.add.text(
                0,
                230,
                "Continue",
                {
                    fontSize: "22px",
                    color: "#0066cc",
                    fontStyle: "bold"
                }
            );

        button.setInteractive({
            useHandCursor: true
        });

        button.on("pointerover", () => {

            button.setColor("#ff8800");

        });

        button.on("pointerout", () => {

            button.setColor("#0066cc");

        });

        button.on("pointerdown", () => {

            this.window.close();

            if (this.nextScene) {

                console.log(
                    `Moving to ${this.nextScene}`
                );

                this.scene.scene.start(
                    this.nextScene
                );

            }

        });

        container.add(title);
        container.add(score);
        container.add(explanation);
        container.add(button);

        this.window.open({
            title: "Assessment Result"
        });

        this.window.setContent(container);

    }

}