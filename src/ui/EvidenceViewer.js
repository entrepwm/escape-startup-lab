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
            .setInteractive({ useHandCursor: true });

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
    // Create Back Button
    // =====================================================

    createBackButton() {

        const back = this.scene.add.text(

            0,
            250,

            "← Back",

            {
                fontSize: "22px",
                color: "#0066cc",
                fontStyle: "bold"
            }

        )
        .setInteractive({ useHandCursor: true });

        back.on("pointerover", () => {

            back.setColor("#ff8800");

        });

        back.on("pointerout", () => {

            back.setColor("#0066cc");

        });

        back.on("pointerdown", () => {

            this.openFolder();

        });

        return back;

    }

    // =====================================================
    // Open Evidence Folder
    // =====================================================

    openFolder() {

        const folderList = this.createFolderList();

        this.window.open({
            title: "Evidence Folder"
        });

        this.window.setContent(folderList);

    }

    // =====================================================
    // Open Individual Evidence
    // =====================================================

    openEvidence(id) {

        const evidence = this.evidenceList.find(
            file => file.id === id
        );

        if (!evidence) {

            console.warn(`Evidence '${id}' not found.`);

            return;

        }

        // Create evidence content
        const container = this.scene.add.container(0, 0);

        const text = this.scene.add.text(
            0,
            0,
            evidence.content || "No evidence content available.",
            {
                fontSize: "20px",
                color: "#000000",
                wordWrap: {
                    width: 420
                }
            }
        );

        container.add(text);

        // Add back button
        container.add(this.createBackButton());

        // IMPORTANT:
        // Actually OPEN the popup window.
        this.window.open({
            title: evidence.title
        });

        // Put the evidence inside the popup.
        this.window.setContent(container);

    }

}