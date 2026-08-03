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

        this.window.setTitle(evidence.title);

        const container = this.scene.add.container(0, 0);

        const text = this.scene.add.text(

            0,
            0,

            evidence.content,

            {

                fontSize: "20px",

                color: "#000000",

                wordWrap: {

                    width: 420

                }

            }

        );

        container.add(text);

        container.add(this.createBackButton());

        this.window.setContent(container);
        

    }

}