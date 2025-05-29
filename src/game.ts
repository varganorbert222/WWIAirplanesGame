import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine } from "@babylonjs/core";
import SceneManager from "./scene-manager";
import CameraManager from "./camera-manager";
import { CameraMode } from "./enums/camera-mode.enum";

class Game {
  private antialias: boolean = true;

  constructor() {
    this.initialize();
  }

  private initialize() {
    console.log("Initializing game...");

    const canvas: HTMLCanvasElement = document.getElementById(
      "renderCanvas"
    ) as HTMLCanvasElement;

    const engine = new Engine(canvas, this.antialias);

    const scene = new SceneManager({
      canvas: canvas,
      engine: engine,
    }).createScene();

    const cameraManager = new CameraManager({
      canvas: canvas,
      scene: scene,
    });

    const camera = cameraManager.switchCamera(CameraMode.ORBITAL);

    engine.runRenderLoop(function () {
      scene.render();
    });

    window.addEventListener("resize", function () {
      engine.resize();
    });

    console.log("Game successfully initialized.");
  }
}

export const game = new Game();
