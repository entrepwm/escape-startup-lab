import './style.css'

console.log("Escape Startup Lab");

import Phaser from "phaser";

const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    backgroundColor: "#24324a",

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    scene: {
        preload,
        create
    }
};

const game = new Phaser.Game(config);

function preload() {

}

function create() {

    this.add.text(
        300,
        250,
        "Escape Startup Lab",
        {
            fontSize: "36px",
            color: "#ffffff"
        }
    );

}