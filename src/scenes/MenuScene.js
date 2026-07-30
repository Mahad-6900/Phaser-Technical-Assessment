import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {

    constructor() {
        super("MenuScene");
    }

    create() {

        // Background
        this.cameras.main.setBackgroundColor("#020617");

        // Stars
        this.stars = [];

        for (let i = 0; i < 150; i++) {

            let star = this.add.circle(
                Phaser.Math.Between(0, 800),
                Phaser.Math.Between(0, 600),
                Phaser.Math.Between(1, 3),
                0xffffff
            );

            star.speed = Phaser.Math.Between(1, 3);

            this.stars.push(star);
        }

        // Title
        this.title = this.add.text(
            400,
            120,
            "SPACE DEFENDER",
            {
                fontSize: "56px",
                color: "#00E5FF",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        // Glow animation
        this.tweens.add({
            targets: this.title,
            scale: 1.08,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        // Instructions
        this.add.text(
            400,
            250,
            "Arrow Keys : Move\nSPACE : Shoot",
            {
                fontSize: "28px",
                color: "#ffffff",
                align: "center"
            }
        ).setOrigin(0.5);

        // Start text
        this.startText = this.add.text(
            400,
            430,
            "PRESS SPACE TO START",
            {
                fontSize: "30px",
                color: "#FFD54F",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        this.tweens.add({
            targets: this.startText,
            alpha: 0.2,
            duration: 700,
            yoyo: true,
            repeat: -1
        });

        this.spaceKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

    }

    update() {

        // Moving stars
        this.stars.forEach((star) => {

            star.y += star.speed;

            if (star.y > 600) {

                star.y = 0;
                star.x = Phaser.Math.Between(0, 800);

            }

        });

        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {

            this.scene.start("MainScene");

        }

    }

}