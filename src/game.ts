import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine } from "@babylonjs/core";
import { SceneManager } from "./scene-manager";
import { SceneManagerConfig } from "./interfaces/scene-manager-config.interface";

export default class Game {
  private antialias: boolean = false;

  constructor() {
    this.initialize();
  }

  initialize() {
    console.log("Game initialized");

    const canvas: HTMLCanvasElement = document.getElementById(
      "renderCanvas"
    ) as HTMLCanvasElement;
    const engine = new Engine(canvas, this.antialias);
    const scene = SceneManager.getInstance({
      canvas: canvas,
      engine: engine,
    }).createScene();

    engine.runRenderLoop(function () {
      scene.render();
    });

    window.addEventListener("resize", function () {
      engine.resize();
    });
  }
}

export const game = new Game();
