import Phaser from "phaser";

export default class RoomView {

    constructor(
        scene,
        x,
        y,
        width,
        height
    ) {

        this.scene = scene;

        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.objects = [];
        this.callback = null;

        this.investigatedObjects =
            new Set();

        this.isTouchDevice =
            (
                "ontouchstart" in window ||
                navigator.maxTouchPoints > 0
            );

        this.container =
            this.scene.add.container(
                0,
                0
            );

        this.create();
    }


    // =====================================================
    // CREATE ROOM
    // =====================================================

    create() {

        const sceneKey =
            this.scene.scene.key;

        if (
            sceneKey === "Room1Scene" &&
            this.scene.textures.exists(
                "room1-restaurant"
            )
        ) {

            this.createImageBackground(
                "room1-restaurant"
            );

            return;
        }

        if (
            sceneKey === "Room2Scene" &&
            this.scene.textures.exists(
                "room2-office"
            )
        ) {

            this.createImageBackground(
                "room2-office"
            );

            return;
        }

        if (
            sceneKey === "Room3Scene" &&
            this.scene.textures.exists(
                "room3-ceo"
            )
        ) {

            this.createImageBackground(
                "room3-ceo"
            );

            return;
        }

        this.createFallbackBackground();
    }


    // =====================================================
    // IMAGE BACKGROUND
    // =====================================================

    createImageBackground(
        textureKey
    ) {

        this.background =
            this.scene.add.image(
                this.x,
                this.y,
                textureKey
            );

        this.background
            .setDisplaySize(
                this.width,
                this.height
            )
            .setDepth(
                0
            );

        this.container.add(
            this.background
        );

        this.overlay =
            this.scene.add.rectangle(
                this.x,
                this.y,
                this.width,
                this.height,
                0x000000,
                0.035
            );

        this.overlay.setDepth(
            1
        );

        this.container.add(
            this.overlay
        );

        this.border =
            this.scene.add.rectangle(
                this.x,
                this.y,
                this.width,
                this.height
            );

        this.border
            .setFillStyle(
                0x000000,
                0
            )
            .setStrokeStyle(
                3,
                0x72522f,
                1
            )
            .setDepth(
                2
            );

        this.container.add(
            this.border
        );
    }


    // =====================================================
    // FALLBACK
    // =====================================================

    createFallbackBackground() {

        this.background =
            this.scene.add.rectangle(
                this.x,
                this.y,
                this.width,
                this.height,
                0xf3f3f3
            );

        this.background
            .setStrokeStyle(
                2,
                0xbbbbbb
            )
            .setDepth(
                0
            );

        this.container.add(
            this.background
        );
    }


    // =====================================================
    // BOUNDS
    // =====================================================

    getRoomBounds() {

        return {
            left:
                this.x -
                this.width / 2,

            right:
                this.x +
                this.width / 2,

            top:
                this.y -
                this.height / 2,

            bottom:
                this.y +
                this.height / 2
        };
    }


    // =====================================================
    // NORMALIZED ROOM POSITION → GAME POSITION
    // =====================================================
    //
    // x and y MUST be between 0 and 1.
    //
    // Example:
    //
    // x: 0.50 = center of room horizontally
    // y: 0.25 = 25% down from top
    //
    // Because the marker and room artwork use the exact same
    // room rectangle, their relationship never changes.
    // =====================================================

    getWorldPosition(
        normalizedX,
        normalizedY
    ) {

        const bounds =
            this.getRoomBounds();

        const safeX =
            Phaser.Math.Clamp(
                Number(normalizedX) || 0,
                0,
                1
            );

        const safeY =
            Phaser.Math.Clamp(
                Number(normalizedY) || 0,
                0,
                1
            );

        return {
            x:
                bounds.left +
                this.width *
                safeX,

            y:
                bounds.top +
                this.height *
                safeY
        };
    }


    // =====================================================
    // ADD OBJECT
    // =====================================================

    addObject({

        id,
        label,
        icon,
        x,
        y

    }) {

        const position =
            this.getWorldPosition(
                x,
                y
            );

        const worldX =
            position.x;

        const worldY =
            position.y;

        // =================================================
        // ROOM 1 CUSTOMER
        // =================================================

        if (
            id === "customer" &&
            this.scene.textures.exists(
                "customer-south"
            )
        ) {

            this.addCharacterSprite({
                id,
                label,
                texture:
                    "customer-south",
                promptText:
                    "View Interview",
                investigatedText:
                    "Interview Viewed ✓",
                worldX,
                worldY,
                targetHeight:
                    92
            });

            return;
        }

        // =================================================
        // ROOM 1 EMPLOYEE
        // =================================================

        if (
            id === "employee" &&
            this.scene.textures.exists(
                "employee-south"
            )
        ) {

            this.addCharacterSprite({
                id,
                label,
                texture:
                    "employee-south",
                promptText:
                    "Talk to Employee",
                investigatedText:
                    "Interview Viewed ✓",
                worldX,
                worldY,
                targetHeight:
                    105
            });

            return;
        }

        // =================================================
        // ROOM 2 MANAGER
        // =================================================

        if (
            (
                id === "manager" ||
                id === "manager_report"
            ) &&
            this.scene.textures.exists(
                "manager-south"
            )
        ) {

            this.addCharacterSprite({
                id,
                label,
                texture:
                    "manager-south",
                promptText:
                    "Talk to Manager",
                investigatedText:
                    "Manager Interviewed ✓",
                worldX,
                worldY,
                targetHeight:
                    105
            });

            return;
        }

        // =================================================
        // GENERIC HOTSPOT
        // =================================================

        this.addHotspot({
            id,
            label,
            worldX,
            worldY
        });
    }


    // =====================================================
    // CHARACTER
    // =====================================================

    addCharacterSprite({

        id,
        label,
        texture,
        promptText,
        investigatedText,
        worldX,
        worldY,
        targetHeight = 100

    }) {

        const objectContainer =
            this.scene.add.container(
                worldX,
                worldY
            );

        objectContainer.setDepth(
            20
        );

        const sprite =
            this.scene.add.image(
                0,
                0,
                texture
            );

        sprite.setOrigin(
            0.5,
            1
        );

        const baseScale =
            targetHeight /
            sprite.height;

        sprite.setScale(
            baseScale
        );

        const shadow =
            this.scene.add.ellipse(
                0,
                3,
                45,
                14,
                0x000000,
                0.28
            );

        shadow.setDepth(
            -1
        );

        const labelOffset =
            this.getSafeLabelOffset(
                worldX,
                180
            );

        const labelBackground =
            this.scene.add.rectangle(
                labelOffset,
                30,
                180,
                36,
                0x111827,
                0.95
            );

        labelBackground
            .setStrokeStyle(
                2,
                0x4cc9f0,
                1
            )
            .setVisible(
                false
            );

        const title =
            this.scene.add.text(
                labelOffset,
                30,
                label,
                {
                    fontFamily:
                        "monospace",
                    fontSize:
                        "16px",
                    color:
                        "#ffffff",
                    fontStyle:
                        "bold",
                    align:
                        "center"
                }
            )
            .setOrigin(
                0.5
            )
            .setVisible(
                false
            );

        const prompt =
            this.scene.add.text(
                labelOffset,
                54,
                promptText,
                {
                    fontFamily:
                        "monospace",
                    fontSize:
                        "12px",
                    color:
                        "#8ad8ff",
                    align:
                        "center"
                }
            )
            .setOrigin(
                0.5
            )
            .setVisible(
                false
            );

        const minimumWidth =
            this.isTouchDevice
                ? 120
                : 75;

        const horizontalPadding =
            this.isTouchDevice
                ? 50
                : 20;

        const verticalPadding =
            this.isTouchDevice
                ? 60
                : 30;

        const hitboxWidth =
            Math.max(
                minimumWidth,
                sprite.displayWidth +
                horizontalPadding
            );

        const hitboxHeight =
            targetHeight +
            verticalPadding;

        const hitbox =
            this.scene.add.rectangle(
                0,
                -(targetHeight / 2),
                hitboxWidth,
                hitboxHeight,
                0xffffff,
                0
            );

        hitbox.setInteractive({
            useHandCursor:
                true
        });

        objectContainer.add([
            shadow,
            sprite,
            labelBackground,
            title,
            prompt,
            hitbox
        ]);

        hitbox.on(
            "pointerover",
            () => {

                labelBackground.setVisible(
                    true
                );

                title.setVisible(
                    true
                );

                prompt.setVisible(
                    true
                );

                this.scene.tweens.killTweensOf(
                    sprite
                );

                this.scene.tweens.add({
                    targets:
                        sprite,
                    scaleX:
                        baseScale * 1.08,
                    scaleY:
                        baseScale * 1.08,
                    duration:
                        140,
                    ease:
                        "Power2"
                });
            }
        );

        hitbox.on(
            "pointerout",
            () => {

                labelBackground.setVisible(
                    false
                );

                title.setVisible(
                    false
                );

                prompt.setVisible(
                    false
                );

                this.scene.tweens.killTweensOf(
                    sprite
                );

                this.scene.tweens.add({
                    targets:
                        sprite,
                    scaleX:
                        baseScale,
                    scaleY:
                        baseScale,
                    duration:
                        140,
                    ease:
                        "Power2"
                });
            }
        );

        hitbox.on(
            "pointerdown",
            () => {

                this.markInvestigated(
                    id
                );

                this.scene.tweens.killTweensOf(
                    sprite
                );

                this.scene.tweens.add({
                    targets:
                        sprite,
                    scaleX:
                        baseScale * 1.12,
                    scaleY:
                        baseScale * 1.12,
                    duration:
                        90,
                    yoyo:
                        true,
                    ease:
                        "Power2",
                    onComplete:
                        () => {
                            sprite.setScale(
                                baseScale
                            );
                        }
                });

                if (this.callback) {
                    this.callback(
                        id
                    );
                }
            }
        );

        this.objects.push({
            id,
            label,
            type:
                "character",
            texture,
            container:
                objectContainer,
            sprite,
            shadow,
            title,
            prompt,
            labelBackground,
            hitbox,
            investigatedText,
            baseScale
        });
    }


    // =====================================================
    // GENERIC HOTSPOT
    // =====================================================

    addHotspot({

        id,
        label,
        worldX,
        worldY

    }) {

        const objectContainer =
            this.scene.add.container(
                worldX,
                worldY
            );

        objectContainer.setDepth(
            20
        );

        const glow =
            this.scene.add.circle(
                0,
                0,
                34,
                0x4cc9f0,
                0.08
            );

        glow.setStrokeStyle(
            2,
            0x4cc9f0,
            0.45
        );

        const marker =
            this.scene.add.circle(
                0,
                0,
                10,
                0xffffff,
                0.85
            );

        marker.setStrokeStyle(
            3,
            0x1683e8,
            1
        );

        const centerDot =
            this.scene.add.circle(
                0,
                0,
                4,
                0x1683e8,
                1
            );

        const labelOffset =
            this.getSafeLabelOffset(
                worldX,
                210
            );

        const labelBackground =
            this.scene.add.rectangle(
                labelOffset,
                48,
                210,
                34,
                0x111827,
                0.94
            );

        labelBackground
            .setStrokeStyle(
                2,
                0x4cc9f0,
                1
            )
            .setVisible(
                false
            );

        const title =
            this.scene.add.text(
                labelOffset,
                48,
                label,
                {
                    fontFamily:
                        "monospace",
                    fontSize:
                        "14px",
                    color:
                        "#ffffff",
                    fontStyle:
                        "bold",
                    align:
                        "center",
                    wordWrap: {
                        width:
                            195
                    }
                }
            )
            .setOrigin(
                0.5
            )
            .setVisible(
                false
            );

        const prompt =
            this.scene.add.text(
                labelOffset,
                76,
                "Investigate",
                {
                    fontFamily:
                        "monospace",
                    fontSize:
                        "12px",
                    color:
                        "#8ad8ff",
                    align:
                        "center"
                }
            )
            .setOrigin(
                0.5
            )
            .setVisible(
                false
            );

        const hitboxWidth =
            this.isTouchDevice
                ? 190
                : 140;

        const hitboxHeight =
            this.isTouchDevice
                ? 150
                : 110;

        const hitbox =
            this.scene.add.rectangle(
                0,
                0,
                hitboxWidth,
                hitboxHeight,
                0xffffff,
                0
            );

        hitbox.setInteractive({
            useHandCursor:
                true
        });

        objectContainer.add([
            glow,
            marker,
            centerDot,
            labelBackground,
            title,
            prompt,
            hitbox
        ]);

        hitbox.on(
            "pointerover",
            () => {

                labelBackground.setVisible(
                    true
                );

                title.setVisible(
                    true
                );

                prompt.setVisible(
                    true
                );

                glow.setFillStyle(
                    0x4cc9f0,
                    0.22
                );

                glow.setStrokeStyle(
                    3,
                    0x69dcff,
                    1
                );

                this.scene.tweens.killTweensOf([
                    glow,
                    marker,
                    centerDot
                ]);

                this.scene.tweens.add({
                    targets: [
                        glow,
                        marker,
                        centerDot
                    ],
                    scaleX:
                        1.18,
                    scaleY:
                        1.18,
                    duration:
                        120,
                    ease:
                        "Power2"
                });
            }
        );

        hitbox.on(
            "pointerout",
            () => {

                labelBackground.setVisible(
                    false
                );

                title.setVisible(
                    false
                );

                prompt.setVisible(
                    false
                );

                if (
                    this.investigatedObjects.has(
                        id
                    )
                ) {

                    glow.setFillStyle(
                        0x1fc77a,
                        0.16
                    );

                    glow.setStrokeStyle(
                        2,
                        0x1fc77a,
                        0.8
                    );
                }
                else {

                    glow.setFillStyle(
                        0x4cc9f0,
                        0.08
                    );

                    glow.setStrokeStyle(
                        2,
                        0x4cc9f0,
                        0.45
                    );
                }

                this.scene.tweens.killTweensOf([
                    glow,
                    marker,
                    centerDot
                ]);

                this.scene.tweens.add({
                    targets: [
                        glow,
                        marker,
                        centerDot
                    ],
                    scaleX:
                        1,
                    scaleY:
                        1,
                    duration:
                        120,
                    ease:
                        "Power2"
                });
            }
        );

        hitbox.on(
            "pointerdown",
            () => {

                this.markInvestigated(
                    id
                );

                this.scene.tweens.killTweensOf(
                    objectContainer
                );

                this.scene.tweens.add({
                    targets:
                        objectContainer,
                    scaleX:
                        1.08,
                    scaleY:
                        1.08,
                    duration:
                        90,
                    yoyo:
                        true,
                    ease:
                        "Power2",
                    onComplete:
                        () => {
                            objectContainer.setScale(
                                1
                            );
                        }
                });

                if (this.callback) {
                    this.callback(
                        id
                    );
                }
            }
        );

        this.objects.push({
            id,
            label,
            type:
                "hotspot",
            container:
                objectContainer,
            glow,
            marker,
            centerDot,
            title,
            prompt,
            labelBackground,
            hitbox
        });
    }


    // =====================================================
    // SAFE LABEL OFFSET
    // =====================================================

    getSafeLabelOffset(
        worldX,
        labelWidth
    ) {

        const bounds =
            this.getRoomBounds();

        const halfLabelWidth =
            labelWidth / 2;

        const margin =
            12;

        if (
            worldX -
            halfLabelWidth <
            bounds.left +
            margin
        ) {

            return (
                bounds.left +
                margin +
                halfLabelWidth
            ) - worldX;
        }

        if (
            worldX +
            halfLabelWidth >
            bounds.right -
            margin
        ) {

            return (
                bounds.right -
                margin -
                halfLabelWidth
            ) - worldX;
        }

        return 0;
    }


    // =====================================================
    // MARK INVESTIGATED
    // =====================================================

    markInvestigated(
        id
    ) {

        if (
            this.investigatedObjects.has(
                id
            )
        ) {
            return;
        }

        this.investigatedObjects.add(
            id
        );

        const object =
            this.objects.find(
                item =>
                    item.id === id
            );

        if (!object) {
            return;
        }

        if (
            object.type ===
            "character"
        ) {

            object.prompt.setText(
                object.investigatedText ||
                "Investigated ✓"
            );

            object.prompt.setColor(
                "#65f0ad"
            );

            object.labelBackground
                .setStrokeStyle(
                    2,
                    0x19c77a,
                    1
                );

            return;
        }

        object.marker.setStrokeStyle(
            3,
            0x19c77a,
            1
        );

        object.centerDot.setFillStyle(
            0x19c77a,
            1
        );

        object.glow.setFillStyle(
            0x19c77a,
            0.16
        );

        object.glow.setStrokeStyle(
            2,
            0x19c77a,
            0.85
        );

        object.prompt.setText(
            "Investigated ✓"
        );

        object.prompt.setColor(
            "#65f0ad"
        );
    }


    // =====================================================
    // STATE
    // =====================================================

    isInvestigated(
        id
    ) {

        return this.investigatedObjects.has(
            id
        );
    }

    getInvestigatedObjects() {

        return Array.from(
            this.investigatedObjects
        );
    }

    allObjectsInvestigated() {

        return this.objects.every(
            object =>
                this.investigatedObjects.has(
                    object.id
                )
        );
    }

    onObjectClick(
        callback
    ) {

        this.callback =
            callback;
    }
}
