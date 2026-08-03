import Phaser from "phaser";

export default class EvidenceViewer {

    constructor(scene, window, evidenceList) {

        this.scene = scene;
        this.window = window;
        this.evidenceList = evidenceList;
        this.folderList = this.createFolderList;

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
    // Open Evidence Folder
    // =====================================================

    openFolder() {

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

        this.window.open({

            title: evidence.title,

            content: evidence.content

        });

    }

}