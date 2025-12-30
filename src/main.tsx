import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import type { AppState } from "./context/types";
import { AppContextProvider } from "./context/appContext";
import { globalState } from "./context/globalState";

export type MountProps = {
  appConstants: AppState["appContants"];
};

export function mountReactApp(el: HTMLElement, props: MountProps) {
  // Set global state so web components can access it
  console.log(props);
  globalState.setState({ appContants: props.appConstants });

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
