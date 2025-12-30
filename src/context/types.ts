import type { ApplicationContants } from "../schemas/types";

export enum ActionTypes {
  setAppConstant = "setAppConstant",
}

interface SetAppConstant {
  type: ActionTypes.setAppConstant;
  payload: ApplicationContants;
}

export interface AppState {
  appContants: ApplicationContants | null;
}

export type AppContextAction = SetAppConstant;
