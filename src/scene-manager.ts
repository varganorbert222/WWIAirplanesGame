import { MeshBuilder, Scene } from "@babylonjs/core";
import { SkyBoxManager } from "./skybox-manager";
import { CameraManager } from "./camera-manager";
import { SunManager } from "./sun-manager";
import { SceneManagerConfig } from "./interfaces/scene-manager-config.interface";
import { CameraManagerConfig } from "./interfaces/camera-manager-config.interface";

export default class SceneManager extends Singleton<SceneManager> {
  constructor(config: SceneManagerConfig) {
    super(config);
  }

  createScene = () => {
    const config = this.getConfig();
    const scene: Scene = new Scene(config.engine);

    const skyboxManager = SkyBoxManager.getInstance();

    const cameraManager = CameraManager.getInstance<CameraManagerConfig>({
      canvas: config.canvas,
      scene: scene,
    });

    const sunManager = SunManager.getInstance({
      scene: scene,
    });

    const sun = sunManager.createSun();
    const skybox = skyboxManager.getSkybox();

    scene.createDefaultSkybox(skybox, true, 1000);

    const sphere = MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 2, segments: 32 },
      scene
    );

    sphere.position.y = 1;

    const ground = MeshBuilder.CreateGround(
      "ground",
      { width: 6, height: 6 },
      scene
    );

    return scene;
  };
}
