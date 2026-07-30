#  Space Defender - Phaser 3 Technical Assessment

##  Overview

Space Defender is a responsive 2D space shooter game built with Phaser 3. The player controls a spaceship, destroys falling rocks using rockets, avoids collisions, and tries to reach the target score to win the game.

The project was developed as part of a Phaser 3 Technical Assessment with a focus on clean code, responsiveness, performance, and reusable game logic.

---

#  Objective

# 🎯 Objective

Control the spaceship and destroy falling asteroids to earn points.

The game features 5 progressive levels, with the difficulty increasing as your score grows. Each new level introduces faster asteroid movement, making the game more challenging.

Reach 200 points to complete all levels and win the game.

Avoid collisions with asteroids, as the player has only 3 lives before the game ends.

---

#  Features

- Built with Phaser 3
- Responsive game layout
- Start screen with instructions
- Player movement using arrow keys
- Rocket shooting system
- Random asteroid spawning
- Increasing difficulty based on score
- Level progression
- Score system
- High score saved using Local Storage
- Lives system (3 Hearts)
- Pause and Resume (P Key)
- Win screen
- Game Over screen
- Restart functionality
- Background music
- Shooting sound effect
- Explosion sound effect
- Animated star background
- Camera shake effects
- Rocket trail effect
- Embedded Base64 assets
- Clean and organized project structure

---

#  Controls

| Key | Action |
|------|--------|
| Arrow Keys | Move Spaceship |
| Space | Shoot |
| P | Pause / Resume |
| R | Restart Game |

---

#  Technologies Used

- Phaser 3
- JavaScript (ES6)
- Vite
- HTML5
- CSS3

---

# Project Structure

```
src/
│── assetsBase64.js
│── config.js
│── game.js
│── main.js
│── style.css
│
└── scenes/
    ├── MenuScene.js
    └── MainScene.js
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/Mahad-6900/Phaser-Technical-Assessment.git
```

Move into the project

```bash
cd Phaser-Technical-Assessment
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Create production build

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

#  Build Output

The production-ready build is generated inside the **dist/** folder using:

```bash
npm run build
```

---

# Assumptions & Trade-offs

- The game is designed to stay lightweight and remain under the required file size.
- All game assets are embedded as Base64 strings.
- Gameplay focuses on simplicity, responsiveness, and performance rather than advanced mechanics.
- Local Storage is used to save the player's highest score.

---

# Future Improvements

If more development time were available, the following features could be added:

- Multiple enemy types
- Boss battle
- Power-ups and weapon upgrades
- Mobile touch controls
- Animated explosions using sprite sheets
- Particle effects
- Multiple levels and environments
- Settings menu
- Sound and music controls
- Better UI animations

---

# Author

Muhammad Mahad Khalid

Full Stack Web Developer / Frontend Developer

GitHub:
https://github.com/Mahad-6900
