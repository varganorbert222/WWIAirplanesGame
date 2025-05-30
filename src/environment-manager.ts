import Singleton from "./decorators/singleton.decorator";
import EnvironmentManagerConfig from "./interfaces/environment-manager-config.interface";
import SkyBoxManager from "./skybox-manager";
import SunManager from "./sun-manager";

@Singleton
export default class EnvironmentManager {
  private config: EnvironmentManagerConfig;

  constructor(config: EnvironmentManagerConfig) {
    this.config = config;
  }

  createEnvironment(): void {
    this.createSkybox();
    this.createFog();
    this.createAmbient();
  }

  private createSkybox(): void {
    const skyboxManager = new SkyBoxManager({
      scene: this.config.scene,
    });

    const sunManager = new SunManager({
      scene: this.config.scene,
    });

    const sun = sunManager.createSun();
    const skybox = skyboxManager.createSkybox();

    this.config.scene.createDefaultSkybox(skybox, true, 1000);
  }

  private createFog(): void {
    const { scene, fogConfig } = this.config;
    Object.assign(scene, {
      fogEnabled: true,
      fogMode: fogConfig.fogMode,
      fogDensity: fogConfig.fogDensity,
      fogStart: fogConfig.fogStart,
      fogEnd: fogConfig.fogEnd,
      fogColor: fogConfig.fogColor,
    });
  }

  private createAmbient(): void {
    const { scene, ambientConfig } = this.config;
    Object.assign(scene, {
      ambientColor: ambientConfig.ambientColor,
      clearColor: ambientConfig.clearColor,
    });
  }
}
