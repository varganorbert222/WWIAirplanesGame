import { Scene } from "@babylonjs/core";
import AmbientConfig from "./ambient-config.interface";
import FogConfig from "./fog-config.interface";

export default interface EnvironmentManagerConfig {
  scene: Scene;
  ambientConfig: AmbientConfig;
  fogConfig: FogConfig;
}
