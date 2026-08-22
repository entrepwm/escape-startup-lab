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
        this.scoreManager = scoreManager;
        this.onSubmit = onSubmit;


        // =====================================================
        // NORMALIZE NOTEBOOK DATA
        // =====================================================

        this.notebookData =
            this.normalizeNotebookData(
                notebookData
            );


        console.log(
            "NotebookViewer questions loaded:",
            this.notebookData.length,
            this.notebookData
        );


        // =====================================================
        // STATE
        // =====================================================

        this.answers = {};

        this.currentPage = 0;

        this.questionsPerPage = 1;

        this.submitted = false;

        this.warningMessage = null;


        // =====================================================
        // LAYOUT
        // =====================================================

        this.contentWidth = 410;

        /*
         * Area khusus pertanyaan + pilihan.
         *
         * Footer berada di luar area ini.
         */

        this.maxQuestionHeight = 310;

        this.dividerY = 330;

        this.pageIndicatorY = 345;

        this.navigationY = 375;

    }


    // =====================================================
    // NORMALIZE NOTEBOOK DATA
    // =====================================================

    normalizeNotebookData(
        notebookData
    ) {

        // Direct array

        if (
            Array.isArray(
                notebookData
            )
        ) {

            return notebookData;

        }


        if (
            !notebookData ||
            typeof notebookData !==
                "object"
        ) {

            console.error(
                "Invalid notebook data:",
                notebookData
            );


            return [];

        }


        // Common wrapper formats

        if (
            Array.isArray(
                notebookData.questions
            )
        ) {

            return notebookData.questions;

        }


        if (
            Array.isArray(
                notebookData.items
            )
        ) {

            return notebookData.items;

        }


        if (
            Array.isArray(
                notebookData.notebook
            )
        ) {

            return notebookData.notebook;

        }


        if (
            Array.isArray(
                notebookData.data
            )
        ) {

            return notebookData.data;

        }


        console.error(
            "NotebookViewer could not find question array:",
            notebookData
        );


        return [];

    }


    // =====================================================
    // OPEN
    // =====================================================

    open() {

        if (
            this.submitted
        ) {

            console.log(
                "Notebook already submitted."
            );


            return;

        }


        // =================================================
        // VALIDATE NOTEBOOK
        // =================================================

        if (
            !Array.isArray(
                this.notebookData
            ) ||
            this.notebookData.length === 0
        ) {

            this.window.open({

                title:
                    "Investigation Notebook"

            });


            this.window.setContent(

                "Notebook data could not be loaded.\n\n" +
                "Please check the browser console."

            );


            console.error(
                "Notebook opened with zero questions."
            );


            return;

        }


        this.currentPage = 0;

        this.warningMessage = null;


        this.window.open({

            title:
                "Investigation Notebook"

        });


        this.renderPage();

    }


    // =====================================================
    // RENDER PAGE
    // =====================================================

    renderPage() {

        if (
            this.notebookData.length === 0
        ) {

            return;

        }


        this.window.clearContent();


        // =================================================
        // ROOT CONTAINER
        // =================================================

        const container =
            this.scene.add.container(
                0,
                0
            );


        // =================================================
        // QUESTION CONTAINER
        // =================================================

        const questionContainer =
            this.scene.add.container(
                0,
                0
            );


        container.add(
            questionContainer
        );


        let currentY = 0;


        // =================================================
        // PAGE CALCULATION
        // =================================================

        const totalPages =
            Math.max(

                1,

                Math.ceil(

                    this.notebookData.length /
                    this.questionsPerPage

                )

            );


        if (
            this.currentPage >=
            totalPages
        ) {

            this.currentPage =
                totalPages - 1;

        }


        if (
            this.currentPage < 0
        ) {

            this.currentPage = 0;

        }


        const startIndex =

            this.currentPage *
            this.questionsPerPage;


        const endIndex =
            Math.min(

                startIndex +
                this.questionsPerPage,

                this.notebookData.length

            );


        // =================================================
        // QUESTIONS
        // =================================================

        for (
            let i = startIndex;
            i < endIndex;
            i++
        ) {

            const question =
                this.notebookData[i];


            if (
                !question
            ) {

                continue;

            }


            // =================================================
            // QUESTION NUMBER
            // =================================================

            const questionNumber =
                this.scene.add.text(

                    0,
                    currentY,

                    `QUESTION ${i + 1}`,

                    {

                        fontSize:
                            "12px",

                        fontFamily:
                            "monospace",

                        fontStyle:
                            "bold",

                        color:
                            "#64748b"

                    }

                );


            questionContainer.add(
                questionNumber
            );


            currentY +=
                questionNumber.height +
                6;


            // =================================================
            // QUESTION TEXT
            // =================================================

            const questionText =
                this.scene.add.text(

                    0,
                    currentY,

                    question.question ||
                    "Question unavailable.",

                    {

                        fontSize:
                            "18px",

                        fontFamily:
                            "monospace",

                        color:
                            "#111111",

                        fontStyle:
                            "bold",

                        wordWrap: {

                            width:
                                this.contentWidth

                        },

                        lineSpacing:
                            1

                    }

                );


            questionContainer.add(
                questionText
            );


            currentY +=
                questionText.height +
                13;


            // =================================================
            // OPTIONS
            // =================================================

            const options =
                Array.isArray(
                    question.options
                )
                    ? question.options
                    : [];


            options.forEach(

                option => {

                    const optionText =
                        this.createOption(

                            question,
                            option,
                            currentY

                        );


                    questionContainer.add(
                        optionText
                    );


                    currentY +=
                        optionText.height +
                        6;

                }

            );

        }


        // =================================================
        // AUTO SCALE QUESTION AREA
        // =================================================

        if (
            currentY >
            this.maxQuestionHeight
        ) {

            const calculatedScale =

                this.maxQuestionHeight /
                currentY;


            /*
             * Previous version stopped at 0.80.
             *
             * That was too large for long Indonesian
             * questions.
             */

            const safeScale =
                Math.max(

                    calculatedScale,
                    0.50

                );


            questionContainer.setScale(
                safeScale
            );

        }


        // =================================================
        // DIVIDER
        // =================================================

        const divider =
            this.scene.add.graphics();


        divider.lineStyle(
            1,
            0xd4d4d4,
            1
        );


        divider.beginPath();


        divider.moveTo(
            0,
            this.dividerY
        );


        divider.lineTo(
            this.contentWidth,
            this.dividerY
        );


        divider.strokePath();


        container.add(
            divider
        );


        // =================================================
        // WARNING
        // =================================================

        if (
            this.warningMessage
        ) {

            const warning =
                this.scene.add.text(

                    this.contentWidth / 2,
                    this.dividerY - 8,

                    this.warningMessage,

                    {

                        fontFamily:
                            "monospace",

                        fontSize:
                            "11px",

                        fontStyle:
                            "bold",

                        color:
                            "#cc0000",

                        align:
                            "center",

                        wordWrap: {

                            width:
                                this.contentWidth

                        }

                    }

                )
                .setOrigin(
                    0.5,
                    1
                );


            container.add(
                warning
            );

        }


        // =================================================
        // PAGE INDICATOR
        // =================================================

        const pageIndicator =
            this.scene.add.text(

                this.contentWidth / 2,
                this.pageIndicatorY,

                `Page ${this.currentPage + 1} / ${totalPages}`,

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "13px",

                    color:
                        "#555555"

                }

            )
            .setOrigin(
                0.5,
                0
            );


        container.add(
            pageIndicator
        );


        // =================================================
        // PREVIOUS
        // =================================================

        if (
            this.currentPage > 0
        ) {

            const previous =
                this.createFooterButton(

                    0,
                    this.navigationY,

                    "◀ Previous",

                    "#0066cc",

                    0

                );


            previous.on(

                "pointerdown",

                () => {

                    this.warningMessage = null;

                    this.currentPage--;

                    this.renderPage();

                }

            );


            container.add(
                previous
            );

        }


        // =================================================
        // NEXT
        // =================================================

        if (
            this.currentPage <
            totalPages - 1
        ) {

            const next =
                this.createFooterButton(

                    this.contentWidth,
                    this.navigationY,

                    "Next ▶",

                    "#0066cc",

                    1

                );


            next.on(

                "pointerdown",

                () => {

                    this.warningMessage = null;

                    this.currentPage++;

                    this.renderPage();

                }

            );


            container.add(
                next
            );

        }


        // =================================================
        // SUBMIT
        // =================================================

        if (
            this.currentPage ===
            totalPages - 1
        ) {

            const submit =
                this.createFooterButton(

                    this.contentWidth,
                    this.navigationY,

                    "✓ Submit Notebook",

                    "#e67e00",

                    1

                );


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
                        "#e67e00"
                    );

                }

            );


            submit.on(

                "pointerdown",

                () => {

                    this.submitNotebook();

                }

            );


            container.add(
                submit
            );

        }


        // =================================================
        // SET CONTENT
        // =================================================

        this.window.setContent(
            container
        );

    }


    // =====================================================
    // CREATE OPTION
    // =====================================================

    createOption(
        question,
        option,
        y
    ) {

        const isSelected =
            () =>

                this.answers[
                    question.id
                ] === option;


        const optionText =
            this.scene.add.text(

                12,
                y,

                isSelected()
                    ? `● ${option}`
                    : `○ ${option}`,

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "15px",

                    color:
                        isSelected()
                            ? "#008800"
                            : "#0066cc",

                    wordWrap: {

                        width:
                            this.contentWidth - 12

                    },

                    lineSpacing:
                        1

                }

            );


        optionText.setInteractive({

            useHandCursor:
                true

        });


        optionText.on(

            "pointerover",

            () => {

                if (
                    !isSelected()
                ) {

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

                    isSelected()
                        ? "#008800"
                        : "#0066cc"

                );

            }

        );


        optionText.on(

            "pointerdown",

            () => {

                this.answers[
                    question.id
                ] = option;


                this.warningMessage = null;


                this.renderPage();

            }

        );


        return optionText;

    }


    // =====================================================
    // CREATE FOOTER BUTTON
    // =====================================================

    createFooterButton(
        x,
        y,
        label,
        color,
        originX
    ) {

        const button =
            this.scene.add.text(

                x,
                y,

                label,

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "15px",

                    color:
                        color,

                    fontStyle:
                        "bold"

                }

            )
            .setOrigin(
                originX,
                0
            )
            .setInteractive({

                useHandCursor:
                    true

            });


        if (
            label !==
            "✓ Submit Notebook"
        ) {

            button.on(

                "pointerover",

                () => {

                    button.setColor(
                        "#ff8800"
                    );

                }

            );


            button.on(

                "pointerout",

                () => {

                    button.setColor(
                        color
                    );

                }

            );

        }


        return button;

    }


    // =====================================================
    // GET CORRECT ANSWERS
    // =====================================================

    getCorrectAnswers() {

        const correctAnswers = {};


        this.notebookData.forEach(

            question => {

                if (
                    question.correctAnswer !==
                    undefined
                ) {

                    correctAnswers[
                        question.id
                    ] =
                        question.correctAnswer;

                }
                else if (
                    question.answer !==
                    undefined
                ) {

                    correctAnswers[
                        question.id
                    ] =
                        question.answer;

                }
                else if (
                    question.correct !==
                    undefined
                ) {

                    correctAnswers[
                        question.id
                    ] =
                        question.correct;

                }

            }

        );


        return correctAnswers;

    }


    // =====================================================
    // SUBMIT NOTEBOOK
    // =====================================================

    submitNotebook() {

        if (
            this.submitted
        ) {

            return;

        }


        const unanswered =
            this.notebookData.filter(

                question =>

                    !this.answers[
                        question.id
                    ]

            );


        if (
            unanswered.length > 0
        ) {

            this.warningMessage =

                `Answer all questions before submitting (${unanswered.length} remaining).`;


            this.renderPage();


            return;

        }


        const correctAnswers =
            this.getCorrectAnswers();


        if (

            Object.keys(
                correctAnswers
            ).length !==
            this.notebookData.length

        ) {

            console.error(

                "Notebook correct answers are missing!",

                correctAnswers

            );


            this.warningMessage =

                "Notebook configuration error.";


            this.renderPage();


            return;

        }


        let points = 0;


        if (
            this.scoreManager
        ) {

            points =
                this.scoreManager
                    .calculateNotebookScore(

                        this.answers,

                        correctAnswers

                    );

        }


        this.submitted = true;


        this.window.close();


        if (
            this.onSubmit
        ) {

            this.onSubmit(
                points
            );

        }

    }

}