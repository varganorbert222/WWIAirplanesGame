import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Color3, Color4, Engine, Scene } from "@babylonjs/core";
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
      ambientConfig: {
        ambientColor: new Color3(0.3, 0.3, 0.3),
        clearColor: new Color4(0.5, 0.8, 0.5, 1.0),
      },
      fogConfig: {
        fogColor: new Color3(0.9, 0.9, 0.85),
        fogDensity: 0.01,
        fogStart: 20.0,
        fogEnd: 10000.0,
        fogMode: Scene.FOGMODE_NONE,
      },
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
