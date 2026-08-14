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

        // Track investigated objects
        this.investigatedObjects = new Set();

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

        this.background.setStrokeStyle(2, 0xbbbbbb);

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

        const emoji = this.scene.add.text(

            0,
            0,

            icon,

            {
                fontSize: "42px"
            }

        ).setOrigin(0.5);

        const title = this.scene.add.text(

            0,
            40,

            label,

            {
                fontSize: "18px",
                color: "#000000"
            }

        ).setOrigin(0.5);

        container.add([emoji, title]);

        // =====================================================
        // CLICK AREA
        // =====================================================

        const hitbox = this.scene.add.rectangle(

            0,
            15,

            100,
            90,

            0xffffff,
            0

        ).setInteractive({

            useHandCursor: true

        });

        container.add(hitbox);

        container.sendToBack(hitbox);

        // =====================================================
        // HOVER
        // =====================================================

        hitbox.on("pointerover", () => {

            container.setScale(1.08);

        });

        hitbox.on("pointerout", () => {

            container.setScale(1);

        });

        // =====================================================
        // CLICK
        // =====================================================

        hitbox.on("pointerdown", () => {

            // Mark as investigated
            this.markInvestigated(id);

            // Notify Scene
            if (this.callback) {

                this.callback(id);

            }

        });

        // Store object information
        this.objects.push({

            id,
            container,
            emoji,
            title,
            hitbox

        });

    }

    // =====================================================
    // MARK OBJECT AS INVESTIGATED
    // =====================================================

    markInvestigated(id) {

        if (this.investigatedObjects.has(id)) {

            return;

        }

        this.investigatedObjects.add(id);

        console.log(
            `Object investigated: ${id}`
        );

        const object = this.objects.find(

            obj => obj.id === id

        );

        if (!object) {

            return;

        }

        // Visual indication
        object.title.setColor("#00aa66");

    }

    // =====================================================
    // CHECK IF OBJECT WAS INVESTIGATED
    // =====================================================

    isInvestigated(id) {

        return this.investigatedObjects.has(id);

    }

    // =====================================================
    // GET INVESTIGATED OBJECTS
    // =====================================================

    getInvestigatedObjects() {

        return Array.from(
            this.investigatedObjects
        );

    }

    // =====================================================
    // CHECK IF ALL OBJECTS WERE INVESTIGATED
    // =====================================================

    allObjectsInvestigated() {

        return this.objects.every(

            object =>
                this.investigatedObjects.has(object.id)

        );

    }

    // =====================================================
    // EVENT
    // =====================================================

    onObjectClick(callback) {

        this.callback = callback;

    }

}