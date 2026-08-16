import Phaser from "phaser";


export default class AssessmentViewer {

    constructor(
        scene,
        window,
        assessmentData,
        scoreManager
    ) {

        this.scene =
            scene;

        this.window =
            window;

        this.assessmentData =
            assessmentData;

        this.scoreManager =
            scoreManager;


        // =====================================================
        // ASSESSMENT STATE
        // =====================================================

        this.selectedAnswer =
            null;

        this.container =
            null;

        this.submitted =
            false;


        // =====================================================
        // ASSESSMENT PAGINATION
        // =====================================================

        this.currentPage =
            0;

        this.optionsPerPage =
            2;


        // =====================================================
        // RESULT PAGINATION
        // =====================================================

        this.resultPages =
            [];

        this.resultPage =
            0;

        this.currentResult =
            null;


        // =====================================================
        // LAYOUT
        // =====================================================

        this.contentWidth =
            620;


        this.footerY =
            392;

    }


    // =====================================================
    // OPEN
    // =====================================================

    open() {

        this.selectedAnswer =
            null;


        this.submitted =
            false;


        this.currentPage =
            0;


        this.resultPages =
            [];


        this.resultPage =
            0;


        this.currentResult =
            null;


        this.renderAssessment();

    }


    // =====================================================
    // TOTAL ASSESSMENT PAGES
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

        this.destroyCurrentContainer();


        this.container =
            this.scene.add.container(
                0,
                0
            );


        // =================================================
        // HEADER
        // =================================================

        const header =
            this.scene.add.rectangle(

                this.contentWidth / 2,
                35,

                this.contentWidth,
                70,

                0x17263b

            );


        header.setStrokeStyle(
            1,
            0x24b8ff
        );


        this.container.add(
            header
        );


        // =================================================
        // EYEBROW
        // =================================================

        const eyebrow =
            this.scene.add.text(

                18,
                12,

                "FINAL ASSESSMENT",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "11px",

                    fontStyle:
                        "bold",

                    color:
                        "#67d6ff"

                }

            );


        this.container.add(
            eyebrow
        );


        // =================================================
        // TITLE
        // =================================================

        const title =
            this.scene.add.text(

                18,
                32,

                "Choose ONE recommendation for the restaurant.",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "18px",

                    fontStyle:
                        "bold",

                    color:
                        "#ffffff",

                    wordWrap: {

                        width:
                            this.contentWidth - 36

                    }

                }

            );


        this.container.add(
            title
        );


        // =================================================
        // PAGE INDICATOR
        // =================================================

        const totalPages =
            this.getTotalPages();


        const pageIndicator =
            this.scene.add.text(

                this.contentWidth / 2,
                88,

                `Page ${this.currentPage + 1} of ${totalPages}`,

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "13px",

                    fontStyle:
                        "bold",

                    color:
                        "#69737d"

                }

            )
            .setOrigin(
                0.5
            );


        this.container.add(
            pageIndicator
        );


        // =================================================
        // CURRENT OPTIONS
        // =================================================

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
            118;


        pageOptions.forEach(

            option => {

                const optionCard =
                    this.createOptionCard(

                        option,

                        currentY

                    );


                this.container.add(
                    optionCard
                );


                currentY +=
                    112;

            }

        );


        // =================================================
        // FOOTER DIVIDER
        // =================================================

        const footerDivider =
            this.scene.add.rectangle(

                this.contentWidth / 2,
                this.footerY - 16,

                this.contentWidth,
                1,

                0xd2d7dc

            );


        this.container.add(
            footerDivider
        );


        // =================================================
        // PREVIOUS
        // =================================================

        if (
            this.currentPage > 0
        ) {

            const previous =
                this.createTextButton(

                    0,
                    this.footerY,

                    "◀ Previous",

                    0

                );


            previous.on(

                "pointerdown",

                () => {

                    this.currentPage--;


                    this.renderAssessment();

                }

            );


            this.container.add(
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
                this.createTextButton(

                    this.contentWidth,
                    this.footerY,

                    "Next ▶",

                    1

                );


            next.on(

                "pointerdown",

                () => {

                    this.currentPage++;


                    this.renderAssessment();

                }

            );


            this.container.add(
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
                this.createPrimaryButton(

                    this.contentWidth - 120,
                    this.footerY - 4,

                    240,
                    46,

                    "SUBMIT ASSESSMENT"

                );


            submit.button.on(

                "pointerdown",

                () => {

                    this.submitAssessment();

                }

            );


            this.container.add([

                submit.button,
                submit.label

            ]);

        }


        // =================================================
        // WINDOW
        // =================================================

        this.window.open({

            title:
                "Final Assessment"

        });


        this.window.setContent(
            this.container
        );

    }


    // =====================================================
    // CREATE OPTION CARD
    // =====================================================

    createOptionCard(
        option,
        y
    ) {

        const wrapper =
            this.scene.add.container(
                0,
                y
            );


        const isSelected =

            this.selectedAnswer ===
            option.id;


        // =================================================
        // CARD
        // =================================================

        const card =
            this.scene.add.rectangle(

                this.contentWidth / 2,
                45,

                this.contentWidth,
                90,

                isSelected
                    ? 0xeaf4ff
                    : 0xf8f9fa

            );


        card.setStrokeStyle(

            isSelected
                ? 2
                : 1,

            isSelected
                ? 0x1683e8
                : 0xd3d9de

        );


        card.setInteractive({

            useHandCursor:
                true

        });


        wrapper.add(
            card
        );


        // =================================================
        // RADIO
        // =================================================

        const radio =
            this.scene.add.text(

                18,
                29,

                isSelected
                    ? "●"
                    : "○",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "22px",

                    fontStyle:
                        "bold",

                    color:
                        isSelected
                            ? "#1683e8"
                            : "#74808b"

                }

            );


        wrapper.add(
            radio
        );


        // =================================================
        // OPTION TEXT
        // =================================================

        const optionText =
            this.scene.add.text(

                52,
                18,

                option.text,

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "16px",

                    color:
                        "#27313a",

                    wordWrap: {

                        width:
                            this.contentWidth - 76

                    },

                    lineSpacing:
                        3

                }

            );


        wrapper.add(
            optionText
        );


        // =================================================
        // HOVER IN
        // =================================================

        card.on(

            "pointerover",

            () => {

                if (
                    this.submitted
                ) {

                    return;

                }


                card.setFillStyle(
                    0xeaf4ff
                );


                card.setStrokeStyle(
                    2,
                    0x1683e8
                );

            }

        );


        // =================================================
        // HOVER OUT
        // =================================================

        card.on(

            "pointerout",

            () => {

                if (
                    this.submitted
                ) {

                    return;

                }


                const stillSelected =

                    this.selectedAnswer ===
                    option.id;


                card.setFillStyle(

                    stillSelected
                        ? 0xeaf4ff
                        : 0xf8f9fa

                );


                card.setStrokeStyle(

                    stillSelected
                        ? 2
                        : 1,

                    stillSelected
                        ? 0x1683e8
                        : 0xd3d9de

                );

            }

        );


        // =================================================
        // SELECT
        // =================================================

        card.on(

            "pointerdown",

            () => {

                if (
                    this.submitted
                ) {

                    return;

                }


                this.selectedAnswer =
                    option.id;


                this.renderAssessment();

            }

        );


        return wrapper;

    }


    // =====================================================
    // SUBMIT ASSESSMENT
    // =====================================================

    submitAssessment() {

        if (
            this.submitted
        ) {

            return;

        }


        if (
            !this.selectedAnswer
        ) {

            this.showInlineMessage(
                "Choose one recommendation before submitting."
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

        catch (
            error
        ) {

            console.error(

                "Assessment evaluation failed:",

                error

            );


            this.showInlineMessage(
                "Assessment could not be submitted."
            );


            return;

        }


        this.submitted =
            true;


        console.log(

            "Assessment result:",

            result

        );


        this.showResult(
            result
        );

    }


    // =====================================================
    // SHOW RESULT
    // =====================================================

    showResult(
        result
    ) {

        this.currentResult =
            result;


        this.resultPages =
            this.createResultPages(

                result.explanation ||
                "No explanation available."

            );


        this.resultPage =
            0;


        this.renderResultPage();

    }


    // =====================================================
    // CREATE RESULT PAGES
    // =====================================================

    createResultPages(
        content
    ) {

        const pages =
            [];


        // Slightly smaller than before so the explanation
        // always fits cleanly inside the new result card.
        const maxHeight =
            165;


        const textWidth =
            this.contentWidth - 44;


        const paragraphs =
            String(
                content
            ).split(
                "\n"
            );


        let currentText =
            "";


        const measureText =
            this.scene.add.text(

                0,
                0,

                "",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "15px",

                    lineSpacing:
                        4,

                    wordWrap: {

                        width:
                            textWidth

                    }

                }

            );


        paragraphs.forEach(

            paragraph => {

                const testText =

                    currentText === ""
                        ? paragraph
                        : (
                            currentText +
                            "\n\n" +
                            paragraph
                        );


                measureText.setText(
                    testText
                );


                if (
                    measureText.height >
                        maxHeight &&
                    currentText !== ""
                ) {

                    pages.push(
                        currentText
                    );


                    currentText =
                        paragraph;

                }

                else {

                    currentText =
                        testText;

                }

            }

        );


        if (
            currentText.trim() !== ""
        ) {

            pages.push(
                currentText
            );

        }


        measureText.destroy();


        if (
            pages.length === 0
        ) {

            pages.push(
                "No explanation available."
            );

        }


        return pages;

    }


    // =====================================================
    // RENDER RESULT PAGE
    // =====================================================

    renderResultPage() {

        this.destroyCurrentContainer();


        const result =
            this.currentResult;


        if (
            !result
        ) {

            return;

        }


        this.container =
            this.scene.add.container(
                0,
                0
            );


        // =================================================
        // RESULT HEADER CARD
        // =================================================

        const header =
            this.scene.add.rectangle(

                this.contentWidth / 2,
                48,

                this.contentWidth,
                96,

                result.correct
                    ? 0xeaf7ef
                    : 0xffeeee

            );


        header.setStrokeStyle(

            2,

            result.correct
                ? 0x2da766
                : 0xd35454

        );


        this.container.add(
            header
        );


        // =================================================
        // RESULT STATUS
        // =================================================

        const status =
            this.scene.add.text(

                20,
                17,

                result.correct
                    ? "✓ CORRECT DECISION"
                    : "✕ INCORRECT DECISION",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "20px",

                    fontStyle:
                        "bold",

                    color:
                        result.correct
                            ? "#168e52"
                            : "#b54141"

                }

            );


        this.container.add(
            status
        );


        // =================================================
        // POINTS
        // =================================================

        const points =
            this.scene.add.text(

                20,
                54,

                `+${result.score} POINTS`,

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "16px",

                    fontStyle:
                        "bold",

                    color:
                        "#26313b"

                }

            );


        this.container.add(
            points
        );


        // =================================================
        // TOTAL SCORE
        // =================================================

        const totalScore =
            this.scene.add.text(

                this.contentWidth - 20,
                54,

                `TOTAL ${this.scoreManager.getScore()}`,

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "16px",

                    fontStyle:
                        "bold",

                    color:
                        "#1683e8"

                }

            )
            .setOrigin(
                1,
                0
            );


        this.container.add(
            totalScore
        );


        // =================================================
        // EXPLANATION LAYOUT
        // =================================================

        /*
         * Important spacing:
         *
         * heading top       = 116
         * heading height    ≈ 16
         * card top          = 145
         *
         * This leaves clear visual space between the
         * subtitle and the card border.
         */

        const explanationHeadingY =
            116;


        const explanationCardTop =
            145;


        const explanationCardHeight =
            196;


        const explanationCardCenterY =

            explanationCardTop +
            explanationCardHeight / 2;


        // =================================================
        // EXPLANATION HEADING
        // =================================================

        const explanationHeading =
            this.scene.add.text(

                0,
                explanationHeadingY,

                "WHY THIS DECISION MATTERS",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "12px",

                    fontStyle:
                        "bold",

                    color:
                        "#5e6974"

                }

            );


        this.container.add(
            explanationHeading
        );


        // =================================================
        // EXPLANATION CARD
        // =================================================

        const explanationCard =
            this.scene.add.rectangle(

                this.contentWidth / 2,

                explanationCardCenterY,

                this.contentWidth,

                explanationCardHeight,

                0xfbfaf7

            );


        explanationCard.setStrokeStyle(
            1,
            0xd3d8dc
        );


        this.container.add(
            explanationCard
        );


        // =================================================
        // EXPLANATION TEXT
        // =================================================

        const explanation =
            this.scene.add.text(

                22,

                explanationCardTop + 16,

                this.resultPages[
                    this.resultPage
                ],

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "15px",

                    color:
                        "#293139",

                    lineSpacing:
                        4,

                    wordWrap: {

                        width:
                            this.contentWidth - 44

                    }

                }

            );


        this.container.add(
            explanation
        );


        // =================================================
        // RESULT PAGE INDICATOR
        // =================================================

        if (
            this.resultPages.length > 1
        ) {

            const resultPageIndicator =
                this.scene.add.text(

                    this.contentWidth / 2,
                    355,

                    `Explanation ${this.resultPage + 1} of ${this.resultPages.length}`,

                    {

                        fontFamily:
                            "monospace",

                        fontSize:
                            "11px",

                        fontStyle:
                            "bold",

                        color:
                            "#727c85"

                    }

                )
                .setOrigin(
                    0.5
                );


            this.container.add(
                resultPageIndicator
            );

        }


        // =================================================
        // FOOTER DIVIDER
        // =================================================

        const footerDivider =
            this.scene.add.rectangle(

                this.contentWidth / 2,
                this.footerY - 16,

                this.contentWidth,
                1,

                0xd2d7dc

            );


        this.container.add(
            footerDivider
        );


        // =================================================
        // PREVIOUS RESULT PAGE
        // =================================================

        if (
            this.resultPage > 0
        ) {

            const previous =
                this.createTextButton(

                    0,
                    this.footerY,

                    "◀ Previous",

                    0

                );


            previous.on(

                "pointerdown",

                () => {

                    this.resultPage--;


                    this.renderResultPage();

                }

            );


            this.container.add(
                previous
            );

        }


        // =================================================
        // NEXT RESULT PAGE
        // =================================================

        if (
            this.resultPage <
            this.resultPages.length - 1
        ) {

            const next =
                this.createTextButton(

                    this.contentWidth,
                    this.footerY,

                    "Next ▶",

                    1

                );


            next.on(

                "pointerdown",

                () => {

                    this.resultPage++;


                    this.renderResultPage();

                }

            );


            this.container.add(
                next
            );

        }


        // =================================================
        // CONTINUE
        // =================================================

        else {

            const continueControl =
                this.createPrimaryButton(

                    this.contentWidth - 115,
                    this.footerY - 4,

                    230,
                    46,

                    "CONTINUE  →"

                );


            continueControl.button.on(

                "pointerdown",

                () => {

                    this.continueToNextRoom(
                        this.container
                    );

                }

            );


            this.container.add([

                continueControl.button,
                continueControl.label

            ]);

        }


        // =================================================
        // WINDOW
        // =================================================

        this.window.open({

            title:
                "Assessment Result"

        });


        this.window.setContent(
            this.container
        );

    }


    // =====================================================
    // INLINE MESSAGE
    // =====================================================

    showInlineMessage(
        message
    ) {

        if (
            !this.container
        ) {

            return;

        }


        const warning =
            this.scene.add.text(

                this.contentWidth / 2,
                this.footerY - 45,

                message,

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "12px",

                    fontStyle:
                        "bold",

                    color:
                        "#c0392b",

                    align:
                        "center",

                    wordWrap: {

                        width:
                            430

                    }

                }

            )
            .setOrigin(
                0.5
            );


        this.container.add(
            warning
        );


        this.scene.time.delayedCall(

            1800,

            () => {

                if (
                    warning &&
                    warning.active
                ) {

                    warning.destroy();

                }

            }

        );

    }


    // =====================================================
    // CREATE TEXT BUTTON
    // =====================================================

    createTextButton(
        x,
        y,
        label,
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

                    fontStyle:
                        "bold",

                    color:
                        "#1683e8"

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


        button.on(

            "pointerover",

            () => {

                button.setColor(
                    "#ff8a00"
                );

            }

        );


        button.on(

            "pointerout",

            () => {

                button.setColor(
                    "#1683e8"
                );

            }

        );


        return button;

    }


    // =====================================================
    // CREATE PRIMARY BUTTON
    // =====================================================

    createPrimaryButton(
        x,
        y,
        width,
        height,
        labelText
    ) {

        const button =
            this.scene.add.rectangle(

                x,
                y,

                width,
                height,

                0x17263b

            );


        button.setStrokeStyle(
            2,
            0x24b8ff
        );


        button.setInteractive({

            useHandCursor:
                true

        });


        const label =
            this.scene.add.text(

                x,
                y,

                labelText,

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "15px",

                    fontStyle:
                        "bold",

                    color:
                        "#67d6ff"

                }

            )
            .setOrigin(
                0.5
            );


        button.on(

            "pointerover",

            () => {

                button.setFillStyle(
                    0x203a55
                );


                label.setColor(
                    "#ffffff"
                );

            }

        );


        button.on(

            "pointerout",

            () => {

                button.setFillStyle(
                    0x17263b
                );


                label.setColor(
                    "#67d6ff"
                );

            }

        );


        return {

            button,
            label

        };

    }


    // =====================================================
    // DESTROY CURRENT CONTAINER
    // =====================================================

    destroyCurrentContainer() {

        if (
            this.container
        ) {

            this.container.destroy(
                true
            );


            this.container =
                null;

        }

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


        // =================================================
        // PREVENT MULTIPLE CLICKS
        // =================================================

        if (
            !this.submitted
        ) {

            return;

        }


        // =================================================
        // CLEANUP
        // =================================================

        if (
            resultContainer
        ) {

            resultContainer.destroy(
                true
            );

        }


        this.container =
            null;


        this.window.close();


        // =================================================
        // CURRENT ROOM
        // =================================================

        const currentRoom =
            this.scoreManager.getRoom();


        console.log(

            "Current room:",

            currentRoom

        );


        // =================================================
        // ROOM 3 → FINAL RESULTS
        // =================================================

        if (
            currentRoom >= 3
        ) {

            console.log(
                "All rooms completed."
            );


            console.log(

                "Final score:",

                this.scoreManager.getScore()

            );


            this.scene.scene.start(

                "FinalResultsScene",

                {

                    scoreManager:
                        this.scoreManager

                }

            );


            return;

        }


        // =================================================
        // NEXT ROOM
        // =================================================

        const nextRoom =
            currentRoom + 1;


        const nextScene =
            `Room${nextRoom}Scene`;


        console.log(

            `Moving from Room ${currentRoom} → Room ${nextRoom}`

        );


        /*
         * setRoom() changes the room-specific assessment /
         * notebook state but keeps your global score and
         * 20-minute timer intact.
         */

        this.scoreManager.setRoom(
            nextRoom
        );


        this.scene.scene.start(

            nextScene,

            {

                scoreManager:
                    this.scoreManager

            }

        );

    }

}