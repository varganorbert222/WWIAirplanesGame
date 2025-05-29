import { CubeTexture } from "@babylonjs/core";
import nx from "../assets/skyboxes/skybox_nx.jpg";
import ny from "../assets/skyboxes/skybox_ny.jpg";
import nz from "../assets/skyboxes/skybox_nz.jpg";
import px from "../assets/skyboxes/skybox_px.jpg";
import py from "../assets/skyboxes/skybox_py.jpg";
import pz from "../assets/skyboxes/skybox_pz.jpg";
import { Singleton } from "./singleton";
import { SkyboxManagerConfig } from "./interfaces/skybox-manager.config.interface";

export default class SkyBoxManager extends Singleton<SkyBoxManager> {
  private readonly skyboxFiles: string[] = [px, py, pz, nx, ny, nz];

  constructor(config: SkyboxManagerConfig) {
    super(config);
  }

  createSkybox(): CubeTexture {
    const config = this.getConfig();

    const texture = new CubeTexture("assets/skyboxes/skybox", config.scene, {
      files: this.skyboxFiles,
    });

    return texture;
  }
}
