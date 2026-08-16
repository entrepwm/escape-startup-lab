import Phaser from "phaser";
import "./style.css";

// =====================================================
// SCENES
// =====================================================

import BootScene from "./scenes/BootScene";
import MainMenuScene from "./scenes/MainMenuScene";
import TeamNameScene from "./scenes/TeamNameScene";
import IntroScene from "./scenes/IntroScene";
import PreloadScene from "./scenes/PreloadScene";
import Room1Scene from "./scenes/Room1Scene";
import Room2Scene from "./scenes/Room2Scene";
import Room3Scene from "./scenes/Room3Scene";
import FinalResultsScene from "./scenes/FinalResultsScene";


// =====================================================
// CORE SYSTEMS
// =====================================================

import ScoreManager from "./managers/ScoreManager";


// =====================================================
// GLOBAL SCORE MANAGER
// =====================================================

const scoreManager =
    new ScoreManager();


// =====================================================
// PHASER CONFIGURATION
// =====================================================

const config = {

    type: Phaser.AUTO,

    // Mount Phaser inside:
    // <div id="app"></div>
    parent: "app",

    width: 1280,

    height: 720,

    backgroundColor: "#1d2638",

    scale: {

        mode:
            Phaser.Scale.RESIZE,

        autoCenter:
            Phaser.Scale.CENTER_BOTH

    },

    scene: [

        BootScene,

        PreloadScene,

        MainMenuScene,

        TeamNameScene,

        IntroScene,

        Room1Scene,

        Room2Scene,

        Room3Scene,

        FinalResultsScene

    ]

};


// =====================================================
// CREATE GAME
// =====================================================

const game =
    new Phaser.Game(
        config
    );


// =====================================================
// ATTACH GLOBAL SYSTEM
// =====================================================

game.scoreManager =
    scoreManager;


// =====================================================
// EXPORT
// =====================================================

export default game;