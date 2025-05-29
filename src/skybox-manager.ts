import { CubeTexture } from "@babylonjs/core";
import nx from "../assets/skyboxes/skybox_nx.jpg";
import ny from "../assets/skyboxes/skybox_ny.jpg";
import nz from "../assets/skyboxes/skybox_nz.jpg";
import px from "../assets/skyboxes/skybox_px.jpg";
import py from "../assets/skyboxes/skybox_py.jpg";
import pz from "../assets/skyboxes/skybox_pz.jpg";
import SkyboxManagerConfig from "./interfaces/skybox-manager.config.interface";
import Singleton from "./decorators/singleton.decorator";

@Singleton
export default class SkyBoxManager {
  private readonly config: SkyboxManagerConfig;
  private readonly skyboxFiles: string[] = [px, py, pz, nx, ny, nz];

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
