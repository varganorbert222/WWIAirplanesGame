import { Color3, HemisphericLight, Light, Vector3 } from "@babylonjs/core";
import SunManagerConfig from "./interfaces/sun-manager-config.interface";
import Singleton from "./decorators/singleton.decorator";

@Singleton
export default class SunManager {
  private readonly sunColorDiffuse: Color3 = new Color3(0.5, 0.5, 0.5); // Default sun color
  private readonly sunColorSpecular: Color3 = new Color3(1, 1, 1); // Default sun specular color
  private readonly sunIntensity: number = 0.7; // Default sun intensity
  private readonly sunDirection: Vector3 = new Vector3(0, 1, 0); // Default sun direction
  private readonly config: SunManagerConfig;
  private light?: HemisphericLight;

  constructor(config: SunManagerConfig) {
    this.config = config || {};
  }

  createSun(): Light {
    this.light = new HemisphericLight(
      "sun",
      this.sunDirection,
      this.config.scene
    );
    this.light.diffuse = this.sunColorDiffuse;
    this.light.specular = this.sunColorSpecular;
    this.light.intensity = this.sunIntensity;

    return this.light;
  }
}
