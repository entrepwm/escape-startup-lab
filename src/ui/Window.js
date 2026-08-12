import Phaser from "phaser";

export default class Window {

    constructor(scene) {

        this.scene = scene;

        // ======================================
        // WINDOW CONTAINER
        // ======================================

        const windowWidth = 700;
        const windowHeight = 500;

        const centerX = (scene.scale.width - windowWidth) / 2;
        const centerY = (scene.scale.height - windowHeight) / 2;

        this.container = scene.add.container(
            centerX,
            centerY
        );

        this.container.setDepth(1000);
        this.container.setVisible(false);

        // ======================================
        // WINDOW BACKGROUND
        // ======================================

        this.background = scene.add.rectangle(
            0,
            0,
            700,
            500,
            0xffffff
        )
        .setOrigin(0)
        .setStrokeStyle(2, 0x333333);

        this.container.add(this.background);

        // ======================================
        // TITLE BAR
        // ======================================

        this.titleBar = scene.add.rectangle(
            0,
            0,
            700,
            35,
            0x182436
        )
        .setOrigin(0);

        this.container.add(this.titleBar);

        // ======================================
        // TITLE
        // ======================================

        this.titleText = scene.add.text(
            15,
            8,
            "",
            {
                fontSize: "16px",
                color: "#ffffff",
                fontStyle: "bold"
            }
        );

        this.container.add(this.titleText);

        // ======================================
        // CLOSE BUTTON
        // ======================================

        this.closeButton = scene.add.text(
            675,
            6,
            "×",
            {
                fontSize: "20px",
                color: "#ffffff",
                fontStyle: "bold"
            }
        )
        .setOrigin(0.5, 0)
        .setInteractive({
            useHandCursor: true
        });

        this.closeButton.on("pointerdown", () => {

            this.close();

        });

        this.container.add(this.closeButton);

        // ======================================
        // CONTENT TEXT
        // Used for normal text content
        // ======================================

        this.contentText = scene.add.text(
            20,
            65,
            "",
            {
                fontSize: "20px",
                color: "#000000",
                wordWrap: {
                    width: 650
                }
            }
        );

        this.container.add(this.contentText);

        // ======================================
        // DYNAMIC CONTENT CONTAINER
        // Used for Notebook / Evidence lists
        // ======================================

        this.contentContainer = scene.add.container(
            20,
            65
        );

        this.container.add(this.contentContainer);

        // ======================================
        // INITIAL STATE
        // ======================================

        this.contentText.setVisible(false);

        this.contentContainer.setVisible(false);

    }

    // ======================================
    // OPEN WINDOW
    // ======================================

    open(options = {}) {

        this.setTitle(options.title ?? "");

        this.clearContent();

        if (options.content !== undefined) {

            this.setContent(options.content);

        }

        this.container.setDepth(1000);

        this.container.setAlpha(1);

        this.container.setVisible(true);

    }

    // ======================================
    // SET TITLE
    // ======================================

    setTitle(title) {

        this.titleText.setText(title);

    }

    // ======================================
    // SET CONTENT
    // ======================================

    setContent(content) {

        this.clearContent();

        // --------------------------------------
        // STRING CONTENT
        // --------------------------------------

        if (typeof content === "string") {

            this.contentText.setText(content);

            this.contentText.setVisible(true);

            return;

        }

        // --------------------------------------
        // PHASER CONTAINER CONTENT
        // --------------------------------------

        if (content instanceof Phaser.GameObjects.Container) {

            this.contentContainer.add(content);

            this.contentContainer.setVisible(true);

            return;

        }

        // --------------------------------------
        // OTHER PHASER GAME OBJECT
        // --------------------------------------

        if (content instanceof Phaser.GameObjects.GameObject) {

            this.contentContainer.add(content);

            this.contentContainer.setVisible(true);

            return;

        }

        console.warn(
            "Window.setContent(): Unsupported content type.",
            content
        );

    }

    // ======================================
    // CLEAR CONTENT
    // ======================================

    clearContent() {

        // Clear text content

        this.contentText.setText("");

        this.contentText.setVisible(false);

        // Clear dynamic content

        this.contentContainer.removeAll(true);

        this.contentContainer.setVisible(false);

    }

    // ======================================
    // CLOSE WINDOW
    // ======================================

    close() {

        this.clearContent();

        this.container.setVisible(false);

    }

}