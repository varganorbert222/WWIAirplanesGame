import { CubeTexture } from "@babylonjs/core";
import SkyboxManagerConfig from "./interfaces/skybox-manager.config.interface";
import Singleton from "./decorators/singleton.decorator";
import { cloudsSkyboxData } from "./data/clouds-skybox.data";

@Singleton
export default class SkyBoxManager {
  private readonly config: SkyboxManagerConfig;
  private readonly skyboxFiles: string[] = [...Object.values(cloudsSkyboxData)];

  constructor(config: SkyboxManagerConfig) {
    this.config = config || {};
  }

  createSkybox(): CubeTexture {
    const texture = new CubeTexture(
      "assets/skyboxes/skybox",
      this.config.scene,
      {
        files: this.skyboxFiles,
      }
    );

    return texture;
  }
}
