import Phaser from "phaser";

export default class NotebookViewer {

    constructor(scene, window, notebookData) {

        this.scene = scene;
        this.window = window;
        this.notebookData = notebookData;

        this.answers = {};
        this.currentPage = 0;

        // 2 questions per page
        this.questionsPerPage = 2;

    }

    open() {

        this.window.open({
            title: "Investigation Notebook"
        });

        this.renderPage();

    }

    renderPage() {

        this.window.clearContent();

        const container = this.scene.add.container(0, 0);

        let currentY = 0;

        const start =
            this.currentPage * this.questionsPerPage;

        const end = Math.min(
            start + this.questionsPerPage,
            this.notebookData.length
        );

        for (let i = start; i < end; i++) {

            const question = this.notebookData[i];

            const title = this.scene.add.text(
                0,
                currentY,
                question.question,
                {
                    fontSize: "22px",
                    color: "#000000",
                    fontStyle: "bold",
                    wordWrap: { width: 420 }
                }
            );

            container.add(title);

            currentY += 40;

            question.options.forEach(option => {

                const selected =
                    this.answers[question.id] === option;

                const optionText = this.scene.add.text(
                    20,
                    currentY,
                    `${selected ? "●" : "○"} ${option}`,
                    {
                        fontSize: "20px",
                        color: selected ? "#008800" : "#0066cc"
                    }
                )
                .setInteractive({ useHandCursor: true });

                optionText.on("pointerdown", () => {

                    this.answers[question.id] = option;

                    this.renderPage();

                });

                container.add(optionText);

                currentY += 32;

            });

            currentY += 30;

        }

        //--------------------------------------------------
        // Navigation Buttons
        //--------------------------------------------------

        if (this.currentPage > 0) {

            const back = this.scene.add.text(

                0,
                330,

                "◀ Previous",

                {
                    fontSize: "20px",
                    color: "#0066cc",
                    fontStyle: "bold"
                }

            )
            .setInteractive({ useHandCursor: true });

            back.on("pointerdown", () => {

                this.currentPage--;

                this.renderPage();

            });

            container.add(back);

        }

        const lastPage = Math.ceil(
            this.notebookData.length /
            this.questionsPerPage
        ) - 1;

        if (this.currentPage < lastPage) {

            const next = this.scene.add.text(

                300,
                330,

                "Next ▶",

                {
                    fontSize: "20px",
                    color: "#0066cc",
                    fontStyle: "bold"
                }

            )
            .setInteractive({ useHandCursor: true });

            next.on("pointerdown", () => {

                this.currentPage++;

                this.renderPage();

            });

            container.add(next);

        }
        else {

            const save = this.scene.add.text(

                250,
                330,

                "💾 Save & Close",

                {
                    fontSize: "20px",
                    color: "#008800",
                    fontStyle: "bold"
                }

            )
            .setInteractive({ useHandCursor: true });

            save.on("pointerdown", () => {

                console.log(this.answers);

                this.window.close();

            });

            container.add(save);

        }

        this.window.setContent(container);

    }

}