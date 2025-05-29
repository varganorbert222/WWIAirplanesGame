import { MeshBuilder, Scene } from "@babylonjs/core";
import SkyBoxManager from "./skybox-manager";
import SunManager from "./sun-manager";
import SceneManagerConfig from "./interfaces/scene-manager-config.interface";
import Singleton from "./decorators/singleton.decorator";
import TerrainManager from "./terrain-manager";

@Singleton
export default class SceneManager {
  private readonly config: SceneManagerConfig;

  constructor(config: SceneManagerConfig) {
    this.config = config || {};
  }

  createScene(): Scene {
    const scene: Scene = new Scene(this.config.engine);

    const skyboxManager = new SkyBoxManager({
      scene: scene,
    });

    const sunManager = new SunManager({
      scene: scene,
    });

    const sun = sunManager.createSun();
    const skybox = skyboxManager.createSkybox();

    scene.createDefaultSkybox(skybox, true, 1000);
    this.createObjects(scene);

    return scene;
  }

  private createObjects(scene: Scene): void {
    // const sphere = MeshBuilder.CreateSphere(
    //   "sphere",
    //   { diameter: 2, segments: 32 },
    //   scene
    // );
    // sphere.position.y = 1;
    // const ground = MeshBuilder.CreateGround(
    //   "ground",
    //   { width: 6, height: 6 },
    //   scene
    // );

    const terrain = new TerrainManager({
      scene: scene,
    }).createTerrain();
  }
}
