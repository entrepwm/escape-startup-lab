import Phaser from "phaser";

// =====================================================
// SCENES
// =====================================================

import BootScene from "./scenes/BootScene";
import MainMenuScene from "./scenes/MainMenuScene";
import IntroScene from "./scenes/IntroScene";

import Room1Scene from "./scenes/Room1Scene";
import Room2Scene from "./scenes/Room2Scene";

// =====================================================
// CORE SYSTEMS
// =====================================================

import ScoreManager from "./core/ScoreManager";


// =====================================================
// GLOBAL SCORE MANAGER
// =====================================================

const scoreManager = new ScoreManager();


// =====================================================
// PHASER CONFIGURATION
// =====================================================

const config = {

    type: Phaser.AUTO,

    width: 1280,

    height: 720,

    backgroundColor: "#1d2638",

    scale: {

        mode: Phaser.Scale.RESIZE,

        autoCenter: Phaser.Scale.CENTER_BOTH

    },

    scene: [

        BootScene,

        MainMenuScene,

        IntroScene,

        Room1Scene,

        Room2Scene

    ]

};


// =====================================================
// CREATE GAME
// =====================================================

const game = new Phaser.Game(config);


// =====================================================
// ATTACH GLOBAL SYSTEM
// =====================================================

game.scoreManager = scoreManager;


export default game;