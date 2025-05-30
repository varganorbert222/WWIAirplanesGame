import { Color3 } from "@babylonjs/core";

export default interface FogConfig {
  fogDensity: number;
  fogStart: number;
  fogEnd: number;
  fogColor: Color3;
  fogMode: number;
}
