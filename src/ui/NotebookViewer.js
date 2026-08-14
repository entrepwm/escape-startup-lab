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

    }

    // =====================================================
    // OPEN NOTEBOOK
    // =====================================================

    open() {

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

        // Main content container
        const container =
            this.scene.add.container(0, 0);

        // Starting vertical position
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
                startIndex + this.questionsPerPage,
                this.notebookData.length
            );

        // =====================================================
        // QUESTION
        // =====================================================

        for (
            let i = startIndex;
            i < endIndex;
            i++
        ) {

            const question =
                this.notebookData[i];

            // -------------------------------------------------
            // QUESTION TEXT
            // -------------------------------------------------

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

            // Move below question
            currentY +=
                questionText.height + 18;

            // -------------------------------------------------
            // OPTIONS
            // -------------------------------------------------

            question.options.forEach(
                option => {

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

                    // -------------------------------------------------
                    // INTERACTION
                    // -------------------------------------------------

                    optionText.setInteractive({
                        useHandCursor: true
                    });

                    // -------------------------------------------------
                    // HOVER
                    // -------------------------------------------------

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

                    // -------------------------------------------------
                    // SELECT
                    // -------------------------------------------------

                    optionText.on(
                        "pointerdown",
                        () => {

                            console.log(
                                `Answer selected: ${question.id} = ${option}`
                            );

                            this.answers[
                                question.id
                            ] = option;

                            // Re-render page
                            // so selected option becomes ●
                            this.renderPage();

                        }
                    );

                    container.add(optionText);

                    // IMPORTANT:
                    // Use actual text height.
                    //
                    // This automatically accounts for
                    // options that wrap onto multiple lines.

                    currentY +=
                        optionText.height + 9;

                }
            );

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
        // PREVIOUS BUTTON
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
        // NEXT BUTTON
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

            // -------------------------------------------------
            // HOVER
            // -------------------------------------------------

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

            // -------------------------------------------------
            // SUBMIT
            // -------------------------------------------------

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
    // SUBMIT NOTEBOOK
    // =====================================================

    submitNotebook() {

        console.log(
            "Notebook answers:",
            this.answers
        );

        // =====================================================
        // CHECK ALL QUESTIONS
        // =====================================================

        const unanswered =
            this.notebookData.filter(
                question =>
                    !this.answers[question.id]
            );

        // =====================================================
        // INCOMPLETE
        // =====================================================

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
        // CALCULATE SCORE
        // =====================================================

        let points = 0;

        if (
            this.scoreManager
        ) {

            points =
                this.scoreManager.calculateNotebookScore(
                    this.answers
                );

        }

        console.log(
            `Notebook score: ${points}`
        );

        // =====================================================
        // CLOSE NOTEBOOK
        // =====================================================

        this.window.close();

        // =====================================================
        // NOTIFY ROOM 1
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