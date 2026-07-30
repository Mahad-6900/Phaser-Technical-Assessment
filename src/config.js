import Phaser from "phaser";
import MainScene from "./scenes/MainScene.js";
import MenuScene from "./scenes/MenuScene.js";

const config = {

    type: Phaser.AUTO,

    backgroundColor: "#050505",

    scale: {

        mode: Phaser.Scale.FIT,

        autoCenter: Phaser.Scale.CENTER_BOTH,

        width: 800,

        height: 600

    },

    physics: {

        default: "arcade",

        arcade: {

            debug: false

        }

    },

    scene: [
        MenuScene,
        MainScene
    ]

};

export default config;