import { MeshBuilder, StandardMaterial, Texture } from "@babylonjs/core";
import terrainHeightmap from "../assets/terrains/terrain_heightmap.png";
import terrainColormap from "../assets/terrains/terrain_colormap.png";
import Singleton from "./singleton";

export default class TerrainManager extends Singleton {
  createTerrain(): void {
    const config = this.getConfig();

    const groundMaterial = new StandardMaterial("ground", config.scene);
    groundMaterial.diffuseTexture = new Texture(terrainColormap, config.scene);

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
