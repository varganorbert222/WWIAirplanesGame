import { Scene } from "@babylonjs/core";
import SceneManagerConfig from "./interfaces/scene-manager-config.interface";
import Singleton from "./decorators/singleton.decorator";
import TerrainManager from "./terrain-manager";
import EnvironmentManager from "./environment-manager";

@Singleton
export default class SceneManager {
  private readonly config: SceneManagerConfig;

  constructor(config: SceneManagerConfig) {
    this.config = config || {};
  }

  createScene(): Scene {
    const scene: Scene = new Scene(this.config.engine);
    const environmentManager = new EnvironmentManager({
      scene: scene,
      ambientConfig: this.config.ambientConfig,
      fogConfig: this.config.fogConfig,
    }).createEnvironment();

    this.createObjects(scene);

    return scene;
  }

  private createObjects(scene: Scene): void {
    const terrain = new TerrainManager({
      scene: scene,
    }).createTerrain();
  }
}
