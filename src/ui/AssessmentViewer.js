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

        // =====================================================
        // PAGINATION
        // =====================================================

        this.currentPage = 0;

        // Number of options displayed per page
        this.optionsPerPage = 2;

    }


    // =====================================================
    // OPEN ASSESSMENT
    // =====================================================

    open() {

        this.selectedAnswer = null;
        this.submitted = false;
        this.currentPage = 0;

        this.renderAssessment();

    }


    // =====================================================
    // GET TOTAL PAGES
    // =====================================================

    getTotalPages() {

        return Math.ceil(
            this.assessmentData.length /
            this.optionsPerPage
        );

    }


    // =====================================================
    // RENDER ASSESSMENT
    // =====================================================

    renderAssessment() {

        if (this.container) {

            this.container.destroy(true);
            this.container = null;

        }


        this.container =
            this.scene.add.container(0, 0);


        // =====================================================
        // TITLE
        // =====================================================

        const title =
            this.scene.add.text(

                0,
                0,

                "Choose ONE recommendation for the restaurant.",

                {

                    fontSize: "20px",
                    color: "#000000",
                    fontStyle: "bold",

                    wordWrap: {
                        width: 390
                    },

                    lineSpacing: 4

                }

            );


        this.container.add(title);


        // =====================================================
        // PAGE INDICATOR
        // =====================================================

        const totalPages =
            this.getTotalPages();


        const pageText =
            this.scene.add.text(

                0,
                title.height + 18,

                `Page ${this.currentPage + 1} of ${totalPages}`,

                {

                    fontSize: "16px",
                    color: "#666666",
                    fontStyle: "bold"

                }

            );


        this.container.add(pageText);


        // =====================================================
        // OPTIONS
        // =====================================================

        const startIndex =
            this.currentPage *
            this.optionsPerPage;


        const endIndex =
            Math.min(

                startIndex +
                this.optionsPerPage,

                this.assessmentData.length

            );


        const pageOptions =
            this.assessmentData.slice(
                startIndex,
                endIndex
            );


        let currentY =
            pageText.y +
            pageText.height +
            25;


        pageOptions.forEach(option => {

            const optionContainer =
                this.scene.add.container(
                    0,
                    currentY
                );


            const isSelected =
                this.selectedAnswer === option.id;


            const radio =
                isSelected
                    ? "●"
                    : "○";


            const optionText =
                `${radio} ${option.text}`;


            const text =
                this.scene.add.text(

                    10,
                    0,

                    optionText,

                    {

                        fontSize: "18px",
                        color: "#0066cc",

                        wordWrap: {
                            width: 380
                        },

                        lineSpacing: 4

                    }

                )
                .setInteractive({
                    useHandCursor: true
                });


            // =================================================
            // HOVER
            // =================================================

            text.on(
                "pointerover",
                () => {

                    if (!this.submitted) {

                        text.setColor(
                            "#ff8800"
                        );

                    }

                }
            );


            text.on(
                "pointerout",
                () => {

                    if (!this.submitted) {

                        text.setColor(
                            "#0066cc"
                        );

                    }

                }
            );


            // =================================================
            // SELECT
            // =================================================

            text.on(
                "pointerdown",
                () => {

                    if (this.submitted) {
                        return;
                    }


                    this.selectedAnswer =
                        option.id;


                    this.renderAssessment();

                }
            );


            optionContainer.add(text);

            this.container.add(
                optionContainer
            );


            // =================================================
            // DYNAMIC SPACING
            // =================================================

            currentY +=
                text.height +
                30;

        });


        // =====================================================
        // NAVIGATION
        // =====================================================

        const navigationY =
            currentY + 20;


        // =====================================================
        // PREVIOUS
        // =====================================================

        if (this.currentPage > 0) {

            const previousButton =
                this.scene.add.text(

                    0,
                    navigationY,

                    "← Previous",

                    {

                        fontSize: "18px",
                        color: "#0066cc",
                        fontStyle: "bold"

                    }

                )
                .setInteractive({
                    useHandCursor: true
                });


            previousButton.on(
                "pointerover",
                () => {

                    previousButton.setColor(
                        "#ff8800"
                    );

                }
            );


            previousButton.on(
                "pointerout",
                () => {

                    previousButton.setColor(
                        "#0066cc"
                    );

                }
            );


            previousButton.on(
                "pointerdown",
                () => {

                    if (this.currentPage > 0) {

                        this.currentPage--;

                        this.renderAssessment();

                    }

                }
            );


            this.container.add(
                previousButton
            );

        }


        // =====================================================
        // NEXT
        // =====================================================

        if (
            this.currentPage <
            totalPages - 1
        ) {

            const nextButton =
                this.scene.add.text(

                    260,
                    navigationY,

                    "Next →",

                    {

                        fontSize: "18px",
                        color: "#0066cc",
                        fontStyle: "bold"

                    }

                )
                .setInteractive({
                    useHandCursor: true
                });


            nextButton.on(
                "pointerover",
                () => {

                    nextButton.setColor(
                        "#ff8800"
                    );

                }
            );


            nextButton.on(
                "pointerout",
                () => {

                    nextButton.setColor(
                        "#0066cc"
                    );

                }
            );


            nextButton.on(
                "pointerdown",
                () => {

                    if (
                        this.currentPage <
                        totalPages - 1
                    ) {

                        this.currentPage++;

                        this.renderAssessment();

                    }

                }
            );


            this.container.add(
                nextButton
            );

        }


        // =====================================================
        // SUBMIT
        // =====================================================

        if (
            this.currentPage ===
            totalPages - 1
        ) {

            const submitY =
                navigationY + 50;


            const submitButton =
                this.scene.add.text(

                    0,
                    submitY,

                    "✅ Submit Assessment",

                    {

                        fontSize: "20px",
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

                    submitButton.setColor(
                        "#ff8800"
                    );

                }
            );


            submitButton.on(
                "pointerout",
                () => {

                    submitButton.setColor(
                        "#008800"
                    );

                }
            );


            submitButton.on(
                "pointerdown",
                () => {

                    this.submitAssessment();

                }
            );


            this.container.add(
                submitButton
            );

        }


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

        if (this.submitted) {
            return;
        }


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


        this.showResult(result);

    }


    // =====================================================
    // SHOW RESULT
    // =====================================================

    showResult(result) {

        if (this.container) {

            this.container.destroy(true);
            this.container = null;

        }


        const resultContainer =
            this.scene.add.container(0, 0);


        // =====================================================
        // TITLE
        // =====================================================

        const title =
            this.scene.add.text(

                0,
                0,

                result.correct
                    ? "✅ Correct!"
                    : "❌ Incorrect",

                {

                    fontSize: "25px",
                    color: "#000000",
                    fontStyle: "bold"

                }

            );


        resultContainer.add(title);


        // =====================================================
        // SCORE
        // =====================================================

        const score =
            this.scene.add.text(

                0,
                50,

                `Score: +${result.score}`,

                {

                    fontSize: "20px",

                    color:
                        result.correct
                            ? "#008800"
                            : "#880000",

                    fontStyle: "bold"

                }

            );


        resultContainer.add(score);


        // =====================================================
        // TOTAL SCORE
        // =====================================================

        const totalScore =
            this.scene.add.text(

                0,
                85,

                `Total Score: ${this.scoreManager.getScore()}`,

                {

                    fontSize: "18px",
                    color: "#000000"

                }

            );


        resultContainer.add(totalScore);


        // =====================================================
        // EXPLANATION
        // =====================================================

        const explanation =
            this.scene.add.text(

                0,
                130,

                result.explanation || "",

                {

                    fontSize: "17px",
                    color: "#000000",

                    wordWrap: {
                        width: 390
                    },

                    lineSpacing: 4

                }

            );


        resultContainer.add(
            explanation
        );


        // =====================================================
        // CONTINUE
        // =====================================================

        const continueButtonY =
            130 +
            explanation.height +
            30;


        const continueButton =
            this.scene.add.text(

                0,
                continueButtonY,

                "Continue →",

                {

                    fontSize: "20px",
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
        // DISPLAY
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

    continueToNextRoom(resultContainer) {

        console.log(
            "Assessment completed."
        );


        console.log(
            "Current score:",
            this.scoreManager.getScore()
        );


        // =====================================================
        // PREVENT MULTIPLE CLICKS
        // =====================================================

        if (!this.submitted) {
            return;
        }


        // =====================================================
        // CLEAN UP
        // =====================================================

        if (resultContainer) {

            resultContainer.destroy(true);

        }


        this.container = null;


        this.window.close();


        // =====================================================
        // DETERMINE CURRENT ROOM
        // =====================================================

        const currentRoom =
            this.scoreManager.getRoom();


        console.log(
            "Current room:",
            currentRoom
        );


        // =====================================================
        // ROOM 3 = END OF GAME
        // =====================================================

        if (currentRoom >= 3) {

            console.log(
                "All rooms completed."
            );


            console.log(
                "Final score:",
                this.scoreManager.getScore()
            );


            // Go to Final Results instead of alert
            this.scene.scene.start(
                "FinalResultsScene"
            );

            return;

        }


        // =====================================================
        // DETERMINE NEXT ROOM
        // =====================================================

        const nextRoom =
            currentRoom + 1;


        const nextScene =
            `Room${nextRoom}Scene`;


        console.log(
            `Moving from Room ${currentRoom} → Room ${nextRoom}`
        );


        // =====================================================
        // UPDATE SCORE MANAGER
        // =====================================================

        this.scoreManager.setRoom(
            nextRoom
        );


        console.log(
            "New room:",
            this.scoreManager.getRoom()
        );


        // =====================================================
        // START NEXT ROOM
        // =====================================================

        this.scene.scene.start(

            nextScene,

            {

                scoreManager:
                    this.scoreManager

            }

        );

    }

}