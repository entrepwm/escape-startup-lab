import Phaser from "phaser";

export default class NotebookViewer {

    constructor(
        scene,
        window,
        notebookData,
        scoreManager,
        onSubmit
    ) {

        this.scene = scene;
        this.window = window;
        this.notebookData = notebookData;
        this.scoreManager = scoreManager;
        this.onSubmit = onSubmit;

        // Store player answers
        this.answers = {};

        // Current question/page
        this.currentPage = 0;

        // One question per page
        this.questionsPerPage = 1;

        // Prevent double submission
        this.submitted = false;

    }


    // =====================================================
    // OPEN NOTEBOOK
    // =====================================================

    open() {

        // Don't reset answers if notebook has already been submitted
        if (this.submitted) {
            console.log("Notebook already submitted.");
            return;
        }

        this.currentPage = 0;

        this.window.open({
            title: "Investigation Notebook"
        });

        this.renderPage();

    }


    // =====================================================
    // RENDER PAGE
    // =====================================================

    renderPage() {

        // Clear previous content
        this.window.clearContent();

        // Main container
        const container =
            this.scene.add.container(0, 0);

        let currentY = 0;


        // =====================================================
        // PAGE CALCULATION
        // =====================================================

        const totalPages =
            Math.ceil(
                this.notebookData.length /
                this.questionsPerPage
            );

        const startIndex =
            this.currentPage *
            this.questionsPerPage;

        const endIndex =
            Math.min(
                startIndex +
                this.questionsPerPage,
                this.notebookData.length
            );


        // =====================================================
        // QUESTIONS
        // =====================================================

        for (
            let i = startIndex;
            i < endIndex;
            i++
        ) {

            const question =
                this.notebookData[i];


            // =================================================
            // QUESTION TEXT
            // =================================================

            const questionText =
                this.scene.add.text(
                    0,
                    currentY,
                    question.question,
                    {
                        fontSize: "20px",
                        color: "#000000",
                        fontStyle: "bold",

                        wordWrap: {
                            width: 410
                        },

                        lineSpacing: 2
                    }
                );

            container.add(questionText);


            currentY +=
                questionText.height + 18;


            // =================================================
            // OPTIONS
            // =================================================

            question.options.forEach(option => {

                const selected =
                    this.answers[question.id] === option;


                const optionText =
                    this.scene.add.text(
                        15,
                        currentY,

                        selected
                            ? `● ${option}`
                            : `○ ${option}`,

                        {
                            fontSize: "17px",

                            color:
                                selected
                                    ? "#008800"
                                    : "#0066cc",

                            wordWrap: {
                                width: 395
                            },

                            lineSpacing: 2
                        }
                    );


                optionText.setInteractive({
                    useHandCursor: true
                });


                // =================================================
                // HOVER
                // =================================================

                optionText.on(
                    "pointerover",
                    () => {

                        if (!selected) {

                            optionText.setColor(
                                "#ff8800"
                            );

                        }

                    }
                );


                optionText.on(
                    "pointerout",
                    () => {

                        optionText.setColor(
                            selected
                                ? "#008800"
                                : "#0066cc"
                        );

                    }
                );


                // =================================================
                // SELECT
                // =================================================

                optionText.on(
                    "pointerdown",
                    () => {

                        console.log(
                            `Answer selected: ${question.id} = ${option}`
                        );


                        this.answers[
                            question.id
                        ] = option;


                        // Re-render
                        this.renderPage();

                    }
                );


                container.add(optionText);


                // Account for wrapped text
                currentY +=
                    optionText.height + 9;

            });

        }


        // =====================================================
        // PAGE INDICATOR
        // =====================================================

        currentY += 10;


        const pageIndicator =
            this.scene.add.text(
                165,
                currentY,

                `Page ${this.currentPage + 1} / ${totalPages}`,

                {
                    fontSize: "15px",
                    color: "#555555"
                }
            );


        container.add(pageIndicator);


        currentY +=
            pageIndicator.height + 15;


        // =====================================================
        // NAVIGATION
        // =====================================================

        const navigationY =
            currentY;


        // =====================================================
        // PREVIOUS
        // =====================================================

        if (this.currentPage > 0) {

            const previous =
                this.scene.add.text(
                    0,
                    navigationY,
                    "◀ Previous",
                    {
                        fontSize: "17px",
                        color: "#0066cc",
                        fontStyle: "bold"
                    }
                );


            previous.setInteractive({
                useHandCursor: true
            });


            previous.on(
                "pointerover",
                () => {

                    previous.setColor(
                        "#ff8800"
                    );

                }
            );


            previous.on(
                "pointerout",
                () => {

                    previous.setColor(
                        "#0066cc"
                    );

                }
            );


            previous.on(
                "pointerdown",
                () => {

                    this.currentPage--;

                    this.renderPage();

                }
            );


            container.add(previous);

        }


        // =====================================================
        // NEXT
        // =====================================================

        if (
            this.currentPage <
            totalPages - 1
        ) {

            const next =
                this.scene.add.text(
                    320,
                    navigationY,
                    "Next ▶",
                    {
                        fontSize: "17px",
                        color: "#0066cc",
                        fontStyle: "bold"
                    }
                );


            next.setInteractive({
                useHandCursor: true
            });


            next.on(
                "pointerover",
                () => {

                    next.setColor(
                        "#ff8800"
                    );

                }
            );


            next.on(
                "pointerout",
                () => {

                    next.setColor(
                        "#0066cc"
                    );

                }
            );


            next.on(
                "pointerdown",
                () => {

                    this.currentPage++;

                    this.renderPage();

                }
            );


            container.add(next);

        }


        // =====================================================
        // SUBMIT BUTTON
        // =====================================================

        if (
            this.currentPage ===
            totalPages - 1
        ) {

            const submit =
                this.scene.add.text(
                    235,
                    navigationY,
                    "✓ Submit Notebook",
                    {
                        fontSize: "17px",
                        color: "#ff8800",
                        fontStyle: "bold"
                    }
                );


            submit.setInteractive({
                useHandCursor: true
            });


            submit.on(
                "pointerover",
                () => {

                    submit.setColor(
                        "#00aa55"
                    );

                }
            );


            submit.on(
                "pointerout",
                () => {

                    submit.setColor(
                        "#ff8800"
                    );

                }
            );


            submit.on(
                "pointerdown",
                () => {

                    console.log(
                        "SUBMIT NOTEBOOK CLICKED"
                    );

                    this.submitNotebook();

                }
            );


            container.add(submit);

        }


        // =====================================================
        // SET WINDOW CONTENT
        // =====================================================

        this.window.setContent(
            container
        );

    }


    // =====================================================
    // GET CORRECT ANSWERS
    // =====================================================

    getCorrectAnswers() {

        const correctAnswers = {};

        this.notebookData.forEach(question => {

            /*
             * Supports:
             *
             * correctAnswer
             * answer
             * correct
             *
             * This makes the NotebookViewer
             * compatible with different room data.
             */

            if (
                question.correctAnswer !== undefined
            ) {

                correctAnswers[
                    question.id
                ] = question.correctAnswer;

            }

            else if (
                question.answer !== undefined
            ) {

                correctAnswers[
                    question.id
                ] = question.answer;

            }

            else if (
                question.correct !== undefined
            ) {

                correctAnswers[
                    question.id
                ] = question.correct;

            }

        });


        console.log(
            "Correct notebook answers:",
            correctAnswers
        );


        return correctAnswers;

    }


    // =====================================================
    // SUBMIT NOTEBOOK
    // =====================================================

    submitNotebook() {

        if (this.submitted) {

            console.warn(
                "Notebook has already been submitted."
            );

            return;

        }


        console.log(
            "Notebook answers:",
            this.answers
        );


        // =====================================================
        // CHECK ALL QUESTIONS ANSWERED
        // =====================================================

        const unanswered =
            this.notebookData.filter(
                question =>
                    !this.answers[question.id]
            );


        if (
            unanswered.length > 0
        ) {

            console.warn(
                "Notebook incomplete."
            );


            const message =
                this.scene.add.text(
                    0,
                    0,

                    "Please answer all questions before submitting.",

                    {
                        fontSize: "18px",
                        color: "#cc0000",

                        wordWrap: {
                            width: 410
                        },

                        lineSpacing: 2
                    }
                );


            this.window.setContent(
                message
            );


            return;

        }


        // =====================================================
        // GET CORRECT ANSWERS
        // =====================================================

        const correctAnswers =
            this.getCorrectAnswers();


        // =====================================================
        // SAFETY CHECK
        // =====================================================

        if (
            Object.keys(correctAnswers).length !==
            this.notebookData.length
        ) {

            console.error(
                "Notebook correct answers are missing!",
                correctAnswers
            );


            const message =
                this.scene.add.text(
                    0,
                    0,

                    "Error: Notebook answer configuration is incomplete.",

                    {
                        fontSize: "18px",
                        color: "#cc0000",

                        wordWrap: {
                            width: 410
                        },

                        lineSpacing: 2
                    }
                );


            this.window.setContent(
                message
            );


            return;

        }


        // =====================================================
        // CALCULATE SCORE
        // =====================================================

        let points = 0;


        if (
            this.scoreManager
        ) {

            points =
                this.scoreManager.calculateNotebookScore(
                    this.answers,
                    correctAnswers
                );

        }


        console.log(
            `Notebook score: +${points}`
        );


        console.log(
            `Total game score: ${this.scoreManager.getScore()}`
        );


        // =====================================================
        // MARK SUBMITTED
        // =====================================================

        this.submitted = true;


        // =====================================================
        // CLOSE NOTEBOOK
        // =====================================================

        this.window.close();


        // =====================================================
        // NOTIFY ROOM
        // =====================================================

        if (
            this.onSubmit
        ) {

            this.onSubmit(
                points
            );

        }

    }

}