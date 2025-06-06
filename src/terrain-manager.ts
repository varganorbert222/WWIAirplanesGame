import {
  Color3,
  GroundMesh,
  MeshBuilder,
  StandardMaterial,
  Texture,
} from "@babylonjs/core";
import TerrainManagerConfig from "./interfaces/terrain-manager-config.interface";
import Singleton from "./decorators/singleton.decorator";
import { valleyTerrainData } from "./data/valley-terrain.data";

@Singleton
export default class TerrainManager {
  private readonly config: TerrainManagerConfig;

  constructor(config: TerrainManagerConfig) {
    this.config = config || {};
  }

  createTerrain(): GroundMesh {
    const terrainData = valleyTerrainData;

    const setupMaterial = (material: StandardMaterial) => {
      material.specularColor = new Color3(0.5, 0.5, 0.5);
      material.specularPower = 64;
    };

    //Create Village ground
    const groundMat = new StandardMaterial("groundMat");
    groundMat.diffuseTexture = new Texture(
      terrainData.villagegreen,
      this.config.scene
    );
    groundMat.diffuseTexture.hasAlpha = true;
    setupMaterial(groundMat);

    const ground = MeshBuilder.CreateGround(
      "ground",
      {
        width: 24,
        height: 24,
        subdivisions: 2,
      },
      this.config.scene
    );
    ground.material = groundMat;

    //large ground
    const largeGroundMat = new StandardMaterial("largeGroundMat");
    largeGroundMat.diffuseTexture = new Texture(
      terrainData.valleygrass,
      this.config.scene
    );
    setupMaterial(largeGroundMat);

    const largeGround = MeshBuilder.CreateGroundFromHeightMap(
      "largeGround",
      terrainData.villageheightmap,
      {
        width: 150,
        height: 150,
        subdivisions: 512,
        minHeight: 0,
        maxHeight: 10,
      },
      this.config.scene
    );
    largeGround.material = largeGroundMat;
    largeGround.position.y = -0.01;

    ground.material = groundMat;

    return ground;
  }
}
