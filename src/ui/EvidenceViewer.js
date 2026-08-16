import Phaser from "phaser";


export default class EvidenceViewer {

    constructor(
        scene,
        window,
        evidenceList
    ) {

        this.scene =
            scene;

        this.window =
            window;

        this.evidenceList =
            evidenceList;


        // =====================================================
        // PAGINATION STATE
        // =====================================================

        this.currentEvidence =
            null;

        this.pages =
            [];

        this.currentPage =
            0;

        this.pageContainer =
            null;


        // =====================================================
        // LAYOUT
        // =====================================================

        this.contentWidth =
            620;

        this.contentHeight =
            285;

        this.footerY =
            365;

    }


    // =====================================================
    // CREATE CLICKABLE FOLDER LIST
    // =====================================================

    createFolderList() {

        const container =
            this.scene.add.container(
                0,
                0
            );


        // =================================================
        // HEADER
        // =================================================

        const heading =
            this.scene.add.text(

                0,
                0,

                "AVAILABLE EVIDENCE",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "14px",

                    fontStyle:
                        "bold",

                    color:
                        "#5b6570"

                }

            );


        container.add(
            heading
        );


        // =================================================
        // FILE CARDS
        // =================================================

        this.evidenceList.forEach(
            (file, index) => {

                const y =
                    38 + index * 58;


                const card =
                    this.scene.add.rectangle(

                        this.contentWidth / 2,
                        y + 20,

                        this.contentWidth,
                        46,

                        0xf6f8fa

                    );


                card.setStrokeStyle(
                    1,
                    0xd1d9e0
                );


                card.setInteractive({

                    useHandCursor:
                        true

                });


                const title =
                    this.scene.add.text(

                        18,
                        y + 8,

                        `${file.icon || "◆"}  ${file.title}`,

                        {

                            fontFamily:
                                "monospace",

                            fontSize:
                                "16px",

                            fontStyle:
                                "bold",

                            color:
                                "#243447"

                        }

                    );


                const subtitle =
                    this.scene.add.text(

                        18,
                        y + 29,

                        "Open evidence file",

                        {

                            fontFamily:
                                "monospace",

                            fontSize:
                                "11px",

                            color:
                                "#7a8794"

                        }

                    );


                // =========================================
                // HOVER
                // =========================================

                card.on(

                    "pointerover",

                    () => {

                        card.setFillStyle(
                            0xeaf4ff
                        );


                        card.setStrokeStyle(
                            1,
                            0x1683e8
                        );


                        title.setColor(
                            "#1683e8"
                        );

                    }

                );


                card.on(

                    "pointerout",

                    () => {

                        card.setFillStyle(
                            0xf6f8fa
                        );


                        card.setStrokeStyle(
                            1,
                            0xd1d9e0
                        );


                        title.setColor(
                            "#243447"
                        );

                    }

                );


                // =========================================
                // OPEN
                // =========================================

                card.on(

                    "pointerdown",

                    () => {

                        this.openEvidence(
                            file.id
                        );

                    }

                );


                container.add([
                    card,
                    title,
                    subtitle
                ]);

            }
        );


        return container;

    }


    // =====================================================
    // OPEN EVIDENCE FOLDER
    // =====================================================

    openFolder() {

        const folderList =
            this.createFolderList();


        this.window.open({

            title:
                "Evidence Files"

        });


        this.window.setContent(
            folderList
        );

    }


    // =====================================================
    // OPEN INDIVIDUAL EVIDENCE
    // =====================================================

    openEvidence(id) {

        const evidence =
            this.evidenceList.find(

                file =>
                    file.id === id

            );


        if (
            !evidence
        ) {

            console.warn(
                `Evidence '${id}' not found.`
            );

            return;

        }


        console.log(
            `Opening evidence: ${evidence.title}`
        );


        this.currentEvidence =
            evidence;


        // =================================================
        // BUILD PAGES
        // =================================================

        this.pages =
            this.createPages(

                evidence.content ||
                "No evidence content available."

            );


        this.currentPage =
            0;


        // =================================================
        // OPEN WINDOW
        // =================================================

        this.window.open({

            title:
                evidence.title

        });


        // =================================================
        // RENDER FIRST PAGE
        // =================================================

        this.renderPage();

    }


    // =====================================================
    // CREATE PAGES
    // =====================================================

    createPages(content) {

        const pages =
            [];


        const textWidth =
            this.contentWidth - 44;


        const maxHeight =
            245;


        const paragraphs =
            content.split("\n");


        let currentText =
            "";


        // =================================================
        // TEMPORARY MEASUREMENT TEXT
        // =================================================

        const measureText =
            this.scene.add.text(

                0,
                0,

                "",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "17px",

                    lineSpacing:
                        4,

                    wordWrap: {

                        width:
                            textWidth

                    }

                }

            );


        // =================================================
        // BUILD PAGES
        // =================================================

        paragraphs.forEach(
            paragraph => {

                const testText =
                    currentText === ""
                        ? paragraph
                        : currentText +
                          "\n\n" +
                          paragraph;


                measureText.setText(
                    testText
                );


                const height =
                    measureText.height;


                if (
                    height > maxHeight &&
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


        // =================================================
        // ADD REMAINING TEXT
        // =================================================

        if (
            currentText.trim() !== ""
        ) {

            pages.push(
                currentText
            );

        }


        measureText.destroy();


        // =================================================
        // FALLBACK
        // =================================================

        if (
            pages.length === 0
        ) {

            pages.push(
                "No evidence content available."
            );

        }


        console.log(
            `Evidence split into ${pages.length} page(s).`
        );


        return pages;

    }


    // =====================================================
    // RENDER CURRENT PAGE
    // =====================================================

    renderPage() {

        // =================================================
        // DESTROY PREVIOUS PAGE
        // =================================================

        if (
            this.pageContainer
        ) {

            this.pageContainer.destroy(
                true
            );


            this.pageContainer =
                null;

        }


        // =================================================
        // MAIN CONTAINER
        // =================================================

        this.pageContainer =
            this.scene.add.container(
                0,
                0
            );


        // =================================================
        // HEADER CARD
        // =================================================

        const headerCard =
            this.scene.add.rectangle(

                this.contentWidth / 2,
                34,

                this.contentWidth,
                68,

                0x17263b

            );


        headerCard.setStrokeStyle(
            1,
            0x24b8ff
        );


        this.pageContainer.add(
            headerCard
        );


        // =================================================
        // EVIDENCE TYPE
        // =================================================

        const evidenceType =
            this.getEvidenceType(
                this.currentEvidence
            );


        const typeText =
            this.scene.add.text(

                18,
                12,

                evidenceType,

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


        this.pageContainer.add(
            typeText
        );


        // =================================================
        // EVIDENCE TITLE
        // =================================================

        const title =
            this.scene.add.text(

                18,
                31,

                this.currentEvidence?.title ||
                "Evidence",

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "19px",

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


        this.pageContainer.add(
            title
        );


        // =================================================
        // CONTENT CARD
        // =================================================

        const contentCard =
            this.scene.add.rectangle(

                this.contentWidth / 2,
                220,

                this.contentWidth,
                this.contentHeight,

                0xfbfaf7

            );


        contentCard.setStrokeStyle(
            1,
            0xd6d6d1
        );


        this.pageContainer.add(
            contentCard
        );


        // =================================================
        // EVIDENCE TEXT
        // =================================================

        const text =
            this.scene.add.text(

                22,
                92,

                this.pages[
                    this.currentPage
                ],

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "17px",

                    color:
                        "#20252a",

                    lineSpacing:
                        5,

                    wordWrap: {

                        width:
                            this.contentWidth - 44

                    }

                }

            );


        this.pageContainer.add(
            text
        );


        // =================================================
        // FOOTER DIVIDER
        // =================================================

        const divider =
            this.scene.add.rectangle(

                this.contentWidth / 2,
                this.footerY - 12,

                this.contentWidth,
                1,

                0xd0d6dc

            );


        this.pageContainer.add(
            divider
        );


        // =================================================
        // PREVIOUS
        // =================================================

        if (
            this.currentPage > 0
        ) {

            const previous =
                this.createNavigationButton(

                    0,
                    this.footerY,

                    "◀ Previous",

                    0

                );


            previous.on(

                "pointerdown",

                () => {

                    this.previousPage();

                }

            );


            this.pageContainer.add(
                previous
            );

        }


        // =================================================
        // PAGE INDICATOR
        // =================================================

        const pageNumber =
            this.scene.add.text(

                this.contentWidth / 2,
                this.footerY,

                `Page ${this.currentPage + 1} of ${this.pages.length}`,

                {

                    fontFamily:
                        "monospace",

                    fontSize:
                        "13px",

                    fontStyle:
                        "bold",

                    color:
                        "#6a737d"

                }

            )
            .setOrigin(
                0.5,
                0
            );


        this.pageContainer.add(
            pageNumber
        );


        // =================================================
        // NEXT
        // =================================================

        if (
            this.currentPage <
            this.pages.length - 1
        ) {

            const next =
                this.createNavigationButton(

                    this.contentWidth,
                    this.footerY,

                    "Next ▶",

                    1

                );


            next.on(

                "pointerdown",

                () => {

                    this.nextPage();

                }

            );


            this.pageContainer.add(
                next
            );

        }


        // =================================================
        // SINGLE PAGE LABEL
        // =================================================

        if (
            this.pages.length === 1
        ) {

            pageNumber.setText(
                "Single-page evidence"
            );

        }


        // =================================================
        // SET WINDOW CONTENT
        // =================================================

        this.window.setContent(
            this.pageContainer
        );

    }


    // =====================================================
    // CREATE NAVIGATION BUTTON
    // =====================================================

    createNavigationButton(
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
    // EVIDENCE TYPE
    // =====================================================

    getEvidenceType(evidence) {

        if (
            !evidence
        ) {

            return "EVIDENCE FILE";

        }


        const combined =
            `${evidence.id || ""} ${evidence.title || ""}`
                .toLowerCase();


        if (
            combined.includes("review")
        ) {

            return "CUSTOMER FEEDBACK";

        }


        if (
            combined.includes("survey")
        ) {

            return "CUSTOMER SURVEY";

        }


        if (
            combined.includes("interview")
        ) {

            return "INTERVIEW RECORD";

        }


        if (
            combined.includes("sales") ||
            combined.includes("dashboard")
        ) {

            return "PERFORMANCE DATA";

        }


        if (
            combined.includes("budget") ||
            combined.includes("financial") ||
            combined.includes("investment")
        ) {

            return "FINANCIAL RECORD";

        }


        if (
            combined.includes("technology")
        ) {

            return "TECHNOLOGY REPORT";

        }


        if (
            combined.includes("operations")
        ) {

            return "OPERATIONS REPORT";

        }


        if (
            combined.includes("hr") ||
            combined.includes("staff")
        ) {

            return "PEOPLE & ORGANIZATION";

        }


        if (
            combined.includes("strategy")
        ) {

            return "STRATEGIC ANALYSIS";

        }


        if (
            combined.includes("manager")
        ) {

            return "MANAGEMENT INTERVIEW";

        }


        if (
            combined.includes("cashier") ||
            combined.includes("transaction")
        ) {

            return "TRANSACTION RECORD";

        }


        if (
            combined.includes("kitchen")
        ) {

            return "OPERATIONS EVIDENCE";

        }


        return "EVIDENCE FILE";

    }


    // =====================================================
    // NEXT PAGE
    // =====================================================

    nextPage() {

        if (
            this.currentPage >=
            this.pages.length - 1
        ) {

            return;

        }


        this.currentPage++;


        console.log(

            `Evidence page: ${
                this.currentPage + 1
            } / ${
                this.pages.length
            }`

        );


        this.renderPage();

    }


    // =====================================================
    // PREVIOUS PAGE
    // =====================================================

    previousPage() {

        if (
            this.currentPage <= 0
        ) {

            return;

        }


        this.currentPage--;


        console.log(

            `Evidence page: ${
                this.currentPage + 1
            } / ${
                this.pages.length
            }`

        );


        this.renderPage();

    }

}