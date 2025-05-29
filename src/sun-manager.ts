import { Color3, HemisphericLight, Light, Vector3 } from "@babylonjs/core";
import { Singleton } from "./singleton";
import { SunManagerConfig } from "./interfaces/sun-manager-config.interface";

export default class SunManager extends Singleton<SunManager> {
  private readonly sunColorDiffuse: Color3 = new Color3(0.5, 0.5, 0.5); // Default sun color
  private readonly sunColorSpecular: Color3 = new Color3(1, 1, 1); // Default sun specular color
  private readonly sunIntensity: number = 0.7; // Default sun intensity
  private readonly sunDirection: Vector3 = new Vector3(0, 1, 0); // Default sun direction
  private light?: HemisphericLight;

  constructor(config: SunManagerConfig) {
    super(config);
  }

  createSun(): Light {
    const config = this.getConfig();

    this.light = new HemisphericLight("sun", this.sunDirection, config.scene);
    this.light.diffuse = this.sunColorDiffuse;
    this.light.specular = this.sunColorSpecular;
    this.light.intensity = this.sunIntensity;

    return this.light;
  }
}
