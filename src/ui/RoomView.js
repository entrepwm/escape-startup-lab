import Phaser from "phaser";


export default class RoomView {

    constructor(
        scene,
        x,
        y,
        width,
        height
    ) {

        this.scene =
            scene;


        this.x =
            x;

        this.y =
            y;


        this.width =
            width;

        this.height =
            height;


        this.objects =
            [];


        this.callback =
            null;


        // =====================================================
        // INVESTIGATION TRACKING
        // =====================================================

        this.investigatedObjects =
            new Set();


        // =====================================================
        // TOUCH DEVICE DETECTION
        // =====================================================

        this.isTouchDevice =
            (
                "ontouchstart" in window ||
                navigator.maxTouchPoints > 0
            );


        // =====================================================
        // ROOM CONTAINER
        // =====================================================

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


        // =================================================
        // ROOM 1
        // =================================================

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


        // =================================================
        // ROOM 2
        // =================================================

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


        // =================================================
        // ROOM 3
        // =================================================

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


        // =================================================
        // FALLBACK
        // =================================================

        this.createFallbackBackground();

    }


    // =====================================================
    // IMAGE BACKGROUND
    // =====================================================

    createImageBackground(
        textureKey
    ) {

        // =================================================
        // BACKGROUND
        // =================================================

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


        // =================================================
        // SUBTLE OVERLAY
        // =================================================

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


        // =================================================
        // BORDER
        // =================================================

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
    // FALLBACK BACKGROUND
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
    // ADD OBJECT
    // =====================================================

    addObject({

        id,
        label,
        icon,
        x,
        y

    }) {

        // =================================================
        // CONVERT ROOM-LOCAL COORDINATES TO WORLD
        // =================================================

        const worldX =

            this.x -
            this.width / 2 +
            x;


        const worldY =

            this.y -
            this.height / 2 +
            y;


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
            id === "manager" &&
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
        // GENERIC EVIDENCE HOTSPOT
        // =================================================

        this.addHotspot({

            id,
            label,
            worldX,
            worldY

        });

    }


    // =====================================================
    // CHARACTER SPRITE
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

        // =================================================
        // CONTAINER
        // =================================================

        const objectContainer =
            this.scene.add.container(

                worldX,
                worldY

            );


        objectContainer.setDepth(
            20
        );


        // =================================================
        // SPRITE
        // =================================================

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


        // =================================================
        // SHADOW
        // =================================================

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


        // =================================================
        // LABEL BACKGROUND
        // =================================================

        const labelBackground =
            this.scene.add.rectangle(

                0,
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


        // =================================================
        // LABEL
        // =================================================

        const title =
            this.scene.add.text(

                0,
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

            );


        title
            .setOrigin(
                0.5
            )
            .setVisible(
                false
            );


        // =================================================
        // PROMPT
        // =================================================

        const prompt =
            this.scene.add.text(

                0,
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

            );


        prompt
            .setOrigin(
                0.5
            )
            .setVisible(
                false
            );


        // =================================================
        // MOBILE-FRIENDLY HITBOX
        // =================================================

        /*
         * Visual sprite stays unchanged.
         *
         * Only the invisible clickable area becomes larger
         * on touch devices.
         */

        const characterMinWidth =
            this.isTouchDevice
                ? 120
                : 75;


        const characterHorizontalPadding =
            this.isTouchDevice
                ? 50
                : 20;


        const characterVerticalPadding =
            this.isTouchDevice
                ? 60
                : 30;


        const hitboxWidth =
            Math.max(

                characterMinWidth,

                sprite.displayWidth +
                characterHorizontalPadding

            );


        const hitboxHeight =

            targetHeight +
            characterVerticalPadding;


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


        // =================================================
        // POINTER OVER
        // =================================================

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


        // =================================================
        // POINTER OUT
        // =================================================

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


        // =================================================
        // CLICK / TOUCH
        // =================================================

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


                if (
                    this.callback
                ) {

                    this.callback(
                        id
                    );

                }

            }

        );


        // =================================================
        // STORE CHARACTER
        // =================================================

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

        // =================================================
        // CONTAINER
        // =================================================

        const objectContainer =
            this.scene.add.container(

                worldX,
                worldY

            );


        objectContainer.setDepth(
            20
        );


        // =================================================
        // GLOW
        // =================================================

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


        // =================================================
        // MARKER
        // =================================================

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


        // =================================================
        // CENTER DOT
        // =================================================

        const centerDot =
            this.scene.add.circle(

                0,
                0,

                4,

                0x1683e8,
                1

            );


        // =================================================
        // LABEL BACKGROUND
        // =================================================

        const labelBackground =
            this.scene.add.rectangle(

                0,
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


        // =================================================
        // LABEL
        // =================================================

        const title =
            this.scene.add.text(

                0,
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

            );


        title
            .setOrigin(
                0.5
            )
            .setVisible(
                false
            );


        // =================================================
        // PROMPT
        // =================================================

        const prompt =
            this.scene.add.text(

                0,
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

            );


        prompt
            .setOrigin(
                0.5
            )
            .setVisible(
                false
            );


        // =================================================
        // MOBILE-FRIENDLY INVISIBLE HITBOX
        // =================================================

        /*
         * Desktop:
         * 140 × 110
         *
         * Touch devices:
         * 190 × 150
         *
         * The visible blue hotspot does NOT become larger.
         */

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


        // =================================================
        // POINTER OVER
        // =================================================

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


        // =================================================
        // POINTER OUT
        // =================================================

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


        // =================================================
        // CLICK / TOUCH
        // =================================================

        hitbox.on(

            "pointerdown",

            () => {

                this.markInvestigated(
                    id
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
                        "Power2"

                });


                if (
                    this.callback
                ) {

                    this.callback(
                        id
                    );

                }

            }

        );


        // =================================================
        // STORE HOTSPOT
        // =================================================

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


        console.log(

            `Object investigated: ${id}`

        );


        const object =
            this.objects.find(

                obj =>
                    obj.id === id

            );


        if (
            !object
        ) {

            return;

        }


        // =================================================
        // CHARACTER STATE
        // =================================================

        if (
            object.type === "character"
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


        // =================================================
        // HOTSPOT STATE
        // =================================================

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
    // CHECK INVESTIGATION
    // =====================================================

    isInvestigated(
        id
    ) {

        return this.investigatedObjects.has(
            id
        );

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
    // ALL OBJECTS INVESTIGATED
    // =====================================================

    allObjectsInvestigated() {

        return this.objects.every(

            object =>

                this.investigatedObjects.has(
                    object.id
                )

        );

    }


    // =====================================================
    // CLICK EVENT
    // =====================================================

    onObjectClick(
        callback
    ) {

        this.callback =
            callback;

    }

}