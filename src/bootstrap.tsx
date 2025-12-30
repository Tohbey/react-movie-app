import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import type { MountProps } from "./index";
import { AppContextProvider } from "./context/appContext";

export function realMountReactApp(el: HTMLElement, props: MountProps) {
  const root = createRoot(el);

  root.render(
    <StrictMode>
      <AppContextProvider initialState={{ appContants: props.appConstants }}>
        <App />
      </AppContextProvider>
    </StrictMode>
  );

  return {
    unmount() {
      root.unmount();
    },
  };
}

export function mountReactApp(el: HTMLElement, props: MountProps) {
  return realMountReactApp(el, props);
}
