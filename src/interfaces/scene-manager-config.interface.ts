import { Engine } from "@babylonjs/core";
import AmbientConfig from "./ambient-config.interface";
import FogConfig from "./fog-config.interface";

export default interface SceneManagerConfig {
  engine: Engine;
  canvas: HTMLCanvasElement;
  ambientConfig: AmbientConfig;
  fogConfig: FogConfig;
}
