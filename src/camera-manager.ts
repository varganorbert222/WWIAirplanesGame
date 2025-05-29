import { Camera, FollowCamera, FreeCamera, Vector3 } from "@babylonjs/core";
import { CameraMode } from "./enums/camera-mode.enum";
import Singleton from "./singleton";
import Config from "./interfaces/config.interface";
import CameraManagerConfig from "./interfaces/camera-manager-config.interface";

export default class CameraManager
  extends Singleton
  implements Config<CameraManagerConfig>
{
  private camera?: Camera;
  private freeCamera?: FreeCamera;
  private followCamera?: FollowCamera;
  private currentCamera?: Camera;
  private config?: CameraManagerConfig;

  getConfig(): CameraManagerConfig {
    return this.config;
  }

  init(config: CameraManagerConfig): void {
    const scene = config.scene;

    this.camera = new Camera("camera", Vector3.Zero(), scene);

    this.freeCamera = new FreeCamera(
      "freeCamera",
      new Vector3(0, 5, -10),
      scene
    );
    this.freeCamera.setTarget(Vector3.Zero());

    this.followCamera = new FollowCamera(
      "followCamera",
      new Vector3(0, 5, -10),
      scene
    );
  }

  getCamera(): Camera | undefined {
    return this.camera;
  }

  getFreeCamera(): FreeCamera | undefined {
    return this.freeCamera;
  }

  getFollowCamera(): FollowCamera | undefined {
    return this.followCamera;
  }

  switchCamera(mode: CameraMode): void {
    const config = this.getConfig();
    const canvas = config.canvas;

    this.currentCamera?.detachControl(canvas);

    if (mode === CameraMode.FREE) {
      this.freeCamera?.attachControl(canvas, true);
      this.currentCamera = this.freeCamera;
    } else if (mode === CameraMode.FOLLOW) {
      this.followCamera?.attachControl(true);
      this.currentCamera = this.followCamera;
    } else if (mode === CameraMode.FIXED) {
      this.camera?.attachControl(canvas, true);
      this.currentCamera = this.camera;
    } else if (mode === CameraMode.ORBITAL) {
      // TODO: még hiányzik az orbitális kamera
    }
  }
}
