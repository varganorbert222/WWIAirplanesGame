import { MeshBuilder, StandardMaterial, Texture } from "@babylonjs/core";
import terrainHeightmap from "../assets/terrains/terrain_heightmap.png";
import terrainColormap from "../assets/terrains/terrain_colormap.png";
import TerrainManagerConfig from "./interfaces/terrain-manager-config.interface";
import Singleton from "./decorators/singleton.decorator";

@Singleton
export default class TerrainManager {
  private readonly config: TerrainManagerConfig;

  constructor(config: TerrainManagerConfig) {
    this.config = config || {};
  }

  createTerrain(): void {
    const groundMaterial = new StandardMaterial("ground", this.config.scene);
    groundMaterial.diffuseTexture = new Texture(
      terrainColormap,
      this.config.scene
    );

    const ground = MeshBuilder.CreateGroundFromHeightMap(
      "gdhm",
      terrainHeightmap,
      {
        width: 1024,
        height: 1024,
        subdivisions: 1024,
        maxHeight: 200,
        minHeight: 0,
      }
    );

    ground.material = groundMaterial;
  }
}
