import Phaser from "phaser";

export default class AssessmentViewer {

    constructor(scene, window, assessmentData, scoreManager) {

        this.scene = scene;
        this.window = window;
        this.assessmentData = assessmentData;
        this.scoreManager = scoreManager;

        this.selectedAnswer = null;
        this.container = null;
        this.submitted = false;

    }


    // =====================================================
    // OPEN ASSESSMENT
    // =====================================================

    open() {

        // Reset selection when opening a fresh assessment
        this.selectedAnswer = null;
        this.submitted = false;

        this.renderAssessment();

    }


    // =====================================================
    // RENDER ASSESSMENT
    // =====================================================

    renderAssessment() {

        // Destroy previous content if it exists
        if (this.container) {

            this.container.destroy(true);
            this.container = null;

        }


        this.container =
            this.scene.add.container(0, 0);


        let currentY = 0;


        // =====================================================
        // TITLE
        // =====================================================

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

        this.container.add(title);


        currentY += 65;


        // =====================================================
        // OPTIONS
        // =====================================================

        this.assessmentData.forEach(option => {

            const isSelected =
                this.selectedAnswer === option.id;


            const optionText = isSelected
                ? `● ${option.text}`
                : `○ ${option.text}`;


            const text = this.scene.add.text(

                20,
                currentY,

                optionText,

                {

                    fontSize: "20px",
                    color: "#0066cc",

                    wordWrap: {
                        width: 380
                    }

                }

            )
            .setInteractive({
                useHandCursor: true
            });


            // Hover
            text.on(
                "pointerover",
                () => {

                    text.setColor("#ff8800");

                }
            );


            text.on(
                "pointerout",
                () => {

                    text.setColor("#0066cc");

                }
            );


            // Select answer
            text.on(
                "pointerdown",
                () => {

                    if (this.submitted) {
                        return;
                    }


                    this.selectedAnswer =
                        option.id;


                    // Re-render to show selected radio button
                    this.renderAssessment();

                }
            );


            this.container.add(text);


            currentY += 42;

        });


        currentY += 25;


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

            )
            .setInteractive({
                useHandCursor: true
            });


        submitButton.on(
            "pointerover",
            () => {

                submitButton.setColor("#ff8800");

            }
        );


        submitButton.on(
            "pointerout",
            () => {

                submitButton.setColor("#008800");

            }
        );


        submitButton.on(
            "pointerdown",
            () => {

                this.submitAssessment();

            }
        );


        this.container.add(submitButton);


        // =====================================================
        // OPEN WINDOW
        // =====================================================

        this.window.open({

            title: "Final Assessment"

        });


        this.window.setContent(
            this.container
        );

    }


    // =====================================================
    // SUBMIT ASSESSMENT
    // =====================================================

    submitAssessment() {

        // Prevent duplicate submission
        if (this.submitted) {
            return;
        }


        // Require answer
        if (!this.selectedAnswer) {

            alert(
                "Please choose one recommendation first."
            );

            return;

        }


        console.log(
            "Submitting assessment:",
            this.selectedAnswer
        );


        // =====================================================
        // EVALUATE
        // =====================================================

        let result;


        try {

            result =
                this.scoreManager.evaluate(
                    this.selectedAnswer
                );

        }

        catch (error) {

            console.error(
                "Assessment evaluation failed:",
                error
            );

            alert(
                "There was a problem submitting the assessment."
            );

            return;

        }


        this.submitted = true;


        console.log(
            "Assessment result:",
            result
        );


        // =====================================================
        // SHOW RESULT
        // =====================================================

        this.showResult(result);

    }


    // =====================================================
    // SHOW RESULT
    // =====================================================

    showResult(result) {

        // Destroy assessment UI
        if (this.container) {

            this.container.destroy(true);
            this.container = null;

        }


        const resultContainer =
            this.scene.add.container(0, 0);


        let currentY = 0;


        // =====================================================
        // RESULT TITLE
        // =====================================================

        const title = this.scene.add.text(

            0,
            currentY,

            result.correct
                ? "✅ Correct!"
                : "❌ Incorrect",

            {

                fontSize: "26px",
                color: "#000000",
                fontStyle: "bold"

            }

        );


        resultContainer.add(title);


        currentY += 50;


        // =====================================================
        // SCORE
        // =====================================================

        const score = this.scene.add.text(

            0,
            currentY,

            `Score: +${result.score}`,

            {

                fontSize: "22px",
                color: result.correct
                    ? "#008800"
                    : "#880000",

                fontStyle: "bold"

            }

        );


        resultContainer.add(score);


        currentY += 50;


        // =====================================================
        // EXPLANATION
        // =====================================================

        const explanation =
            this.scene.add.text(

                0,
                currentY,

                result.explanation || "",

                {

                    fontSize: "20px",
                    color: "#000000",

                    wordWrap: {
                        width: 420
                    }

                }

            );


        resultContainer.add(explanation);


        currentY +=
            explanation.height + 40;


        // =====================================================
        // CONTINUE BUTTON
        // =====================================================

        const continueButton =
            this.scene.add.text(

                0,
                currentY,

                "Continue",

                {

                    fontSize: "22px",
                    color: "#0066cc",
                    fontStyle: "bold"

                }

            )
            .setInteractive({
                useHandCursor: true
            });


        continueButton.on(
            "pointerover",
            () => {

                continueButton.setColor(
                    "#ff8800"
                );

            }
        );


        continueButton.on(
            "pointerout",
            () => {

                continueButton.setColor(
                    "#0066cc"
                );

            }
        );


        continueButton.on(
            "pointerdown",
            () => {

                this.continueToNextRoom(
                    resultContainer
                );

            }
        );


        resultContainer.add(
            continueButton
        );


        // =====================================================
        // DISPLAY RESULT
        // =====================================================

        this.container =
            resultContainer;


        this.window.open({

            title: "Assessment Result"

        });


        this.window.setContent(
            resultContainer
        );

    }


    // =====================================================
    // CONTINUE TO NEXT ROOM
    // =====================================================

    continueToNextRoom(
        resultContainer
    ) {

        console.log(
            "Assessment completed."
        );


        console.log(
            "Current score:",
            this.scoreManager.getScore()
        );


        // Prevent multiple clicks
        if (!this.submitted) {
            return;
        }


        // Destroy result UI
        if (resultContainer) {

            resultContainer.destroy(true);

        }


        this.container = null;


        // Close window
        this.window.close();


        // =====================================================
        // MOVE TO ROOM 2
        // =====================================================

        console.log(
            "Moving from Room 1 → Room 2"
        );


        // Tell ScoreManager that we are now
        // entering Room 2.
        //
        // IMPORTANT:
        // This keeps the existing ScoreManager,
        // so the total score is NOT reset.

        this.scoreManager.setRoom(2);


        console.log(
            "Current room:",
            this.scoreManager.getRoom()
        );


        // Start Room 2
        this.scene.scene.start(
            "Room2Scene",
            {
                scoreManager:
                    this.scoreManager
            }
        );

    }

}