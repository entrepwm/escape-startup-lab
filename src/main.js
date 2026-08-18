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

    type:
        Phaser.AUTO,

    // Mount Phaser inside:
    // <div id="app"></div>
    parent:
        "app",

    // Fixed logical game resolution.
    // Every scene, sprite, hotspot, and button
    // is positioned relative to this 1280x720 space.
    width:
        1280,

    height:
        720,

    backgroundColor:
        "#1d2638",

    scale: {

        // =================================================
        // IMPORTANT:
        // Keep the internal game resolution fixed at
        // 1280x720 and scale the entire canvas uniformly.
        //
        // This prevents sprites, hotspots, buttons, and
        // room objects from shifting between different
        // laptop / monitor resolutions.
        // =================================================

        mode:
            Phaser.Scale.FIT,

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