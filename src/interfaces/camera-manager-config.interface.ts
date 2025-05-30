import { Scene } from "@babylonjs/core";

export default interface CameraManagerConfig {
  scene: Scene;
  canvas: HTMLCanvasElement;
  minZ: number;
  maxZ: number;
}
