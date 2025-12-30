import type { AppState } from "./types";

class GlobalStateManager {
  private static instance: GlobalStateManager;
  private state: AppState = {
    appContants: null,
  };
  private listeners: Set<(state: AppState) => void> = new Set();

  private constructor() {}

  static getInstance(): GlobalStateManager {
    if (!GlobalStateManager.instance) {
      GlobalStateManager.instance = new GlobalStateManager();
    }
    return GlobalStateManager.instance;
  }

  setState(newState: Partial<AppState>) {
    this.state = { ...this.state, ...newState };
    this.notifyListeners();
  }

  getState(): AppState {
    return this.state;
  }

  subscribe(listener: (state: AppState) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.state));
  }
}

export const globalState = GlobalStateManager.getInstance();
