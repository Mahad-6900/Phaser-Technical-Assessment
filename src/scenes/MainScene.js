import { SHIP, ROCK1, ROCK2, ROCKET1, ROCKET2, BGM, EXPLOSION, SHOOT } from "../assetsBase64";


import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {

    constructor() {
        super("MainScene");
    }


    preload() {

        this.load.image("ship", SHIP);
        this.load.image("rock1", ROCK1);
        this.load.image("rock2", ROCK2);
        this.load.image("rocket1", ROCKET1);
        this.load.image("rocket2", ROCKET2);
        this.load.audio("shoot", SHOOT);
        this.load.audio("explosion", EXPLOSION);
        this.load.audio("bgm", BGM);

    }



    create() {


        this.cameras.main.setBackgroundColor("#050505");




        this.stars = [];

        for (let i = 0; i < 180; i++) {

            let star = this.add.circle(

                Phaser.Math.Between(0, 800),

                Phaser.Math.Between(0, 600),

                Phaser.Math.Between(1, 3),

                0xffffff

            );

            star.speed = Phaser.Math.FloatBetween(0.5, 3);

            this.stars.push(star);
            this.tweens.add({
                targets: star,
                alpha: 0.3,
                duration: Phaser.Math.Between(800, 2000),
                yoyo: true,
                repeat: -1
            });

        }





        this.score = 0;


        this.add.rectangle(
            120,
            35,
            190,
            50,
            0x111827,
            0.8
        ).setStrokeStyle(2, 0x00E5FF);


        this.scoreText = this.add.text(
            40,
            20,
            "SCORE : 0",
            {
                fontSize: "20px",
                color: "#ffffff",
                fontStyle: "bold"
            }
        );

        this.targetScore = 800;
        this.level = 1;

        this.levelText = this.add.text(
            330,
            20,
            "LEVEL : 1",
            {
                fontSize: "24px",
                color: "#FFD700",
                fontStyle: "bold"
            }
        );
        this.highScore = Number(localStorage.getItem("highScore")) || 0;

        this.highScoreText = this.add.text(
            300,
            55,
            "HIGH SCORE : " + this.highScore,
            {
                fontSize: "18px",
                color: "#00E5FF",
                fontStyle: "bold"
            }
        );

        this.lives = 3;

        this.add.rectangle(
            675,
            35,
            210,
            50,
            0x111827,
            0.8
        ).setStrokeStyle(2, 0xFF4D6D);

        this.livesText = this.add.text(
            590,
            20,
            "❤️ ❤️ ❤️",
            {
                fontSize: "24px",
                fontStyle: "bold"
            }
        );




        this.player = this.physics.add.image(
            400,
            520,
            "ship"
        );
        this.engine = this.add.circle(
            this.player.x,
            this.player.y + 25,
            8,
            0x00e5ff,
            0.8
        );

        this.tweens.add({
            targets: this.engine,
            scale: 1.6,
            alpha: 0.2,
            duration: 200,
            yoyo: true,
            repeat: -1
        });

        this.player.body.setAllowGravity(false);

        this.player.setScale(0.6);

        this.keys = this.input.keyboard.createCursorKeys();


        this.bullets = this.physics.add.group();

        this.enemies = this.physics.add.group();


        this.spaceKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        this.restartKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.R
        );
        this.pauseKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.P
        );

        this.isPaused = false;

        this.spawnEvent = this.time.addEvent({

            delay: 1200,

            callback: this.spawnEnemy,

            callbackScope: this,

            loop: true

        });
        this.spawnEvent.paused = false;

        this.physics.add.overlap(
            this.bullets,
            this.enemies,
            this.hitEnemy,
            null,
            this
        );


        this.physics.add.overlap(
            this.player,
            this.enemies,
            this.playerHit,
            null,
            this
        );

        this.shootSound = this.sound.add("shoot");

        this.explosionSound = this.sound.add("explosion");

        this.bgm = this.sound.add("bgm", {

            loop: true,

            volume: 0.20

        });

        console.log("Space Defender Started");


        this.gameStarted = false;
        this.gameEnded = false;

        this.spawnEvent.paused = true;

        this.startBg = this.add.rectangle(
            400,
            300,
            800,
            600,
            0x000814,
            0.90
        );


        this.startTitle = this.add.text(
            175,
            90,
            "SPACE DEFENDER",
            {
                fontSize: "54px",
                color: "#00E5FF",
                fontStyle: "bold",
                stroke: "#ffffff",
                strokeThickness: 2
            }
        );

        this.startSubTitle = this.add.text(
            250,
            155,
            "Destroy Every Rocks",
            {
                fontSize: "22px",
                color: "#FFD166"
            }
        );


        this.startInfo = this.add.text(
            220,
            240,
            "⬅ ➡ ⬆ ⬇  Move\n\nSPACE Shoot\n\nP  Pause Game\n\nR  Restart",
            {
                fontSize: "28px",
                color: "#ffffff",
                align: "center"
            }
        );
        this.pressStart = this.add.text(
            205,
            450,
            "PRESS SPACE TO START",
            {
                fontSize: "34px",
                color: "#00FF99",
                fontStyle: "bold"

            }
        );
        this.tweens.add({

            targets: this.pressStart,

            alpha: 0.3,

            duration: 700,

            yoyo: true,

            repeat: -1

        });


    }
    

    update() {
        if (this.gameEnded) {
            return;
        }



        if (!this.gameStarted) {

            if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {

                this.gameStarted = true;

                this.spawnEvent.paused = false;



                if (this.startBg) {
                    this.startBg.destroy();
                }

                if (this.startTitle) {
                    this.startTitle.destroy();
                }

                if (this.startSubTitle) {
                    this.startSubTitle.destroy();
                }

                if (this.startInfo) {
                    this.startInfo.destroy();
                }

                if (this.pressStart) {
                    this.pressStart.destroy();
                }

                if (this.bgm && !this.bgm.isPlaying) {
                    this.bgm.play();
                }

            }


            return;
        }


        if (Phaser.Input.Keyboard.JustDown(this.pauseKey)) {

            if (!this.isPaused) {

                this.isPaused = true;

                this.physics.pause();

                this.spawnEvent.paused = true;

                this.tweens.pauseAll();

                this.pauseText = this.add.text(
                    250,
                    280,
                    "⏸ GAME PAUSED",
                    {
                        fontSize: "48px",
                        color: "#FFD700",
                        fontStyle: "bold"
                    }
                );

            } else {

                this.isPaused = false;

                this.physics.resume();

                this.spawnEvent.paused = false;

                this.tweens.resumeAll();

                if (this.pauseText) {
                    this.pauseText.destroy();
                }

            }

        }

        if (this.isPaused) {
            return;
        }



        if (this.isPaused) {
            return;
        }


        this.stars.forEach((star) => {

            star.y += star.speed;

            if (star.y > 600) {

                star.y = 0;

                star.x = Phaser.Math.Between(0, 800);

            }

        });
        let speed = 5;



        if (this.keys.left.isDown) {
            this.player.x -= speed;
        }

        if (this.keys.right.isDown) {
            this.player.x += speed;
        }

        if (this.keys.up.isDown) {
            this.player.y -= speed;
        }

        if (this.keys.down.isDown) {
            this.player.y += speed;
        }
        this.engine.x = this.player.x;
        this.engine.y = this.player.y + 25;

        this.player.x = Phaser.Math.Clamp(
            this.player.x,
            40,
            760
        );

        this.player.y = Phaser.Math.Clamp(
            this.player.y,
            100,
            550
        );



        if (
            Phaser.Input.Keyboard.JustDown(this.spaceKey)
        ) {

            this.shoot();

        }


        this.bullets.children.each((rocket) => {

            rocket.y -= 10;

            if (rocket.y < -50) {

                rocket.destroy();

            }

        });


        this.enemies.children.each((rock) => {

            if (this.isPaused) return;

            rock.y += rock.speed;

            rock.angle += rock.rotationSpeed * 60;

            if (rock.y > 650) {
                rock.destroy();
            }

        });

    }


    shoot() {

        let rocketType =
            Phaser.Math.Between(1, 2) === 1
                ? "rocket1"
                : "rocket2";


        let rocket = this.physics.add.image(
            this.player.x,
            this.player.y - 50,
            rocketType
        );


        rocket.body.setAllowGravity(false);

        rocket.setScale(0.5);


        this.bullets.add(rocket);



        this.shootSound.play({
            volume: 0.2
        });


        rocket.trailTimer = this.time.addEvent({

            delay: 50,

            callback: () => {

                if (rocket.active) {

                    let trail = this.add.circle(
                        rocket.x,
                        rocket.y + 20,
                        5,
                        0x00e5ff,
                        0.7
                    );


                    this.tweens.add({

                        targets: trail,

                        alpha: 0,

                        scale: 0,

                        duration: 300,

                        onComplete: () => {

                            trail.destroy();

                        }

                    });

                }

            },

            loop: true

        });

    }

    spawnEnemy() {

        let rockType =
            Phaser.Math.Between(1, 2) === 1
                ? "rock1"
                : "rock2";

        let rock = this.physics.add.image(
            Phaser.Math.Between(50, 750),
            80,
            rockType
        );

        rock.body.setAllowGravity(false);

        rock.setScale(0.6);

        switch (this.level) {

            case 1:
                rock.speed = Phaser.Math.Between(2, 3);
                break;

            case 2:
                rock.speed = Phaser.Math.Between(4, 5);
                break;

            case 3:
                rock.speed = Phaser.Math.Between(6, 7);
                break;

            case 4:
                rock.speed = Phaser.Math.Between(8, 9);
                break;

            case 5:
                rock.speed = Phaser.Math.Between(10, 12);
                break;
        }


        rock.rotationSpeed = Phaser.Math.FloatBetween(-0.01, 0.01);

        this.enemies.add(rock);

    }


    hitEnemy(rocket, rock) {

        rocket.destroy();

        this.cameras.main.shake(80, 0.003);

        let flash = this.add.circle(
            rock.x,
            rock.y,
            20,
            0xffffff
        );

        this.tweens.add({

            targets: flash,

            scale: 3,

            alpha: 0,

            duration: 200,

            onComplete: () => {

                flash.destroy();

            }

        });

        this.explosionSound.play({
            volume: 0.4
        });

        rock.destroy();

        this.score += 10;

        if (this.score > this.highScore) {

            this.highScore = this.score;

            localStorage.setItem(
                "highScore",
                this.highScore
            );

            this.highScoreText.setText(
                "HIGH SCORE : " + this.highScore
            );

        }

        this.scoreText.setText(
            "SCORE : " + this.score
        );

        // LEVEL SYSTEM
        let newLevel = 1;

        if (this.score >= 800) {
            newLevel = 5;
        } else if (this.score >= 600) {
            newLevel = 4;
        } else if (this.score >= 400) {
            newLevel = 3;
        } else if (this.score >= 200) {
            newLevel = 2;
        }

        if (newLevel > this.level) {

            this.level = newLevel;

            this.levelText.setText(
                "LEVEL : " + this.level
            );

            switch (this.level) {

                case 2:
                    this.spawnEvent.delay = 900;
                    break;

                case 3:
                    this.spawnEvent.delay = 700;
                    break;

                case 4:
                    this.spawnEvent.delay = 500;
                    break;

                case 5:
                    this.spawnEvent.delay = 300;
                    break;
            }



            this.physics.pause();
            this.spawnEvent.paused = true;

            let bg = this.add.rectangle(
                400,
                300,
                800,
                600,
                0x000000,
                0.55
            );

            let levelPopup = this.add.text(
                400,
                300,
                "LEVEL " + this.level,
                {
                    fontSize: "64px",
                    color: "#FFD700",
                    fontStyle: "bold",
                    stroke: "#000",
                    strokeThickness: 6
                }
            ).setOrigin(0.5);

            this.tweens.add({
                targets: levelPopup,
                scale: 1.3,
                duration: 400,
                yoyo: true
            });

            this.time.delayedCall(2000, () => {

                bg.destroy();
                levelPopup.destroy();

                this.physics.resume();
                this.spawnEvent.paused = false;

            });

        }

        this.tweens.add({

            targets: this.scoreText,

            scale: 1.2,

            duration: 100,

            yoyo: true

        });

        if (this.score >= this.targetScore) {

            this.gameEnded = true;

            if (this.spawnEvent) {
                this.spawnEvent.paused = true;
            }

            if (this.bgm && this.bgm.isPlaying) {
                this.bgm.stop();
            }

            this.enemies.children.each((enemy) => {
                enemy.body.setVelocity(0, 0);
            });

            this.bullets.children.each((bullet) => {
                bullet.body.setVelocity(0, 0);
            });

            this.physics.pause();

            this.add.rectangle(
                400,
                300,
                800,
                600,
                0x000000,
                0.75
            );

            this.add.text(
                240,
                220,
                "YOU WIN!",
                {
                    fontSize: "60px",
                    color: "#00ff00",
                    fontStyle: "bold"
                }
            );

            this.add.text(
                210,
                320,
                "Press R to Play Again",
                {
                    fontSize: "28px",
                    color: "#ffffff"
                }
            );

            this.input.keyboard.once("keydown-R", () => {

                this.scene.restart();

            });

        }

    }


    playerHit(player, rock) {

        rock.destroy();



        this.cameras.main.shake(
            200,
            0.01
        );



        this.player.setTint(0xff0000);


        this.time.delayedCall(150, () => {

            if (this.player) {
                this.player.clearTint();
            }

        });


        this.lives--;


        let hearts = "";

        for (let i = 0; i < this.lives; i++) {
            hearts += "❤️ ";
        }

        this.livesText.setText(hearts);

        if (this.lives <= 0) {

            this.gameEnded = true;

            this.physics.pause();

            if (this.spawnEvent) {
                this.spawnEvent.paused = true;
            }

            this.enemies.children.each((enemy) => {

                enemy.body.setVelocity(0, 0);

            });

            this.bullets.children.each((bullet) => {

                bullet.body.setVelocity(0, 0);

            });

            this.gameOverBg = this.add.rectangle(
                400,
                300,
                800,
                600,
                0x000000,
                0.75
            );


            this.gameOverText = this.add.text(
                210,
                220,
                "GAME OVER",
                {
                    fontSize: "60px",
                    color: "#ff0000",
                    fontStyle: "bold"
                }
            );


            this.restartText = this.add.text(
                220,
                320,
                "Press R to Restart",
                {
                    fontSize: "28px",
                    color: "#ffffff"
                }
            );

            this.input.keyboard.once(
                "keydown-R",
                () => {

                    this.scene.restart();

                }
            );

        }

    }


}