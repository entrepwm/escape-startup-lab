import Phaser from "phaser";

export default class EvidenceViewer {

    constructor(scene, window, evidenceList) {

        this.scene = scene;
        this.window = window;
        this.evidenceList = evidenceList;

        // =====================================================
        // PAGINATION
        // =====================================================

        this.currentEvidence = null;

        this.pages = [];

        this.currentPage = 0;

        this.pageContainer = null;

    }


    // =====================================================
    // CREATE CLICKABLE FOLDER LIST
    // =====================================================

    createFolderList() {

        const container =
            this.scene.add.container(0, 0);


        this.evidenceList.forEach(
            (file, index) => {

                const item =
                    this.scene.add.text(

                        0,
                        index * 40,

                        `${file.icon} ${file.title}`,

                        {

                            fontSize: "22px",
                            color: "#0066cc",
                            fontStyle: "bold"

                        }

                    )
                    .setInteractive({
                        useHandCursor: true
                    });


                // Hover
                item.on(
                    "pointerover",
                    () => {

                        item.setColor("#ff8800");

                    }
                );


                item.on(
                    "pointerout",
                    () => {

                        item.setColor("#0066cc");

                    }
                );


                // Open evidence
                item.on(
                    "pointerdown",
                    () => {

                        this.openEvidence(
                            file.id
                        );

                    }
                );


                container.add(item);

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

            title: "Evidence Folder"

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
                file => file.id === id
            );


        if (!evidence) {

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


        // =====================================================
        // SPLIT CONTENT INTO PAGES
        // =====================================================

        this.pages =
            this.createPages(
                evidence.content ||
                "No evidence content available."
            );


        this.currentPage = 0;


        // =====================================================
        // OPEN WINDOW
        // =====================================================

        this.window.open({

            title: evidence.title

        });


        // =====================================================
        // SHOW FIRST PAGE
        // =====================================================

        this.renderPage();

    }


    // =====================================================
    // CREATE PAGES
    // =====================================================

    createPages(content) {

        const pages = [];


        // -----------------------------------------------------
        // SETTINGS
        // -----------------------------------------------------

        const textWidth = 420;

        const maxHeight = 330;


        // -----------------------------------------------------
        // Split content into paragraphs
        // -----------------------------------------------------

        const paragraphs =
            content.split("\n");


        let currentText = "";


        // -----------------------------------------------------
        // Temporary text object used for measurement
        // -----------------------------------------------------

        const measureText =
            this.scene.add.text(

                0,
                0,

                "",

                {

                    fontSize: "20px",
                    color: "#000000",

                    wordWrap: {

                        width: textWidth

                    }

                }

            );


        // -----------------------------------------------------
        // Build pages
        // -----------------------------------------------------

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


                // -------------------------------------------------
                // If adding this paragraph makes the page too tall
                // -------------------------------------------------

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


        // -----------------------------------------------------
        // Add remaining text
        // -----------------------------------------------------

        if (
            currentText.trim() !== ""
        ) {

            pages.push(
                currentText
            );

        }


        // -----------------------------------------------------
        // Destroy measurement object
        // -----------------------------------------------------

        measureText.destroy();


        // -----------------------------------------------------
        // Safety fallback
        // -----------------------------------------------------

        if (pages.length === 0) {

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

        // -----------------------------------------------------
        // Destroy previous page
        // -----------------------------------------------------

        if (this.pageContainer) {

            this.pageContainer.destroy(
                true
            );

            this.pageContainer = null;

        }


        // -----------------------------------------------------
        // Main container
        // -----------------------------------------------------

        this.pageContainer =
            this.scene.add.container(
                0,
                0
            );


        // =====================================================
        // EVIDENCE TEXT
        // =====================================================

        const text =
            this.scene.add.text(

                0,
                0,

                this.pages[
                    this.currentPage
                ],

                {

                    fontSize: "20px",
                    color: "#000000",

                    wordWrap: {

                        width: 420

                    }

                }

            );


        this.pageContainer.add(
            text
        );


        // =====================================================
        // PAGE NUMBER
        // =====================================================

        if (
            this.pages.length > 1
        ) {

            const pageNumber =
                this.scene.add.text(

                    0,
                    350,

                    `Page ${
                        this.currentPage + 1
                    } / ${
                        this.pages.length
                    }`,

                    {

                        fontSize: "16px",
                        color: "#666666",
                        fontStyle: "bold"

                    }

                );


            this.pageContainer.add(
                pageNumber
            );

        }


        // =====================================================
        // PREVIOUS BUTTON
        // =====================================================

        if (
            this.currentPage > 0
        ) {

            const previous =
                this.scene.add.text(

                    0,
                    380,

                    "← Previous",

                    {

                        fontSize: "20px",
                        color: "#0066cc",
                        fontStyle: "bold"

                    }

                )
                .setInteractive({
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

                    this.previousPage();

                }
            );


            this.pageContainer.add(
                previous
            );

        }


        // =====================================================
        // NEXT BUTTON
        // =====================================================

        if (
            this.currentPage <
            this.pages.length - 1
        ) {

            const next =
                this.scene.add.text(

                    285,
                    380,

                    "Next Page →",

                    {

                        fontSize: "20px",
                        color: "#0066cc",
                        fontStyle: "bold"

                    }

                )
                .setInteractive({
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

                    this.nextPage();

                }
            );


            this.pageContainer.add(
                next
            );

        }


        // =====================================================
        // SET WINDOW CONTENT
        // =====================================================

        this.window.setContent(
            this.pageContainer
        );

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