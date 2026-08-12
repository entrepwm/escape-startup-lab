import Phaser from "phaser";

export default class RoomView {

    constructor(scene, x, y, width, height) {

        this.scene = scene;

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.objects = [];
        this.callback = null;

        this.create();

    }

    // =====================================================
    // CREATE ROOM
    // =====================================================

    create() {

        this.background = this.scene.add.rectangle(

            this.x,
            this.y,

            this.width,
            this.height,

            0xf3f3f3

        );

        this.background.setStrokeStyle(
            2,
            0xbbbbbb
        );

    }

    // =====================================================
    // ADD CLICKABLE OBJECT
    // =====================================================

    addObject({

        id,
        label,
        icon,
        x,
        y

    }) {

        const container = this.scene.add.container(

            this.x - this.width / 2 + x,
            this.y - this.height / 2 + y

        );

        // =================================================
        // EMOJI
        // =================================================

        const emoji = this.scene.add.text(

            0,
            0,

            icon,

            {
                fontSize: "42px"
            }

        )
        .setOrigin(0.5)
        .setInteractive({
            useHandCursor: true
        });

        // =================================================
        // LABEL
        // =================================================

        const title = this.scene.add.text(

            0,
            40,

            label,

            {
                fontSize: "18px",
                color: "#000000",
                fontStyle: "bold"
            }

        )
        .setOrigin(0.5);

        container.add([
            emoji,
            title
        ]);

        // =================================================
        // HOVER
        // =================================================

        emoji.on("pointerover", () => {

            container.setScale(1.08);

            title.setColor("#ff8800");

        });

        emoji.on("pointerout", () => {

            container.setScale(1);

            title.setColor("#000000");

        });

        // =================================================
        // CLICK
        // =================================================

        emoji.on("pointerdown", () => {

            console.log(
                `Room object clicked: ${id}`
            );

            if (this.callback) {

                this.callback(id);

            }

        });

        // =================================================
        // STORE OBJECT
        // =================================================

        this.objects.push({

            id,
            container,
            emoji,
            title

        });

    }

    // =====================================================
    // ROOM OBJECT CLICK EVENT
    // =====================================================

    onObjectClick(callback) {

        this.callback = callback;

    }

}