/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ApplicationContants } from "./schemas/types";

export type MountProps = {
  appConstants: ApplicationContants;
};

export function mountReactApp(
  el: HTMLElement,
  props: MountProps
): {
  unmount: () => void;
} {
  // implementation imported from your existing code
  return (window as any).__mountReactApp(el, props);
}
