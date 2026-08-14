import Phaser from "phaser";

// Scenes
import BootScene from "./scenes/BootScene";
import PreloadScene from "./scenes/PreloadScene";
import MainMenuScene from "./scenes/MainMenuScene";
import IntroScene from "./scenes/IntroScene";
import Room1Scene from "./scenes/Room1Scene";
import Room2Scene from "./scenes/Room2Scene";

// Game Settings
const GAME_WIDTH = 1920;
const GAME_HEIGHT = 1080;

// Phaser Configuration
export const gameConfig = {
    type: Phaser.AUTO,

    parent: "game",

    width: GAME_WIDTH,
    height: GAME_HEIGHT,

    backgroundColor: "#24324a",

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    },

    scene: [
        BootScene,
        PreloadScene,
        MainMenuScene,
        IntroScene,
        Room1Scene,
        Room2Scene
    ]
};

// Create the Phaser Game
new Phaser.Game(gameConfig);