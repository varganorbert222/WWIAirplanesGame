export default class Singleton {
  private static instance: Singleton;
  private config: any;

  protected constructor(config: any) {
    // Private constructor prevents direct instantiation
    this.config = config;
  }

  public static getInstance<T>(config: T): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton(config);
    }
    return Singleton.instance;
  }

  getConfig(): any {
    return this.config;
  }
}
