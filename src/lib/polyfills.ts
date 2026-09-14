/**
 * Small runtime polyfills so the app also runs on older Android browsers
 * and in-app WebViews (Chrome < 93, Samsung Internet, Facebook/Instagram WebView).
 */

const g: any = typeof globalThis !== "undefined" ? globalThis : (window as any);

if (typeof Object.hasOwn !== "function") {
  Object.defineProperty(Object, "hasOwn", {
    value: (obj: object, key: PropertyKey) => Object.prototype.hasOwnProperty.call(obj, key),
    configurable: true,
    writable: true,
  });
}

if (typeof String.prototype.replaceAll !== "function") {
  Object.defineProperty(String.prototype, "replaceAll", {
    value: function (search: any, replacement: any) {
      if (search instanceof RegExp) return this.replace(search, replacement);
      return this.split(search).join(replacement);
    },
    configurable: true,
    writable: true,
  });
}

function at(this: any, index: number) {
  const len = this.length;
  const i = Math.trunc(index) || 0;
  const k = i < 0 ? len + i : i;
  if (k < 0 || k >= len) return undefined;
  return this[k];
}

if (typeof Array.prototype.at !== "function") {
  Object.defineProperty(Array.prototype, "at", { value: at, configurable: true, writable: true });
}
if (typeof String.prototype.at !== "function") {
  Object.defineProperty(String.prototype, "at", { value: at, configurable: true, writable: true });
}

if (typeof g.structuredClone !== "function") {
  g.structuredClone = (value: any) => (value === undefined ? undefined : JSON.parse(JSON.stringify(value)));
}

if (g.crypto && typeof g.crypto.randomUUID !== "function") {
  try {
    g.crypto.randomUUID = () =>
      "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c: string) => {
        const n = Number(c);
        return (n ^ (Math.floor(Math.random() * 256) & (15 >> (n / 4)))).toString(16);
      });
  } catch {
    /* read-only crypto object: ignore */
  }
}

export {};
