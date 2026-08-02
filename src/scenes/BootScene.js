import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {

    constructor() {
        super("BootScene");
    }

    preload() {
        // Nothing to load here (yet)
    }

    create() {

        console.log("BootScene loaded.");

        // Proceed to asset loading
        this.scene.start("PreloadScene");

    }

}