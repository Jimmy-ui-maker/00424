"use client";
import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";

export default function EndlessRunner({ user }) {
  const gameRef = useRef(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameRef.current) return; // prevent re-init

    class RunnerScene extends Phaser.Scene {
      constructor() {
        super("RunnerScene");
      }

      preload() {
        this.load.image("road", "/imgs/road.png");
        this.load.image("player", "/imgs/player.png");
        this.load.image("obstacle", "/imgs/obstacle.png");
      }

      create() {
        const { width, height } = this.scale;

        // Road background
        this.road = this.add.tileSprite(width / 2, height / 2, width, height, "road");

        // Lanes (3 fixed positions)
        this.lanes = [width / 4, width / 2, (3 * width) / 4];

        // Player
        this.currentLane = 1;
        this.player = this.physics.add.sprite(this.lanes[this.currentLane], height * 0.8, "player");
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.5);

        // Obstacles
        this.obstacles = this.physics.add.group();
        this.time.addEvent({
          delay: 1500,
          loop: true,
          callback: () => {
            const laneIndex = Phaser.Math.Between(0, 2);
            const obstacle = this.obstacles.create(this.lanes[laneIndex], -50, "obstacle");
            obstacle.setOrigin(0.5);
            obstacle.setVelocityY(300);
            obstacle.setScale(0.5);
          },
        });

        // Keyboard
        this.cursors = this.input.keyboard.createCursorKeys();

        // Touch
        this.input.on("pointerdown", (pointer) => {
          if (pointer.x < width / 2) this.moveLane(-1);
          else this.moveLane(1);
        });

        // Collision
        this.physics.add.collider(this.player, this.obstacles, () => {
          this.physics.pause();
          this.add
            .text(width / 2, height / 2, "💥 Game Over 💥", {
              fontSize: "28px",
              fill: "#ff0000",
            })
            .setOrigin(0.5);
          setIsGameOver(true);
        });

        // Score
        this.score = 0;
        this.scoreText = this.add.text(10, 10, "Score: 0", { fontSize: "20px", fill: "#fff" });

        // Resize handler
        this.scale.on("resize", this.resize, this);
      }

      moveLane(direction) {
        this.currentLane = Phaser.Math.Clamp(this.currentLane + direction, 0, 2);
        this.player.x = this.lanes[this.currentLane];
      }

      update() {
        if (this.scene.isPaused()) return;
        this.road.tilePositionY += 4;

        if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) this.moveLane(-1);
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) this.moveLane(1);

        this.score += 1;
        this.scoreText.setText("Score: " + this.score);
        setScore(this.score);
      }

      resize(gameSize) {
        const { width, height } = gameSize;
        this.cameras.resize(width, height);
        this.road.setSize(width, height);
        this.road.setPosition(width / 2, height / 2);
        this.player.setY(height * 0.8);
        this.lanes = [width / 4, width / 2, (3 * width) / 4];
        this.player.x = this.lanes[this.currentLane];
      }
    }

    gameRef.current = new Phaser.Game({
      type: Phaser.AUTO,
      backgroundColor: "#000",
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "runner-container",
        width: "100%",
        height: "100%",
      },
      physics: { default: "arcade" },
      scene: RunnerScene,
    });

    return () => {
      gameRef.current.destroy(true);
      gameRef.current = null;
    };
  }, []);

  const handleRestart = () => {
    setIsGameOver(false);
    setScore(0);
    if (gameRef.current) {
      gameRef.current.scene.scenes.forEach((s) => {
        if (s.scene.key === "RunnerScene") s.scene.restart();
      });
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <div
            id="runner-container"
            className="border shadow-sm"
            style={{ width: "100%", aspectRatio: "2/3", maxWidth: "500px", margin: "auto" }}
          />
          {isGameOver && (
            <div className="card col-12 col-md-6 p-4 mt-4 shadow-lg mx-auto">
              <h2 className="text-danger">🎉 Game Over!</h2>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Age:</strong> {user.age}
              </p>
              <p>
                <strong>Difficulty:</strong> {user.difficulty}
              </p>
              <p>
                <strong>Final Score:</strong> {score}
              </p>
              <button className="btn btn-success mt-3" onClick={handleRestart}>
                🔄 Restart Game
              </button>
              <a href="/games" className="btn btn-outline-primary mt-3 ms-2">
                ⬅ Back to Games
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
