import {
  ArcRotateCamera,
  Camera,
  FollowCamera,
  FreeCamera,
  Vector3,
} from "@babylonjs/core";
import { CameraMode } from "./enums/camera-mode.enum";
import CameraManagerConfig from "./interfaces/camera-manager-config.interface";
import Singleton from "./decorators/singleton.decorator";

@Singleton
export default class CameraManager {
  private readonly config: CameraManagerConfig;
  private readonly camera: Camera;
  private readonly freeCamera: FreeCamera;
  private readonly followCamera: FollowCamera;
  private readonly orbitalCamera: ArcRotateCamera;
  private currentCamera?: Camera;

  constructor(config: CameraManagerConfig) {
    this.config = config || {};

    this.camera = new Camera("camera", Vector3.Zero(), this.config.scene);

    this.freeCamera = new FreeCamera(
      "freeCamera",
      new Vector3(0, 5, -10),
      this.config.scene
    );
    this.freeCamera.setTarget(Vector3.Zero());

    this.followCamera = new FollowCamera(
      "followCamera",
      new Vector3(0, 5, -10),
      this.config.scene
    );
    this.followCamera.setTarget(Vector3.Zero());

    this.orbitalCamera = new ArcRotateCamera(
      "orbitalCamera",
      Math.PI / 2,
      Math.PI / 4,
      10,
      Vector3.Zero(),
      this.config.scene
    );
  }

  getCamera(): Camera | undefined {
    return this.camera;
  }

  getFreeCamera(): FreeCamera {
    return this.freeCamera;
  }

  getFollowCamera(): FollowCamera {
    return this.followCamera;
  }

  switchCamera(mode: CameraMode): Camera | undefined {
    this.currentCamera?.detachControl(this.config.canvas);

    if (mode === CameraMode.FREE) {
      this.freeCamera.attachControl(this.config.canvas, true);
      this.currentCamera = this.freeCamera;
    } else if (mode === CameraMode.FOLLOW) {
      this.followCamera.attachControl(true);
      this.currentCamera = this.followCamera;
    } else if (mode === CameraMode.FIXED) {
      this.camera.attachControl(this.config.canvas, true);
      this.currentCamera = this.camera;
    } else if (mode === CameraMode.ORBITAL) {
      this.orbitalCamera.attachControl(this.config.canvas, true);
      this.currentCamera = this.orbitalCamera;
    }

    if (this.currentCamera) {
      this.config.scene.activeCamera = this.currentCamera;
    }

    return this.currentCamera;
  }
}
