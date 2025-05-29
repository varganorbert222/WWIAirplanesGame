export default function Singleton<T extends { new (...args: any[]): {} }>(
  target: T
): T {
  let instance: T;

  const wrappedConstructor: any = function (...args: any[]) {
    if (!instance) {
      instance = new target(...args) as T;
    }
    return instance;
  };

  wrappedConstructor.prototype = target.prototype;

  return wrappedConstructor as T;
}
