import { useState, useEffect } from "react";
import { useAppContext } from "./appContext";
import { globalState } from "./globalState";
import type { AppState } from "./types";

export const useAppState = (): AppState => {
  const contextState = useAppContext().state;
  const [globalStateValue, setGlobalStateValue] = useState(
    globalState.getState()
  );

  useEffect(() => {
    const unsubscribe = globalState.subscribe((state) => {
      setGlobalStateValue(state);
    });
    return unsubscribe;
  }, []);

  // If context has data, use it; otherwise use global state
  if (contextState.appContants) {
    return contextState;
  }

  return globalStateValue;
};

export const useAppDispatch = () => useAppContext().dispatch;
