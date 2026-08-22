import Phaser from "phaser";


export default class NotebookViewer {

    constructor(
        scene,
        window,
        notebookData,
        scoreManager,
        onSubmit
    ) {

        this.scene =
            scene;

        this.window =
            window;

        this.scoreManager =
            scoreManager;

        this.onSubmit =
            onSubmit;


        // =====================================================
        // NORMALIZE NOTEBOOK DATA
        // =====================================================

        /*
         * Supported formats:
         *
         * 1. Direct array
         *
         * [
         *     { id, question, options, correctAnswer }
         * ]
         *
         * 2. Object wrapper
         *
         * {
         *     questions: [
         *         { id, question, options, correctAnswer }
         *     ]
         * }
         */

        if (
            Array.isArray(
                notebookData
            )
        ) {

            this.notebookData =
                notebookData;

        }
        else if (
            notebookData &&
            Array.isArray(
                notebookData.questions
            )
        ) {

            this.notebookData =
                notebookData.questions;

        }
        else {

            console.error(
                "NotebookViewer menerima format notebook yang tidak valid:",
                notebookData
            );


            this.notebookData =
                [];

        }


        console.log(
            "NotebookViewer loaded questions:",
            this.notebookData.length
        );


        // =====================================================
        // NOTEBOOK STATE
        // =====================================================

        this.answers =
            {};

        this.currentPage =
            0;

        this.questionsPerPage =
            1;

        this.submitted =
            false;


        // =====================================================
        // LAYOUT
        // =====================================================

        this.contentWidth =
            410;

        this.maxQuestionHeight =
            340;

        this.dividerY =
            352;

        this.pageIndicatorY =
            364;

        this.navigationY =
            392;


        // =====================================================
        // WARNING STATE
        // =====================================================

        this.warningMessage =
            null;

    }


    // =====================================================
    // OPEN NOTEBOOK
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
        // VALIDATE DATA
        // =================================================

        if (
            !Array.isArray(
                this.notebookData
            ) ||
            this.notebookData.length === 0
        ) {

            console.error(
                "Notebook contains no questions."
            );


            this.window.open({

                title:
                    "Catatan Investigasi"

            });


            this.window.setContent(

                "Data pertanyaan Catatan Investigasi tidak tersedia."

            );


            return;

        }


        this.currentPage =
            0;


        this.warningMessage =
            null;


        this.window.open({

            title:
                "Catatan Investigasi"

        });


        this.renderPage();

    }


    // =====================================================
    // RENDER PAGE
    // =====================================================

    renderPage() {

        // =================================================
        // VALIDATE NOTEBOOK
        // =================================================

        if (
            !Array.isArray(
                this.notebookData
            ) ||
            this.notebookData.length === 0
        ) {

            console.error(
                "Cannot render notebook: no questions."
            );


            return;

        }


        // =================================================
        // CLEAR OLD CONTENT
        // =================================================

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


        let currentY =
            0;


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


        // Prevent invalid page position

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

            this.currentPage =
                0;

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

                    `PERTANYAAN ${i + 1}`,

                    {

                        fontSize:
                            "13px",

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
                questionNumber.height + 8;


            // =================================================
            // QUESTION TEXT
            // =================================================

            const questionText =
                this.scene.add.text(

                    0,
                    currentY,

                    question.question ||
                    "Pertanyaan tidak tersedia.",

                    {

                        fontSize:
                            "20px",

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
                            2

                    }

                );


            questionContainer.add(
                questionText
            );


            currentY +=
                questionText.height + 16;


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
                        optionText.height + 8;

                }

            );

        }


        // =================================================
        // AUTO-COMPACT LONG QUESTIONS
        // =================================================

        if (
            currentY >
            this.maxQuestionHeight
        ) {

            const calculatedScale =

                this.maxQuestionHeight /
                currentY;


            const safeScale =
                Math.max(

                    calculatedScale,
                    0.80

                );


            questionContainer.setScale(
                safeScale
            );

        }


        // =================================================
        // FIXED FOOTER DIVIDER
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
        // OPTIONAL WARNING
        // =================================================

        if (
            this.warningMessage
        ) {

            const warning =
                this.scene.add.text(

                    this.contentWidth / 2,
                    this.dividerY - 17,

                    this.warningMessage,

                    {

                        fontFamily:
                            "monospace",

                        fontSize:
                            "12px",

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
                        "14px",

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
        // PREVIOUS BUTTON
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

                    this.warningMessage =
                        null;


                    this.currentPage--;


                    this.renderPage();

                }

            );


            container.add(
                previous
            );

        }


        // =================================================
        // NEXT BUTTON
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

                    this.warningMessage =
                        null;


                    this.currentPage++;


                    this.renderPage();

                }

            );


            container.add(
                next
            );

        }


        // =================================================
        // SUBMIT BUTTON
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

                    console.log(
                        "SUBMIT NOTEBOOK CLICKED"
                    );


                    this.submitNotebook();

                }

            );


            container.add(
                submit
            );

        }


        // =================================================
        // SET WINDOW CONTENT
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
            () => {

                return (

                    this.answers[
                        question.id
                    ] === option

                );

            };


        const optionText =
            this.scene.add.text(

                15,
                y,

                isSelected()
                    ? `● ${option}`
                    : `○ ${option}`,

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "17px",

                    color:
                        isSelected()
                            ? "#008800"
                            : "#0066cc",

                    wordWrap: {

                        width:
                            this.contentWidth - 15

                    },

                    lineSpacing:
                        2

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

                console.log(

                    `Answer selected: ${question.id} = ${option}`

                );


                this.answers[
                    question.id
                ] = option;


                this.warningMessage =
                    null;


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
                        "16px",

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

        const correctAnswers =
            {};


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

        if (
            this.submitted
        ) {

            console.warn(
                "Notebook has already been submitted."
            );


            return;

        }


        if (
            !Array.isArray(
                this.notebookData
            ) ||
            this.notebookData.length === 0
        ) {

            console.error(
                "Cannot submit an empty notebook."
            );


            return;

        }


        console.log(

            "Notebook answers:",

            this.answers

        );


        // =================================================
        // CHECK FOR UNANSWERED QUESTIONS
        // =================================================

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

            console.warn(
                "Notebook incomplete."
            );


            this.warningMessage =

                `Answer all questions before submitting (${unanswered.length} remaining).`;


            this.renderPage();


            return;

        }


        // =================================================
        // GET CORRECT ANSWERS
        // =================================================

        const correctAnswers =
            this.getCorrectAnswers();


        // =================================================
        // VALIDATE ANSWER CONFIGURATION
        // =================================================

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

                "Notebook configuration error: missing correct answers.";


            this.renderPage();


            return;

        }


        // =================================================
        // CALCULATE SCORE
        // =================================================

        let points =
            0;


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


        console.log(

            `Notebook score: +${points}`

        );


        if (
            this.scoreManager &&
            typeof this.scoreManager.getScore ===
                "function"
        ) {

            console.log(

                `Total game score: ${this.scoreManager.getScore()}`

            );

        }


        // =================================================
        // MARK SUBMITTED
        // =================================================

        this.submitted =
            true;


        // =================================================
        // CLOSE NOTEBOOK
        // =================================================

        this.window.close();


        // =================================================
        // NOTIFY ROOM
        // =================================================

        if (
            this.onSubmit
        ) {

            this.onSubmit(
                points
            );

        }

    }

}