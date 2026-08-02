import Phaser from "phaser";

export default class Room1Scene extends Phaser.Scene {

    constructor() {
        super("Room1Scene");
    }

    create() {

        this.cameras.main.setBackgroundColor("#24324a");

        this.add.text(
            this.scale.width / 2,
            this.scale.height / 2,
            "Room 1 (Under Development)",
            {
                fontSize: "42px",
                color: "#ffffff"
            }
        ).setOrigin(0.5);

    }

}