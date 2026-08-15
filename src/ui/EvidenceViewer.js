import Phaser from "phaser";

export default class EvidenceViewer {

    constructor(scene, window, evidenceList) {

        this.scene = scene;
        this.window = window;
        this.evidenceList = evidenceList;

    }


    // =====================================================
    // Create Clickable Folder List
    // =====================================================

    createFolderList() {

        const container = this.scene.add.container(0, 0);

        this.evidenceList.forEach((file, index) => {

            const item = this.scene.add.text(
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


            item.on("pointerover", () => {

                item.setColor("#ff8800");

            });


            item.on("pointerout", () => {

                item.setColor("#0066cc");

            });


            item.on("pointerdown", () => {

                this.openEvidence(file.id);

            });


            container.add(item);

        });


        return container;

    }


    // =====================================================
    // Open Evidence Folder
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
    // Calculate Font Size
    // =====================================================

    calculateFontSize(
        text,
        width,
        maxHeight
    ) {

        let fontSize = 20;


        while (fontSize >= 12) {

            const testText =
                this.scene.add.text(
                    0,
                    0,
                    text,
                    {
                        fontSize:
                            `${fontSize}px`,

                        color:
                            "#000000",

                        fontFamily:
                            "monospace",

                        wordWrap: {
                            width:
                                width
                        },

                        lineSpacing:
                            3
                    }
                );


            const height =
                testText.getBounds().height;


            testText.destroy();


            if (height <= maxHeight) {

                return fontSize;

            }


            fontSize--;

        }


        return 12;

    }


    // =====================================================
    // Open Individual Evidence
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


        // =================================================
        // Evidence Content
        // =================================================

        const content =
            evidence.content ||
            "No evidence content available.";


        // =================================================
        // Open Window
        // =================================================

        this.window.open({

            title:
                evidence.title

        });


        // =================================================
        // Content Container
        // =================================================

        const container =
            this.scene.add.container(
                0,
                0
            );


        // =================================================
        // CONTENT DIMENSIONS
        // =================================================

        const contentWidth = 420;

        const maxContentHeight = 300;


        // =================================================
        // AUTOMATIC FONT SIZE
        // =================================================

        const fontSize =
            this.calculateFontSize(
                content,
                contentWidth,
                maxContentHeight
            );


        // =================================================
        // Evidence Text
        // =================================================

        const text =
            this.scene.add.text(
                0,
                0,
                content,
                {
                    fontSize:
                        `${fontSize}px`,

                    color:
                        "#000000",

                    fontFamily:
                        "monospace",

                    wordWrap: {
                        width:
                            contentWidth
                    },

                    lineSpacing:
                        3
                }
            );


        container.add(text);


        // =================================================
        // SET WINDOW CONTENT
        // =================================================

        this.window.setContent(
            container
        );

    }

}